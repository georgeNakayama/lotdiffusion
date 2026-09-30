/* Nearby-only warming. Never wait for an entire video to download. */
(() => {
 if(window.parent!==window&&window.parent.MediaPreload){window.MediaPreload=window.parent.MediaPreload;return;}
 const pending=new WeakMap(),badges=new WeakMap(),warmed=new Set();let background=[],running=false;
 const constrained=()=>navigator.connection?.saveData||/(^|-)2g$/.test(navigator.connection?.effectiveType||'');
 function urls(value,out=new Set()){
  if(typeof value==='string'&&/^assets\/[^\s]+\.(mp4|webp|png|jpg|jpeg)$/i.test(value))out.add(new URL(value,document.baseURI).href);
  else if(Array.isArray(value))value.forEach(v=>urls(v,out));
  else if(value&&typeof value==='object')Object.values(value).forEach(v=>urls(v,out));return out;
 }
 function busy(owner,show){
  if(!owner)return;owner.setAttribute('aria-busy',String(show));let badge=badges.get(owner);
  if(show&&(!badge||!badge.isConnected)){
   badge=owner.ownerDocument.createElement('div');badge.textContent='Loading…';badge.setAttribute('role','status');
   badge.style.cssText='position:absolute;top:8px;right:8px;z-index:5;padding:5px 10px;border-radius:6px;background:#fffffff2;color:#205e61;font:14px system-ui;pointer-events:none';
   if(owner.ownerDocument.defaultView.getComputedStyle(owner).position==='static')owner.style.position='relative';
   owner.append(badge);badges.set(owner,badge);
  }
  if(badge)badge.hidden=!show;
 }
 function load(url,signal,timeout=1800){return new Promise(resolve=>{
  const video=url.endsWith('.mp4'),node=document.createElement(video?'video':'img');let finished=false;
  const done=()=>{if(finished)return;finished=true;clearTimeout(timer);signal?.removeEventListener('abort',done);node.onload=node.onerror=node.onloadeddata=null;if(video){node.removeAttribute('src');node.load();}else if(signal?.aborted)node.removeAttribute('src');resolve();};
  const timer=setTimeout(done,timeout);if(signal?.aborted){done();return;}
  signal?.addEventListener('abort',done,{once:true});node.onerror=done;
  if(video){node.muted=true;node.preload='auto';node.onloadeddata=done;}else node.onload=()=>node.decode().catch(()=>{}).then(done);
  node.src=url;
 });}
 async function prepare(value,owner){
  pending.get(owner)?.abort();const controller=new AbortController();if(owner){pending.set(owner,controller);busy(owner,true);}
  await new Promise(resolve=>setTimeout(resolve,0));
  await Promise.all([...urls(value)].map(url=>load(url,controller.signal)));
 }
 async function pump(){
  if(running||document.hidden||constrained())return;running=true;
  while(background.length&&!document.hidden&&!constrained()){
   const url=background.shift();if(warmed.has(url))continue;await load(url,undefined,1200);warmed.add(url);
   if(warmed.size>100)warmed.delete(warmed.values().next().value);
   await new Promise(resolve=>setTimeout(resolve,150));
  }running=false;
 }
 window.MediaPreload={prepare,busy,enqueue(value,owner){
  if(owner){const r=owner.getBoundingClientRect(),h=owner.ownerDocument.defaultView.innerHeight;if(r.bottom<0||r.top>h)return;}
  background=[...urls(value)].filter(url=>!warmed.has(url)).slice(0,12);setTimeout(pump,400);
 }};
 document.addEventListener('visibilitychange',pump);
})();
