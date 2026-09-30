(() => {
  const root = document.querySelector('#pipeline-figure');
  if (!root) return;

  // The 4×4-patch example from the paper figure: one coarse 2×4, four fine 1×1, one 2×2 token.
  const COLORS = {
    coarse: {stroke: '#e0952b', fill: '#f8d993'},
    fine: {stroke: '#3b78c2', fill: '#a9c8ec'},
    medium: {stroke: '#c8483f', fill: '#f0b3ae'},
  };
  const TOKENS = [
    {x: 0, y: 0, w: 2, h: 4, kind: 'coarse'},
    {x: 2, y: 0, w: 1, h: 1, kind: 'fine'},
    {x: 3, y: 0, w: 1, h: 1, kind: 'fine'},
    {x: 2, y: 1, w: 1, h: 1, kind: 'fine'},
    {x: 3, y: 1, w: 1, h: 1, kind: 'fine'},
    {x: 2, y: 2, w: 2, h: 2, kind: 'medium'},
  ];
  // Extent-dependent heads are keyed by (height, width), as in the paper.
  const HEADS = [[4, 2], [1, 1], [2, 2]].map(([h, w], i) => ({h, w, key: `${h},${w}`, cy: 80 + i * 57}));
  const headFor = token => HEADS.find(head => head.h === token.h && head.w === token.w);
  // Deterministic greys for the latent patches.
  const greys = ['#cdcdcd', '#ebebeb', '#dadada', '#c6c6c6', '#e4e4e4', '#d2d2d2', '#efefef', '#d6d6d6'];
  const outGreys = ['#d3d8e1', '#e9ecf1', '#c9cfda', '#dfe3ea', '#f0f2f5', '#cfd4de', '#e4e7ed', '#d6dae3'];

  const CELL = 30;
  const XT = {x: 20, y: 70};
  const OUT = {x: 648, y: 70};
  const SEQ_X = 300, H_X = 470, CHIP = 17;
  const chipY = i => 72 + i * 22.6;

  const tokenGroup = (origin, palette, cls) => TOKENS.map((t, i) => {
    const x = origin.x + t.x * CELL, y = origin.y + t.y * CELL;
    const w = t.w * CELL, h = t.h * CELL;
    let cells = '';
    for (let j = 0; j < t.h; j++) for (let k = 0; k < t.w; k++) {
      const fill = palette[(t.x + k + (t.y + j) * 3) % palette.length];
      cells += `<rect x="${x + k * CELL + 5}" y="${y + j * CELL + 5}" width="${CELL - 10}" height="${CELL - 10}" fill="${fill}"/>`;
    }
    const c = COLORS[t.kind];
    return `<g class="pl-tok ${cls}" data-tok="${i}">${cells}` +
      `<rect class="pl-border" x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" fill="none" stroke="${c.stroke}" stroke-width="2.5" rx="1"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent"/></g>`;
  }).join('');
  const chips = (x, cls) => TOKENS.map((t, i) => {
    const c = COLORS[t.kind];
    return `<rect class="pl-tok pl-chip ${cls}" data-tok="${i}" x="${x}" y="${chipY(i)}" width="${CHIP}" height="${CHIP}" rx="1.5" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"${cls === 'pl-seq' ? ' tabindex="0" role="button"' : ''} aria-label="Token ${i + 1}: ${t.h}×${t.w} extent"/>`;
  }).join('');
  // Per-token wires: h_i chip -> its head, and head -> output grid.
  const wires = TOKENS.map((t, i) => {
    const head = headFor(t);
    const y = chipY(i) + CHIP / 2;
    const toHead = `M${H_X + CHIP} ${y}H505V${head.cy}H516`;
    const toOut = `M612 ${head.cy}H628V${OUT.y + 60}H640`;
    return `<path class="pl-tok pl-wire" data-tok="${i}" d="${toHead}"/><path class="pl-tok pl-wire" data-tok="${i}" d="${toOut}"/>`;
  }).join('');
  const heads = HEADS.map(head => `<g class="pl-head" data-head="${head.key}">` +
    `<rect x="518" y="${head.cy - 21}" width="94" height="42" rx="5" fill="#d5ecd4" stroke="#6aab66" stroke-width="2"/>` +
    `<text x="565" y="${head.cy + 7}" text-anchor="middle" class="pl-math"><tspan class="pl-it">h</tspan><tspan dy="6" font-size="14">(${head.h},${head.w})</tspan></text></g>`).join('');

  root.innerHTML = `
  <div class="pl-scroll">
  <svg class="pl-svg" viewBox="0 0 1000 250" role="group" aria-label="LoT Diffusion pipeline. Hover a token to trace its path.">
    <defs>
      <marker id="pl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker>
    </defs>
    <!-- Conditioning -->
    <rect x="175" y="8" width="170" height="36" rx="6" fill="#dcdcf0" stroke="#9c9cc4" stroke-width="2"/>
    <text x="260" y="32" text-anchor="middle" class="pl-math pl-upright">Embed (<tspan class="pl-it">t</tspan>, <tspan class="pl-bold">c</tspan>, <tspan class="pl-bold">s</tspan>(<tspan class="pl-bold">e</tspan><tspan dy="5" font-size="12" class="pl-it">i</tspan><tspan dy="-5">))</tspan></text>
    <path class="pl-fixed" d="M230 44V106" marker-end="url(#pl-arrow)"/>
    <text x="238" y="82" class="pl-math pl-note">g<tspan dy="5" font-size="12">ϕ</tspan></text>
    <path class="pl-fixed pl-dashed" d="M345 26H395V92" marker-end="url(#pl-arrow)"/>
    <text x="403" y="22" class="pl-math pl-note">t, <tspan class="pl-bold">c</tspan></text>
    <!-- Input latent -->
    ${tokenGroup(XT, greys, 'pl-in')}
    <path class="pl-fixed" d="M146 137H186" marker-end="url(#pl-arrow)"/>
    <rect x="188" y="108" width="84" height="58" rx="6" fill="#dcdcf0" stroke="#9c9cc4" stroke-width="2"/>
    <text x="230" y="130" text-anchor="middle" class="pl-label">Patchify</text>
    <text x="230" y="155" text-anchor="middle" class="pl-math"><tspan class="pl-bold">A</tspan><tspan dy="-8" font-size="12">⊤</tspan><tspan dy="14" font-size="12" class="pl-bold">e</tspan><tspan dy="3" font-size="10" class="pl-it">i</tspan></text>
    <path class="pl-fixed" d="M272 137H296" marker-end="url(#pl-arrow)"/>
    ${chips(SEQ_X, 'pl-seq')}
    <path class="pl-fixed" d="M320 137H342" marker-end="url(#pl-arrow)"/>
    <rect x="345" y="95" width="100" height="86" rx="7" fill="#f2f2f2" stroke="#222" stroke-width="2.5"/>
    <text x="395" y="132" text-anchor="middle" class="pl-label pl-strong">DiT</text>
    <text x="395" y="158" text-anchor="middle" class="pl-label pl-strong">Block</text>
    <text x="395" y="202" text-anchor="middle" class="pl-math">× <tspan class="pl-it">N</tspan></text>
    <path class="pl-fixed" d="M445 137H466" marker-end="url(#pl-arrow)"/>
    ${chips(H_X, 'pl-h')}
    ${wires}
    ${heads}
    <!-- Output -->
    ${tokenGroup(OUT, outGreys, 'pl-out')}
    <path class="pl-fixed" d="M774 137H800" marker-end="url(#pl-arrow)"/>
    <rect x="806" y="40" width="186" height="34" rx="6" fill="#d5ecd4" stroke="#6aab66" stroke-width="2"/>
    <text x="899" y="63" text-anchor="middle" class="pl-label">Full-rank velocity</text>
    <text x="812" y="118" class="pl-math">
      <tspan class="pl-bold">û</tspan><tspan dy="-8" font-size="12">(<tspan class="pl-it">i</tspan>)</tspan><tspan dy="8"> = </tspan><tspan class="pl-bold">P</tspan><tspan dy="6" font-size="12" class="pl-bold">e</tspan><tspan dy="3" font-size="10" class="pl-it">i</tspan><tspan dy="-9"> </tspan><tspan class="pl-bold">û</tspan><tspan dy="6" font-size="12">A</tspan><tspan dy="-14" font-size="12">(<tspan class="pl-it">i</tspan>)</tspan>
    </text>
    <text x="812" y="168" class="pl-math">
      + (<tspan class="pl-bold">I</tspan> − <tspan class="pl-bold">P</tspan><tspan dy="6" font-size="12" class="pl-bold">e</tspan><tspan dy="3" font-size="10" class="pl-it">i</tspan><tspan dy="-9">)</tspan>
    </text>
    <text x="946" y="156" text-anchor="middle" class="pl-math"><tspan class="pl-bold">x</tspan><tspan dy="6" font-size="12" class="pl-it">t</tspan><tspan dy="-14" font-size="12">(<tspan class="pl-it">i</tspan>)</tspan><tspan dy="8"> + </tspan><tspan class="pl-bold">û</tspan><tspan dy="6" font-size="12">A</tspan><tspan dy="-14" font-size="12">(<tspan class="pl-it">i</tspan>)</tspan></text>
    <path d="M906 163H988" stroke="#333" stroke-width="1.2"/>
    <text x="946" y="184" text-anchor="middle" class="pl-math">σ<tspan dy="6" font-size="12" class="pl-it">t</tspan></text>
    <!-- Axis labels -->
    <text x="80" y="232" text-anchor="middle" class="pl-math pl-big"><tspan class="pl-bold">x</tspan><tspan dy="6" font-size="14" class="pl-it">t</tspan></text>
    <text x="309" y="232" text-anchor="middle" class="pl-math pl-big"><tspan class="pl-bold">x̄</tspan><tspan dy="6" font-size="14" class="pl-it">t,𝒫</tspan></text>
    <text x="479" y="232" text-anchor="middle" class="pl-math pl-big"><tspan class="pl-bold">h</tspan><tspan dy="6" font-size="14" class="pl-it">i</tspan></text>
    <text x="708" y="232" text-anchor="middle" class="pl-math pl-big"><tspan class="pl-bold">û</tspan><tspan dy="6" font-size="14">A</tspan><tspan dy="-16" font-size="14">(<tspan class="pl-it">i</tspan>)</tspan></text>
  </svg>
  </div>
  <p class="pl-readout" aria-live="polite"></p>`;

  const svg = root.querySelector('svg');
  const readout = root.querySelector('.pl-readout');
  const idle = `${TOKENS.length} tokens instead of 16 latent patches. Hover a region, a token, or a head to trace its path.`;
  readout.textContent = idle;

  function focus(tokens, head) {
    const on = new Set(tokens);
    svg.classList.toggle('has-focus', on.size > 0);
    svg.querySelectorAll('[data-tok]').forEach(node => node.classList.toggle('is-on', on.has(+node.dataset.tok)));
    svg.querySelectorAll('[data-head]').forEach(node => node.classList.toggle('is-on', node.dataset.head === head));
    svg.querySelectorAll('.pl-wire.is-on').forEach(node => { node.style.stroke = COLORS[TOKENS[+node.dataset.tok].kind].stroke; });
    svg.querySelectorAll('.pl-wire:not(.is-on)').forEach(node => { node.style.stroke = ''; });
    if (!on.size) { readout.textContent = idle; return; }
    if (tokens.length === 1) {
      const t = TOKENS[tokens[0]];
      const n = t.w * t.h;
      readout.textContent = n === 1
        ? `Token ${tokens[0] + 1}: a fine 1×1 token. One patch becomes one token; head h(1,1) predicts its velocity directly.`
        : `Token ${tokens[0] + 1}: ${n} latent patches (${t.h}×${t.w}) are patchified into one token. Head h(${t.h},${t.w}) predicts velocity for all ${n} patches, which is lifted back to full rank.`;
    } else {
      const t = TOKENS[tokens[0]];
      readout.textContent = `Head h(${t.h},${t.w}) is shared by the ${tokens.length} tokens with a ${t.h}×${t.w} extent.`;
    }
  }
  const tokenFocus = i => focus([i], headFor(TOKENS[i]).key);
  const headFocus = key => focus(TOKENS.flatMap((t, i) => headFor(t).key === key ? [i] : []), key);

  // Auto-tour: trace each token in turn until the reader takes over.
  const TOUR_STEP = 2200;
  const RESUME_DELAY = 1200;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let engaged = false;
  let visible = false;
  let step = 0;
  let timer;
  const canTour = () => !engaged && visible && !document.hidden && !reducedMotion.matches;
  function tour() {
    clearTimeout(timer);
    if (!canTour()) return;
    tokenFocus(step);
    step = (step + 1) % TOKENS.length;
    timer = setTimeout(tour, TOUR_STEP);
  }
  function engage() { engaged = true; clearTimeout(timer); }
  function release() {
    engaged = false;
    focus([], null);
    clearTimeout(timer);
    timer = setTimeout(tour, RESUME_DELAY);
  }

  svg.addEventListener('pointerover', event => {
    const tok = event.target.closest('[data-tok]');
    const head = event.target.closest('[data-head]');
    if (event.pointerType !== 'touch') engage();
    if (tok) tokenFocus(+tok.dataset.tok);
    else if (head) headFocus(head.dataset.head);
  });
  svg.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') release(); });
  // Touch: tapping a token holds it; tapping empty space resumes the tour.
  svg.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    const tok = event.target.closest('[data-tok]');
    const head = event.target.closest('[data-head]');
    if (tok) { engage(); tokenFocus(+tok.dataset.tok); }
    else if (head) { engage(); headFocus(head.dataset.head); }
    else release();
  });
  svg.querySelectorAll('.pl-seq').forEach(chip => {
    chip.addEventListener('focus', () => { engage(); tokenFocus(+chip.dataset.tok); });
    chip.addEventListener('blur', release);
  });

  const update = () => {
    clearTimeout(timer);
    if (canTour()) tour();
    else if (!engaged) focus([], null);
  };
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, {threshold: .3}).observe(svg);
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', update);
})();
