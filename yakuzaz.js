/* ============================================================
   YAKUZAZ.JS — Cinematic Scroll Orchestration v1.0
   Lenis · GSAP · Splitting.js · Manifesto Animations
   "The blade awaits your command."
   ============================================================ */

(function () {
  'use strict';
  if (window.__YK_JS__) return;
  window.__YK_JS__ = true;

  /* ── Utilities ─────────────────────────────────────────── */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const mobile = () => window.innerWidth < 768;

  /* ─────────────────────────────────────────────────────────
     1.  LENIS SMOOTH SCROLL
         Integrated properly with GSAP ScrollTrigger
  ───────────────────────────────────────────────────────── */
  function initLenis() {
    if (typeof Lenis === 'undefined') return null;

    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    // Connect to GSAP ticker so ScrollTrigger updates with Lenis
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Connect Lenis to ScrollTrigger scroll events
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    return lenis;
  }

  /* ─────────────────────────────────────────────────────────
     2.  HERO HEADLINE ANIMATION
         Each line word slides up from below its clip container
  ───────────────────────────────────────────────────────── */
  function initHeroAnimation() {
    if (typeof gsap === 'undefined') return;

    const words = $$('.yk-headline-word');
    if (!words.length) {
      // Fallback: wrap each line content
      $$('.yk-headline-line').forEach(line => {
        const text = line.textContent.trim();
        line.textContent = '';
        const word = document.createElement('span');
        word.className = 'yk-headline-word';
        word.textContent = text;
        line.appendChild(word);
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.3
    });

    tl.from('.yk-headline-word', {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.18,
    })
    .from('.yk-eyebrow', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.yk-sub',     { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
    .from('.yk-cta-group', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.yk-hero-stats', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
    .from('.yk-search-wrap', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
    .from('.yk-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.yk-hero-art', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'power2.out' }, '-=1.0');
  }

  /* ─────────────────────────────────────────────────────────
     3.  MANIFESTO PANEL ANIMATIONS
         Each panel's headline, body, and stat animate on scroll
  ───────────────────────────────────────────────────────── */
  function initManifestoAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    $$('.yk-manifesto-panel').forEach((panel, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 72%',
          once: true,
        }
      });

      tl.from(panel.querySelector('.yk-panel-counter'), {
          opacity: 0, x: -20, duration: 0.5, ease: 'power2.out'
        })
        .from(panel.querySelector('.yk-panel-tag'), {
          opacity: 0, x: -20, duration: 0.5, ease: 'power2.out'
        }, '-=0.3')
        .from(panel.querySelector('.yk-panel-headline'), {
          opacity: 0, y: 50, duration: 1.0, ease: 'power4.out'
        }, '-=0.3')
        .from(panel.querySelector('.yk-panel-body'), {
          opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
        }, '-=0.6');

      // Animate stat/chain/cta if present
      const extra = panel.querySelector('.yk-panel-stat, .yk-chain, .yk-panel-cta');
      if (extra) {
        tl.from(extra, { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' }, '-=0.4');
      }

      // Chain fill animation on panel 2
      const fill = panel.querySelector('.yk-chain-fill');
      if (fill) {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          once: true,
          onEnter: () => fill.classList.add('animated')
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     4.  IMPACT STATS — animated count-up
  ───────────────────────────────────────────────────────── */
  function initCounters() {
    const counters = $$('.yk-stat-num[data-target], .stat-number[data-target]');
    if (!counters.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const dur = 1800;
        const start = performance.now();
        const run = now => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(target * ease);
          if (p < 1) requestAnimationFrame(run);
          else el.textContent = target;
        };
        requestAnimationFrame(run);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
  }

  /* ─────────────────────────────────────────────────────────
     5.  GENERAL SECTION REVEAL — yk-reveal class
  ───────────────────────────────────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('.yk-reveal').forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────────────────────
     6.  TEXT SCRAMBLE on SECTION TAGS
  ───────────────────────────────────────────────────────── */
  const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?';
  function scramble(el) {
    if (el._scr) return;
    el._scr = true;
    const orig = el.textContent;
    let it = 0;
    const id = setInterval(() => {
      el.textContent = orig.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < it / 2) return c;
        return POOL[Math.floor(Math.random() * POOL.length)];
      }).join('');
      if (it++ > orig.length * 2.5) { clearInterval(id); el.textContent = orig; el._scr = false; }
    }, 25);
  }

  function initScramble() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { scramble(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.7 });
    $$('.section-tag, .yk-panel-tag').forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────────────────────
     7.  MAGNETIC BUTTONS (desktop)
  ───────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (mobile()) return;
    $$('.yk-btn-primary, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        btn.style.transform = `translate(${dx * 7}px,${dy * 7}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
        btn.style.transform  = '';
        setTimeout(() => btn.style.transition = '', 520);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     8.  HERO SEARCH — dark skin v2
         Reuses the existing SEARCH_DATA from main.js or inline
  ───────────────────────────────────────────────────────── */
  function initDarkSearch() {
    const input   = document.getElementById('vegSearchInput');
    const results = document.getElementById('searchResults');
    if (!input || !results) return;

    const VEGS = [
      { k:'spinach',      n:'Spinach',      a:'Palak',       e:'🥬', c:'Leafy' },
      { k:'coriander',    n:'Coriander',    a:'Dhaniya',     e:'🌿', c:'Leafy' },
      { k:'fenugreek',    n:'Fenugreek',    a:'Methi',       e:'🌱', c:'Leafy' },
      { k:'mint',         n:'Mint',         a:'Pudina',      e:'🍃', c:'Leafy' },
      { k:'lettuce',      n:'Lettuce',      a:'Salad Patta', e:'🥬', c:'Leafy' },
      { k:'carrot',       n:'Carrot',       a:'Gajar',       e:'🥕', c:'Root' },
      { k:'radish',       n:'Radish',       a:'Mooli',       e:'🫚', c:'Root' },
      { k:'beetroot',     n:'Beetroot',     a:'Chukandar',   e:'🫀', c:'Root' },
      { k:'potato',       n:'Potato',       a:'Aloo',        e:'🥔', c:'Tuber' },
      { k:'sweet-potato', n:'Sweet Potato', a:'Shakarkandi', e:'🍠', c:'Tuber' },
      { k:'tomato',       n:'Tomato',       a:'Tamatar',     e:'🍅', c:'Fruiting' },
      { k:'capsicum',     n:'Capsicum',     a:'Shimla Mirch',e:'🫑', c:'Fruiting' },
      { k:'chilly',       n:'Green Chilly', a:'Hari Mirch',  e:'🌶️', c:'Fruiting' },
      { k:'brinjal',      n:'Brinjal',      a:'Baingan',     e:'🍆', c:'Fruiting' },
      { k:'bitter-gourd', n:'Bitter Gourd', a:'Karela',      e:'🥒', c:'Fruiting' },
      { k:'banana',       n:'Banana',       a:'Kela',        e:'🍌', c:'Fruit' },
      { k:'guava',        n:'Guava',        a:'Amrood',      e:'🍐', c:'Fruit' },
      { k:'pomegranate',  n:'Pomegranate',  a:'Anar',        e:'🔴', c:'Fruit' },
    ];

    let active = -1;

    function search(q) {
      if (!q) return [];
      const ql = q.toLowerCase();
      return VEGS.filter(v =>
        v.n.toLowerCase().includes(ql) || v.a.toLowerCase().includes(ql) || v.k.includes(ql)
      ).slice(0, 6);
    }

    function render(res) {
      if (!res.length) {
        results.innerHTML = '<div class="yk-search-item" style="justify-content:center;color:var(--yk-grey)">No match — try "Palak" or "Tamatar"</div>';
        results.classList.add('open'); return;
      }
      results.innerHTML = res.map((v, i) => `
        <a class="yk-search-item" href="product.html?item=${v.k}" data-i="${i}">
          <span class="yk-search-item-emoji">${v.e}</span>
          <span>
            <div class="yk-search-item-name">${v.n}</div>
            <div class="yk-search-item-aka">${v.a} · ${v.c}</div>
          </span>
          <span class="yk-search-item-go">View →</span>
        </a>`).join('');
      results.classList.add('open');
      active = -1;
    }

    function close() { results.classList.remove('open'); results.innerHTML = ''; active = -1; }

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (!q) { close(); return; }
      render(search(q));
    });

    input.addEventListener('keydown', e => {
      const items = results.querySelectorAll('.yk-search-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, items.length - 1); items.forEach((el, i) => el.classList.toggle('active-result', i === active)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); items.forEach((el, i) => el.classList.toggle('active-result', i === active)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (active >= 0 && items[active]) window.location.href = items[active].href; else if (items[0]) window.location.href = items[0].href; }
      else if (e.key === 'Escape') close();
    });

    document.addEventListener('click', e => { if (!e.target.closest('.yk-search-wrap')) close(); });

    // Style active state
    const s = document.createElement('style');
    s.textContent = '.yk-search-item.active-result { background: rgba(74,222,128,0.08); color: var(--yk-green) !important; }';
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────────────────
     9.  LOGO SCRAMBLE on hover
  ───────────────────────────────────────────────────────── */
  function initLogoScramble() {
    const logo = $('.logo-text');
    if (!logo) return;
    const orig = logo.textContent;
    logo.addEventListener('mouseenter', () => scramble(logo));
    logo.addEventListener('mouseleave', () => { if (!logo._scr) logo.textContent = orig; });
  }

  /* ─────────────────────────────────────────────────────────
     10. PARALLAX — hero art drifts on scroll
  ───────────────────────────────────────────────────────── */
  function initParallax() {
    const art = $('.yk-hero-art');
    if (!art || mobile()) return;
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy > 600) return;
      art.style.transform = `translateY(calc(-50% + ${sy * 0.08}px))`;
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────── */
  function init() {
    initLenis();
    initHeroAnimation();
    initManifestoAnimations();
    initCounters();
    initReveal();
    initScramble();
    initMagnetic();
    initDarkSearch();
    initLogoScramble();
    initParallax();
    console.log('⚔ YAKUZAZ orchestration loaded.');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
