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
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

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

// ---- Waitlist Form ----
const waitlistForm = document.getElementById('waitlistForm');
const waitlistSuccess = document.getElementById('waitlistSuccess');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('joinBtn');
    const name = document.getElementById('wl-name').value.trim();
    const email = document.getElementById('wl-email').value.trim();
    const city = document.getElementById('wl-city').value.trim();

    if (!name || !email || !city) return;

    // Simulate submission with loading state
    btn.querySelector('span').textContent = 'Submitting...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      waitlistForm.classList.add('hidden');
      waitlistSuccess.classList.remove('hidden');
      waitlistSuccess.style.animation = 'fadeInUp 0.5s ease';
    }, 1200);
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
    heroBadge.style.transform = `translateY(${scrollY * 0.04}px)`;
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

console.log('🌿 Fresco website loaded successfully.');
