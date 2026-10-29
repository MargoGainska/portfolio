(function(){
// Shared motion + theme helpers for the portfolio pages.
const EASE = 'cubic-bezier(.16,1,.3,1)';
const bound = new WeakSet();
const once = (el) => { if (bound.has(el)) return false; bound.add(el); return true; };
let booted = false;
const prefersReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function getTheme() { return document.documentElement.dataset.theme || 'dark'; }

function toggleTheme(e) {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('mg-theme', next); } catch (_) {}
    window.dispatchEvent(new CustomEvent('mg-theme', { detail: next }));
  };
  if (!document.startViewTransition || prefersReduced()) { apply(); return; }
  const x = e && e.clientX ? e.clientX : innerWidth - 40;
  const y = e && e.clientY ? e.clientY : 40;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(apply);
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});
}

function initMotion(opts = {}) {
  const subtle = opts.subtle || prefersReduced();
  const cleanups = [];
  const q = (s) => Array.from(document.querySelectorAll(s));
  const dist = subtle ? 16 : 48;

  // Smooth eased scrolling for in-page links
  const onAnchor = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1); const t = id && document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    const y0 = window.scrollY, y1 = Math.max(0, t.getBoundingClientRect().top + y0 - 96);
    if (prefersReduced()) { window.scrollTo(0, y1); return; }
    const d = Math.min(1600, 700 + Math.abs(y1 - y0) * 0.35), t0 = performance.now();
    window.__mgOwnScroll = t0 + d + 150;
    const ease = (p) => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const step = (now) => { const p = Math.min(1, (now - t0) / d); window.scrollTo(0, y0 + (y1 - y0) * ease(p)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  document.addEventListener('click', onAnchor);
  cleanups.push(() => document.removeEventListener('click', onAnchor));

  // Hero line rises
  q('[data-rise]').forEach((el, i) => {
    if (prefersReduced() || booted) return;
    const d = el.dataset.rise ? +el.dataset.rise : i * 90;
    el.animate([{ transform: 'translateY(108%) rotate(2deg)' }, { transform: 'none' }],
      { duration: subtle ? 700 : 1300, delay: 120 + d, easing: EASE, fill: 'backwards' });
  });

  // Scroll reveals
  const fromFor = (kind) => {
    if (kind === 'clip') return { clipPath: 'inset(100% 0% 0% 0% round 28px)' };
    if (kind === 'scale') return { transform: 'scale(1.06)', opacity: 0 };
    if (kind === 'fade') return { opacity: 0 };
    if (kind === 'left') return { transform: `translateX(-${dist}px)`, opacity: 0 };
    return { transform: `translateY(${dist}px)`, opacity: 0 };
  };
  const toFor = (kind) => kind === 'clip' ? { clipPath: 'inset(0% 0% 0% 0% round 28px)' } : { transform: 'none', opacity: 1 };
  const countUp = (el) => {
    const orig = el.textContent;
    const m = orig.match(/(\d+(?:\.\d+)?)/);
    if (!m || prefersReduced()) return;
    const target = parseFloat(m[1]);
    const dec = (m[1].split('.')[1] || '').length;
    const t0 = performance.now(); const dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 4);
      el.textContent = orig.replace(m[1], (target * e).toFixed(dec));
      if (p < 1) requestAnimationFrame(step); else el.textContent = orig;
    };
    requestAnimationFrame(step);
  };
  const reveal = (el) => {
    const kind = el.dataset.reveal || 'up';
    el.style.opacity = el.dataset.o0 || '';
    if (kind === 'clip') el.style.clipPath = '';
    if (!prefersReduced()) {
      el.animate([fromFor(kind), toFor(kind)],
        { duration: kind === 'clip' ? (subtle ? 800 : 1400) : (subtle ? 600 : 1100), delay: +(el.dataset.delay || 0), easing: EASE, fill: 'backwards' });
    }
    if (el.hasAttribute('data-count')) countUp(el);
    el.querySelectorAll('[data-count]').forEach(countUp);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); reveal(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  q('[data-reveal]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top > innerHeight * 0.92) {
      el.dataset.o0 = el.style.opacity;
      el.style.opacity = '0';
      io.observe(el);
    } else reveal(el);
  });
  cleanups.push(() => io.disconnect());

  // Marquees
  q('[data-marquee]').forEach((el) => {
    if (!once(el)) return;
    const dur = +(el.dataset.marquee || 30) * 1000;
    const a = el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: subtle ? dur * 1.6 : dur, iterations: Infinity, easing: 'linear' });
    el.addEventListener('mouseenter', () => a.updatePlaybackRate(0.25));
    el.addEventListener('mouseleave', () => a.updatePlaybackRate(1));
  });

  // Scroll-linked: parallax, scrub, stack, progress, nav
  const parallax = q('[data-parallax]');
  const scrub = q('[data-scrub]');
  const stacks = q('[data-stack]');
  const bars = q('[data-progress]');
  const nav = document.querySelector('[data-nav]');
  let lastY = scrollY; let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = scrollY; const vh = innerHeight;
      if (!prefersReduced()) {
        parallax.forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          const c = (r.top + r.height / 2 - vh / 2) / vh;
          el.style.transform = `translate3d(0, ${(-c * (+el.dataset.parallax || 0.1) * (subtle ? 0.4 : 1) * 100).toFixed(2)}px, 0)`;
        });
        scrub.forEach((el) => {
          const p = Math.min(1, Math.max(0, y / vh));
          el.style.transform = `translate3d(0, ${p * (subtle ? 30 : 120)}px, 0) scale(${1 - p * 0.06})`;
          el.style.opacity = String(1 - p * 0.85);
        });
        stacks.forEach((el, i) => {
          const next = stacks[i + 1]; const inner = el.firstElementChild;
          if (!next || !inner) return;
          if (getComputedStyle(el).position !== 'sticky') { inner.style.transform = ''; inner.style.filter = ''; return; }
          const top = parseFloat(getComputedStyle(el).top) || 0;
          const nr = next.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, 1 - (nr.top - top) / (vh - top)));
          inner.style.transform = `scale(${1 - p * 0.06})`;
          inner.style.filter = `brightness(${1 - p * 0.35})`;
        });
      }
      const max = document.documentElement.scrollHeight - vh;
      bars.forEach((b) => { b.style.transform = `scaleX(${max > 0 ? y / max : 0})`; });
      if (nav) nav.style.transform = 'none';
      lastY = y;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
  cleanups.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); });

  // Custom cursor
  const dot = document.querySelector('[data-cursor-dot]');
  const label = document.querySelector('[data-cursor-label]');
  const fine = matchMedia('(pointer: fine)').matches;
  if (dot && fine && opts.cursor !== false) {
    document.body.classList.add('mg-cursor');
    dot.style.display = 'flex';
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, size = 12, ts = 12, raf, bo = 0, tbo = 0;
    const arrow = document.querySelector('[data-cursor-arrow]');
    if (label) label.style.display = 'none';
    let badge = document.querySelector('[data-cursor-badge]');
    if (!badge) {
      badge = document.createElement('div');
      badge.setAttribute('data-cursor-badge', '');
      badge.style.cssText = "position:fixed;left:0;top:0;z-index:101;pointer-events:none;padding:8px 14px;border-radius:999px;background:var(--fg);color:var(--bg);font-family:Geist,ui-sans-serif,system-ui,sans-serif;font-size:14px;font-weight:500;letter-spacing:-0.01em;white-space:nowrap;opacity:0;will-change:transform,opacity";
      document.body.appendChild(badge);
    }
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      const t = e.target.closest && e.target.closest('[data-cursor], a, button, image-slot');
      if (t && t.tagName !== 'IMAGE-SLOT') {
        const big = !!t.dataset.cursor;
        ts = big ? 84 : 40;
        const href = t.getAttribute('href') || '';
        let rot = 0;
        if (href.startsWith('#')) {
          const dest = href.length > 1 && document.getElementById(href.slice(1));
          rot = dest && dest.getBoundingClientRect().top < -2 ? -45 : 135;
        }
        if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'rotate(' + rot + 'deg) scale(' + (big ? 1 : 0.62) + ')'; }
        if (big) { if (badge.textContent !== t.dataset.cursor) badge.textContent = t.dataset.cursor; tbo = 1; } else tbo = 0;
      } else {
        ts = 12; tbo = 0;
        if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'rotate(-45deg) scale(.3)'; }
      }
    };
    const loop = () => {
      const k = subtle ? 0.35 : 0.18;
      cx += (mx - cx) * k; cy += (my - cy) * k; size += (ts - size) * 0.18; bo += (tbo - bo) * 0.2;
      dot.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`;
      dot.style.width = dot.style.height = size + 'px';
      const bx = cx + size / 2 + 10, by = cy - size / 2 - 6;
      badge.style.opacity = bo.toFixed(3);
      badge.style.transform = `translate3d(${bx}px, ${by}px, 0) scale(${0.85 + 0.15 * bo})`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move); loop();
    const leave = () => { dot.style.opacity = '0'; }; const enter = () => { dot.style.opacity = '1'; };
    document.addEventListener('mouseleave', leave); document.addEventListener('mouseenter', enter);
    cleanups.push(() => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); document.body.classList.remove('mg-cursor'); dot.style.display = 'none'; badge.style.opacity = '0'; });
  }

  // Magnetic elements
  if (fine && !subtle) {
    q('[data-magnetic]').forEach((el) => {
      if (!once(el)) return;
      const s = +(el.dataset.magnetic || 0.3);
      const mv = (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`;
      };
      const out = () => { el.style.transform = ''; };
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', out);
    });
  }

  // Hover zoom: [data-zoom] parent scales its [data-zoom-target]
  q('[data-zoom]').forEach((el) => {
    const t = el.querySelector('[data-zoom-target]'); if (!t || !once(el)) return;
    t.style.transition = 'transform 1.2s cubic-bezier(.16,1,.3,1)';
    el.addEventListener('pointerenter', () => { t.style.transform = 'scale(1.035)'; });
    el.addEventListener('pointerleave', () => { t.style.transform = ''; });
  });

  // TOC active state
  const links = q('[data-toc]');
  if (links.length) {
    const setActive = (id) => links.forEach((l) => {
      const on = l.dataset.toc === id;
      l.style.color = on ? 'var(--fg)' : 'var(--mut)';
      const bar = l.querySelector('[data-toc-bar]'); if (bar) bar.style.width = on ? '22px' : '8px';
    });
    const sio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' });
    links.forEach((l) => { const s = document.getElementById(l.dataset.toc); if (s) sio.observe(s); });
    cleanups.push(() => sio.disconnect());
  }

  // Horizontal scrollers with buttons
  q('[data-scroller-prev],[data-scroller-next]').forEach((b) => {
    const id = b.dataset.scrollerPrev || b.dataset.scrollerNext;
    const el = document.getElementById(id); if (!el || !once(b)) return;
    b.addEventListener('click', () => el.scrollBy({ left: (b.dataset.scrollerNext ? 1 : -1) * el.clientWidth * 0.8, behavior: 'smooth' }));
  });

  // Local clock
  const clocks = q('[data-clock]');
  const tick = () => {
    const s = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Helsinki' }).format(new Date());
    clocks.forEach((c) => { c.textContent = s; });
  };
  if (clocks.length) { tick(); const iv = setInterval(tick, 15000); cleanups.push(() => clearInterval(iv)); }

  // Block page jumps caused by prototypes (focus / scrollIntoView inside autoplaying iframes)
  if (!window.__mgJumpGuard) {
    window.__mgJumpGuard = true;
    let lastUser = 0, anchorY = window.scrollY;
    const mark = (e) => { if (!e || e.isTrusted !== false) { lastUser = performance.now(); } };
    ['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown', 'mousedown'].forEach((ev) => window.addEventListener(ev, mark, { passive: true, capture: true }));
    window.addEventListener('message', (e) => { if (e.data === 'mg-user') mark(); });
    window.addEventListener('scroll', () => {
      const now = performance.now(), y = window.scrollY;
      const own = (window.__mgOwnScroll || 0) > now;
      const modal = document.documentElement.style.overflow === 'hidden' || document.body.style.overflow === 'hidden';
      if (own || modal || now - lastUser < 1200) { anchorY = y; return; }
      if (Math.abs(y - anchorY) > 24) window.scrollTo({ top: anchorY, behavior: 'instant' });
    }, { passive: true });
  }

  // Fade prototypes in once loaded and painted
  q('iframe').forEach((f) => {
    if (f.dataset.mgFade) return; f.dataset.mgFade = '1';
    const show = () => setTimeout(() => { f.style.opacity = '1'; }, 220);
    let done = false; try { done = f.contentDocument && f.contentDocument.readyState === 'complete' && f.contentDocument.body && f.contentDocument.body.childElementCount > 0; } catch (e) { done = true; }
    if (done) return;
    f.style.opacity = '0'; f.style.transition = 'opacity .6s cubic-bezier(.16,1,.3,1)';
    f.addEventListener('load', show, { once: true });
    setTimeout(() => { f.style.opacity = '1'; }, 6000);
  });
  document.documentElement.classList.add('mg-ready');
  booted = true;
  return () => cleanups.forEach((f) => f());
}

window.MGMotion = { getTheme, toggleTheme, initMotion };
})();
