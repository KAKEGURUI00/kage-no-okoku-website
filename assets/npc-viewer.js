(() => {
  const canvases = [...document.querySelectorAll("canvas[data-skin]")];
  if (!canvases.length || !window.skinview3d) return;
  const viewers = canvases.map((canvas, index) => {
    const box = canvas.parentElement;
    const viewer = new skinview3d.SkinViewer({
      canvas,
      width: Math.max(240, box.clientWidth),
      height: 330,
      skin: canvas.dataset.skin,
    });
    viewer.background = null;
    viewer.zoom = 0.82;
    viewer.fov = 44;
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.55 + (index % 3) * 0.08;
    viewer.animation = new skinview3d.IdleAnimation();
    viewer.animation.speed = 0.7;
    viewer.globalLight.intensity = 2.4;
    viewer.cameraLight.intensity = 0.8;
    return { viewer, box };
  });
  const resize = () =>
    viewers.forEach(({ viewer, box }) => {
      viewer.width = Math.max(220, Math.floor(box.clientWidth));
      viewer.height = window.innerWidth < 640 ? 285 : 330;
    });
  window.addEventListener("resize", resize, { passive: true });
  resize();
})();
