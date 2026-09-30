// Rebuild with Node.js and sharp: NODE_PATH=/path/to/node_modules node scripts/animate-method.cjs
const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const stages = [
  { title: 'A spatially adaptive layout', text: 'Use finer tokens where detail matters and coarser tokens elsewhere.', box: [6, 94, 235, 238], color: '#d78c25', route: [[242, 212], [292, 212]] },
  { title: 'Project each patch', text: 'An extent-specific basis maps each patch to a fixed-dimensional token.', box: [294, 149, 186, 161], color: '#7d78ab', route: [[480, 212], [522, 212]] },
  { title: 'Process a shorter token sequence', text: 'Each spatial region contributes one token, regardless of its extent.', box: [510, 91, 39, 240], color: '#458ac9', route: [[549, 212], [595, 212]] },
  { title: 'Run the diffusion transformer', text: 'Token shape, timestep, and text condition the reduced sequence.', box: [592, 124, 161, 176], color: '#458ac9', route: [[755, 212], [809, 212]] },
  { title: 'Expand with extent-dependent heads', text: 'Each head predicts an asymmetric velocity for every position in its patch.', box: [878, 90, 166, 241], color: '#63a361', route: [[1043, 212], [1095, 212]] },
  { title: 'Assemble the dense prediction', text: 'Patch predictions cover the full-resolution latent grid.', box: [1090, 93, 234, 237], color: '#d78c25', route: [[1323, 212], [1373, 212]] },
  { title: 'Recover full-resolution velocity', text: 'Convert the asymmetric prediction into the dense flow used for denoising.', box: [1368, 81, 445, 248], color: '#63a361', route: null },
  { title: 'Fewer transformer tokens. Full-resolution flow.', text: 'Repeat this pipeline at each denoising step with the specified LoT layout.', box: null, color: '#458ac9', route: null }
];
// Disjoint reveal regions, in original diagram coordinates. Conditioning appears
// with the transformer; completed components remain visible in subsequent steps.
const regions = [
  [[0,95,242,325]],
  [[242,152,238,268]],
  [[480,95,75,325],[555,350,40,70]],
  [[0,0,790,95],[242,95,238,57],[555,95,235,255],[595,350,195,70]],
  [[790,0,257,420]],
  [[1047,0,278,420]],
  [[1325,0,495,420]]
];
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
async function main() {
  const diagram = fs.readFileSync(path.join(root, 'assets/method.png')).toString('base64');
  const frames = [];
  const width = 1395, height = 435;
  const perStage = 16;
  for(let frame=0; frame<stages.length*perStage; frame++) {
    const stageIndex = Math.floor(frame/perStage), phase=(frame%perStage)/perStage;
    const stage=stages[stageIndex];
    let markup='<rect width="1860" height="580" fill="white"/>';
    const diagramImage = `<image x="20" y="20" width="1820" height="420" href="data:image/png;base64,${diagram}"/>`;
    if (stageIndex === stages.length-1) {
      markup += diagramImage;
    } else {
      for (let i=0; i<=stageIndex; i++) {
        const rects = regions[i].map(([x,y,w,h])=>`<rect x="${x+20}" y="${y+20}" width="${w}" height="${h}"/>`).join('');
        const opacity = i === stageIndex ? Math.min(1, (frame%perStage+1)/4) : 1;
        markup += `<defs><clipPath id="stage-${i}">${rects}</clipPath></defs><g clip-path="url(#stage-${i})" opacity="${opacity}">${diagramImage}</g>`;
      }
    }
    if(stageIndex > 0 && stageIndex < regions.length && stages[stageIndex-1].route) {
      const [a,b]=stages[stageIndex-1].route;
      const t=(phase*2)%1;
      markup += `<circle cx="${20+a[0]+(b[0]-a[0])*t}" cy="${20+a[1]+(b[1]-a[1])*t}" r="7" fill="${stage.color}" stroke="white" stroke-width="2"/>`;
    }
    markup += `<line x1="36" y1="453" x2="1824" y2="453" stroke="#e5e7eb" stroke-width="1"/>`;
    for(let i=0;i<stages.length;i++) {
      const color=i===stageIndex?stage.color:'#dfe3e7';
      markup += `<rect x="${766+i*42}" y="${i===stageIndex?465:468}" width="28" height="${i===stageIndex?8:3}" rx="2" fill="${color}"/>`;
    }
    markup += `<text x="930" y="510" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" font-weight="600" fill="#333">${escape(stage.title)}</text>`;
    markup += `<text x="930" y="547" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" fill="#666">${escape(stage.text)}</text>`;
    const overlay=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1860" height="580">${markup}</svg>`);
    const png=await sharp(overlay).resize(width,height).png().toBuffer();
    if (process.env.METHOD_PREVIEW_DIR && frame%perStage===8) {
      fs.mkdirSync(process.env.METHOD_PREVIEW_DIR,{recursive:true});
      await sharp(png).toFile(path.join(process.env.METHOD_PREVIEW_DIR,`stage-${stageIndex}.png`));
    }
    // Frames are encoded directly; no intermediate assets are needed.
    frames.push(await sharp(png).ensureAlpha().raw().toBuffer());
  }
  await sharp(Buffer.concat(frames),{raw:{width,height:height*frames.length,channels:4,pageHeight:height}})
    .gif({loop:0,delay:Array(frames.length).fill(100),colours:128,dither:0,effort:7})
    .toFile(path.join(root,'assets/method-animated.gif'));
  const meta=await sharp(path.join(root,'assets/method-animated.gif'),{animated:true}).metadata();
  console.log(JSON.stringify({width:meta.width,height:meta.pageHeight,frames:meta.pages,loop:meta.loop,bytes:fs.statSync(path.join(root,'assets/method-animated.gif')).size}));
}
main().catch(e=>{console.error(e);process.exit(1)});
