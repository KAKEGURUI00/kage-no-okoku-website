(() => {
  const canvases = [...document.querySelectorAll("canvas[data-skin]")];
  if (!canvases.length || !window.skinview3d) return;

  const root = "assets/npc-skins/";
  const pools = [
    ["banker-0.png", "banker-1.png"],
    ["merchant-real.png", "resident-common.png", "resident-artisan.png"],
    ["lord-real.png", "resident-noble.png"],
    ["broker-0.png", "broker-1.png"],
    ["auctioneer-real.png", "resident-noble.png"],
    ["guard-real.png", "resident-common.png"],
    ["resident-scholar.png", "resident-noble.png"],
    ["resident-artisan.png", "resident-common.png"],
    ["resident-noble.png", "resident-common.png"]
  ].map(pool => pool.map(file => root + file));

  const pick = (pool, current = "") => {
    const choices = pool.filter(path => path !== current);
    return choices[Math.floor(Math.random() * choices.length)] || pool[0];
  };

  const viewers = canvases.map((canvas, index) => {
    const box = canvas.parentElement;
    const pool = pools[index] || pools.flat();
    const firstSkin = pick(pool);
    canvas.dataset.skin = firstSkin;
    const viewer = new skinview3d.SkinViewer({
      canvas,
      width: Math.max(240, box.clientWidth),
      height: 330,
      skin: firstSkin
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
    const badge = box.querySelector("span");
    if (badge) badge.textContent = `${pool.length} GÖRÜNÜM • 360°`;
    return { viewer, box, pool, current: firstSkin };
  });

  const changeAppearance = entry => {
    entry.current = pick(entry.pool, entry.current);
    entry.viewer.loadSkin(entry.current);
  };
  viewers.forEach((entry, index) => {
    window.setInterval(() => changeAppearance(entry), 7000 + index * 650);
    entry.box.addEventListener("dblclick", () => changeAppearance(entry));
  });

  const resize = () => viewers.forEach(({ viewer, box }) => {
    viewer.width = Math.max(220, Math.floor(box.clientWidth));
    viewer.height = window.innerWidth < 640 ? 285 : 330;
  });
  window.addEventListener("resize", resize, { passive: true });
  resize();
})();
