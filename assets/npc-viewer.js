(async () => {
  const canvases = [...document.querySelectorAll("canvas[data-skin]")];
  if (!canvases.length) return;
  const addFallback = (canvas) => {
    const box = canvas.parentElement;
    let fallback = box.querySelector(".skin-fallback");
    if (!fallback) {
      fallback = document.createElement("div");
      fallback.className = "skin-fallback";
      fallback.setAttribute("aria-hidden", "true");
      fallback.style.setProperty("--skin", `url("${canvas.dataset.skin}")`);
      for (const part of ["head", "body", "arm-right", "arm-left", "leg-right", "leg-left"]) {
        const piece = document.createElement("i");
        piece.className = `skin-part ${part}`;
        fallback.append(piece);
      }
      box.prepend(fallback);
    }
    return { box, badge: box.querySelector("span") };
  };
  const fallbackModels = canvases.map(addFallback);
  if (!window.skinview3d?.SkinViewer) {
    fallbackModels.forEach(({ box, badge }) => {
      box.classList.add("model-fallback");
      if (badge) badge.textContent = "KARAKTER ÖNİZLEMESİ";
    });
    return;
  }
  const viewers = canvases.map((canvas, index) => {
    const { box, badge } = fallbackModels[index];
    const viewer = new skinview3d.SkinViewer({ canvas, width: Math.max(240, box.clientWidth), height: 330 });
    viewer.background = null;
    viewer.zoom = 0.82;
    viewer.fov = 44;
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.55 + (index % 3) * 0.08;
    viewer.animation = new skinview3d.IdleAnimation();
    viewer.animation.speed = 0.7;
    viewer.globalLight.intensity = 2.4;
    viewer.cameraLight.intensity = 0.8;
    viewer.loadSkin(canvas.dataset.skin).then(() => requestAnimationFrame(() => {
      box.classList.add("model-ready");
      if (badge) badge.textContent = "360° MODEL";
    })).catch(() => {
      box.classList.add("model-fallback");
      if (badge) badge.textContent = "KARAKTER ÖNİZLEMESİ";
    });
    return { viewer, box };
  });
  const resize = () => viewers.forEach(({ viewer, box }) => {
    viewer.width = Math.max(220, Math.floor(box.clientWidth));
    viewer.height = window.innerWidth < 640 ? 285 : 330;
  });
  window.addEventListener("resize", resize, { passive: true });
  resize();
})();
