/* ==========================================
   FRESCO — main.js
   Interactive behaviors and animations
   ========================================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburgerBtn');
hamburger.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  if (window.innerWidth <= 768) {
    if (nav.style.display === 'flex') {
      nav.style.cssText = `
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 72px; left: 0; right: 0;
        background: rgba(255,255,255,0.97);
        backdrop-filter: blur(12px);
        padding: 16px 24px 24px;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(0,0,0,.1);
        gap: 4px;
        z-index: 999;
      `;
    } else {
      nav.style.cssText = 'display: none !important;';
    }
  }
});

// ---- Reveal on scroll (IntersectionObserver) ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- Hero card mouse parallax (3D tilt) ----
const heroCard = document.querySelector('.hero-card');
const heroSection = document.getElementById('hero');
if (heroCard && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `translateY(${-6 + y * -8}px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}

// ---- Journey bar animation ----
const journeyBar = document.querySelector('.journey-bar');
const journeyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      journeyBar.classList.add('animated');
      journeyObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (journeyBar) journeyObserver.observe(journeyBar);

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target], .count-up[data-target]').forEach(animateCounter);
      const statNums = entry.target.querySelectorAll('.stat-number[data-target]');
      statNums.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
const wasteStat = document.querySelector('.waste-stat-big');
if (heroStats) counterObserver.observe(heroStats);
if (wasteStat) counterObserver.observe(wasteStat);

// ---- Smooth anchor scrolling with offset ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    const nav = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
      nav.style.cssText = 'display: none !important;';
    }
  });
});

// ---- Waitlist Form — saved directly to Supabase ----
const waitlistForm = document.getElementById('waitlistForm');
const waitlistSuccess = document.getElementById('waitlistSuccess');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('joinBtn');
    const name = document.getElementById('wl-name').value.trim();
    const email = document.getElementById('wl-email').value.trim();
    const city = document.getElementById('wl-city').value.trim();

    if (!name || !email || !city) return;

    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Submitting...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    try {
      const { error } = await _supabase.from('waitlist').insert([{
        name,
        email,
        city,
        source: document.referrer || 'direct',
      }]);

      if (!error) {
        waitlistForm.classList.add('hidden');
        waitlistSuccess.classList.remove('hidden');
        waitlistSuccess.style.animation = 'fadeInUp 0.5s ease';
      } else if (error.code === '23505') {
        // Duplicate email — still show success, don't alarm user
        waitlistForm.classList.add('hidden');
        waitlistSuccess.classList.remove('hidden');
      } else {
        btn.querySelector('span').textContent = 'Something went wrong — try again';
        btn.style.opacity = '1';
        btn.style.background = '#dc2626';
        btn.disabled = false;
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    } catch (err) {
      btn.querySelector('span').textContent = 'No connection — try again';
      btn.style.opacity = '1';
      btn.style.background = '#dc2626';
      btn.disabled = false;
      setTimeout(() => {
        btn.querySelector('span').textContent = originalText;
        btn.style.background = '';
      }, 3000);
    }
  });
}


// ---- Veggie tile hover sparkle ----
document.querySelectorAll('.veggie-tile').forEach(tile => {
  tile.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.08) rotate(-2deg)';
  });
  tile.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ---- Category cards interactive ----
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '2';
  });
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '';
  });
});

// ---- Active nav link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Add active nav style dynamically
const styleTag = document.createElement('style');
styleTag.textContent = `
  .nav-links a.active-nav {
    color: var(--green-700) !important;
    background: var(--green-50) !important;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleTag);

// ---- QR ring animation trigger ----
const phoneEl = document.querySelector('.phone-mockup');
if (phoneEl) {
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        phoneEl.classList.add('visible');
        // Restart ring animation
        const ring = phoneEl.querySelector('.ring-progress');
        if (ring) {
          ring.style.animation = 'none';
          requestAnimationFrame(() => {
            ring.style.animation = '';
          });
        }
        ringObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  ringObserver.observe(phoneEl);
}

// ---- Parallax hero elements (subtle) ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge && scrollY < 800) {
    heroBadge.style.transform = `translateY(${scrollY * 0.03}px)`;
  }
  // Subtle hero background parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scrollY < 1000) {
    heroBg.style.transform = `translateX(-50%) translateY(${scrollY * 0.15}px)`;
  }
}, { passive: true });

// ---- Step hover effects ----
document.querySelectorAll('.step').forEach((step, i) => {
  step.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.step-icon');
    if (icon) {
      icon.style.transform = 'scale(1.15) rotate(5deg)';
      icon.style.background = '#22c55e';
      icon.style.color = 'white';
    }
  });
  step.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.step-icon');
    if (icon) {
      icon.style.transform = '';
      icon.style.background = '';
      icon.style.color = '';
    }
  });
});

// ---- Freshness bar animation ----
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || entry.target.style.width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
barFills.forEach(bar => barObserver.observe(bar));

// ---- Smooth number counting for stats ----
const trustStrip = document.querySelector('.trust-strip');
if (trustStrip) {
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        trustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  trustStrip.style.opacity = '0';
  trustStrip.style.transform = 'translateY(12px)';
  trustStrip.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  trustObserver.observe(trustStrip);
}

console.log('🌿 Fresco website loaded successfully.');

// ==========================================
// LIVE VEGGIE SEARCH
// ==========================================
(function initVegSearch() {
  const input = document.getElementById('vegSearchInput');
  const resultsBox = document.getElementById('searchResults');
  if (!input || !resultsBox) return;

  // Products may not yet be loaded (product.js is not on index.html)
  // So we embed a compact search map inline
  const SEARCH_DATA = [
    { key:'spinach', name:'Spinach', aka:'Palak', emoji:'🥬', cat:'Leafy' },
    { key:'coriander', name:'Coriander', aka:'Dhaniya', emoji:'🌿', cat:'Leafy' },
    { key:'fenugreek', name:'Fenugreek', aka:'Methi', emoji:'🌱', cat:'Leafy' },
    { key:'mint', name:'Mint', aka:'Pudina', emoji:'🍃', cat:'Leafy' },
    { key:'lettuce', name:'Lettuce', aka:'Salad Patta', emoji:'🥬', cat:'Leafy' },
    { key:'amaranth', name:'Amaranth', aka:'Chaulai', emoji:'🌾', cat:'Leafy' },
    { key:'carrot', name:'Carrot', aka:'Gajar', emoji:'🥕', cat:'Root' },
    { key:'radish', name:'Radish', aka:'Mooli', emoji:'🫚', cat:'Root' },
    { key:'beetroot', name:'Beetroot', aka:'Chukandar', emoji:'🫀', cat:'Root' },
    { key:'turnip', name:'Turnip', aka:'Shalgam', emoji:'🟣', cat:'Root' },
    { key:'potato', name:'Potato', aka:'Aloo', emoji:'🥔', cat:'Tuber' },
    { key:'sweet-potato', name:'Sweet Potato', aka:'Shakarkandi', emoji:'🍠', cat:'Tuber' },
    { key:'yam', name:'Yam', aka:'Suran / Jimikand', emoji:'🫚', cat:'Tuber' },
    { key:'colocasia', name:'Colocasia', aka:'Arbi', emoji:'🌿', cat:'Tuber' },
    { key:'tomato', name:'Tomato', aka:'Tamatar', emoji:'🍅', cat:'Fruiting' },
    { key:'capsicum', name:'Capsicum', aka:'Shimla Mirch', emoji:'🫑', cat:'Fruiting' },
    { key:'chilly', name:'Green Chilly', aka:'Hari Mirch', emoji:'🌶️', cat:'Fruiting' },
    { key:'brinjal', name:'Brinjal', aka:'Baingan', emoji:'🍆', cat:'Fruiting' },
    { key:'peas', name:'Peas', aka:'Matar', emoji:'🫛', cat:'Fruiting' },
    { key:'bitter-gourd', name:'Bitter Gourd', aka:'Karela', emoji:'🥒', cat:'Fruiting' },
    { key:'banana', name:'Banana', aka:'Kela', emoji:'🍌', cat:'Fruits' },
    { key:'apple', name:'Apple', aka:'Seb', emoji:'🍎', cat:'Fruits' },
    { key:'orange', name:'Orange', aka:'Santra / Narangi', emoji:'🍊', cat:'Fruits' },
    { key:'papaya', name:'Papaya', aka:'Papita', emoji:'🟡', cat:'Fruits' },
    { key:'guava', name:'Guava', aka:'Amrood', emoji:'🍐', cat:'Fruits' },
    { key:'pomegranate', name:'Pomegranate', aka:'Anar', emoji:'🔴', cat:'Fruits' },
  ];

  let activeIndex = -1;

  function search(q) {
    if (!q || q.length < 1) return [];
    const ql = q.toLowerCase();
    return SEARCH_DATA.filter(v =>
      v.name.toLowerCase().includes(ql) ||
      v.aka.toLowerCase().includes(ql) ||
      v.key.includes(ql)
    ).slice(0, 6);
  }

  function renderResults(results) {
    if (results.length === 0) {
      resultsBox.innerHTML = '<div class="search-no-result">No vegetables found. Try "Spinach" or "Aloo".</div>';
      resultsBox.classList.add('open');
      return;
    }
    resultsBox.innerHTML = results.map((v, i) => `
      <a href="product.html?item=${v.key}" class="search-result-item" data-index="${i}">
        <span class="search-emoji">${v.emoji}</span>
        <div class="search-result-text">
          <div class="search-result-name">${v.name}</div>
          <div class="search-result-aka">${v.aka} · ${v.cat}</div>
        </div>
        <span class="search-result-score">View →</span>
      </a>
    `).join('');
    resultsBox.classList.add('open');
    activeIndex = -1;
  }

  function close() {
    resultsBox.classList.remove('open');
    resultsBox.innerHTML = '';
    activeIndex = -1;
  }

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q) { close(); return; }
    renderResults(search(q));
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsBox.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        window.location.href = items[activeIndex].href;
      } else if (items.length > 0) {
        window.location.href = items[0].href;
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hero-search-wrap')) close();
  });

  // Add active item highlight style
  const s = document.createElement('style');
  s.textContent = '.search-result-item.active { background: #f0fdf4; }';
  document.head.appendChild(s);
})();

/* ==========================================
   ADVANCED INTERACTIONS
   Lenis smooth scroll · GSAP ScrollTrigger
   Magnetic buttons · Custom cursor · Marquee
   ========================================== */
(function initAdvancedInteractions() {

  /* ── 1. LENIS SMOOTH SCROLL ───────────── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
  }

  /* ── 2. GSAP + SCROLL TRIGGER ─────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Sync Lenis with GSAP ticker so ScrollTrigger tracks Lenis scroll */
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* ─ Hero entrance animation ─
       Unobserve hero elements from IntersectionObserver first so
       the CSS fallback system doesn't race against GSAP. */
    const heroSelectors = [
      '.hero-badge', '.hero-headline', '.hero-sub',
      '.hero-search-wrap', '.hero-cta-group', '.hero-stats', '.hero-visual'
    ];
    heroSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) revealObserver.unobserve(el);
    });

    /* Set initial hidden state via GSAP inline styles (overrides CSS class) */
    gsap.set('.hero-badge, .hero-sub, .hero-search-wrap, .hero-cta-group, .hero-stats',
      { opacity: 0, y: 24 });
    gsap.set('.hero-headline', { opacity: 0, y: 56 });
    gsap.set('.hero-visual',   { opacity: 0, x: 56 });

    /* Staggered timeline on page load */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.08 });
    heroTl
      .to('.hero-badge',       { opacity: 1, y: 0, duration: 0.7 })
      .to('.hero-headline',    { opacity: 1, y: 0, duration: 1.0 }, '-=0.4')
      .to('.hero-sub',         { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to('.hero-search-wrap', { opacity: 1, y: 0, duration: 0.65 }, '-=0.55')
      .to('.hero-cta-group',   { opacity: 1, y: 0, duration: 0.6  }, '-=0.5')
      .to('.hero-stats',       { opacity: 1, y: 0, duration: 0.5  }, '-=0.4')
      .to('.hero-visual',      { opacity: 1, x: 0, duration: 1.1  }, 0.18);

    /* ─ ScrollTrigger scrub parallax (decorative elements only — no opacity conflict) ─ */

    // Phone mockup in #trace section
    if (document.querySelector('.phone-mockup')) {
      gsap.to('.phone-mockup', {
        y: -44, ease: 'none',
        scrollTrigger: { trigger: '#trace', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to('.qr-float', {
        y: 34, ease: 'none',
        scrollTrigger: { trigger: '#trace', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    }

    // About section orbs
    if (document.querySelector('.orb-1')) {
      gsap.to('.orb-1', {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    }
    if (document.querySelector('.orb-2')) {
      gsap.to('.orb-2', {
        y: 44, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }

    // Cluster items (floating icons around orb)
    gsap.utils.toArray('.cluster-item').forEach((item, i) => {
      const yVals = [-28, 24, -20, 32];
      gsap.to(item, {
        y: yVals[i] || -20, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 + i * 0.3 }
      });
    });

    // Waste section stat card subtle drift
    if (document.querySelector('.waste-stat-big')) {
      gsap.fromTo('.waste-stat-big', { y: 20 }, {
        y: -20, ease: 'none',
        scrollTrigger: { trigger: '#waste', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }

    // Hero background subtle scroll-parallax (additive to existing handler)
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
      gsap.to(heroPattern, {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

  } else if (lenis) {
    /* GSAP not available — run Lenis on its own RAF loop */
    function lenisRaf(t) { lenis.raf(t); requestAnimationFrame(lenisRaf); }
    requestAnimationFrame(lenisRaf);
  }

  /* ── 3. MAGNETIC BUTTONS ──────────────── */
  document.querySelectorAll(
    '.btn-primary, .btn-outline, .btn-smart-tools, .nav-cta'
  ).forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const r = this.getBoundingClientRect();
      const x = e.clientX - r.left  - r.width  / 2;
      const y = e.clientY - r.top   - r.height / 2;
      this.style.transform = `translate(${x * 0.2}px, ${y * 0.26}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
    btn.addEventListener('click', function() {
      // Micro press feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  /* ── 4. CUSTOM CURSOR ─────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    // Ring lags behind dot for organic feel
    (function trackRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(trackRing);
    })();

    // Expand ring on interactive elements
    const hoverSel = 'a, button, .cat-card, .tool-showcase-card, .farmer-card, .pillar, input, label, .value-chip, .mandi-feat';
    document.querySelectorAll(hoverSel).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));
  }

  /* ── 5. TRUST STRIP MARQUEE ─────────── */
  const tlogos = document.querySelector('.trust-logos');
  if (tlogos) {
    // Duplicate for seamless loop (-50% translate = exactly one copy width)
    tlogos.innerHTML += tlogos.innerHTML;
  }

})();
