/* =============================================================
   YAKUZAZ — premium.js v1.0
   Elite UI: cursor · particles · GSAP · magnetic · 3D tilt · scramble
   ============================================================= */

(function () {
  'use strict';
  if (window.__YAKUZAZ_LOADED__) return;
  window.__YAKUZAZ_LOADED__ = true;

  /* ─────────────────────────────────────────────────────────────
     UTIL
  ───────────────────────────────────────────────────────────── */
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const isMobile = () => window.innerWidth < 768 || ('ontouchstart' in window);

  /* ─────────────────────────────────────────────────────────────
     1. CUSTOM CURSOR (desktop only)
  ───────────────────────────────────────────────────────────── */
  function initCursor() {
    if (isMobile()) return;

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.id  = 'yk-cursor-dot';
    ring.id = 'yk-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let isDown = false;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mousedown', () => { isDown = true; dot.classList.add('pressed'); ring.classList.add('pressed'); });
    document.addEventListener('mouseup',   () => { isDown = false; dot.classList.remove('pressed'); ring.classList.remove('pressed'); });

    // Hover states for interactive elements
    const interactiveSelector = 'a, button, .cat-card, .farmer-card, .veg-chip, .box-chip, .tool-tab, .btn, label, input, [role="button"]';
    document.querySelectorAll(interactiveSelector).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    function tick() {
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ─────────────────────────────────────────────────────────────
     2. HERO CANVAS PARTICLE SYSTEM
  ───────────────────────────────────────────────────────────── */
  function initHeroCanvas() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'yk-hero-canvas';
    Object.assign(canvas.style, {
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: '0.55'
    });
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx  = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -1000, y: -1000 };
    const COUNT = isMobile() ? 45 : 80;
    const LINE_DIST = 120;

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 2.2 + 0.8;
        this.alpha = Math.random() * 0.6 + 0.3;
      }
      update() {
        // Gentle mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80 * 0.8;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = W;
        if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H;
        if (this.y > H) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74,222,128,${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animParticles);
    }
    animParticles();
  }

  /* ─────────────────────────────────────────────────────────────
     3. GSAP HERO ENTRANCE ANIMATION
  ───────────────────────────────────────────────────────────── */
  function initHeroGSAP() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Stagger-reveal hero content
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge',      { y: 30, opacity: 0, duration: 0.7, delay: 0.2 })
      .from('.hero-headline',   { y: 50, opacity: 0, duration: 0.9 }, '-=0.4')
      .from('.hero-sub',        { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-search-wrap',{ y: 25, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-cta-group',  { y: 25, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-stats',      { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-visual',     { x: 60, opacity: 0, duration: 1.0 }, '-=0.8');

    // Scroll-driven section reveals
    gsap.utils.toArray('.section-tag').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        x: -30, opacity: 0, duration: 0.6, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.farmer-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.cat-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, scale: 0.95, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.4)'
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4. MAGNETIC BUTTONS
  ───────────────────────────────────────────────────────────── */
  function initMagnetic() {
    if (isMobile()) return;

    document.querySelectorAll('.btn-primary, .nav-cta, .btn').forEach(btn => {
      const MAX = 10;
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);
        btn.style.transform = `translate(${dx * MAX}px, ${dy * MAX}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition  = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
        btn.style.transform   = '';
        setTimeout(() => btn.style.transition = '', 450);
      });
      btn.addEventListener('mouseenter', () => btn.style.transition = 'box-shadow 0.2s');
    });
  }

  /* ─────────────────────────────────────────────────────────────
     5. 3D CARD TILT
  ───────────────────────────────────────────────────────────── */
  function initTilt() {
    if (isMobile()) return;

    const tiltSelector = '.cat-card, .farmer-card, .tool-card, .smart-tool-card, .problem-card, .pillar';
    document.querySelectorAll(tiltSelector).forEach(card => {
      const MAX_TILT = 8;

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = e.clientX - rect.left;
        const y    = e.clientY - rect.top;
        const cx   = rect.width  / 2;
        const cy   = rect.height / 2;
        const rotX = clamp((cy - y) / cy * MAX_TILT, -MAX_TILT, MAX_TILT);
        const rotY = clamp((x - cx) / cx * MAX_TILT, -MAX_TILT, MAX_TILT);

        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
        card.style.transition = 'box-shadow 0.1s';
        card.style.boxShadow  = `${-rotY * 2}px ${rotX * 2}px 30px rgba(22,163,74,0.15)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.6s';
        card.style.transform  = '';
        card.style.boxShadow  = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     6. TEXT SCRAMBLE EFFECT on section headings
  ───────────────────────────────────────────────────────────── */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*<>?';

  function scrambleText(el) {
    const original = el.textContent;
    let iteration  = 0;
    const total    = original.length * 2;

    clearInterval(el._scramble);
    el._scramble = setInterval(() => {
      el.textContent = original.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < iteration / 2) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      if (iteration >= total) {
        clearInterval(el._scramble);
        el.textContent = original;
      }
      iteration += 1.5;
    }, 30);
  }

  function initTextScramble() {
    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          scrambleText(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.section-tag').forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────────────────────────
     7. PARALLAX on hero content layers
  ───────────────────────────────────────────────────────────── */
  function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual  = document.querySelector('.hero-visual');
    if (!heroContent || !heroVisual || isMobile()) return;

    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy > 700) return;
      heroContent.style.transform = `translateY(${sy * 0.12}px)`;
      heroVisual.style.transform  = `translateY(${sy * 0.06}px)`;
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────────
     8. SMOOTH LOGO SCRAMBLE on navbar hover
  ───────────────────────────────────────────────────────────── */
  function initLogoScramble() {
    const logoText = document.querySelector('.logo-text');
    if (!logoText) return;
    const original = logoText.textContent;
    logoText.addEventListener('mouseenter', () => scrambleText(logoText));
    logoText.addEventListener('mouseleave', () => {
      clearInterval(logoText._scramble);
      logoText.textContent = original;
    });
  }

  /* ─────────────────────────────────────────────────────────────
     9. STAGGERED COUNTER ANIMATION upgrade
  ───────────────────────────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 2000;
        const start  = performance.now();

        function step(now) {
          const p    = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4); // quartic easeOut
          el.textContent = Math.round(target * ease);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach(c => obs.observe(c));
  }

  /* ─────────────────────────────────────────────────────────────
     10. VEGGIE TILE pulse waves
  ───────────────────────────────────────────────────────────── */
  function initVeggiePulse() {
    document.querySelectorAll('.veggie-tile').forEach((tile, i) => {
      tile.style.animationDelay = `${i * 0.2}s`;
      tile.classList.add('yk-pulse');
    });
  }

  /* ─────────────────────────────────────────────────────────────
     11. SCROLL INDICATOR hide on scroll
  ───────────────────────────────────────────────────────────── */
  function initScrollIndicator() {
    const ind = document.querySelector('.hero-scroll-indicator');
    if (!ind) return;
    window.addEventListener('scroll', () => {
      ind.style.opacity = window.scrollY > 60 ? '0' : '1';
      ind.style.transition = 'opacity 0.4s';
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────────────────────────── */
  function init() {
    initCursor();
    initHeroCanvas();
    initMagnetic();
    initTilt();
    initTextScramble();
    initParallax();
    initLogoScramble();
    initCounters();
    initVeggiePulse();
    initScrollIndicator();

    // GSAP inits after a tick (ensure GSAP is loaded)
    if (typeof gsap !== 'undefined') {
      initHeroGSAP();
    } else {
      // Fallback: wait for GSAP to load
      const gsapWatcher = setInterval(() => {
        if (typeof gsap !== 'undefined') {
          clearInterval(gsapWatcher);
          initHeroGSAP();
        }
      }, 100);
    }

    console.log('⚡ YAKUZAZ Premium UI loaded.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
