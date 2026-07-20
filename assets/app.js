// Manga bağlantısını eski önbellekten gelen sayfalarda bile ana menüde tut.
const mainNav=document.querySelector('.nav-links');
if(mainNav&&!mainNav.querySelector('a[href="manga.html"]')){
 const mangaLink=document.createElement('a');
 mangaLink.href='manga.html';
 mangaLink.textContent='Manga';
 if(document.body.dataset.page==='manga.html')mangaLink.classList.add('active');
 const before=mainNav.querySelector('a[href="gelistirme.html"],a[href="sunucu.html"]');
 mainNav.insertBefore(mangaLink,before);
}
const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.querySelectorAll('.expand-btn').forEach(b=>b.addEventListener('click',()=>{const card=b.closest('.info-card');card.classList.toggle('open');b.textContent=card.classList.contains('open')?'Ayrıntıyı kapat':'Ayrıntıyı aç'}));
if(location.hash&&!location.hash.startsWith('#/')){const target=document.querySelector(location.hash);if(target?.classList.contains('info-card')){target.classList.add('open');target.querySelector('.expand-btn').textContent='Ayrıntıyı kapat';setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'center'}),150)}}
const search=document.querySelector('#systemSearch'),count=document.querySelector('#systemCount');
search?.addEventListener('input',()=>{let visible=0;document.querySelectorAll('#systemGrid .info-card').forEach(c=>{const show=c.dataset.search.includes(search.value.toLocaleLowerCase('tr'));c.hidden=!show;if(show)visible++});count.textContent=`${visible} sistem`});
document.querySelectorAll('[data-npc-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-npc-filter]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelectorAll('.character').forEach(c=>c.hidden=b.dataset.npcFilter!=='all'&&!c.dataset.type.includes(b.dataset.npcFilter))}));
document.querySelectorAll('[data-version]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-version]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelectorAll('[data-version-item]').forEach(x=>x.hidden=b.dataset.version!=='all'&&x.dataset.versionItem!==b.dataset.version)}));
const box=document.querySelector('.lightbox');document.querySelectorAll('[data-gallery]').forEach(b=>b.addEventListener('click',()=>{box.querySelector('img').src=b.dataset.gallery==='__WORLD__'?document.querySelector('#embeddedWorldImage')?.src:b.dataset.gallery;box.querySelector('p').textContent=b.dataset.caption;box.classList.add('open');box.setAttribute('aria-hidden','false')}));
function closeBox(){box?.classList.remove('open');box?.setAttribute('aria-hidden','true')}document.querySelector('.lightbox-close')?.addEventListener('click',closeBox);box?.addEventListener('click',e=>{if(e.target===box)closeBox()});
document.querySelector('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const text=`Konu: ${d.get('topic')}\nOyuncu: ${d.get('name')}\n\n${d.get('message')}`;navigator.clipboard?.writeText(text);e.currentTarget.querySelector('.form-result').textContent='Bildirim metni panoya kopyalandı. İletişim kanalı eklendiğinde buradan doğrudan gönderilebilecek.'});
const cfg=window.KAGE_CONFIG||{};
const announcement=document.querySelector('#announcement');
const safeStorage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
if(cfg.announcement?.enabled&&safeStorage.get('kage-announcement')!==cfg.announcement.id){announcement.hidden=false;announcement.querySelector('span').textContent=cfg.announcement.text;announcement.querySelector('button').onclick=()=>{announcement.hidden=true;safeStorage.set('kage-announcement',cfg.announcement.id)}}
const serverAddress=cfg.server?.address?.trim();
if(serverAddress){
 const fullAddress=`${serverAddress}:${cfg.server.port||19132}`;
 document.querySelectorAll('[data-server-address]').forEach(x=>x.textContent=fullAddress);
 document.querySelectorAll('[data-copy-server]').forEach(x=>{x.disabled=false;x.onclick=async()=>{await navigator.clipboard.writeText(fullAddress);x.textContent='KOPYALANDI';setTimeout(()=>x.textContent='KOPYALA',1500)}});
 document.querySelectorAll('[data-status-title]').forEach(x=>x.textContent='Durum kontrol ediliyor');
 fetch(`https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(fullAddress)}`).then(r=>r.json()).then(d=>{
  document.querySelectorAll('[data-status-title]').forEach(x=>x.textContent=d.online?'Sunucu Çevrim İçi':'Sunucu Çevrim Dışı');
  document.querySelectorAll('[data-status-text]').forEach(x=>x.textContent=d.online?'Krallığın kapıları açık. Sunucu adresini kopyalayıp katılabilirsin.':'Sunucu şu anda bağlantı kabul etmiyor.');
  document.querySelectorAll('[data-player-label]').forEach(x=>x.textContent='Oyuncular');
  document.querySelectorAll('[data-player-count]').forEach(x=>x.textContent=d.online&&d.players?`${d.players.online} / ${d.players.max}`:`0 / ${cfg.server.maxPlayers||30}`);
  document.querySelectorAll('[data-server-title]').forEach(x=>x.textContent=d.online?'SUNUCU AÇIK':'SUNUCU ÇEVRİM DIŞI');
  document.querySelectorAll('[data-server-summary]').forEach(x=>x.textContent=d.online&&d.players?`${d.players.online} oyuncu şu anda krallıkta.`:'Sunucu şu anda çevrim dışı.');
 }).catch(()=>document.querySelectorAll('[data-status-title]').forEach(x=>x.textContent='Durum alınamadı'));
}
if(cfg.discordUrl)document.querySelectorAll('[data-discord-link]').forEach(x=>{x.hidden=false;x.href=cfg.discordUrl});
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
let installPrompt;const installButton=document.querySelector('#installApp');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false});installButton?.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
// Sunucu açıldığında aşağıdaki değere "adres:port" yazın. Örnek: play.site.com:19132
const SERVER_ADDRESS='';
if(SERVER_ADDRESS){const box=document.querySelector('.server-info'),status=box.querySelector('.status'),count=box.querySelector('.player-count b'),address=document.querySelector('#serverAddress'),copy=document.querySelector('#copyServer');address.textContent=SERVER_ADDRESS;copy.disabled=false;copy.onclick=async()=>{await navigator.clipboard.writeText(SERVER_ADDRESS);copy.textContent='Kopyalandı';setTimeout(()=>copy.textContent='Kopyala',1500)};fetch('https://api.mcsrvstat.us/bedrock/3/'+encodeURIComponent(SERVER_ADDRESS)).then(r=>r.json()).then(d=>{status.querySelector('span').textContent=d.online?'Sunucu çevrim içi':'Sunucu çevrim dışı';status.querySelector('i').style.background=d.online?'#5ec56e':'#c84b45';count.textContent=d.online&&d.players?`${d.players.online} / ${d.players.max}`:'— / —'}).catch(()=>status.querySelector('span').textContent='Durum alınamadı')}
