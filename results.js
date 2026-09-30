(() => {
  const root = document.querySelector('#results-galleries');
  if (!root || !window.LOT_RESULTS) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  for (const group of window.LOT_RESULTS) {
    const section = element('section', 'result-group');
    section.id = group.id;
    const heading = element('h3', '', group.title);
    heading.id = `${group.id}-heading`;
    section.setAttribute('aria-labelledby', heading.id);
    const sectionHeader = element('div', 'result-section-header');
    sectionHeader.append(heading);
    if (group.source) {
      const supplementary = element('a', 'supplementary-button', 'See more results in supplementary website ↗');
      supplementary.href = group.source;
      supplementary.target = '_blank';
      supplementary.rel = 'noopener';
      supplementary.setAttribute('aria-label', `${group.title} — supplementary material`);
      sectionHeader.append(supplementary);
    }
    section.append(sectionHeader, element('p', 'result-intro', group.intro));
    const tabs = element('div', 'result-tabs');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', `${group.title} examples`);
    const content = element('div', 'result-content');
    section.append(tabs, content);
    root.append(section);
    let cleanup = () => {};
    const sources = group.groupBySource ? [...new Set(group.examples.map(e => e.label))] : [];
    const selectionBySource = new Map(sources.map(source => [source, group.examples.findIndex(e => e.label === source)]));
    let currentIndex = 0;
    const counter = element('span', 'result-carousel-counter');
    counter.setAttribute('aria-live', 'polite');
    counter.setAttribute('aria-atomic', 'true');
    const exampleTabs = group.groupBySource ? element('div', 'result-carousel') : tabs;
    function moveExample(direction) {
      const indices = group.examples.map((example, index) => example.label === group.examples[currentIndex].label ? index : -1).filter(index => index >= 0);
      const position = indices.indexOf(currentIndex);
      render(indices[(position + direction + indices.length) % indices.length]);
    }
    if (group.groupBySource) {
      tabs.setAttribute('aria-label', `${group.title} sources`);
      exampleTabs.setAttribute('role', 'group');
      exampleTabs.setAttribute('aria-label', `${group.title} examples`);
      const previous = element('button', '', '‹');
      const next = element('button', '', '›');
      previous.type = next.type = 'button';
      previous.setAttribute('aria-label', 'Previous example');
      next.setAttribute('aria-label', 'Next example');
      previous.addEventListener('click', () => moveExample(-1));
      next.addEventListener('click', () => moveExample(1));
      exampleTabs.append(previous, counter, next);
      exampleTabs.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        moveExample(event.key === 'ArrowLeft' ? -1 : 1);
      });
      content.before(exampleTabs);
    }
    const sourceButtons = sources.map(source => {
      const button = element('button', '', source);
      button.type = 'button';
      button.addEventListener('click', () => render(selectionBySource.get(source)));
      tabs.append(button);
      return button;
    });
    const buttons = group.groupBySource ? [] : group.examples.map((example, index) => {
      const button = element('button', '', group.groupBySource ? example.title : example.label);
      button.type = 'button';
      button.addEventListener('click', () => render(index));
      exampleTabs.append(button);
      return button;
    });
    function render(index) {
      cleanup();
      currentIndex = index;
      const example = group.examples[index];
      if (group.groupBySource) {
        const peers = group.examples.filter(item => item.label === example.label);
        counter.textContent = `${peers.indexOf(example) + 1} / ${peers.length}`;
        selectionBySource.set(example.label, index);
        sourceButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(sources[i] === example.label)));
      }
      buttons.forEach((button, i) => {
        button.setAttribute('aria-pressed', String(index === i));
        button.hidden = Boolean(group.groupBySource && group.examples[i].label !== example.label);
      });
      content.replaceChildren();
      content.append(element('h4', 'result-title', example.title));
      if (example.description) content.append(element('p', 'result-description', example.description));
      if (example.kind === 'manual-recording') {
        const attribution = element('p', 'manual-attribution', 'Painted by the user');
        const video = element('video', 'manual-demo-video');
        video.src = example.recording;
        video.poster = example.poster;
        video.controls = true;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('aria-label', 'User-painted image generation: manual layout edits and four generations');
        content.append(attribution, video);
        const stopWhenHidden = () => { if (document.hidden) video.pause(); };
        const observer = new IntersectionObserver(entries => {
          if (!entries[0].isIntersecting) video.pause();
          else if (!reducedMotion.matches && !document.hidden) video.play().catch(() => {});
        }, {threshold: .25});
        observer.observe(video);
        document.addEventListener('visibilitychange', stopWhenHidden);
        cleanup = () => {
          observer.disconnect();
          document.removeEventListener('visibilitychange', stopWhenHidden);
          video.pause();
          video.removeAttribute('src');
          video.load();
        };
        return;
      }
      const panels = element('div', 'result-panels');
      if (example.panels.length === 2) panels.classList.add('two-panels');
      const videos = [];
      let layoutCanvas;
      let layoutFrames;
      for (const panel of example.panels) {
        const figure = element('figure', 'result-panel');
        const caption = element('figcaption', '', panel.label === 'LoT layout' ? 'Derived LoT layout' : panel.label);
        if (group.id.startsWith('agent-') && ['Importance map', 'Scene plan', 'Detail map'].includes(panel.label)) {
          caption.append(element('span', 'agent-created-label', 'Created by GPT-6'));
        }
        figure.append(caption);
        if (panel.type === 'video' && panel.label === 'LoT layout') {
          const key = panel.layoutKey || (panel.src.includes('train') ? 'video-train' : 'video-corgi');
          layoutFrames = window.LOT_VIDEO_LAYOUTS[key];
          layoutCanvas = element('canvas', 'video-token-layout');
          layoutCanvas.width = 1280;
          layoutCanvas.height = 720;
          layoutCanvas.setAttribute('role', 'img');
          layoutCanvas.setAttribute('aria-label', `${example.title} — LoT layout, colored by token area`);
          figure.append(layoutCanvas);
        } else if (panel.type === 'video') {
          const video = element('video');
          video.src = panel.src;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          video.loop = true;
          video.preload = 'metadata';
          video.setAttribute('aria-label', `${example.title} — ${panel.label}`);
          figure.append(video);
          videos.push(video);
        } else {
          const link = element('a');
          link.href = panel.src;
          link.target = '_blank';
          link.rel = 'noopener';
          link.setAttribute('aria-label', `Open full-size ${panel.label.toLowerCase()}: ${example.title}`);
          const img = element('img');
          img.src = panel.src;
          img.alt = `${example.title} — ${panel.label}`;
          img.loading = 'lazy';
          img.decoding = 'async';
          link.append(img);
          figure.append(link);
        }
        panels.append(figure);
      }
      content.append(panels);
      const metrics = element('div', 'result-metrics');
      const compression = (example.denseTokens / example.tokens).toFixed(2);
      const stats = element('p', 'result-stats');
      stats.append(element('strong', '', `${compression}× fewer tokens`), document.createTextNode(` · ${example.tokens.toLocaleString()} / ${example.denseTokens.toLocaleString()} tokens (LoT / full resolution)`));
      if (!example.hideStats) metrics.append(stats);
      content.append(metrics);
      const prompt = element('details', 'result-details');
      prompt.append(element('summary', '', 'Generation prompt'), element('p', '', example.prompt));
      content.append(prompt);
      let observer;
      let frameCallback;
      let lastSlice = -1;
      let layoutResizeObserver;
      let disposed = false;
      const leader = videos.at(-1);
      const drawLayout = (time = 0) => {
        if (!layoutCanvas || disposed) return;
        const frame = Math.floor(time * 15 + 1e-5);
        const slice = Math.min(layoutFrames.length - 1, frame === 0 ? 0 : 1 + Math.floor((frame - 1) / 4));
        const ratio = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.round(layoutCanvas.clientWidth * ratio));
        const height = Math.max(1, Math.round(width * 720 / 1280));
        const resized = layoutCanvas.width !== width || layoutCanvas.height !== height;
        if (slice === lastSlice && !resized) return;
        if (resized) { layoutCanvas.width = width; layoutCanvas.height = height; }
        lastSlice = slice;
        layoutCanvas.dataset.slice = String(slice);
        const ctx = layoutCanvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        const edges = new Path2D();
        const px = x => Math.round(x / 80 * width);
        const py = y => Math.round(y / 45 * height);
        const snap = (value, limit) => Math.min(limit - .5, value + .5);
        for (const [x, y, w, h] of layoutFrames[slice]) {
          const left = px(x), top = py(y), right = px(x + w), bottom = py(y + h);
          ctx.fillStyle = window.LOT_TOKEN_PALETTE[w * h];
          ctx.fillRect(left, top, right - left, bottom - top);
          const x0 = snap(left, width), y0 = snap(top, height);
          edges.rect(x0, y0, snap(right, width) - x0, snap(bottom, height) - y0);
        }
        // Fill every token first; shared edges are then stroked once on device pixels.
        ctx.strokeStyle = '#7c8996';
        ctx.lineWidth = 1;
        ctx.stroke(edges);
      };
      drawLayout();
      if (layoutCanvas) {
        layoutResizeObserver = new ResizeObserver(() => drawLayout(leader?.currentTime || 0));
        layoutResizeObserver.observe(layoutCanvas);
      }
      const pauseAll = () => videos.forEach(v => v.pause());
      const playAll = () => {
        if (disposed || document.hidden) return;
        videos.forEach(v => v.play().catch(() => {}));
      };
      const visibility = () => { if (document.hidden) pauseAll(); };
      const motionChanged = () => { if (reducedMotion.matches) pauseAll(); };
      if (leader) {
        leader.controls = true;
        const updateLayout = () => drawLayout(leader.currentTime);
        leader.addEventListener('seeked', updateLayout);
        leader.addEventListener('timeupdate', updateLayout);
        if (layoutCanvas && leader.requestVideoFrameCallback) {
          const tick = (now, metadata) => {
            if (disposed) return;
            drawLayout(metadata.mediaTime);
            frameCallback = leader.requestVideoFrameCallback(tick);
          };
          frameCallback = leader.requestVideoFrameCallback(tick);
        }
        leader.addEventListener('play', playAll);
        leader.addEventListener('pause', pauseAll);
        leader.addEventListener('timeupdate', () => videos.slice(0, -1).forEach(v => {
          if (v.readyState >= 1 && Math.abs(v.currentTime - leader.currentTime) > .15) v.currentTime = leader.currentTime;
        }));
        observer = new IntersectionObserver(entries => {
          if (!entries[0].isIntersecting) pauseAll();
          else if (!reducedMotion.matches) playAll();
        }, {threshold: .25});
        observer.observe(panels);
        document.addEventListener('visibilitychange', visibility);
        reducedMotion.addEventListener('change', motionChanged);
      }
      cleanup = () => {
        disposed = true;
        observer?.disconnect();
        layoutResizeObserver?.disconnect();
        if (frameCallback !== undefined) leader?.cancelVideoFrameCallback?.(frameCallback);
        document.removeEventListener('visibilitychange', visibility);
        reducedMotion.removeEventListener('change', motionChanged);
        videos.forEach(v => {v.pause(); v.removeAttribute('src'); v.load();});
      };
    }
    render(0);
  }
})();
