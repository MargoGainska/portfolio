const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let cur, arrow;
function ensureCursor() {
  if (cur) return;
  const st = document.createElement('style');
  st.textContent = '@keyframes apRipple{0%{transform:scale(.4);opacity:.9}100%{transform:scale(1.6);opacity:0}}';
  document.head.appendChild(st);
  cur = document.createElement('div');
  cur.style.cssText = 'position:fixed;left:0;top:0;z-index:99999;pointer-events:none;transform:translate(' + (innerWidth * 0.6) + 'px,' + (innerHeight * 0.7) + 'px);transition:transform 900ms cubic-bezier(.45,0,.2,1);will-change:transform';
  cur.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" style="display:block;filter:drop-shadow(0 2px 3px rgba(16,24,40,.3));transition:transform 140ms ease-out"><path d="M5 3l14 7.5-6.2 1.6L10 18.5z" fill="#152F25" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"></path></svg>';
  document.body.appendChild(cur);
  arrow = cur.firstChild;
}
const visible = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight; };
function byText(text, { last = false, tags = 'button,a,span,div,label' } = {}) {
  const all = [...document.querySelectorAll(tags)].filter((e) => e.textContent.trim() === text && visible(e));
  const leaves = all.filter((e) => !all.some((o) => o !== e && e.contains(o)));
  const list = leaves.length ? leaves : all;
  return last ? list[list.length - 1] : list[0];
}
async function find(q, opts, timeout = 8000) {
  const t0 = performance.now();
  while (performance.now() - t0 < timeout) {
    const el = typeof q === 'function' ? q() : byText(q, opts);
    if (el) return el;
    await wait(150);
  }
  return null;
}
async function point(el, fx = 0.5, fy = 0.5) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = r.left + r.width * fx - 5, y = r.top + r.height * fy - 3;
  const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(cur.style.transform || '');
  const d = m ? Math.hypot(x - +m[1], y - +m[2]) : 600;
  const ms = Math.round(Math.max(380, Math.min(900, 300 + d * 0.9)));
  cur.style.transition = 'transform ' + ms + 'ms cubic-bezier(.45,0,.2,1)';
  cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  await wait(ms + 60);
}
async function click(el) {
  arrow.style.transform = 'scale(.82)';
  const rp = document.createElement('span');
  rp.style.cssText = 'position:absolute;left:-9px;top:-11px;width:28px;height:28px;border-radius:99px;border:2px solid #099250;box-sizing:border-box;animation:apRipple 560ms ease-out both';
  cur.appendChild(rp);
  await wait(150);
  arrow.style.transform = '';
  setTimeout(() => rp.remove(), 600);
  if (el) {
    el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    el.click();
  }
  await wait(250);
}
async function hover(el) {
  if (!el) return;
  await point(el);
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  ['pointerover', 'pointerenter', 'mouseover', 'mouseenter', 'mousemove'].forEach((t) => el.dispatchEvent(new MouseEvent(t, { bubbles: t !== 'mouseenter' && t !== 'pointerenter', clientX: cx, clientY: cy })));
}
async function tap(q, opts, fx, fy) { const el = await find(q, opts); await point(el, fx, fy); await click(el); return el; }


function setNative(el, v) {
  const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, String(v));
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
async function typeInto(el, text, speed = 55) {
  if (!el) return;
  el.focus();
  for (let i = 1; i <= text.length; i++) { setNative(el, text.slice(0, i)); await wait(speed + (text[i - 1] === ' ' ? 40 : 0)); }
}
async function slide(el, to, steps = 8) {
  if (!el) return;
  const from = +el.value, min = +el.min || 0, max = +el.max || 100;
  const px = (v) => (v - min) / (max - min);
  await point(el, px(from), 0.5);
  arrow.style.transform = 'scale(.82)';
  for (let i = 1; i <= steps; i++) {
    const v = Math.round(from + (to - from) * i / steps);
    const r = el.getBoundingClientRect();
    cur.style.transition = 'transform 90ms linear';
    cur.style.transform = 'translate(' + (r.left + r.width * px(v) - 5) + 'px,' + (r.top + r.height / 2 - 3) + 'px)';
    setNative(el, v); await wait(110);
  }
  arrow.style.transform = ''; cur.style.transition = 'transform 900ms cubic-bezier(.45,0,.2,1)';
  await wait(300);
}

const SCRIPTS = {
  async vision() {
    await wait(1400);
    const q = 'Carbapenem-resistant Klebsiella in the last month';
    const inp = await find(() => document.querySelector('input[placeholder="Describe what you want to look at…"]'));
    await point(inp, 0.5, 0.5); await click(inp);
    { const r = inp.getBoundingClientRect(); cur.style.transform = 'translate(' + (r.right - 60) + 'px,' + (r.bottom + 26) + 'px)'; }
    await typeInto(inp, q, 45); setNative(inp, q);
    await wait(700);
    const go = [...document.querySelectorAll('button')].find((b) => { const r = b.getBoundingClientRect(), ir = inp.getBoundingClientRect(); return visible(b) && r.left > ir.right - 4 && Math.abs((r.top + r.height / 2) - (ir.top + ir.height / 2)) < 30; });
    if (go) { await point(go); await click(go); } else inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await find(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Create view' && visible(b)), null, 6000);
    await wait(700);
    const ta = [...document.querySelectorAll('textarea')].find((e) => visible(e));
    if (ta) { if (!ta.value) setNative(ta, q); await hover(ta); await wait(1400); }
    const card = [...document.querySelectorAll('div,button')].find((e) => e.textContent.trim().startsWith('Compare isolates') && e.children.length >= 1 && visible(e) && e.getBoundingClientRect().height < 120);
    if (card) { await point(card, 0.3); await click(card); await wait(1400); }
    const cb = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Create view' && visible(b));
    await point(cb); await click(cb);
    await wait(2600);
    const chip = null;
    const sp = await find(() => [...document.querySelectorAll('div,span')].find((e) => e.textContent.trim() === '1 selected' && visible(e)), null, 2500);
    if (sp) { await hover(sp); await wait(1500); }
    if (chip) {
      await hover(chip); await wait(600);
      const r = chip.getBoundingClientRect();
      const x = [...document.querySelectorAll('button,span,svg')].find((e) => { const b = e.getBoundingClientRect(); return visible(e) && b.width < 24 && b.left >= r.right - 26 && b.left <= r.right + 6 && Math.abs((b.top + b.height / 2) - (r.top + r.height / 2)) < 10; });
      await point(x || chip, x ? 0.5 : 0.92); await click(x || chip);
      await wait(1600);
    }
    const save = await find(() => [...document.querySelectorAll('button')].find((b) => /^Save (changes|view)$/.test(b.textContent.trim()) && visible(b)), null, 2500);
    if (save) { await point(save); await click(save); await wait(1200);
      const ds = [...document.querySelectorAll('button')].reverse().find((b) => b.textContent.trim() === 'Save view' && visible(b)); if (ds && ds !== save) { await point(ds); await click(ds); } }
    await wait(2600);
  },
  async flow() {
    await wait(1400);
    await tap(() => [...document.querySelectorAll('button')].filter((b) => b.textContent.trim() === 'Compare' && visible(b)).sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0]);
    await find(() => [...document.querySelectorAll('div')].find((e) => /^Scroll to zoom, drag to pan/.test(e.textContent.trim()) && visible(e)), null, 30000);
    await wait(3400);
    await tap('Alignment');
    await wait(1800);
    const marks = () => [...document.querySelectorAll('g')].filter((g) => g.style.cursor === 'pointer' && g.querySelector(':scope > circle') && g.querySelector(':scope > text')).filter((g) => { const b = g.getBoundingClientRect(); return b.width > 0 && b.left > 10 && b.right < innerWidth - 10 && b.top > 10 && b.bottom < innerHeight - 10; });
    const ms = await find(() => { const m = marks(); return m.length ? m : null; }, null, 5000);
    if (ms && ms.length) {
      const mk = ms.find((g) => /≠/.test(g.textContent)) || ms[Math.floor(ms.length / 2)];
      await hover(mk); await wait(1500);
      await point(mk); arrow.style.transform = 'scale(.82)'; await wait(140); arrow.style.transform = '';
      mk.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      ['mouseout', 'mouseleave'].forEach((t) => mk.dispatchEvent(new MouseEvent(t, { bubbles: t !== 'mouseleave' })));
      await wait(1600);
    }
    const scroller = () => [...document.querySelectorAll('.pc-scroll')].find((e) => e.querySelector('rect') && visible(e));
    const inView = (r) => { const sc = scroller(); if (!sc) return false; const a = sc.getBoundingClientRect(), b = r.getBoundingClientRect(); return b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom; };
    const bases = () => [...document.querySelectorAll('rect')].filter((r) => r.style.cursor === 'help');
    const all = await find(() => { const b = bases(); return b.length ? b : null; }, null, 4000);
    if (all && all.length) {
      const perRow = Math.ceil(all.length / 2), mid = Math.floor(perRow / 2);
      const sc = scroller(), diff = all[mid];
      if (sc && diff) { const a = sc.getBoundingClientRect(), b = diff.getBoundingClientRect(); sc.scrollLeft += (b.left + b.width / 2) - (a.left + a.width / 2); await wait(300); }
      const onScreen = (r) => { const b = r.getBoundingClientRect(); return b.width > 0 && b.left > 40 && b.right < innerWidth - 40 && b.top > 40 && b.bottom < innerHeight - 40; };
      const cand = bases().filter(onScreen);
      const isDiff = (r) => { const p = r.previousElementSibling; let s = r; for (let k = 0; k < 4 && s; k++) { s = s.previousElementSibling; if (s && s.tagName === 'rect' && /F79009|FDB022|FEC84B|FEF0C7|FFFAEB|FEDF89/i.test((s.getAttribute('fill') || '') + (s.getAttribute('stroke') || ''))) return true; } return false; };
      const hl = cand.filter(isDiff);
      const pick = hl[hl.length - 1] || (all[perRow + mid] && onScreen(all[perRow + mid]) ? all[perRow + mid] : cand[Math.floor(cand.length / 2)]);
      if (pick) { await hover(pick); await wait(2600); ['mouseout', 'mouseleave'].forEach((t) => pick.dispatchEvent(new MouseEvent(t, { bubbles: t !== 'mouseleave' }))); }
    }
    await wait(1200);
    await tap('Network');
    await wait(3000);
  },
  async focus() {
    const post = (k) => { try { parent.postMessage({ type: 'ap-step', key: k }, '*'); } catch (e) {} };
    const wrap = () => [...document.querySelectorAll('div')].find((d) => d.style.cursor === 'grab' && d.querySelector('svg'));
    const geneAt = (color, idx = 0) => { const w = wrap(); if (!w) return null; const els = [...w.querySelectorAll('path,rect,polygon')].filter((p) => (p.getAttribute('fill') || '').toUpperCase() === color && p.getBoundingClientRect().width > 2); return els[idx] || els[0] || null; };
    const moveOver = async (el) => {
      if (!el) return; const w = wrap(); const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
      cur.style.transform = 'translate(' + (x - 5) + 'px,' + (y - 3) + 'px)'; await wait(950);
      for (let i = 0; i < 3; i++) { w.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: x + i, clientY: y, pointerType: 'mouse' })); await wait(60); }
    };
    const leaveMap = () => { const w = wrap(); if (!w) return; const r = w.getBoundingClientRect(); w.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: r.left + 4, clientY: r.top + 4, pointerType: 'mouse' })); w.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, relatedTarget: document.body, pointerType: 'mouse' })); w.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body })); };
    const unhover = (el) => el && ['mouseout', 'mouseleave', 'pointerout', 'pointerleave'].forEach((t) => el.dispatchEvent(new MouseEvent(t, { bubbles: t.endsWith('out') })));
    await wait(1600);
    post('danger');
    const amrBtns = () => [...document.querySelectorAll('button')].filter((b) => b.querySelector('span[style*="italic"]'));
    const panel = () => { const b = amrBtns()[0]; let p = b && b.parentElement; while (p && !(getComputedStyle(p).overflowY === 'auto' && p.scrollHeight > p.clientHeight)) p = p.parentElement; return p; };
    const scrollPanel = async (to) => { const p = panel(); if (!p) return; p.style.scrollBehavior = 'smooth'; p.scrollTop = to === 'amr' ? Math.max(0, amrBtns()[0].offsetTop - 60) : 0; await wait(700); };
    await find(() => amrBtns()[0]);
    await scrollPanel('amr');
    let b1 = await find(() => amrBtns()[0]); await hover(b1); await wait(1700); unhover(b1);
    await scrollPanel('top');
    post('focus');
    await moveOver(geneAt('#155EEF', 0) || geneAt('#2E90FA', 0)); await wait(2000);
    leaveMap();
    const btnOf = (lbl) => [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === lbl);
    const isOn = (b) => !/line-through/.test(b.getAttribute('style') || '');
    const toggle = async (lbl, want) => {
      let b0 = btnOf(lbl); if (!b0) return;
      const p = panel(); if (p) { const pr = p.getBoundingClientRect(), br = b0.getBoundingClientRect(); if (br.bottom > pr.bottom - 8 || br.top < pr.top) { p.style.scrollBehavior = 'smooth'; p.scrollTop += br.top - pr.top - 40; await wait(600); } }
      await hover(btnOf(lbl)); await wait(650);
      arrow.style.transform = 'scale(.82)'; await wait(110); arrow.style.transform = '';
      for (let i = 0; i < 3; i++) { const b1 = btnOf(lbl); if (!b1 || isOn(b1) === want) break; b1.click(); await wait(120); }
      unhover(btnOf(lbl));
    };
    post('jargon');
    await scrollPanel('top');
    await toggle('GC content', false); await wait(1400); await toggle('GC content', true); await wait(400);
    await toggle('IS', false); await wait(1400); await toggle('IS', true); await wait(500);
    post(null);
    await wait(600);
  },
  report: async () => {
    const scroller = (el) => { let p = el && el.parentElement; while (p && p !== document.body) { const cs = getComputedStyle(p); if (/(auto|scroll)/.test(cs.overflowY) && p.scrollHeight > p.clientHeight + 4) return p; p = p.parentElement; } return null; };
    const reveal = async (el, off = 120) => { const p = scroller(el); if (!p || !el) return; p.style.scrollBehavior = 'smooth'; p.scrollTop = Math.max(0, el.getBoundingClientRect().top - p.getBoundingClientRect().top + p.scrollTop - off); await wait(900); };
    const card = (name) => [...document.querySelectorAll('.bp-card')].find((c) => (c.querySelector('.bp-card-name') || c).textContent.trim() === name);
    await wait(900);
    const ws = document.querySelector('.workspace-simple');
    const wsTo = async (y) => { if (!ws) return; ws.style.scrollBehavior = 'smooth'; ws.scrollTop = y === 'end' ? ws.scrollHeight : y; await wait(1000); };
    for (const name of ['Antimicrobial resistance', 'Phylogenetic tree']) {
      const tab = [...document.querySelectorAll('.bp-tab')].find((t) => t.textContent.trim() === 'Blocks');
      if (tab && !tab.className.includes('on')) { await point(tab); await click(tab); await wait(500); }
      const c = await find(() => card(name), {}, 4000);
      if (!c) continue;
      await reveal(c, 80);
      await point(c); await click(c); await wait(700);
      await wsTo('end'); await wait(1500);
    }
    await wsTo(0);
    const top = document.querySelector('.vstep-row');
    if (top) await reveal(top, 40);
    await tap(() => [...document.querySelectorAll('button.vstep')].find((b) => /Add private details/.test(b.textContent)));
    await wait(2200);
    await tap(() => [...document.querySelectorAll('button.vstep')].find((b) => /Auto-saved/.test(b.textContent)));
    await wait(900);
    await tap('Preview'); await wait(1600);
    const pv = document.querySelector('.paper') || document.querySelector('.workspace-simple');
    const sp = scroller(pv);
    if (sp) { sp.style.scrollBehavior = 'smooth'; sp.scrollTop = sp.scrollHeight * 0.45; await wait(1800); sp.scrollTop = 0; await wait(1000); }
    await tap(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Export' && b.className.includes('primary')));
    await wait(1200);
    const fmt = document.querySelector('.export-format');
    if (fmt) { await hover(fmt); await wait(1600); }
    await wait(800);
  },
};

export async function run(name) {
  if (window.__apRunning) return;
  window.__apRunning = true;
  ensureCursor();
  try { await SCRIPTS[name](); } catch (e) { console.warn('autoplay', e); }
  cur.style.transform = 'translate(' + (innerWidth + 40) + 'px,' + (innerHeight * 0.7) + 'px)';
  await wait(900);
  location.reload();
}
