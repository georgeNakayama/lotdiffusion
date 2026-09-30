/* Frozen approved image sets; cue + exact token boundaries above generation. */
async function mountImageResults(root, manifest='images.json', source=null){
 const names={sam3_mask:'Semantic mask',sam3_box:'Bounding box',vrs:'Texture variance',dof:'Depth of field'};
 const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
 try{
  const response=await fetch(manifest);if(!response.ok)throw Error('Image results unavailable');
  const data=await response.json();let index=0,renderVersion=0,selectedModel='9B';const cueMode='boundaries',overlays=new Map();
  // Bound decoded images and composites so long picking sessions do not grow memory indefinitely.
  const imageCache=new Map(),compositeCache=new Map();
  function cached(cache,key,build){
   if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value;}
   const pending=build();cache.set(key,pending);
   while(cache.size>8)cache.delete(cache.keys().next().value);
   pending.catch(()=>{if(cache.get(key)===pending)cache.delete(key)});
   return pending;
  }
  const load=src=>cached(imageCache,src,()=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Could not load '+src));im.src=src}));
  if(source){data.items=data.items.filter(r=>r.sources[source]);data.sources=[source];root.classList.add('image-single-source');}
  else {root.append(el('h2','','4.2 Same prompt across layout sources'));}
  const modelButtons=[];
  if(data.models&&data.items.every(item=>data.sources.every(s=>item.sources[s].media.generated_4b))){
   const modelBar=el('div','image-model-toggle');modelBar.setAttribute('role','group');modelBar.setAttribute('aria-label','Image generation model');
   for(const model of ['9B','4B']){const button=el('button','','LoT-Flux2 '+model);button.onclick=()=>{if(selectedModel!==model){selectedModel=model;render()}};modelButtons.push({button,model});modelBar.append(button)}
   root.append(modelBar);
  }
  const bar=el('div','image-navigation'),prev=el('button','','← Previous'),next=el('button','','Next →'),dots=el('div','image-dots');
  const panels=el('div','image-paper'),prompt=el('details','generation-prompt'),summary=el('summary','','Generation prompt'),copy=el('p');prompt.append(summary,copy);
  const zoom=el('dialog','image-zoom'),close=el('button','','Close'),large=el('img');close.onclick=()=>zoom.close();zoom.append(close,large);root.append(zoom);
  function panel(src,label){const b=el('button','image-panel'),im=el('img');im.src=src;im.alt=label;im.loading='lazy';b.setAttribute('aria-label','Enlarge '+label);b.append(im);b.onclick=()=>{large.src=im.src;large.alt=label;zoom.showModal()};return b}
  function composite(cue,grid,mode='boundaries',generation=false,uniformCue=false){
   // Match the video compositor: token-area gray fills, source tint at 89/255,
   // then opaque black boundaries. Black cue background contributes no tint.
   return cached(compositeCache,JSON.stringify([cue,grid,mode,generation,uniformCue]),()=>Promise.all([load(cue),load(grid)]).then(([source,tokens])=>{
    const canvas=document.createElement('canvas');canvas.width=tokens.naturalWidth;canvas.height=tokens.naturalHeight;
    const ctx=canvas.getContext('2d');ctx.drawImage(tokens,0,0);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.drawImage(source,0,0,canvas.width,canvas.height);const cuePixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    if(uniformCue)for(let i=0;i<cuePixels.length;i+=4){
     // Paired cues use white backgrounds; independent cues use black.
     // Only chromatic object pixels belong to the foreground in either format.
     const chroma=Math.max(cuePixels[i],cuePixels[i+1],cuePixels[i+2])-Math.min(cuePixels[i],cuePixels[i+1],cuePixels[i+2]);
     // Preserve each object's recorded palette color; normalize only the background.
     const color=chroma>10?[cuePixels[i],cuePixels[i+1],cuePixels[i+2]]:[0,0,0];
     for(let c=0;c<3;c++)cuePixels[i+c]=color[c];
    }
    const original=new Uint8ClampedArray(pixels.data),width=canvas.width,height=canvas.height;
    const gray=[248,220,190,155,118,78,38],colors=[[240,194,32],[146,177,38],[51,160,44],[53,143,114],[55,126,184],[104,102,174],[152,78,163]];
    const boundary=i=>original[i]===0&&original[i+1]===0&&original[i+2]===0;
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
     const i=(y*width+x)*4;
     if(boundary(i)){pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=mode==='original'?0:20;pixels.data[i+3]=255;continue;}
     const alpha=(cuePixels[i]||cuePixels[i+1]||cuePixels[i+2])?89/255:0;
     let halo=false;if(mode!=='original')for(let dy=-2;dy<=2&&!halo;dy++)for(let dx=-2;dx<=2;dx++)if(x+dx>=0&&x+dx<width&&y+dy>=0&&y+dy<height&&boundary(((y+dy)*width+x+dx)*4)){halo=true;break;}
     const k=mode==='tint'?gray.reduce((best,g,j)=>Math.abs(g-original[i])<Math.abs(gray[best]-original[i])?j:best,0):0;
     for(let c=0;c<3;c++){
      let value=generation?cuePixels[i+c]:original[i+c]*(1-alpha)+cuePixels[i+c]*alpha;
      if(mode==='tint')value=value*.76+colors[k][c]*.24;
      if(halo&&mode!=='original')value=value*.18+255*.82;
      pixels.data[i+c]=Math.round(value);
     }
     pixels.data[i+3]=255;
    }
    ctx.putImageData(pixels,0,0);
    return canvas.toDataURL('image/png');
   }));
  }
  function combinedPanel(cue,grid,label,mode='boundaries',generation=false,uniformCue=false){
   const b=panel(cue,label),version=renderVersion;
   composite(cue,grid,mode,generation,uniformCue).then(result=>{if(version===renderVersion)b.children[0].src=result}).catch(e=>{if(version===renderVersion)b.append(el('span','image-compression','Token overlay failed to load — refresh to retry.'));console.error(e)});
   return b;
  }
  async function render(){
   const version=++renderVersion;
   const pending=data.items[index];
   if(panels.children.length){
    await MediaPreload.prepare(data.sources.map(s=>{const m=pending.sources[s].media;return {cue:m.cue,grid:m.grid,generated:selectedModel==='4B'?m.generated_4b:m.generated}}),panels);
   }
   if(version!==renderVersion)return;
   MediaPreload.busy(panels,false);
   MediaPreload.enqueue([data.items[(index+1)%data.items.length],data.items[(index-1+data.items.length)%data.items.length]],root);
   modelButtons.forEach(({button,model})=>{button.classList.toggle('active',model===selectedModel);button.setAttribute('aria-pressed',String(model===selectedModel))});
   const item=data.items[index];panels.replaceChildren();copy.textContent=item.prompt;
   [...dots.children].forEach((b,j)=>{b.classList.toggle('active',j===index);b.setAttribute('aria-pressed',String(j===index))});
   if(source&&dots.scrollTo&&dots.clientWidth){const left=index*24,right=left+24;if(left<dots.scrollLeft||right>dots.scrollLeft+dots.clientWidth)dots.scrollTo({left:Math.max(0,left<dots.scrollLeft?left:right-dots.clientWidth),behavior:'auto'})}
   if(source){panels.append(el('div','image-col-title','Level of Tokens'),el('div','image-col-title',modelButtons.length?'Generation · LoT-Flux2 '+selectedModel:'Generation'));}
   else {panels.append(el('div'));data.sources.forEach(s=>panels.append(el('div','image-col-title',names[s])));}
   for(const [key,label] of [['cue','Level of Tokens'],['generated','Generation']]){
    if(!source)panels.append(el('div','image-row-title',key==='generated'&&modelButtons.length?label+' · LoT-Flux2 '+selectedModel:label));
    for(const s of data.sources){const original=item.sources[s],v=selectedModel==='4B'?{...original,media:{...original.media,generated:original.media.generated_4b}}:original,cell=el('div','image-cell');
     cell.append(key==='cue'?combinedPanel(v.media.cue,v.media.grid,names[s]+' — source cue with tokenization',cueMode,false,['sam3_mask','sam3_box'].includes(s)):panel(v.media.generated,names[s]+' — '+label));
     if(key==='cue'&&s==='sam3_box'&&v.boxes_normalized){
      const panel=cell.firstElementChild;panel.style.position='relative';
      const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
      svg.setAttribute('viewBox','0 0 1000 1000');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
      svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
      const objectPalette=['rgb(55,126,184)','rgb(240,194,32)','rgb(51,160,44)','rgb(152,78,163)','rgb(230,85,70)'];
      for(const [j,[x0,y0,x1,y1]] of v.boxes_normalized.entries())for(const [color,width] of [['white',4],[objectPalette[j%objectPalette.length],2]]){
       const box=document.createElementNS(ns,'rect');
       for(const [k,value] of Object.entries({x:x0*1000,y:y0*1000,width:(x1-x0)*1000,height:(y1-y0)*1000,fill:'none',stroke:color,'stroke-width':width,'vector-effect':'non-scaling-stroke'}))box.setAttribute(k,value);
       svg.append(box);
      }
      panel.append(svg);
      const cueImage=panel.querySelector('img');
      const fit=()=>{
       if(!cueImage.naturalWidth)return;
       const scale=Math.min(cueImage.clientWidth/cueImage.naturalWidth,cueImage.clientHeight/cueImage.naturalHeight);
       const w=cueImage.naturalWidth*scale,h=cueImage.naturalHeight*scale;
       svg.style.inset='auto';svg.style.width=w+'px';svg.style.height=h+'px';
       svg.style.left=(cueImage.offsetLeft+(cueImage.clientWidth-w)/2)+'px';svg.style.top=(cueImage.offsetTop+(cueImage.clientHeight-h)/2)+'px';
      };
      cueImage.addEventListener('load',fit);new ResizeObserver(fit).observe(panel);fit();
     }
     if(key==='cue'&&s==='dof'&&v.cue_legend?.cmap==='turbo'){
      const legend=el('div','image-depth-legend');legend.append(el('span','','Far'),el('span','image-depth-gradient'),el('span','','Near'));cell.append(legend);
     }
     if(key==='cue'&&s==='vrs'&&v.cue_kind!=='exact_tokenization'){
      const legend=el('div','image-depth-legend');legend.append(el('span','','Low'),el('span','image-vrs-gradient'),el('span','','High'));cell.append(legend);
     }
     if(key==='generated'){cell.append(el('div','image-compression',v.compression.toFixed(2)+'× compression · '+v.tokens.toLocaleString()+' tokens'));
      const toggle=el('button','image-overlay'),error=el('span','image-compression');error.hidden=true;let request=0,shown=v.media.generated;
      async function updateGeneration(){
       const ticket=++request,mode=overlays.get(s)||'off',preview=cell.children[0].children[0];
       toggle.textContent='Token overlay: '+(mode==='off'?'off':'token-size tint');toggle.setAttribute('aria-pressed',String(mode!=='off'));
       error.hidden=true;
       if(mode==='off'){if(shown!==v.media.generated){preview.src=v.media.generated;shown=v.media.generated}return;}
       try{
        const result=await composite(v.media.generated,v.media.grid,'tint',true);
        if(ticket===request&&version===renderVersion&&shown!==result){preview.src=result;shown=result}
       }catch(e){if(ticket===request&&version===renderVersion){overlays.set(s,'off');toggle.textContent='Token overlay: off';toggle.setAttribute('aria-pressed','false');error.textContent='Overlay failed to load. Click to retry.';error.hidden=false;}console.error(e)}
      }
      toggle.onclick=()=>{overlays.set(s,(overlays.get(s)||'off')==='off'?'tint':'off');return updateGeneration()};cell.append(toggle,error);updateGeneration()}
     panels.append(cell);
    }
   }
  }
  function move(delta){index=(index+delta+data.items.length)%data.items.length;render()}
  data.items.forEach((r,j)=>{const b=el('button');b.setAttribute('aria-label','Show prompt '+(j+1));b.onclick=()=>{index=j;render()};dots.append(b)});
  prev.onclick=()=>move(-1);next.onclick=()=>move(1);
  dots.setAttribute('aria-label','Image prompt carousel');bar.append(prev,dots,next);
  if(source){const card=el('article','image-source-card');prompt.className='generation-prompt';card.append(panels,prompt);root.append(bar,card)}else root.append(bar,panels,prompt);
  root.tabIndex=0;root.addEventListener('keydown',e=>{if(['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName)||zoom.open)return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}});
  render();
 }catch(e){root.append(el('p','',e.message))}
}
mountImageResults(document.getElementById('image-results'));
const sourceSection=document.createElement('section');sourceSection.id='image-source-results';
const imageHeading=document.createElement('h1');imageHeading.className='section-title';imageHeading.textContent='4. Layout Adaptive Image Generation — Qualitative Results';sourceSection.append(imageHeading);
const imageSummary=document.createElement('p');imageSummary.className='section-summary';imageSummary.textContent="We derive Level-of-Token layouts from different source cues and generate images with the resulting token allocations. Individual-source examples, same-prompt comparisons, and custom layouts illustrate the range of spatial detail control beyond the examples in the paper.";sourceSection.append(imageSummary);
const sourceHeading=document.createElement('h2');sourceHeading.id='image-individual-layouts';sourceHeading.textContent='4.1 Individual layout sources';sourceSection.append(sourceHeading);
document.getElementById('image-results').before(sourceSection);
const sourceGrid=document.createElement('div');sourceGrid.className='image-source-grid';sourceSection.append(sourceGrid);
for(const [source,label] of [['dof','Depth of field'],['sam3_mask','Semantic mask'],['sam3_box','Bounding box'],['vrs','Texture variance (Variable Rate Shading)']]){
 const group=document.createElement('section');group.id='image-source-'+source;group.setAttribute('aria-label',label);
 const heading=document.createElement('h3');heading.textContent=label;group.append(heading);sourceGrid.append(group);
 mountImageResults(group,'image_sources.json',source);
}
