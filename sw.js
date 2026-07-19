const CACHE='kage-v4.0-1142-guides';
const CORE=['./','index.html','sistemler.html','dunya.html','ekonomi.html','meslekler.html','irklar.html','kasaba.html','olaylar.html','npcler.html','rehber.html','gelistirme.html','sunucu.html','galeri.html','hakkinda.html','404.html','assets/style.css','assets/pages.css','assets/details.css','assets/config.js','assets/app.js','assets/pack-icon.png','assets/kage-world-visual.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('404.html'))) )});
