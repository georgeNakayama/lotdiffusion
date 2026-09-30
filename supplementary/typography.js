(async()=>{
 const root=document.getElementById('typography');
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
 const button=(text,action)=>{const b=el('button','',text);b.type='button';b.onclick=action;return b};
 try{
  const response=await fetch('typography.json');if(!response.ok)throw Error('Typography gallery unavailable.');const data=await response.json();
  let family=data.families[0],compare=false,overlay=false,active=null;
  const positions=Object.fromEntries(data.families.map(f=>[f,0]));
  root.append(el('h2','','4.4 Typography with Spatial Token Control'));
  const toolbar=el('div','type-toolbar'),filters=el('div','type-filters');filters.setAttribute('role','group');filters.setAttribute('aria-label','Typography family');
  const toggles=[];function toggle(){const b=button('Compare with dense FLUX.2',()=>{compare=!compare;toggles.forEach(t=>t.setAttribute('aria-pressed',String(compare)));render();if(active)renderModal()});b.setAttribute('aria-pressed',String(compare));toggles.push(b);return b}
  const overlayToggles=[];function overlayToggle(){const b=button('Grid overlay',()=>{overlay=!overlay;overlayToggles.forEach(t=>t.setAttribute('aria-pressed',String(overlay)));render();if(active)renderModal()});b.setAttribute('aria-pressed',String(overlay));overlayToggles.push(b);return b}
  const filterButtons=data.families.map(f=>{const b=button(f,()=>{family=f;render()});b.setAttribute('aria-pressed',String(f===family));filters.append(b);return b});
  const options=el('div','type-options');options.append(overlayToggle(),toggle());toolbar.append(filters);root.append(toolbar);
  const cards=el('div','type-cards');cards.setAttribute('aria-roledescription','carousel');cards.setAttribute('aria-label','Typography samples');const navigation=makeNavigation();root.append(navigation.node,cards);
  const modal=el('dialog','type-modal');modal.setAttribute('aria-labelledby','type-modal-title');const modalHead=el('div','type-modal-head'),modalTitle=el('h3');modalTitle.id='type-modal-title';modalHead.append(modalTitle,button('Close',()=>modal.close()));const modalPanels=el('div','type-panels');const modalOptions=el('div','type-options');modalOptions.append(overlayToggle(),toggle());const modalNavigation=makeNavigation(),modalStats=el('div','type-stats');modal.append(modalHead,modalOptions,modalStats,modalNavigation.node,modalPanels);root.append(modal);modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});modal.addEventListener('close',()=>{active=null});
  function makeNavigation(){const node=el('div','type-carousel-controls'),dots=el('div','type-dots');node.setAttribute('role','group');node.setAttribute('aria-label','Choose a sample');const prev=button('← Previous',()=>move(-1)),next=button('Next →',()=>move(1));node.append(prev,dots,next);return {node,dots}}
  function move(delta){const rows=data.samples.filter(e=>e.family===family);selectSample((positions[family]+delta+rows.length)%rows.length)}
  function selectSample(index){positions[family]=index;render();if(modal.open){active=data.samples.filter(e=>e.family===family)[index];renderModal()}}
  function updateNavigation(nav,rows){nav.dots.replaceChildren();rows.forEach((e,i)=>{const dot=button(String(i+1),()=>selectSample(i));dot.setAttribute('aria-label',`Sample ${i+1}: ${e.title}`);dot.setAttribute('aria-pressed',String(i===positions[family]));dot.title=e.title;nav.dots.append(dot)})}
  root.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key)||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,textarea,select'))return;event.preventDefault();event.stopPropagation();move(event.key==='ArrowRight'?1:-1)});
  function panel(e,key,label,large){const fig=el('figure','type-panel');fig.append(el('figcaption','',label));const img=el('img');img.alt=e.title+' — '+label;img.width=e.width;img.height=e.height;img.decoding='async';img.loading=large?'eager':'lazy';img.src=key==='grid'?e.grid.full.replace(/\.png$/,'-two-tone.png'):e[key][large?'full':'preview'];if(large){fig.append(img);const a=el('a','','Open full-size image');a.href=key==='grid'?img.src:e[key].full;a.target='_blank';a.rel='noopener';fig.append(a)}else{const b=button('',()=>{active=e;renderModal();modal.showModal()});b.className='type-image';b.setAttribute('aria-label','Enlarge '+img.alt);b.append(img);fig.append(b)}return fig}
  function panels(e,node,large){node.classList.toggle('type-compare',compare);node.replaceChildren(panel(e,'grid','Token layout',large),panel(e,overlay?'overlay':'ours',overlay?'Ours + grid':'Ours',large));if(compare)node.append(panel(e,'dense','Dense · no layout',large))}
  function statistics(e,node){node.replaceChildren();const speed=el('div','type-stat'),compression=el('div','type-stat');speed.append(el('strong','',`${e.seconds.speedup.toFixed(2)}× speedup`));compression.append(el('strong','',`${(e.dense_tokens/e.tokens).toFixed(2)}× token compression`),el('span','',`${e.tokens.toLocaleString()} / ${e.dense_tokens.toLocaleString()} tokens (ours / full resolution)`));node.append(speed,compression)}
  const modalActions=el('div','type-action-row');modalOptions.before(modalActions);modalActions.append(modalOptions,modalStats);
  function renderModal(){statistics(active,modalStats);modalTitle.textContent=active.title;panels(active,modalPanels,true)}
  function render(){
   filterButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(data.families[i]===family)));
   const rows=data.samples.filter(e=>e.family===family);
   updateNavigation(navigation,rows);updateNavigation(modalNavigation,rows);
   cards.replaceChildren();for(const e of [rows[positions[family]]]){const card=el('article','type-card');card.dataset.sample=e.number;const head=el('div','type-card-head');head.append(el('h3','',e.title));const images=el('div','type-panels');panels(e,images,false);const stats=el('div','type-stats');statistics(e,stats);const actions=el('div','type-action-row');actions.append(options,stats);card.append(head,actions,images);const details=el('details','generation-prompt');details.append(el('summary','','Generation prompt'),el('p','',e.prompt));card.append(details);cards.append(card)}
  }
  render();
 }catch(error){const p=el('p','',error.message);p.setAttribute('role','alert');root.append(p)}
})();
