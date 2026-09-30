/* Shared two-tone boundaries. Raster enhancement is restricted to grid assets. */
window.GridLines=(()=>{
 const cache=new Map();
 function stroke(ctx,path){ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=4;path?ctx.stroke(path):ctx.stroke();ctx.strokeStyle='rgba(15,15,15,.95)';ctx.lineWidth=1.3;path?ctx.stroke(path):ctx.stroke()}
 function raster(source,transparent=false){
  const w=source.naturalWidth||source.videoWidth,h=source.naturalHeight||source.videoHeight;
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(source,0,0);
  const p=x.getImageData(0,0,w,h),mask=new Uint8Array(w*h),halo=new Uint8Array(w*h);
  for(let i=0;i<mask.length;i++){const j=i*4;mask[i]=p.data[j]<24&&p.data[j+1]<24&&p.data[j+2]<24?1:0}
  // Only thin dark lines: do not outline filled black regions.
  for(let y=0;y<h;y++)for(let a=0;a<w;a++){const i=y*w+a;if(!mask[i])continue;const thin=(a>2&&a<w-3&&!mask[i-3]&&!mask[i+3])||(y>2&&y<h-3&&!mask[i-3*w]&&!mask[i+3*w]);if(thin)for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const xx=a+dx,yy=y+dy;if(xx>=0&&xx<w&&yy>=0&&yy<h)halo[yy*w+xx]=1}}
  for(let i=0;i<mask.length;i++){if(halo[i]){for(let k=0;k<3;k++)p.data[i*4+k]=mask[i]?15:transparent?255:Math.round(p.data[i*4+k]*.1+255*.9);if(transparent)p.data[i*4+3]=mask[i]?242:230}else if(transparent)p.data[i*4+3]=0}
  x.putImageData(p,0,0);return c;
 }
 function image(img,geometryURL){const src=img.src;if(!src||src.startsWith('data:'))return;
  if(geometryURL){
   const key=src+'|'+geometryURL;
   if(!cache.has(key))cache.set(key,Promise.all([
    new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src}),
    fetch(geometryURL).then(r=>{if(!r.ok)throw Error('Grid geometry unavailable');return r.json()})
   ]).then(([im,g])=>{
    const c=document.createElement('canvas');c.width=g.width;c.height=g.height;
    const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0,c.width,c.height);
    const pixels=x.getImageData(0,0,c.width,c.height).data,s=g.vae_stride,path=new Path2D();
    // Preserve each token's fill, replacing the old colored boundaries completely.
    for(const [y0,y1,x0,x1] of g.leaves){
     const cx=Math.min(c.width-1,Math.floor((x0+x1)*s/2)),cy=Math.min(c.height-1,Math.floor((y0+y1)*s/2)),i=(cy*c.width+cx)*4;
     x.fillStyle=`rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`;
     x.fillRect(x0*s,y0*s,(x1-x0)*s,(y1-y0)*s);path.rect(x0*s,y0*s,(x1-x0)*s,(y1-y0)*s);
    }
    stroke(x,path);return c.toDataURL('image/png');
   }));
   cache.get(key).then(url=>{if(img.src===src){img.src=url;img.dataset.exactGrid='true'}}).catch(console.error);return;
  }
  if(!cache.has(src))cache.set(src,new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{try{resolve(raster(im).toDataURL('image/png'))}catch(e){reject(e)}};im.onerror=reject;im.src=src}));
  cache.get(src).then(url=>{if(img.src===src)img.src=url}).catch(console.error);
 }
 function video(v,url){
  const wrap=document.createElement('div');wrap.style.position='relative';v.before(wrap);wrap.append(v);
  const canvas=document.createElement('canvas');canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';wrap.append(canvas);
  const grid=document.createElement('video');grid.muted=true;grid.playsInline=true;grid.preload='auto';grid.src=url;let visible=false,last=-1;
  const observer=new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(!visible)grid.pause()});observer.observe(wrap);
  function draw(){if(!v.isConnected){observer.disconnect();grid.pause();grid.removeAttribute('src');grid.load();return}if(!visible||document.hidden||grid.readyState<2)return;const frame=Math.floor(grid.currentTime*15);if(frame===last)return;last=frame;const result=raster(grid,true);canvas.width=result.width;canvas.height=result.height;canvas.getContext('2d').drawImage(result,0,0)}
  function sync(){if(!v.isConnected){draw();return}if(!visible||document.hidden)return;if(grid.readyState>=1&&Math.abs(grid.currentTime-v.currentTime)>.035&&!grid.seeking)grid.currentTime=Math.min(v.currentTime,grid.duration);else draw()}
  for(const event of ['timeupdate','seeked','loadeddata'])v.addEventListener(event,sync);
  grid.addEventListener('seeked',draw);grid.addEventListener('loadeddata',sync);
  return ()=>{canvas.remove();if(wrap.parentNode){wrap.before(v);wrap.remove()}observer.disconnect();grid.pause();grid.removeAttribute('src');grid.load();for(const event of ['timeupdate','seeked','loadeddata'])v.removeEventListener(event,sync)};
 }
 return {stroke,image,raster,video};
})();
