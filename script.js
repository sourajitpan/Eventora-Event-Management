/* ---------- Event data (edit or add your own) ---------- */
const EVENTS = [
 {id:1,name:"CodeSprint Hackathon",cat:"Tech",date:"2026-12-12T09:00",venue:"Auditorium, Campus-17, KIIT Deemed to be University",image:"images/hackathon.jpg",desc:"A 24-hour hackathon where teams build real products. Mentors, snacks and prizes included."},
 {id:2,name:"Winter Music Night",cat:"Music",date:"2026-12-20T18:30",venue:"Campus 3 Open Air Theatre 3 (OAT-3)",image:"images/music.jpg",desc:"Live bands, acoustic sets and a silent disco under the stars."},
 {id:3,name:"UI/UX Design Workshop",cat:"Workshop",date:"2027-01-09T10:00",venue:"Campus 25, C012 – Lecture Theatre",image:"images/workshop.jpg",desc:"Learn wireframing and prototyping in Figma with a hands-on project."},
 {id:4,name:"Startup Pitch Day",cat:"Business",date:"2027-01-18T11:00",venue:"Conference Hall 8, Convention Centre, Campus 6, KIIT",image:"images/startup.jpg",desc:"Ten student startups pitch to investors. Come to watch, network and vote."},
 {id:5,name:"Inter-College Cricket Cup",cat:"Sports",date:"2027-02-06T08:00",venue:"KIIT Cricket Stadium (Campus 13",image:"images/cricket.jpg",desc:"A one-day tournament with 8 college teams. Register to play or to cheer."},
 {id:6,name:"kIIT Food & Culture Fest",cat:"Culture",date:"2027-02-21T12:00",venue:"Lecture Hall and KIIT Cafe, Campus 25",image:"images/culture.jpg",desc:"Local food stalls, Odissi dance, handloom stalls and craft demos for the whole family."}
];
const $ = s => document.querySelector(s);
const fmt = d => new Date(d).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}) + ', ' + new Date(d).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});
const LOCATION_ICON = `<svg class="location-icon" viewBox="0 0 24 24" aria-hidden="true">
  <defs>
    <filter id="pin-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="0.7" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <path d="M12 2.25a7 7 0 0 0-7 7c0 5.1 7 12.5 7 12.5s7-7.4 7-12.5a7 7 0 0 0-7-7Z" fill="#10B981" fill-opacity=".12" stroke="#10B981" stroke-width="1.65" stroke-linejoin="round" filter="url(#pin-glow)"/>
  <circle cx="12" cy="9.25" r="2.55" fill="#071A14" stroke="#D6B56D" stroke-width="1.35"/>
</svg>`;
const CALENDAR_ICON = `<svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>`;
const CATEGORY_ICONS = {
 Tech:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>`,
 Music:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
 Workshop:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.8-4-5-9-5Z"/></svg>`,
 Business:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/></svg>`,
 Sports:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4ZM7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4"/></svg>`,
 Culture:`<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-6 9 6H3ZM5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/></svg>`
};
let cat = 'All', query = '';

//local strage
const load = () => { try { return JSON.parse(localStorage.getItem('eventora_regs')) || []; } catch { return []; } };
const save = r => { try { localStorage.setItem('eventora_regs', JSON.stringify(r)); } catch {} };

//theme
function setTheme(t){ document.documentElement.dataset.theme = t; $('#theme').innerHTML = t==='dark' ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8 8 0 0 1 8.5 4a8 8 0 1 0 11.5 11.5Z"/></svg>'; try{localStorage.setItem('eventora_theme',t)}catch{} }
let saved = null; try { saved = localStorage.getItem('eventora_theme'); } catch {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
$('#theme').onclick = () => setTheme(document.documentElement.dataset.theme==='dark' ? 'light' : 'dark');
$('#burger').onclick = e => { const o = $('#menu').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded',o); };
$('#menu').onclick = () => $('#menu').classList.remove('open');

//Animations: headline, ticker, scroll bar, spotlight, reveal
let wi = 0;
document.querySelectorAll('.split').forEach(el => {
  el.innerHTML = el.textContent.split(' ').map(w => `<span class="w"><span style="--i:${wi++}">${w}</span></span>`).join(' ');
});
const items = EVENTS.map(e => `<span>${e.name}</span>`).join('');
$('#track').innerHTML = items + items + items + items;

addEventListener('scroll', () => { const h = document.documentElement;
  $('#bar').style.transform = `scaleX(${h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)})`; }, {passive:true});
$('#home').addEventListener('pointermove', e => { const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px'); e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px'); });

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(x => { if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }), {threshold:.12})
  : null;
const reveal = () => document.querySelectorAll('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* 3D tilt on cards (mouse only) */
$('#grid').addEventListener('pointermove', e => {
  const c = e.target.closest('.card'); if(!c || e.pointerType !== 'mouse') return;
  const r = c.getBoundingClientRect(), x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
  c.style.setProperty('--ry', x*9 + 'deg'); c.style.setProperty('--rx', -y*9 + 'deg');
});
$('#grid').addEventListener('pointerout', e => {
  const c = e.target.closest('.card');
  if(c && !c.contains(e.relatedTarget)){ c.style.setProperty('--rx','0deg'); c.style.setProperty('--ry','0deg'); }
});

/* ---------- Events list: search + filter ---------- */
const cats = ['All', ...new Set(EVENTS.map(e => e.cat))];
$('#chips').innerHTML = cats.map(c => `<button class="chip${c==='All'?' on':''}" data-c="${c}">${c}</button>`).join('');
$('#chips').onclick = e => { if(!e.target.dataset.c) return; cat = e.target.dataset.c;
  document.querySelectorAll('.chip').forEach(b => b.classList.toggle('on', b.dataset.c===cat)); render(); };
$('#search').oninput = e => { query = e.target.value.trim().toLowerCase(); render(); };

function render(){
  const list = EVENTS.filter(e => (cat==='All' || e.cat===cat) && (e.name+e.venue+e.desc+e.cat).toLowerCase().includes(query))
                     .sort((a,b) => new Date(a.date)-new Date(b.date));
  $('#grid').innerHTML = list.map((e,i) => `
    <article class="card rv" style="--d:${(i%3)*.12}s">
      <div class="banner event-banner">
        <img class="event-image" src="${e.image}" alt="${e.name}" loading="lazy">
        <span class="tag">${CATEGORY_ICONS[e.cat]} ${e.cat}</span>
      </div>
      <div class="card-body">
        <h3>${e.name}</h3>
        <span class="meta">${CALENDAR_ICON} ${fmt(e.date)}</span>
        <span class="meta">${LOCATION_ICON} ${e.venue}</span>
        <p>${e.desc}</p>
        <button class="btn" data-id="${e.id}"><span>View details</span></button>
      </div>
    </article>`).join('');
  $('#empty').hidden = list.length > 0;
  reveal();
}
$('#grid').onclick = e => { const b = e.target.closest('[data-id]'); if(b) openModal(+b.dataset.id); };

/* ---------- Countdown to next event ---------- */
const upcoming = () => EVENTS.filter(e => new Date(e.date) > new Date()).sort((a,b) => new Date(a.date)-new Date(b.date))[0];
function setNum(id, v){ const el = $('#'+id); if(el.textContent !== v){ el.textContent = v; el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); } }
function tick(){
  const n = upcoming(); if(!n){ $('#nextName').textContent = 'No upcoming events'; $('#nextBtn').hidden = true; return; }
  $('#nextName').textContent = n.name; $('#nextBtn').onclick = () => openModal(n.id);
  const t = Math.max(0, new Date(n.date) - new Date()) / 1000;
  const p = x => String(Math.floor(x)).padStart(2,'0');
  setNum('d', p(t/86400)); setNum('h', p(t%86400/3600)); setNum('m', p(t%3600/60)); setNum('s', p(t%60));
}
tick(); setInterval(tick, 1000);

/* ---------- Modal: details + registration ---------- */
let lastFocus;
function openModal(id){
  const e = EVENTS.find(x => x.id===id); lastFocus = document.activeElement;
  $('#mBody').innerHTML = `
    <div class="banner event-banner sheet-cover">
      <img class="event-image" src="${e.image}" alt="${e.name}">
      <span class="tag">${CATEGORY_ICONS[e.cat]} ${e.cat}</span>
    </div>
    <div class="sheet-in">
      <h3 id="mTitle">${e.name}</h3>
      <span class="meta">${CALENDAR_ICON} ${fmt(e.date)}</span><br><span class="meta">${LOCATION_ICON} ${e.venue}</span>
      <p class="desc">${e.desc}</p>
      <form id="form" novalidate>
        <div><label for="fn">Full name</label><input id="fn" autocomplete="name"><span class="err" id="e-fn"></span></div>
        <div><label for="em">Email</label><input id="em" type="email" autocomplete="email"><span class="err" id="e-em"></span></div>
        <div><label for="ph">Phone number</label><input id="ph" type="tel" inputmode="numeric" placeholder="10-digit mobile number" autocomplete="tel"><span class="err" id="e-ph"></span></div>
        <div><label for="ev">Event</label><select id="ev">${EVENTS.map(x=>`<option value="${x.id}"${x.id===id?' selected':''}>${x.name}</option>`).join('')}</select><span class="err" id="e-ev"></span></div>
        <button class="btn" type="submit"><span>Register now</span></button>
      </form>
    </div>`;
  $('#modal').hidden = false; document.body.style.overflow = 'hidden';
  $('#form').onsubmit = submit;
  ['fn','em','ph'].forEach(k => $('#'+k).oninput = () => check(k));
  $('#fn').focus();
}
function closeModal(){ $('#modal').hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); }
$('#close').onclick = closeModal;
$('#modal').onclick = e => { if(e.target.id==='modal') closeModal(); };
document.onkeydown = e => { if(e.key==='Escape' && !$('#modal').hidden) closeModal(); };

/* ---------- Validation ---------- */
const rules = {
  fn: v => !v ? 'Enter your full name.' : !/^[A-Za-z][A-Za-z .'-]{2,}$/.test(v) ? 'Use letters only, at least 3 characters.' : '',
  em: v => !v ? 'Enter your email address.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Enter a valid email, like name@example.com.' : '',
  ph: v => !v ? 'Enter your phone number.' : !/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g,'')) ? 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.' : ''
};
function check(k){ const el = $('#'+k), msg = rules[k](el.value.trim()); el.classList.remove('bad'); if(msg){ void el.offsetWidth; el.classList.add('bad'); } $('#e-'+k).textContent = msg; return !msg; }

function confetti(){
  const box = document.createElement('div'); box.className = 'confetti'; const cols = ['#10B981','#34D399','#D6B56D','#F0FDF4'];
  for(let i=0;i<36;i++){ const s = document.createElement('i');
    s.style.cssText = `left:50%;top:60%;background:${cols[i%4]};--x:${(Math.random()-.5)*560}px;--y:${-120-Math.random()*320}px;--r:${Math.random()*720}deg;animation-delay:${Math.random()*.15}s`;
    box.appendChild(s); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 2300);
}

function submit(ev){
  ev.preventDefault();
  const ok = ['fn','em','ph'].map(check).every(Boolean);
  const id = +$('#ev').value; if(!id){ $('#e-ev').textContent = 'Choose an event.'; return; }
  if(!ok) { document.querySelector('.bad').focus(); return; }
  const regs = load(), email = $('#em').value.trim().toLowerCase();
  if(regs.some(r => r.eventId===id && r.email===email)){ $('#e-em').textContent = 'This email is already registered for this event.'; $('#em').classList.add('bad'); return; }
  const e = EVENTS.find(x => x.id===id);
  const reg = {ref:'EVT-'+Date.now().toString(36).toUpperCase(), eventId:id, name:$('#fn').value.trim(), email, phone:$('#ph').value.replace(/[\s-]/g,''), at:new Date().toISOString()};
  regs.push(reg); save(regs); renderMine();
  $('#mBody').innerHTML = `<div class="done"><div class="tick">✓</div><h3>You're registered, ${reg.name.split(' ')[0]}!</h3>
    <p>${e.name}<br>${fmt(e.date)}<br>${e.venue}</p><p>Your booking code is <b>${reg.ref}</b>. A confirmation will be sent to ${reg.email}.</p>
    <button class="btn" id="ok"><span>Done</span></button></div>`;
  $('#ok').onclick = closeModal; $('#ok').focus(); confetti();
}

/* ---------- My registrations ---------- */
function renderMine(){
  const regs = load();
  $('#mine').innerHTML = regs.length ? regs.map(r => { const e = EVENTS.find(x => x.id===r.eventId);
    return `<div class="reg"><div><b>${e.name}</b><small>${fmt(e.date)} · Code ${r.ref}</small></div><button class="link" data-ref="${r.ref}">Cancel</button></div>`; }).join('')
    : '<p class="empty">You have not registered for anything yet. Pick an event above to get started.</p>';
}
$('#mine').onclick = e => { const ref = e.target.dataset.ref; if(!ref) return;
  save(load().filter(r => r.ref!==ref)); renderMine(); toast('Registration cancelled'); };
function toast(t){ const el = $('#toast'); el.textContent = t; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2400); }

document.addEventListener('error', e => {
  if(!e.target.classList?.contains('event-image')) return;
  const banner = e.target.closest('.event-banner');
  e.target.remove();
  banner?.classList.add('image-fallback');
}, true);

render(); renderMine(); reveal();