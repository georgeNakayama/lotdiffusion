(()=>{
 const menu=document.getElementById('contents-menu'),nav=document.getElementById('results-index');
 const desktop=matchMedia('(min-width:1200px)'),links=[...nav.querySelectorAll('a[href^="#"]')];
 let pending=false,preferred=location.hash;
 function configure(){menu.open=desktop.matches;schedule()}
 desktop.addEventListener('change',configure);configure();
 menu.querySelector('summary').addEventListener('click',e=>{if(desktop.matches)e.preventDefault()});
 function highlight(link){for(const a of links){if(a===link)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')}}
 function update(){
  pending=false;
  const targets=links.map(a=>({a,el:document.getElementById(a.hash.slice(1))})).filter(x=>x.el);
  const marker=desktop.matches?110:95;
  const passed=targets.filter(x=>x.el.getBoundingClientRect().top<=marker);
  if(!passed.length){highlight(targets[0]?.a);return}
  const nearest=Math.max(...passed.map(x=>x.el.getBoundingClientRect().top));
  const tied=passed.filter(x=>Math.abs(x.el.getBoundingClientRect().top-nearest)<4);
  highlight((tied.find(x=>x.a.hash===preferred)||tied[0]).a);
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
 for(const a of links)a.addEventListener('click',e=>{
  const target=document.getElementById(a.hash.slice(1));if(!target)return;
  e.preventDefault();preferred=a.hash;if(!desktop.matches)menu.open=false;
  history.replaceState(null,'',a.hash);
  const margin=desktop.matches?24:85;
  window.scrollTo({top:window.scrollY+target.getBoundingClientRect().top-margin,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  highlight(a);
 });
 document.querySelector('.index-return')?.addEventListener('click',()=>{menu.open=true;menu.querySelector('summary').focus()});
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 document.addEventListener('pointerover',e=>{
  const group=e.target.closest('.video-source-group');
  if(group){preferred='#'+group.id;schedule()}
 });
})();
