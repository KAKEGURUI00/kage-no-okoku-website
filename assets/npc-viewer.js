(() => {
  const canvases = [...document.querySelectorAll("canvas[data-skin]")];
  if (!canvases.length) return;
  const textures = {
    head:[[8,8],[24,8],[0,8],[16,8],[8,0],[16,0]], body:[[20,20],[32,20],[16,20],[28,20],[20,16],[28,16]],
    rightArm:[[44,20],[52,20],[40,20],[48,20],[44,16],[48,16]], leftArm:[[36,52],[44,52],[32,52],[40,52],[36,48],[40,48]],
    rightLeg:[[4,20],[12,20],[0,20],[8,20],[4,16],[8,16]], leftLeg:[[20,52],[28,52],[16,52],[24,52],[20,48],[24,48]]
  };
  const faces = ["front","back","right","left","top","bottom"];
  function part(model,name,w,h,d,x,y,z){
    const el=document.createElement("div"); el.className=`css-cuboid ${name}`;
    el.style.cssText=`width:${w}px;height:${h}px;transform:translate3d(${x-w/2}px,${y-h/2}px,${z-d/2}px)`;
    textures[name].forEach(([tx,ty],i)=>{
      const f=document.createElement("i"); f.className=`css-face ${faces[i]}`;
      let rule=`--tx:${-tx*8}px;--ty:${-ty*8}px;`;
      if(i<2) rule+=`width:${w}px;height:${h}px;transform:rotateY(${i?180:0}deg) translateZ(${d/2}px)`;
      else if(i<4) rule+=`width:${d}px;height:${h}px;left:${(w-d)/2}px;transform:rotateY(${i===2?90:-90}deg) translateZ(${w/2}px)`;
      else rule+=`width:${w}px;height:${d}px;top:${(h-d)/2}px;transform:rotateX(${i===4?90:-90}deg) translateZ(${h/2}px)`;
      f.style.cssText=rule; el.append(f);
    }); model.append(el);
  }
  canvases.forEach((canvas,index)=>{
    const box=canvas.parentElement, scene=document.createElement("div"), model=document.createElement("div");
    scene.className="css-skin-scene"; model.className="css-skin-model";
    scene.setAttribute("role","img"); scene.setAttribute("aria-label",canvas.getAttribute("aria-label")||"Döndürülebilir NPC modeli");
    scene.style.setProperty("--skin",`url("${canvas.dataset.skin}")`); scene.append(model);
    part(model,"head",64,64,64,0,-112,0); part(model,"body",64,96,32,0,-32,0);
    part(model,"rightArm",32,96,32,-48,-32,0); part(model,"leftArm",32,96,32,48,-32,0);
    part(model,"rightLeg",32,96,32,-16,64,0); part(model,"leftLeg",32,96,32,16,64,0);
    box.insertBefore(scene,canvas); canvas.hidden=true; box.classList.add("css-model-ready");
    const badge=box.querySelector("span"); if(badge) badge.textContent="360° • SÜRÜKLE";
    let angle=-22+index*5,tilt=-7,drag=false,sx=0,sy=0;
    const draw=()=>model.style.transform=`rotateX(${tilt}deg) rotateY(${angle}deg)`; draw();
    scene.addEventListener("pointerdown",e=>{drag=true;sx=e.clientX;sy=e.clientY;scene.setPointerCapture(e.pointerId)});
    scene.addEventListener("pointermove",e=>{if(!drag)return;angle+=(e.clientX-sx)*.7;tilt=Math.max(-28,Math.min(24,tilt-(e.clientY-sy)*.3));sx=e.clientX;sy=e.clientY;draw()});
    scene.addEventListener("pointerup",()=>drag=false); scene.addEventListener("pointercancel",()=>drag=false);
  });
})();
