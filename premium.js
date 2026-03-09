/* =============================================================
   YAKUZAZ — premium.js v2.0
   SAFE mode: effects layer ON TOP of existing layout.
   Never hides content. Never fights the .reveal system.
   ============================================================= */

(function () {
  'use strict';
  if (window.__YAKUZAZ_LOADED__) return;
  window.__YAKUZAZ_LOADED__ = true;

  const lerp   = (a, b, t) => a + (b - a) * t;
  const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const mobile = () => window.innerWidth < 768 || ('ontouchstart' in window);

  /* ─────────────────────────────────────────────────────────────
     1. CUSTOM CURSOR — desktop only, never hides native cursor
        until DOM is ready; scoped cursor:none to just the html element
  ───────────────────────────────────────────────────────────── */
  function initCursor() {
    if (mobile()) return;

    // Only hide cursor on the html element — avoids breaking input fields
    document.documentElement.style.cursor = 'none';

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.id = 'yk-cursor-dot'; ring.id = 'yk-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2, my = -100;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mousedown', () => { dot.classList.add('pressed'); ring.classList.add('pressed'); });
    document.addEventListener('mouseup',   () => { dot.classList.remove('pressed'); ring.classList.remove('pressed'); });

    function wireHover(selector) {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
    }
    wireHover('a, button, .cat-card, .farmer-card, .veg-chip, .box-chip, .nav-cta, label, input');

    const tick = () => {
      dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`;
      rx = lerp(rx, mx, 0.13); ry = lerp(ry, my, 0.13);
      ring.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ─────────────────────────────────────────────────────────────
     2. HERO CANVAS PARTICLE SYSTEM – never blocks hero content
  ───────────────────────────────────────────────────────────── */
  function initHeroCanvas() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'yk-hero-canvas';
    Object.assign(canvas.style, {
      position: 'absolute', inset: '0',
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '0',
      opacity: '0.45'
    });

    // Make sure hero is positioned
    const hs = getComputedStyle(hero).position;
    if (hs === 'static') hero.style.position = 'relative';

    // Insert canvas BEFORE all hero children so it sits behind content
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H;
    const COUNT    = mobile() ? 38 : 70;
    const LINE_D   = 110;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    class P {
      constructor() { this.reset(true); }
      reset(born) {
        this.x  = Math.random() * W;
        this.y  = born ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r  = Math.random() * 1.8 + 0.7;
        this.a  = Math.random() * 0.5 + 0.25;
      }
      step() {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) { const f = (90 - d) / 90 * 0.7; this.vx += dx / d * f; this.vy += dy / d * f; }
        this.vx *= 0.97; this.vy *= 0.97;
        this.x  += this.vx; this.y += this.vy;
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${this.a})`;
        ctx.fill();
      }
    }

    const pts = Array.from({ length: COUNT }, () => new P());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        pts[i].step();
        pts[i].draw();
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINE_D) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(74,222,128,${(1 - d / LINE_D) * 0.2})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ─────────────────────────────────────────────────────────────
     3. GSAP SCROLL ANIMATIONS — safe: only use gsap.to() 
        on elements that are ALREADY visible. No from(opacity:0).
  ───────────────────────────────────────────────────────────── */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    // Subtle scale-up on stat numbers when they enter view — non-breaking
    document.querySelectorAll('.stat-item').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        scale: 0.8, opacity: 0, duration: 0.55,
        delay: i * 0.1, ease: 'back.out(1.6)',
        clearProps: 'all'  // <-- resets inline styles after animation
      });
    });

    // Farmer cards — stagger slide-up
    gsap.utils.toArray('.farmer-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        y: 40, opacity: 0, duration: 0.65,
        delay: i * 0.1, ease: 'power2.out',
        clearProps: 'all'
      });
    });

    // Smart tools showcase cards
    gsap.utils.toArray('#smart-tools a').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        y: 35, opacity: 0, duration: 0.6,
        delay: i * 0.12, ease: 'power2.out',
        clearProps: 'all'
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4. MAGNETIC BUTTONS — purely additive, no visibility impact
  ───────────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (mobile()) return;
    document.querySelectorAll('.nav-cta, .btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        btn.style.transform = `translate(${dx * 8}px,${dy * 8}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.45s cubic-bezier(.23,1,.32,1)';
        btn.style.transform  = '';
        setTimeout(() => { btn.style.transition = ''; }, 460);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     5. 3D CARD TILT
  ───────────────────────────────────────────────────────────── */
  function initTilt() {
    if (mobile()) return;
    document.querySelectorAll('.cat-card, .farmer-card').forEach(card => {
      const MAX = 7;
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const rx = clamp(((r.height / 2) - (e.clientY - r.top))  / (r.height / 2) * MAX, -MAX, MAX);
        const ry = clamp(((e.clientX - r.left) - (r.width  / 2)) / (r.width  / 2) * MAX, -MAX, MAX);
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.55s cubic-bezier(.23,1,.32,1)';
        card.style.transform  = '';
        setTimeout(() => { card.style.transition = ''; }, 560);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     6. TEXT SCRAMBLE on section tags
  ───────────────────────────────────────────────────────────── */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&*<>?';
  function scramble(el) {
    if (el._scrambling) return;
    el._scrambling = true;
    const orig = el.textContent;
    let it = 0;
    const total = orig.length * 2.5;
    const timer = setInterval(() => {
      el.textContent = orig.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < it / 2) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (it++ >= total) { clearInterval(timer); el.textContent = orig; el._scrambling = false; }
    }, 28);
  }

  function initScramble() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { scramble(e.target); obs.unobserve(e.target); }});
    }, { threshold: 0.7 });
    document.querySelectorAll('.section-tag').forEach(t => obs.observe(t));
  }

  /* ─────────────────────────────────────────────────────────────
     7. LOGO TEXT SCRAMBLE on hover
  ───────────────────────────────────────────────────────────── */
  function initLogoScramble() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    const orig = logo.textContent;
    logo.addEventListener('mouseenter', () => scramble(logo));
    logo.addEventListener('mouseleave', () => { if (!logo._scrambling) logo.textContent = orig; });
  }

  /* ─────────────────────────────────────────────────────────────
     8. VEGGIE TILES float animation (staggered)
  ───────────────────────────────────────────────────────────── */
  function initVegFloat() {
    document.querySelectorAll('.veggie-tile').forEach((t, i) => {
      t.style.animationDelay = `${i * 0.22}s`;
      t.classList.add('yk-float');
    });
  }

  /* ─────────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────────── */
  const ready = fn => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn)
    : fn();

  ready(() => {
    initCursor();
    initHeroCanvas();
    initMagnetic();
    initTilt();
    initScramble();
    initLogoScramble();
    initVegFloat();

    // GSAP after a small delay to ensure page settled
    setTimeout(initGSAP, 300);

    console.log('⚡ YAKUZAZ Premium v2 loaded.');
  });
})();
