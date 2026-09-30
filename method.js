(() => {
  const root = document.querySelector('#method-source-flows');
  const imageExamples = window.LOT_RESULTS?.find(group => group.id === 'source-image')?.examples;
  if (!root || !imageExamples) return;

  // Every source is turned into a LoT layout, which then drives generation.
  const SOURCES = [
    ['Bounding boxes', 'Bounding boxes'],
    ['Semantic masks', 'Semantic masks'],
    ['Texture variance', 'Texture variance'],
    ['Depth of field', 'Depth map'],
  ].map(([label, title]) => ({
    title,
    example: window.LOT_METHOD_EXAMPLES?.find(item => item.label === label) || imageExamples.find(item => item.label === label),
  })).filter(source => source.example);
  const STEP = 3800;
  // Short cascade while cycling; a click shows everything at once.
  const CASCADE = [180, 360];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  let active = 0;
  let pinned = false;
  let hovered = false;
  let visible = false;
  let timer;
  const stagger = [];
  const animated = () => visible && !document.hidden && !reducedMotion.matches;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  // Warm the cache so switching sources never waits on the network.
  for (const {example} of SOURCES) example.panels.forEach(panel => { new Image().src = panel.src; });
  // Source, layout and generation share one resolution; every frame hugs that aspect ratio.
  const fitFrame = (frame, img) => {
    const apply = () => {
      if (!img.naturalWidth) return;
      frame.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      requestAnimationFrame(drawLinks);
    };
    img.addEventListener('load', apply);
    apply();
  };

  const hub = el('div', 'lot-hub');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('hub-links');
  svg.setAttribute('aria-hidden', 'true');
  hub.append(svg);

  // Column 1: all four sources at once.
  const sourceColumn = el('div', 'hub-column hub-sources');
  sourceColumn.append(el('div', 'hub-heading', 'Layout sources'));
  const sourceCards = SOURCES.map((source, index) => {
    const card = el('button', 'hub-card hub-source');
    card.type = 'button';
    const slot = el('div', 'hub-slot');
    const frame = el('div', 'hub-thumb');
    const img = el('img');
    fitFrame(frame, img);
    img.src = source.example.panels[0].src;
    img.alt = `${source.example.title} — ${source.title}`;
    frame.append(img);
    slot.append(frame);
    card.append(slot, el('span', 'hub-label', source.title));
    card.addEventListener('click', () => { pinned = true; select(index, false); });
    sourceColumn.append(card);
    return card;
  });

  // Column 2: the derived LoT layout.
  const layoutColumn = el('div', 'hub-column hub-center');
  layoutColumn.append(el('div', 'hub-heading', 'LoT layout'));
  const layoutCard = el('div', 'hub-card hub-layout');
  const layoutFrame = el('div', 'hub-thumb');
  const layoutImg = el('img');
  fitFrame(layoutFrame, layoutImg);
  layoutFrame.append(layoutImg);
  const layoutStats = el('span', 'hub-label hub-stats');
  layoutCard.append(layoutFrame, layoutStats);
  layoutColumn.append(layoutCard);

  // Column 3: the generated image.
  const outputColumn = el('div', 'hub-column hub-outputs');
  outputColumn.append(el('div', 'hub-heading', 'LoT Diffusion'));
  const outputCard = el('div', 'hub-card hub-output');
  const outputFrame = el('div', 'hub-thumb');
  const outputImg = el('img');
  fitFrame(outputFrame, outputImg);
  outputFrame.append(outputImg);
  outputCard.append(outputFrame, el('span', 'hub-label', 'Generated image'));
  outputColumn.append(outputCard);

  hub.append(sourceColumn, layoutColumn, outputColumn);
  root.append(hub);

  // Connectors follow the rendered card positions, so they work in any breakpoint.
  const path = () => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.append(node);
    return node;
  };
  const inLinks = sourceCards.map(path);
  const outLink = path();
  function connect(node, from, to) {
    const base = hub.getBoundingClientRect();
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    let d;
    // Side-by-side columns get horizontal curves; stacked columns get vertical ones.
    const side = to.closest('.hub-column').getBoundingClientRect().left >= from.closest('.hub-column').getBoundingClientRect().right - 1;
    if (side) {
      const x1 = a.right - base.left + 5, y1 = a.top + a.height / 2 - base.top;
      const x2 = b.left - base.left - 7, y2 = b.top + b.height / 2 - base.top;
      const c = (x2 - x1) / 2;
      d = `M${x1},${y1} C${x1 + c},${y1} ${x2 - c},${y2} ${x2},${y2}`;
    } else {
      // Stacked layout: run from below the card's label to above the next column's heading.
      const x1 = a.left + a.width / 2 - base.left, y1 = from.closest('.hub-card').getBoundingClientRect().bottom - base.top + 4;
      const x2 = b.left + b.width / 2 - base.left, y2 = to.closest('.hub-column').getBoundingClientRect().top - base.top - 5;
      const c = (y2 - y1) / 2;
      d = `M${x1},${y1} C${x1},${y1 + c} ${x2},${y2 - c} ${x2},${y2}`;
    }
    node.setAttribute('d', d);
  }
  function drawLinks() {
    const {width, height} = hub.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    sourceCards.forEach((card, i) => connect(inLinks[i], card, layoutFrame));
    connect(outLink, layoutFrame, outputFrame);
  }
  new ResizeObserver(drawLinks).observe(hub);

  function select(index, cascade = true) {
    active = index;
    clearTimeout(timer);
    stagger.splice(0).forEach(clearTimeout);
    const {example} = SOURCES[index];
    sourceCards.forEach((card, i) => card.setAttribute('aria-pressed', String(i === index)));
    inLinks.forEach((link, i) => link.classList.toggle('is-active', i === index));

    // Crossfade: dip the layout and output, swap images, then fade back in.
    const steps = [
      () => {
        layoutImg.src = example.panels[1].src;
        layoutImg.alt = `${example.title} — derived LoT layout`;
        layoutStats.textContent = `${example.tokens.toLocaleString('en-US')} / ${example.denseTokens.toLocaleString('en-US')} tokens`;
        layoutCard.classList.add('is-shown');
      },
      () => {
        outputImg.src = example.panels[2].src;
        outputImg.alt = `${example.title} — generated image`;
        outLink.classList.add('is-active');
        outputCard.classList.add('is-shown');
      },
    ];
    if (cascade && animated()) {
      layoutCard.classList.remove('is-shown');
      outputCard.classList.remove('is-shown');
      outLink.classList.remove('is-active');
      steps.forEach((step, i) => stagger.push(setTimeout(step, CASCADE[i])));
    } else {
      steps.forEach(step => step());
    }
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (!pinned && !hovered && animated()) timer = setTimeout(() => select((active + 1) % SOURCES.length), STEP);
  }

  // Hold the current example while the reader inspects it.
  hub.addEventListener('mouseenter', () => { hovered = true; clearTimeout(timer); });
  hub.addEventListener('mouseleave', () => { hovered = false; schedule(); });

  const update = () => {
    root.classList.toggle('is-animating', animated());
    schedule();
  };
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    update();
  }, {threshold: .15}).observe(root);
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);

  root.classList.add('motion-figure');
  select(0, false);
})();
