(() => {
  const root = document.querySelector('#layout-inspector');
  const data = window.LOT_INSPECTOR;
  if (!root || !data) return;

  const {cols, rows} = data;
  const PATCH_PX = 16; // One latent patch covers 16×16 output pixels.
  const tokens = [];
  for (let i = 0; i < data.tokens.length; i += 4) tokens.push(data.tokens.slice(i, i + 4));
  // Cell -> token index, for constant-time hit testing.
  const owner = new Int32Array(cols * rows);
  tokens.forEach(([x, y, w, h], index) => {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) owner[j * cols + i] = index;
  });
  const palette = window.LOT_TOKEN_PALETTE || {1: '#f5cbc9', 2: '#fcdad0', 4: '#feebd8', 8: '#ffffef', 16: '#eaf6fa', 64: '#d0dcec'};
  const areas = [...new Set(tokens.map(([, , w, h]) => w * h))].sort((a, b) => a - b);
  const fmt = n => n.toLocaleString('en-US');
  const dense = cols * rows;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Two stages: the layout and the generated image, each with a highlight overlay.
  const panels = el('div', 'inspector-panels');
  const makeStage = (label, base) => {
    const panel = el('div', 'inspector-panel');
    const stage = el('div', 'inspector-stage');
    stage.style.aspectRatio = `${cols} / ${rows}`;
    const overlay = el('canvas', 'inspector-overlay');
    overlay.setAttribute('aria-hidden', 'true');
    stage.append(base, overlay);
    panel.append(el('div', 'flow-label', label), stage);
    panels.append(panel);
    return {stage, overlay};
  };
  const layoutCanvas = el('canvas', 'inspector-base');
  layoutCanvas.setAttribute('role', 'img');
  layoutCanvas.setAttribute('aria-label', `LoT layout with ${fmt(tokens.length)} tokens on a ${cols}×${rows} patch grid`);
  const image = el('img', 'inspector-base');
  image.src = data.image;
  image.alt = 'Generated image: five rows of the letters L O T, from plain painted letters at the top to letters covered in jasmine flowers at the bottom';
  const left = makeStage('LoT layout', layoutCanvas);
  const right = makeStage('Generation', image);
  left.stage.tabIndex = 0;
  left.stage.setAttribute('aria-describedby', 'inspector-readout');

  // Readout: zoomed crops plus a description of the hovered token.
  const info = el('div', 'inspector-info');
  const zoomLayout = el('canvas', 'inspector-zoom');
  const zoomImage = el('canvas', 'inspector-zoom');
  [zoomLayout, zoomImage].forEach(c => c.setAttribute('aria-hidden', 'true'));
  const zooms = el('div', 'inspector-zooms');
  zooms.append(zoomLayout, zoomImage);
  const readout = el('div', 'inspector-readout');
  readout.id = 'inspector-readout';
  readout.setAttribute('aria-live', 'polite');
  const title = el('div', 'inspector-title');
  const detail = el('div', 'inspector-detail');
  readout.append(title, detail);
  info.append(zooms, readout);

  // Legend: hovering a size highlights every token of that size.
  const legend = el('div', 'inspector-legend');
  legend.setAttribute('role', 'group');
  legend.setAttribute('aria-label', 'Token sizes');
  const counts = Object.fromEntries(areas.map(a => [a, tokens.filter(([, , w, h]) => w * h === a).length]));
  let pinnedArea = null;
  const legendButtons = areas.map(area => {
    const button = el('button', 'inspector-chip');
    button.type = 'button';
    const swatch = el('span', 'inspector-swatch');
    swatch.style.background = palette[area];
    button.append(swatch, el('span', '', `${area} patch${area > 1 ? 'es' : ''}`), el('span', 'inspector-count', fmt(counts[area])));
    button.addEventListener('mouseenter', () => showArea(area));
    button.addEventListener('mouseleave', () => showArea(pinnedArea));
    button.addEventListener('focus', () => showArea(area));
    button.addEventListener('blur', () => showArea(pinnedArea));
    button.addEventListener('click', () => {
      pinnedArea = pinnedArea === area ? null : area;
      legendButtons.forEach((b, i) => b.setAttribute('aria-pressed', String(areas[i] === pinnedArea)));
      showArea(pinnedArea);
    });
    button.setAttribute('aria-pressed', 'false');
    legend.append(button);
    return button;
  });

  root.append(panels, info, legend);

  // --- Drawing -------------------------------------------------------------
  const fitCanvas = (canvas, stage) => {
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(stage.clientWidth * ratio));
    const height = Math.max(1, Math.round(width * rows / cols));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; return true; }
    return false;
  };
  const tokenRect = ([x, y, w, h], width, height) => {
    const px = v => Math.round(v / cols * width), py = v => Math.round(v / rows * height);
    return [px(x), py(y), px(x + w) - px(x), py(y + h) - py(y)];
  };
  function drawTokens(ctx, width, height, list = tokens, offset = [0, 0], scale = 1) {
    const edges = new Path2D();
    for (const token of list) {
      const [x, y, w, h] = token;
      const left = (x - offset[0]) * scale, top = (y - offset[1]) * scale;
      const rect = offset[0] || offset[1] || scale !== 1
        ? [Math.round(left), Math.round(top), Math.round(left + w * scale) - Math.round(left), Math.round(top + h * scale) - Math.round(top)]
        : tokenRect(token, width, height);
      ctx.fillStyle = palette[w * h];
      ctx.fillRect(...rect);
      edges.rect(rect[0] + .5, rect[1] + .5, rect[2], rect[3]);
    }
    ctx.strokeStyle = 'rgba(124, 137, 150, .75)';
    ctx.lineWidth = 1;
    ctx.stroke(edges);
  }
  function drawLayout() {
    fitCanvas(layoutCanvas, left.stage);
    const ctx = layoutCanvas.getContext('2d');
    ctx.clearRect(0, 0, layoutCanvas.width, layoutCanvas.height);
    drawTokens(ctx, layoutCanvas.width, layoutCanvas.height);
  }

  let hovered = -1;
  let area = null;
  function drawOverlays() {
    const group = hovered < 0 && area;
    // The pastel layout needs a stronger wash than the photo for the selection to stand out.
    const layoutDim = group ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.5)';
    for (const [overlay, stage, dim] of [[left.overlay, left.stage, layoutDim], [right.overlay, right.stage, 'rgba(15,20,30,.42)']]) {
      fitCanvas(overlay, stage);
      const {width, height} = overlay;
      const ctx = overlay.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      const selected = hovered >= 0 ? [tokens[hovered]] : area ? tokens.filter(([, , w, h]) => w * h === area) : [];
      if (!selected.length) continue;
      // Spotlight: dim everything, then cut the selected tokens back out.
      ctx.fillStyle = dim;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'destination-out';
      for (const token of selected) ctx.fillRect(...tokenRect(token, width, height));
      ctx.globalCompositeOperation = 'source-over';
      if (group && overlay === left.overlay) {
        // Outline every token of the chosen size on the layout.
        const outlines = new Path2D();
        for (const token of selected) {
          const [x, y, w, h] = tokenRect(token, width, height);
          outlines.rect(x + .5, y + .5, w - 1, h - 1);
        }
        ctx.lineWidth = Math.max(1, window.devicePixelRatio || 1);
        ctx.strokeStyle = '#1772d0';
        ctx.stroke(outlines);
      }
      if (hovered >= 0) {
        const ratio = window.devicePixelRatio || 1;
        const [x, y, w, h] = tokenRect(tokens[hovered], width, height);
        const pad = 2 * ratio;
        ctx.lineWidth = 2 * ratio;
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(x - pad - ratio, y - pad - ratio, w + 2 * (pad + ratio), h + 2 * (pad + ratio));
        ctx.strokeStyle = '#1772d0';
        ctx.strokeRect(x - pad, y - pad, w + 2 * pad, h + 2 * pad);
      }
    }
  }

  function drawZooms() {
    for (const canvas of [zoomLayout, zoomImage]) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    if (hovered < 0) { zooms.classList.remove('is-active'); return; }
    zooms.classList.add('is-active');
    const [x, y, w, h] = tokens[hovered];
    // A square window around the token with a little context, clamped to the grid.
    const span = Math.min(Math.max(8, Math.max(w, h) * 3), Math.min(cols, rows));
    const x0 = Math.max(0, Math.min(cols - span, Math.round(x + w / 2 - span / 2)));
    const y0 = Math.max(0, Math.min(rows - span, Math.round(y + h / 2 - span / 2)));
    // Render at the displayed size so 1-px grid lines stay crisp instead of being downsampled.
    const ratio = window.devicePixelRatio || 1;
    const size = Math.max(1, Math.round(zoomLayout.clientWidth * ratio));
    for (const canvas of [zoomLayout, zoomImage]) if (canvas.width !== size) canvas.width = canvas.height = size;
    const scale = size / span;
    const inView = tokens.filter(([tx, ty, tw, th]) => tx < x0 + span && tx + tw > x0 && ty < y0 + span && ty + th > y0);
    const lctx = zoomLayout.getContext('2d');
    drawTokens(lctx, zoomLayout.width, zoomLayout.height, inView, [x0, y0], scale);
    const ictx = zoomImage.getContext('2d');
    if (image.complete && image.naturalWidth) {
      const sx = image.naturalWidth / cols, sy = image.naturalHeight / rows;
      ictx.drawImage(image, x0 * sx, y0 * sy, span * sx, span * sy, 0, 0, zoomImage.width, zoomImage.height);
    }
    // Outline the token on the same snapped edges as its grid lines.
    const snap = v => Math.round(v * scale);
    const l = snap(x - x0), t = snap(y - y0), r = snap(x - x0 + w), b = snap(y - y0 + h);
    for (const ctx of [lctx, ictx]) {
      ctx.lineWidth = 2 * ratio;
      ctx.strokeStyle = '#1772d0';
      ctx.strokeRect(l + .5, t + .5, r - l, b - t);
    }
  }

  function describe() {
    if (hovered >= 0) {
      const [, , w, h] = tokens[hovered];
      const n = w * h;
      title.textContent = `${w}×${h} token · ${n} patch${n > 1 ? 'es' : ''}`;
      detail.textContent = n === 1
        ? `Finest level: one token for one ${PATCH_PX}×${PATCH_PX}-pixel patch, used where detail matters.`
        : `One token covers ${w * PATCH_PX}×${h * PATCH_PX} pixels, where a uniform layout would spend ${n} tokens.`;
    } else if (area) {
      title.textContent = `${fmt(counts[area])} tokens of ${area} patch${area > 1 ? 'es' : ''}`;
      detail.textContent = `Together they cover ${Math.round(counts[area] * area / dense * 100)}% of the image.`;
    } else {
      title.textContent = `${fmt(tokens.length)} LoT tokens vs ${fmt(dense)} uniform — ${(dense / tokens.length).toFixed(2)}× fewer`;
      detail.textContent = 'Hover over the layout or the image to inspect a token.';
    }
  }

  function update() { drawOverlays(); drawZooms(); describe(); }
  function showArea(next) { area = next; if (hovered < 0) update(); }
  function hover(index) {
    if (index === hovered) return;
    hovered = index;
    update();
  }

  // --- Interaction ---------------------------------------------------------
  const cellAt = (event, stage) => {
    const box = stage.getBoundingClientRect();
    const i = Math.floor((event.clientX - box.left) / box.width * cols);
    const j = Math.floor((event.clientY - box.top) / box.height * rows);
    return i >= 0 && j >= 0 && i < cols && j < rows ? [i, j] : null;
  };
  for (const {stage} of [left, right]) {
    const pick = event => { const cell = cellAt(event, stage); hover(cell ? owner[cell[1] * cols + cell[0]] : -1); };
    stage.addEventListener('pointermove', pick);
    stage.addEventListener('pointerdown', pick);
    // Touch: a tap selects a token and it stays until the next tap.
    stage.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') hover(-1); });
  }
  // Keyboard: arrow keys step to the neighbouring token.
  let cursor = [Math.floor(cols / 2), Math.floor(rows / 2)];
  left.stage.addEventListener('focus', () => hover(owner[cursor[1] * cols + cursor[0]]));
  left.stage.addEventListener('blur', () => hover(-1));
  left.stage.addEventListener('keydown', event => {
    const step = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]}[event.key];
    if (!step) return;
    event.preventDefault();
    const [x, y, w, h] = tokens[owner[cursor[1] * cols + cursor[0]]];
    const i = step[0] < 0 ? x - 1 : step[0] > 0 ? x + w : cursor[0];
    const j = step[1] < 0 ? y - 1 : step[1] > 0 ? y + h : cursor[1];
    if (i < 0 || j < 0 || i >= cols || j >= rows) return;
    cursor = [i, j];
    hover(owner[j * cols + i]);
  });

  image.addEventListener('load', () => { if (hovered >= 0) drawZooms(); });
  new ResizeObserver(() => { drawLayout(); drawOverlays(); }).observe(panels);
  describe();
})();
