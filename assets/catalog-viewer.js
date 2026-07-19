(() => {
  const data=window.KAGE_MARKET_CATALOG;
  if(!data)return;
  const search=document.querySelector('#catalogSearch'),category=document.querySelector('#catalogCategory'),status=document.querySelector('#catalogStatus'),body=document.querySelector('#catalogBody'),result=document.querySelector('#catalogResult');
  const categoryNames=Object.fromEntries(data.categories.map(x=>[x.key,x.name]));
  for(const entry of data.categories){const option=document.createElement('option');option.value=entry.key;option.textContent=`${entry.name} (${data.products.filter(p=>p.category===entry.key).length})`;category.append(option)}
  const state=p=>p.canBuy&&p.canSell?'both':!p.canBuy&&p.canSell?'sell-only':'disabled';
  const label=s=>s==='both'?'ALINIR + SATILIR':s==='sell-only'?'YALNIZ MERKEZE SATILIR':'İŞLEME KAPALI';
  const render=()=>{const q=search.value.toLocaleLowerCase('tr-TR').trim();const rows=data.products.filter(p=>(category.value==='all'||p.category===category.value)&&(status.value==='all'||state(p)===status.value)&&(!q||`${p.name} ${p.itemId} ${categoryNames[p.category]}`.toLocaleLowerCase('tr-TR').includes(q)));result.textContent=`${rows.length} ürün gösteriliyor.`;body.replaceChildren(...rows.map(p=>{const tr=document.createElement('tr');const cells=[p.name,categoryNames[p.category],`${p.price} Kage`,p.stock,p.maxPerTrade];for(const value of cells){const td=document.createElement('td');td.textContent=value;tr.append(td)}const td=document.createElement('td'),pill=document.createElement('span'),s=state(p);pill.className=`status-pill status-${s}`;pill.textContent=label(s);td.append(pill);tr.append(td);return tr}))};
  search.addEventListener('input',render);category.addEventListener('change',render);status.addEventListener('change',render);render();
})();
