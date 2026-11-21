/* Print House – shared logic */
const WA_NUMBER = '21624050066';
const WA_NUMBER2 = '21653463975';
const WA_ICON = '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8A13 13 0 0 0 16 29c7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7c-2 0-3.9-.6-5.5-1.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.6 10.6 0 1 1 16 26.7zm5.8-7.9c-.3-.2-1.9-.9-2.200-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.6l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.400s1 2.800 1.200 3c.1.200 2 3.100 4.900 4.300.7.300 1.200.5 1.600.6.700.2 1.300.2 1.800.1.600-.1 1.900-.8 2.100-1.500.3-.7.300-1.400.2-1.500-.1-.1-.3-.2-.6-.4z"/></svg>';

const COLORS = {
  black:['Black','#121214'], white:['White','#f6f6f4'], navy:['Navy','#1c2a4a'], red:['Red','#c8202f'],
  sand:['Sand','#d8c7a3'], forest:['Forest','#274b34'], blue:['Electric Blue','#2447ff'], grey:['Heather Grey','#8d9094'], natural:['Natural','#efe6d0'], charcoal:['Charcoal','#6f7276'], orange:['Orange','#ff5a1f']
};
const GARMENT_COLORS = ['black','white','navy','red','sand','forest','blue','grey'];
const PRODUCTS = {
  tshirt:{name:'T-Shirt', blurb:'Heavy 100% cotton tee, soft hand-feel.', sizes:['S','M','L','XL','XXL'], colors:GARMENT_COLORS,
    variants:[{id:'standard',label:'Standard',desc:'Front print only',price:35,sides:['front']},{id:'retro',label:'Retro',desc:'Front + Back print',price:45,sides:['front','back']}]},
  hoodie:{name:'Hoodie', blurb:'Fleece-lined oversized hoodie, premium DTF print.', sizes:['S','M','L','XL','XXL'], colors:GARMENT_COLORS,
    variants:[{id:'standard',label:'Standard',desc:'Front print only',price:35,sides:['front']},{id:'retro',label:'Retro',desc:'Front + Back print',price:45,sides:['front','back']}]},
  beanie:{name:'Beanie (Bonne)', blurb:'Cosy ribbed beanie with a printed cuff.', sizes:null, colors:['black','white','navy','red','sand','forest','orange'],
    variants:[{id:'standard',label:'Standard',desc:'Cuff print',price:30,sides:['front']}]},
  case:{name:'Phone Case (Cache Tlifoun)', blurb:'Slim, shock-absorbing case with a full-colour print.', sizes:null, colors:['black','white','navy','red','blue','orange'], models:true,
    variants:[{id:'standard',label:'Standard',desc:'Back print',price:25,sides:['front']}]},
  tote:{name:'Tote Bag (Sac Tot Bage)', blurb:'Strong cotton canvas tote – carry your art everywhere.', sizes:null, colors:['white','sand','black','navy','red'],
    variants:[{id:'standard',label:'Standard',desc:'Front print',price:25,sides:['front']}]}
};
const PHONE_MODELS = ['iPhone 11','iPhone 12','iPhone 13','iPhone 14','iPhone 15','iPhone 16','Samsung Galaxy S22','Samsung Galaxy S23','Samsung Galaxy S24','Samsung Galaxy A54','Xiaomi Redmi Note 12','Other (tell us on WhatsApp)'];

/* print areas (% of stage) */
const AREAS = {
  tshirt:{front:[32,24,36,38], back:[32,22,36,42]},
  hoodie:{front:[33,28,34,28], back:[31,26,38,42]},
  beanie:{front:[30,68,40,15]},
  case:{front:[31,31,38,54]},
  tote:{front:[28,43,44,38]}
};

/* SVG mockups – colour driven by --g */
function svgProduct(type, side){
  const S='stroke="rgba(0,0,0,.28)" stroke-width="2" stroke-linejoin="round"', F='fill="var(--g)"';
  const fold='stroke="rgba(0,0,0,.12)" stroke-width="2" fill="none"';
  let b='';
  if(type==='tshirt'){
    b=`<path d="M130 40 L80 62 L18 132 L62 172 L96 148 L96 402 L304 402 L304 148 L338 172 L382 132 L320 62 L270 40 Q200 ${side==='back'?66:94} 130 40Z" ${F} ${S}/>
       <path d="M130 40 Q200 ${side==='back'?66:94} 270 40" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="6"/>
       <path d="M96 148 Q110 120 112 98 M304 148 Q290 120 288 98" ${fold}/><path d="M96 390 H304" ${fold}/>`;
  } else if(type==='hoodie'){
    b=`<path d="M135 50 L68 82 L20 300 L62 314 L96 196 L96 410 L304 410 L304 196 L338 314 L380 300 L332 82 L265 50 Q200 ${side==='back'?70:112} 135 50Z" ${F} ${S}/>
       <path d="M135 50 Q122 -6 200 -4 Q278 -6 265 50 Q248 ${side==='back'?96:126} 200 ${side==='back'?96:126} Q152 ${side==='back'?96:126} 135 50Z" ${F} ${S}/>
       ${side==='back'?'<path d="M200 -4 V90" '+fold+'/>':'<path d="M178 112 V170 M222 112 V170" stroke="rgba(0,0,0,.35)" stroke-width="4" stroke-linecap="round"/><path d="M126 300 H274 L290 374 H110Z" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>'}
       <path d="M96 396 H304" ${fold}/><path d="M22 290 L62 304" ${fold}/>`;
  } else if(type==='beanie'){
    b=`<path d="M82 300 Q70 92 200 76 Q330 92 318 300Z" ${F} ${S}/>
       <rect x="68" y="286" width="264" height="104" rx="16" ${F} ${S}/>
       <path d="M96 100 Q96 200 100 286 M150 84 Q150 200 152 286 M200 78 V286 M250 84 Q250 200 248 286 M304 100 Q304 200 300 286" ${fold}/>
       <path d="M80 304 H320 M80 330 H320 M80 356 H320" ${fold}/>
       <circle cx="200" cy="66" r="30" ${F} ${S}/>`;
  } else if(type==='case'){
    b=`<rect x="108" y="26" width="184" height="390" rx="40" ${F} ${S}/>
       <rect x="124" y="42" width="76" height="76" rx="20" fill="rgba(0,0,0,.38)"/>
       <circle cx="146" cy="64" r="12" fill="#111" stroke="#555" stroke-width="3"/><circle cx="178" cy="64" r="12" fill="#111" stroke="#555" stroke-width="3"/><circle cx="162" cy="98" r="12" fill="#111" stroke="#555" stroke-width="3"/>
       <rect x="116" y="34" width="168" height="374" rx="34" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`;
  } else if(type==='tote'){
    b=`<path d="M138 160 Q138 34 200 34 Q262 34 262 160" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="22" stroke-linecap="round"/>
       <path d="M138 160 Q138 34 200 34 Q262 34 262 160" fill="none" stroke="var(--g)" stroke-width="16" stroke-linecap="round"/>
       <path d="M70 140 H330 L344 420 H56Z" ${F} ${S}/>
       <path d="M70 140 H330" stroke="rgba(0,0,0,.2)" stroke-width="4"/><path d="M74 152 H326" ${fold}/>`;
  }
  return `<svg class="prod" viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
}
function thumb(type,color){return `<div style="--g:${COLORS[color||'black'][1]}">${svgProduct(type,'front').replace('class="prod"','')}</div>`;}

/* helpers */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
function toast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}t.textContent=msg;requestAnimationFrame(()=>t.classList.add('show'));clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),3200);}
const save=(k,v)=>{try{sessionStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
const load=k=>{try{return JSON.parse(sessionStorage.getItem(k))}catch(e){return null}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dt=n=>n+' DT';
function normPhone(v){let d=String(v).replace(/[\s.\-()]/g,'');d=d.replace(/^\+?216/,'').replace(/^00216/,'');return d;}
function validPhone(v){return /^[2-579]\d{7}$/.test(normPhone(v));}

/* layout injection */
function layout(){
  const page=document.body.dataset.page;
  const nav=[['index.html','Home','home'],['products.html','Products','products'],['faq.html','FAQ','faq'],['contact.html','Contact','contact']];
  document.body.insertAdjacentHTML('afterbegin',`
  <header class="site"><div class="wrap">
    <a class="logo" href="index.html"><img src="img/logo.png" alt="Print House"></a>
    <button class="burger" aria-label="Menu">☰</button>
    <nav class="main">${nav.map(n=>`<a href="${n[0]}" class="${page===n[2]?'on':''}">${n[1]}</a>`).join('')}<a class="cta" href="products.html#customizer">Start Designing</a></nav>
  </div></header>`);
  document.body.insertAdjacentHTML('beforeend',`
  <a class="float-wa" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener" aria-label="WhatsApp" style="color:#04210f">${WA_ICON}</a>
  <footer class="site"><div class="wrap">
    <div class="cols">
      <div><a class="logo badge" href="index.html"><img src="img/logo.png" alt="Print House"></a><p style="color:#b8b9bd;margin-top:14px;max-width:360px">Custom printing for Tunisia's creators. Upload your art, we print it on premium streetwear and deliver to your door.</p></div>
      <div><h4>Shop</h4><a href="products.html?p=tshirt#customizer">T-Shirts</a><a href="products.html?p=hoodie#customizer">Hoodies</a><a href="products.html?p=beanie#customizer">Beanies</a><a href="products.html?p=case#customizer">Phone Cases</a><a href="products.html?p=tote#customizer">Tote Bags</a></div>
      <div><h4>Help</h4><a href="faq.html">FAQ</a><a href="contact.html">Contact</a><a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">WhatsApp +216 24 050 066</a><a href="https://wa.me/${WA_NUMBER2}" target="_blank" rel="noopener">WhatsApp +216 53 463 975</a></div>
    </div>
    <div class="copy">© ${new Date().getFullYear()} Print House · Tunisia · Prices in Tunisian Dinar (DT)</div>
  </div></footer>`);
  $('.burger').onclick=()=>$('nav.main').classList.toggle('open');
}

/* ---------- Customizer ---------- */
const DEFAULT_STATE=()=>({product:'tshirt',variant:'standard',color:'black',size:'M',model:PHONE_MODELS[0],qty:1,view:'front',designs:{front:null,back:null}});
function fileToDesign(file){
  return new Promise((res,rej)=>{
    if(!/^image\//.test(file.type)){rej('Please upload an image file (PNG, JPG, WEBP, SVG).');return;}
    if(file.size>15*1024*1024){rej('File is too large (max 15 MB).');return;}
    const fr=new FileReader();
    fr.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const c=document.createElement('canvas');const m=900,sc=Math.min(1,m/Math.max(img.width,img.height));
        c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
        c.getContext('2d').drawImage(img,0,0,c.width,c.height);
        const t=document.createElement('canvas');const ts=Math.min(1,260/Math.max(img.width,img.height));
        t.width=Math.round(img.width*ts);t.height=Math.round(img.height*ts);t.getContext('2d').drawImage(img,0,0,t.width,t.height);
        res({name:file.name,size:file.size,data:c.toDataURL('image/png'),thumb:t.toDataURL('image/png'),w:img.width,h:img.height});
      };
      img.onerror=()=>rej('Could not read this image.');
      img.src=fr.result;
    };
    fr.onerror=()=>rej('Could not read this file.');
    fr.readAsDataURL(file);
  });
}

function mountCustomizer(root,opts={}){
  const st=Object.assign(DEFAULT_STATE(),opts.initial||{});
  const P=()=>PRODUCTS[st.product];
  const V=()=>P().variants.find(v=>v.id===st.variant)||P().variants[0];

  function setProduct(id){
    if(!PRODUCTS[id])return;
    st.product=id;st.variant=P().variants[0].id;st.view='front';
    if(!P().colors.includes(st.color))st.color=P().colors[0];
    if(!P().sizes)st.size=null;else if(!st.size)st.size='M';
    render();
  }

  function render(){
    const p=P(),v=V(),area=AREAS[st.product],sides=v.sides;
    if(!sides.includes(st.view))st.view='front';
    const a=area[st.view]||area.front, d=st.designs[st.view];
    const total=v.price*st.qty;
    const sideName=sides.length>1?(st.view==='front'?'front':'back'):'';
    root.innerHTML=`
    <div class="customizer">
      <div class="stage-card">
        <div class="stage-top"><span class="pill">${esc(p.name)} · ${esc(COLORS[st.color][0])}</span>
          ${sides.length>1?`<div class="view-tabs">${sides.map(s=>`<button data-view="${s}" class="${st.view===s?'on':''}">${s==='front'?'Front':'Back'}</button>`).join('')}</div>`:''}
        </div>
        <div class="stage" style="--g:${COLORS[st.color][1]}">
          ${svgProduct(st.product,st.view)}
          <div class="print-area ${d?'filled':''}" style="left:${a[0]}%;top:${a[1]}%;width:${a[2]}%;height:${a[3]}%">
            ${d?`<img src="${d.data}" alt="Your design">`:`<div class="ph">Your design<br>goes here</div>`}
          </div>
        </div>
        <div class="stage-foot"><span>${d?'📎 '+esc(d.name):'No design uploaded yet'}</span><span>Live preview</span></div>
      </div>

      <div class="panel">
        <div class="step"><div class="step-title"><b>1</b>Choose your product</div>
          <div class="gallery">${Object.keys(PRODUCTS).map(k=>`<div class="pcard ${k===st.product?'on':''}" data-prod="${k}">${thumb(k,k===st.product?st.color:'black')}${esc(PRODUCTS[k].name.split(' (')[0])}</div>`).join('')}</div>
        </div>

        <div class="step"><div class="step-title"><b>2</b>Upload your design${sideName?' ('+sideName+')':''}</div>
          <label class="drop ${d?'has':''}" id="drop">
            <input type="file" id="file" accept="image/*" hidden>
            <span class="big">${d?'✓ Design added – replace':'⬆ Upload your design / photo'}</span>
            <small>Drag &amp; drop or click to browse · PNG, JPG, WEBP, SVG · max 15 MB</small>
          </label>
          ${d?`<div class="fileline"><span>📎 ${esc(d.name)}</span><button id="rm">Remove</button></div>`:''}
          ${sides.length>1?`<p style="font-size:.85rem;color:var(--grey);margin-top:10px">Retro needs a design for both sides – switch between Front / Back on the preview. ${st.designs.front?'✓ Front':'○ Front'} · ${st.designs.back?'✓ Back':'○ Back'}</p>`:''}
        </div>

        <div class="step"><div class="step-title"><b>3</b>Customize</div>
          ${p.variants.length>1?`<div class="opt-label">Print location</div><div class="variants">${p.variants.map(x=>`<button class="variant ${x.id===st.variant?'on':''}" data-var="${x.id}"><b>${x.label}</b><span>${x.desc}</span><em>${x.price} DT</em></button>`).join('')}</div>`:''}
          <div class="opt-label">Colour — ${esc(COLORS[st.color][0])}</div>
          <div class="swatches">${p.colors.map(c=>`<div class="sw ${c===st.color?'on':''}" data-col="${c}" title="${COLORS[c][0]}" style="background:${COLORS[c][1]}"></div>`).join('')}</div>
          ${p.sizes?`<div class="opt-label">Size</div><div class="sizes">${p.sizes.map(s=>`<button class="sz ${s===st.size?'on':''}" data-size="${s}">${s}</button>`).join('')}</div>`:''}
          ${p.models?`<div class="opt-label">Phone model</div><select id="model">${PHONE_MODELS.map(m=>`<option ${m===st.model?'selected':''}>${m}</option>`).join('')}</select>`:''}
          <div class="opt-label">Quantity</div>
          <div class="qty"><button data-q="-1">−</button><span>${st.qty}</span><button data-q="1">+</button></div>
        </div>

        <div class="step"><div class="buy">
          <div class="price">${dt(total)}<small>${v.price} DT × ${st.qty} · ${esc(v.label)} ${esc(p.name.split(' (')[0])}</small></div>
          <button class="btn accent-bg" id="order">Order Now →</button>
        </div></div>
      </div>
    </div>`;
    bind();
  }

  async function handleFile(f){
    if(!f)return;
    try{const d=await fileToDesign(f);st.designs[st.view]=d;render();toast('Design added to your '+P().name.split(' (')[0]+' ✓');}
    catch(e){toast(String(e));}
  }

  function bind(){
    $$('[data-prod]',root).forEach(e=>e.onclick=()=>setProduct(e.dataset.prod));
    $$('[data-view]',root).forEach(e=>e.onclick=()=>{st.view=e.dataset.view;render();});
    $$('[data-var]',root).forEach(e=>e.onclick=()=>{st.variant=e.dataset.var;if(V().sides.length<2){st.view='front';}render();});
    $$('[data-col]',root).forEach(e=>e.onclick=()=>{st.color=e.dataset.col;render();});
    $$('[data-size]',root).forEach(e=>e.onclick=()=>{st.size=e.dataset.size;render();});
    $$('[data-q]',root).forEach(e=>e.onclick=()=>{st.qty=Math.min(50,Math.max(1,st.qty+Number(e.dataset.q)));render();});
    const m=$('#model',root);if(m)m.onchange=()=>{st.model=m.value;};
    const drop=$('#drop',root),file=$('#file',root);
    file.onchange=()=>handleFile(file.files[0]);
    ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over');}));
    ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over');}));
    drop.addEventListener('drop',e=>handleFile(e.dataTransfer.files[0]));
    const rm=$('#rm',root);if(rm)rm.onclick=e=>{e.preventDefault();st.designs[st.view]=null;render();};
    $('#order',root).onclick=checkout;
  }

  function checkout(){
    const v=V(),p=P();
    for(const s of v.sides){
      if(!st.designs[s]){st.view=s;render();toast(v.sides.length>1?`Please upload your ${s} design first`:'Please upload your design first');return;}
    }
    const order={
      product:st.product,productName:p.name,variantLabel:v.label,variantDesc:v.desc,unit:v.price,qty:st.qty,total:v.price*st.qty,
      color:COLORS[st.color][0],size:p.sizes?st.size:null,model:p.models?st.model:null,
      files:v.sides.map(s=>({side:s,name:st.designs[s].name,thumb:st.designs[s].thumb,w:st.designs[s].w,h:st.designs[s].h}))
    };
    save('ph_order',order);
    location.href='order.html';
  }

  setProduct(st.product);
  return {select:setProduct,state:st};
}

/* ---------- WhatsApp ---------- */
function buildWaMessage(o,c){
  const L=[];
  L.push('Hello Print House! 👋 I would like to confirm my order:','');
  L.push('🧾 Order ref: '+o.ref);
  L.push('🛍 Product: '+o.productName+' – '+o.variantLabel+' ('+o.variantDesc+')');
  L.push('🎨 Colour: '+o.color);
  if(o.size)L.push('📏 Size: '+o.size);
  if(o.model)L.push('📱 Phone model: '+o.model);
  L.push('🔢 Quantity: '+o.qty);
  L.push('💰 Price: '+o.unit+' DT × '+o.qty+' = '+o.total+' DT');
  o.files.forEach(f=>L.push('🖼 Design file ('+(o.files.length>1?f.side:'print')+'): '+f.name));
  L.push('','👤 Name: '+c.name,'📞 WhatsApp: '+c.phone,'📍 Address: '+c.address+(c.city?', '+c.city:''));
  if(c.notes)L.push('📝 Notes: '+c.notes);
  L.push('','I will send my design file in this chat. Thank you!');
  return L.join('\n');
}
const waLink=(msg,num)=>'https://wa.me/'+(num||WA_NUMBER)+'?text='+encodeURIComponent(msg);
function openLink(u){const a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();}

document.addEventListener('DOMContentLoaded',()=>{
  layout();
  $$('.faq-item button').forEach(b=>b.onclick=()=>{const it=b.parentElement,a=$('.a',it);const o=it.classList.toggle('open');a.style.maxHeight=o?a.scrollHeight+'px':0;});
  const slot=$('#customizer-mount');
  if(slot){
    const p=new URLSearchParams(location.search).get('p');
    window.PH=mountCustomizer(slot,{initial:p&&PRODUCTS[p]?{product:p}:{}});
    $$('[data-pick]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();window.PH.select(e.dataset.pick);$('#customizer').scrollIntoView({behavior:'smooth'});history.replaceState(null,'','?p='+e.dataset.pick+'#customizer');}));
  }
  if(typeof pageInit==='function')pageInit();
});
