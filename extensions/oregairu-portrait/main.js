const { Plugin } = window[Symbol.for('typora-plugin-core@v2')];
export default class OregairuPortrait extends Plugin {
 onload() {
  const style = document.createElement('style');
  style.textContent = `body.oregairu-portrait-active::after{display:none!important}body.oregairu-portrait-active #write{position:relative;z-index:4;background:transparent}#oregairu-live-portrait{position:fixed;object-fit:contain;pointer-events:none;z-index:3;opacity:.7;mask-mode:luminance;-webkit-mask-source-type:luminance}body.megamenu-opened #oregairu-live-portrait{display:none!important}@media print{#oregairu-live-portrait{display:none!important}}`;
  document.head.append(style);
  const img = document.createElement('img'); img.id='oregairu-live-portrait'; img.alt=''; img.setAttribute('aria-hidden','true');
  let timer=0, stopped=false, lastRole='', observer=null, observed=null;
  const update=()=>{
   timer=0; if(stopped)return;
   const write=document.getElementById('write'), content=document.querySelector('content');
   const role=getComputedStyle(document.documentElement).getPropertyValue('--oregairu-live-role').trim();
   const active=!!write&&!!content&&['yukino','yui','hachiman'].includes(role);
   if(document.body.classList.contains('oregairu-portrait-active')!==active)document.body.classList.toggle('oregairu-portrait-active',active);
   if(!active){img.remove();return;}
   if(observed!==write){observer?.disconnect();observed=write;observer=new MutationObserver(schedule);observer.observe(write,{childList:true,subtree:true,characterData:true});}
   const empty=!write.textContent.trim()&&!write.querySelector('img,table,pre,.md-math-block,hr');
   if(empty||document.body.classList.contains('megamenu-opened')){img.remove();return;}
   if(img.parentNode!==content)content.append(img);
   if(lastRole!==role){lastRole=role;img.src=new URL('./'+role+'.png',import.meta.url).href;}
   const area=content.getBoundingClientRect(),w=Math.min(210,Math.max(125,area.width*.19)),h=Math.min(340,area.height*.43);
   img.style.right=Math.max(0,innerWidth-area.right+20)+'px';img.style.bottom=Math.max(0,innerHeight-area.bottom+20)+'px';img.style.width=w+'px';img.style.height=h+'px';
   const box=img.getBoundingClientRect(),rects=[];const walker=document.createTreeWalker(write,NodeFilter.SHOW_TEXT);
   while(walker.nextNode()){
    const node=walker.currentNode;if(!node.textContent.trim()||node.parentElement.closest('script,style,.md-meta'))continue;
    const parent=node.parentElement.getBoundingClientRect();if(parent.bottom<box.top-12||parent.top>box.bottom+12)continue;
    const range=document.createRange();range.selectNodeContents(node);
    for(const r of range.getClientRects())if(r.width&&r.height&&r.right>=box.left-12&&r.left<=box.right+12&&r.bottom>=box.top-12&&r.top<=box.bottom+12)rects.push(`<rect x="${r.left-box.left-3}" y="${r.top-box.top-2}" width="${r.width+6}" height="${r.height+4}" fill="black"/>`);
   }
   const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter></defs><rect width="100%" height="100%" fill="white"/><g filter="url(#soft)">${rects.join('')}</g></svg>`;
   const mask='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';img.style.maskImage=mask;img.style.webkitMaskImage=mask;
  };
  function schedule(){if(!timer&&!stopped)timer=setTimeout(update,60);}
  document.addEventListener('scroll',schedule,true);window.addEventListener('resize',schedule);document.addEventListener('input',schedule,true);img.addEventListener('load',schedule);
  const themeObserver=new MutationObserver(schedule);themeObserver.observe(document.head,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
  const bodyObserver=new MutationObserver(schedule);bodyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
  const interval=setInterval(schedule,1500);schedule();
  this.cleanup=()=>{stopped=true;clearTimeout(timer);clearInterval(interval);observer?.disconnect();themeObserver.disconnect();bodyObserver.disconnect();document.removeEventListener('scroll',schedule,true);window.removeEventListener('resize',schedule);document.removeEventListener('input',schedule,true);img.remove();style.remove();document.body.classList.remove('oregairu-portrait-active');};
 }
 onunload(){this.cleanup?.();}
}