(async()=>{
 const root=document.getElementById('bbox-conditioning');
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
 try{
  const response=await fetch('bbox_examples.json');if(!response.ok)throw Error('Bounding-box examples unavailable.');const data=await response.json();let selected=0,mode='generated';
  root.append(el('h2','','4.3 Layout-Based Generation from Ideogram-Style Bounding Boxes'));
  const tabs=el('div','bbox-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Bounding-box example');root.append(tabs);
  const panels=el('div','bbox-panels');root.append(panels);
  const dialog=el('dialog','bbox-zoom'),close=el('button','','Close'),zoomImage=el('img');close.type='button';close.onclick=()=>dialog.close();dialog.append(close,zoomImage);root.append(dialog);
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  const controls=el('div','bbox-controls'),viewGroup=el('div','bbox-view-buttons');viewGroup.setAttribute('role','group');viewGroup.setAttribute('aria-label','Generation view');
  const viewButtons=[];
  for(const [value,title] of [['generated','Clean image'],['box_overlay','Labeled boxes'],['token_overlay','Token overlay']]){const button=el('button','',title);button.type='button';button.dataset.view=value;button.onclick=()=>{mode=value;render()};viewButtons.push(button);viewGroup.append(button)}
  const stats=el('div','bbox-stats');stats.setAttribute('aria-live','polite');
  let timings={};fetch('bbox_timings.json?v=1').then(r=>r.ok?r.json():{}).then(d=>{timings=d;render()}).catch(()=>{});
  controls.append(stats,el('span','','Generation view:'),viewGroup);root.append(controls);
  const details=el('details','bbox-details generation-prompt'),summary=el('summary','','Generation prompt'),prompt=el('p');details.append(summary,prompt);root.append(details);
  const buttons=data.examples.map((example,i)=>{const b=el('button','',example.title);b.type='button';b.onclick=()=>{selected=i;render()};tabs.append(b);return b});
  function render(){
   const e=data.examples[selected];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
   viewButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===mode)));
   panels.replaceChildren();
   for(const [key,title] of [['boxes','Ideogram-style bounding boxes'],['layout','Level-of-Token layout'],[mode,mode==='generated'?'Generated image':mode==='box_overlay'?'Generation + labeled boxes':'Generation + token layout']]){
    const figure=el('figure'),heading=el('h3','',title),button=el('button','bbox-image'),img=el('img');img.src=e.media[key];img.alt=`${e.title} — ${title}`;if(key==='layout')GridLines.image(img,e.media.layout.replace(/\.webp$/,'.json'));img.width=data.width;img.height=data.height;button.type='button';button.setAttribute('aria-label','Enlarge '+img.alt);button.append(img);button.onclick=()=>{zoomImage.src=img.src;zoomImage.alt=img.alt;dialog.showModal()};figure.append(heading,button);panels.append(figure)
   }
   const denseTokens=(data.width/16)*(data.height/16),t=timings[e.id];stats.replaceChildren();
   if(t){const speed=el('div','bbox-stat');speed.title=t.timing+' · '+t.gpu;speed.append(el('strong','',`${(t.dense/t.ours).toFixed(2)}× speedup`));stats.append(speed)}
   const compression=el('div','bbox-stat');compression.append(el('strong','',`${(denseTokens/e.tokens).toFixed(2)}× token compression`),el('span','',`${e.tokens.toLocaleString()} / ${denseTokens.toLocaleString()} tokens (ours / full resolution)`));stats.append(compression);
   prompt.textContent=e.prompt;
  }
  render();
 }catch(error){root.append(el('p','',error.message))}
})();
