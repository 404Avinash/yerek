/* ==========================================
   FRESCO — category.js
   Dynamic data-driven category pages
   ========================================== */

// ==========================================
// DATA LAYER — all category content lives here
// ==========================================
const CATEGORIES = {
  leafy: {
    name: 'Leafy Vegetables',
    emoji: '🥬',
    tag: 'STORE EXPERIENCE',
    sub: 'Harvested fresh daily and delivered directly to our store within hours of picking.',
    bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
    status: 'Fresh Today',
    restockTime: 'Restocked Every Morning',
    source: 'Farms within 60km',
    score: '9.4',
    scores: [
      { label: 'Freshness', pct: 94 },
      { label: 'Cleanliness', pct: 98 },
      { label: 'Consistency', pct: 90 },
    ],
    journeySub: 'Our leafy vegetables travel from farm to store in under 6 hours — keeping them crisp and nutrient-rich for you.',
    qualityChecks: [
      'Harvested at dawn for maximum freshness',
      'Cold-chain maintained throughout transit',
      'Inspected for pesticide residue before intake',
      'Washed and sorted under hygienic conditions',
      'Displayed in chilled open-shelf units',
    ],
    farms: [
      { name: 'Sharma Greens', location: 'Sonipat, Haryana', emoji: '🌿', pct: '45%', years: '3 yrs' },
      { name: 'Patel Organics', location: 'Karnal, Haryana', emoji: '🥬', pct: '33%', years: '2 yrs' },
      { name: 'Verma Farms', location: 'Panipat, Haryana', emoji: '🌱', pct: '22%', years: '1 yr' },
    ],
    produce: [
      { name: 'Spinach', aka: 'Palak', emoji: '🥬', desc: 'Iron-rich dark leafy greens, freshly harvested and packed with nutrients ready for your kitchen.', freshness: '9.6', origin: 'Sonipat', tag: 'fresh', available: true },
      { name: 'Coriander', aka: 'Dhaniya', emoji: '🌿', desc: 'Aromatic herb bundles, sourced same-day from partner farms. Bright, fragrant and flavour-packed.', freshness: '9.4', origin: 'Karnal', tag: 'fresh', available: true },
      { name: 'Fenugreek', aka: 'Methi', emoji: '🌱', desc: 'Slightly bitter, powerfully nutritious. A winter staple picked at the ideal growth stage.', freshness: '9.1', origin: 'Panipat', tag: 'seasonal', available: true },
      { name: 'Lettuce', aka: 'Salad Patta', emoji: '🥗', desc: 'Crisp iceberg and romaine lettuce head varieties, grown under controlled greenhouse conditions.', freshness: '9.3', origin: 'Sonipat', tag: 'fresh', available: true },
      { name: 'Mint', aka: 'Pudina', emoji: '🌿', desc: 'Cool, refreshing mint leaves. Freshly cut and bundled — perfect for chutneys, teas, and garnishes.', freshness: '9.5', origin: 'Karnal', tag: 'fresh', available: true },
      { name: 'Amaranth', aka: 'Chaulai', emoji: '🌿', desc: 'Traditional iron-rich green, seasonal specialty from our long-term farm partners in Haryana.', freshness: '8.9', origin: 'Panipat', tag: 'seasonal', available: true },
    ],
  },

  root: {
    name: 'Root Vegetables',
    emoji: '🥕',
    tag: 'STORE EXPERIENCE',
    sub: "Earth's natural bounty — deep-soil vegetables sourced fresh from our partner farms every week.",
    bgGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)',
    status: 'Sourced Weekly',
    restockTime: 'Restocked Twice Weekly',
    source: 'Farms within 120km',
    score: '9.1',
    scores: [
      { label: 'Freshness', pct: 91 },
      { label: 'Cleanliness', pct: 96 },
      { label: 'Consistency', pct: 93 },
    ],
    journeySub: 'Root vegetables travel in temperature-monitored trucks. We batch test every consignment for quality before stocking.',
    qualityChecks: [
      'Sourced from deep-soil farms without contamination',
      'Pressure-washed to remove soil residue on arrival',
      'Sorted by size and grade before display',
      'Checked for freshness index via spot sampling',
      'Stored at optimal humidity to prevent drying',
    ],
    farms: [
      { name: 'Ramesh Farm', location: 'Sonipat, Haryana', emoji: '🥕', pct: '50%', years: '4 yrs' },
      { name: 'Gupta Roots', location: 'Rohtak, Haryana', emoji: '🌰', pct: '30%', years: '2 yrs' },
      { name: 'Singh\'s Earth Farm', location: 'Hisar, Haryana', emoji: '🥔', pct: '20%', years: '1 yr' },
    ],
    produce: [
      { name: 'Carrot', aka: 'Gajar', emoji: '🥕', desc: 'Vibrant orange carrots rich in beta-carotene. Grown in sandy loam soil for natural sweetness.', freshness: '9.3', origin: 'Sonipat', tag: 'fresh', available: true },
      { name: 'Radish', aka: 'Mooli', emoji: '🫚', desc: 'Crisp white radish, a winter favourite. Harvested at peak size for the right balance of pungency.', freshness: '9.0', origin: 'Rohtak', tag: 'seasonal', available: true },
      { name: 'Beetroot', aka: 'Chukandar', emoji: '🟣', desc: 'Deep red beetroot packed with antioxidants. Earthy and sweet — great for salads and juicing.', freshness: '9.1', origin: 'Hisar', tag: 'fresh', available: true },
      { name: 'Turnip', aka: 'Shalgam', emoji: '🫐', desc: 'White and purple turnips, a traditional winter root vegetable with mild peppery flavour.', freshness: '8.8', origin: 'Rohtak', tag: 'seasonal', available: true },
    ],
  },

  tuber: {
    name: 'Tuber Vegetables',
    emoji: '🥔',
    tag: 'STORE EXPERIENCE',
    sub: 'Wholesome underground staples — potatoes and yams sourced from India\'s finest tuber growing belts.',
    bgGradient: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 60%, #fef08a 100%)',
    status: 'Farm Direct',
    restockTime: 'Restocked Every 3 Days',
    source: 'UP & MP Farms',
    score: '9.0',
    scores: [
      { label: 'Freshness', pct: 90 },
      { label: 'Cleanliness', pct: 92 },
      { label: 'Consistency', pct: 95 },
    ],
    journeySub: 'Our tubers are sourced directly from Agra and Aligarh belt farms. Each batch is tested for moisture and declared shelf-life before dispatch.',
    qualityChecks: [
      'Sourced from certified tuber belt farms in UP',
      'Checked for bruising, rot, and skin damage on receipt',
      'Stored at 10–15°C for optimal shelf preservation',
      'Sorted by weight class: small, medium, large',
      'QR coded by batch for full harvest traceability',
    ],
    farms: [
      { name: 'Yadav Tubers', location: 'Agra, UP', emoji: '🥔', pct: '55%', years: '3 yrs' },
      { name: 'Mathur Harvest', location: 'Aligarh, UP', emoji: '🌿', pct: '30%', years: '2 yrs' },
      { name: 'Narmada Farms', location: 'Gwalior, MP', emoji: '🥕', pct: '15%', years: '1 yr' },
    ],
    produce: [
      { name: 'Potato', aka: 'Aloo', emoji: '🥔', desc: 'The everyday essential. Freshly washed potatoes from Agra\'s famous tuber belt, available in all sizes.', freshness: '9.0', origin: 'Agra, UP', tag: 'fresh', available: true },
      { name: 'Sweet Potato', aka: 'Shakarkandi', emoji: '🍠', desc: 'Naturally sweet, fibre-rich sweet potatoes. A nutritious seasonal alternative perfect for roasting.', freshness: '9.2', origin: 'Gwalior, MP', tag: 'seasonal', available: true },
      { name: 'Yam', aka: 'Suran / Jimikand', emoji: '🍠', desc: 'Large purple yam with starchy texture. A winter delicacy used in traditional Indian preparations.', freshness: '8.8', origin: 'Aligarh, UP', tag: 'seasonal', available: true },
      { name: 'Colocasia', aka: 'Arbi', emoji: '🫙', desc: 'Small taro roots with a creamy texture when cooked. Farm-fresh and cleaned before stocking.', freshness: '8.9', origin: 'Agra, UP', tag: 'fresh', available: true },
    ],
  },

  fruiting: {
    name: 'Fruiting Vegetables',
    emoji: '🍅',
    tag: 'STORE EXPERIENCE',
    sub: 'Ripened to perfection on the vine — sourced at peak maturity for maximum flavour and nutrition.',
    bgGradient: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fecdd3 100%)',
    status: 'Peak Ripeness',
    restockTime: 'Restocked Daily',
    source: 'Haryana & Rajasthan Farms',
    score: '9.3',
    scores: [
      { label: 'Freshness', pct: 93 },
      { label: 'Ripeness', pct: 95 },
      { label: 'Consistency', pct: 91 },
    ],
    journeySub: 'Fruiting vegetables are the most time-sensitive produce we carry. Our same-day harvest-to-store model ensures you get them at peak flavour.',
    qualityChecks: [
      'Harvested at optimal ripeness stage for each variety',
      'Same-day dispatch from farm to store',
      'Checked for bruising, cracking, and disease spots',
      'Sorted by ripeness grade — ready to eat vs. 2-day ripening',
      'Stored in ventilated display units, not stacked',
    ],
    farms: [
      { name: 'Ramesh Farm', location: 'Sonipat, Haryana', emoji: '🍅', pct: '40%', years: '4 yrs' },
      { name: 'Joshi Polyhouse', location: 'Alwar, Rajasthan', emoji: '🫑', pct: '35%', years: '2 yrs' },
      { name: 'Khatri Gardens', location: 'Rewari, Haryana', emoji: '🍆', pct: '25%', years: '1 yr' },
    ],
    produce: [
      { name: 'Tomato', aka: 'Tamatar', emoji: '🍅', desc: 'Plump, vine-ripened tomatoes from Ramesh Farm, Sonipat. Bright red, firm and full of natural umami.', freshness: '9.1', origin: 'Sonipat', tag: 'fresh', available: true },
      { name: 'Capsicum', aka: 'Shimla Mirch', emoji: '🫑', desc: 'Green, red, and yellow bell peppers from polyhouse farms in Alwar. Crisp, sweet and pesticide-tested.', freshness: '9.4', origin: 'Alwar', tag: 'fresh', available: true },
      { name: 'Brinjal', aka: 'Baingan', emoji: '🍆', desc: 'Glossy purple brinjal in standard and baby varieties. Grown without excessive irrigation for firm texture.', freshness: '9.0', origin: 'Rewari', tag: 'fresh', available: true },
      { name: 'Chilly', aka: 'Hari Mirch', emoji: '🌶️', desc: 'Fresh green chillies — mild to hot varieties available. Sourced daily to retain the essential oils and heat.', freshness: '9.5', origin: 'Sonipat', tag: 'fresh', available: true },
      { name: 'Peas', aka: 'Matar', emoji: '🫛', desc: 'Sweet green peas, a winter seasonal highlight. Hand-picked pods from open field farms in Haryana.', freshness: '9.3', origin: 'Rewari', tag: 'seasonal', available: true },
      { name: 'Bitter Gourd', aka: 'Karela', emoji: '🥒', desc: 'Fresh bitter gourd with characteristic ridges. Selected at the right stage before over-maturity sets in.', freshness: '8.9', origin: 'Alwar', tag: 'seasonal', available: true },
    ],
  },

  fruits: {
    name: 'Fruits',
    emoji: '🍌',
    tag: 'STORE EXPERIENCE',
    sub: "Nature's sweetest gifts — seasonal fruits curated from orchards and farm clusters across India.",
    bgGradient: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 60%, #f5d0fe 100%)',
    status: 'Seasonal Picks',
    restockTime: 'Restocked 3× Weekly',
    source: 'Orchards Pan-India',
    score: '9.2',
    scores: [
      { label: 'Freshness', pct: 92 },
      { label: 'Sweetness Index', pct: 88 },
      { label: 'Consistency', pct: 90 },
    ],
    journeySub: 'Our fruit selection changes with the seasons. We partner with orchards across Maharashtra, Himachal and Karnataka to bring you the best each season has to offer.',
    qualityChecks: [
      'Sourced from registered orchard partners across India',
      'Brix (sugar) level tested on arrival for sweetness validation',
      'Zero chemical ripening agents used at any stage',
      'Sorted by ripeness: enjoy today vs. ripen at home',
      'Seasonal selection ensures you get peak-quality produce',
    ],
    farms: [
      { name: 'Nashik Orchards', location: 'Nashik, Maharashtra', emoji: '🍇', pct: '35%', years: '2 yrs' },
      { name: 'HP Apple Growers', location: 'Shimla, Himachal', emoji: '🍎', pct: '40%', years: '3 yrs' },
      { name: 'Coorg Estates', location: 'Coorg, Karnataka', emoji: '🍊', pct: '25%', years: '1 yr' },
    ],
    produce: [
      { name: 'Banana', aka: 'Kela', emoji: '🍌', desc: 'Robusta and Elaichi banana varieties from Maharashtra. Available at various ripeness stages to suit your timing.', freshness: '9.1', origin: 'Nashik', tag: 'fresh', available: true },
      { name: 'Apple', aka: 'Seb', emoji: '🍎', desc: 'Crisp Himachali apples from Shimla at peak seasonal harvest. Royal Delicious and Fuji varieties available.', freshness: '9.4', origin: 'Shimla', tag: 'seasonal', available: true },
      { name: 'Orange', aka: 'Santra', emoji: '🍊', desc: 'Juicy Nagpur-style mandarins from partner orchards in Vidarbha. Thin-skinned, seedless and sweet.', freshness: '9.2', origin: 'Nagpur', tag: 'seasonal', available: true },
      { name: 'Papaya', aka: 'Papita', emoji: '🍈', desc: 'Semi-ripe papayas sourced from southern farm partners. Yellow-fleshed varieties with high enzyme content.', freshness: '9.0', origin: 'Karnataka', tag: 'fresh', available: true },
      { name: 'Guava', aka: 'Amrood', emoji: '🍐', desc: 'Pink and white guavas from Allahabad belt. Available in crunchy and soft-ripe options.', freshness: '9.3', origin: 'Allahabad, UP', tag: 'fresh', available: true },
      { name: 'Pomegranate', aka: 'Anar', emoji: '🍎', desc: 'Bhagwa pomegranates — deep red arils, naturally sweet with low acidity. Sourced from Solapur farms.', freshness: '9.1', origin: 'Solapur, MH', tag: 'seasonal', available: true },
    ],
  },
};

// ==========================================
// NAV SCROLL
// ==========================================
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ==========================================
// REVEAL ANIMATION
// ==========================================
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ==========================================
// READ URL PARAM
// ==========================================
function getCatKey() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('cat') || 'leafy';
  return CATEGORIES[key] ? key : 'leafy';
}

// ==========================================
// RENDER PAGE
// ==========================================
function render(key) {
  const cat = CATEGORIES[key];
  const allKeys = Object.keys(CATEGORIES);

  // Update <title> and meta
  document.getElementById('page-title').textContent = `${cat.name} — Fresco`;
  document.getElementById('page-desc').content = cat.sub;

  // Hero background
  document.getElementById('cat-hero-bg').style.background = cat.bgGradient;

  // Hero content
  document.getElementById('cat-tag').textContent = cat.tag;
  document.getElementById('cat-emoji').textContent = cat.emoji;
  document.getElementById('cat-title').textContent = cat.name;
  document.getElementById('cat-sub').textContent = cat.sub;
  document.getElementById('meta-status').textContent = cat.status;
  document.getElementById('meta-time').textContent = cat.restockTime;
  document.getElementById('meta-source').textContent = cat.source;
  document.getElementById('breadcrumb-name').textContent = cat.name;

  // Journey sub
  document.getElementById('journey-sub').textContent = cat.journeySub;
  document.getElementById('video-cat-name').textContent = cat.name.toLowerCase();

  // Farm cat names
  document.getElementById('farm-cat-name').textContent = cat.name;
  document.getElementById('farm-count-tag').textContent = `${cat.farms.length} Active Farms`;

  // Hero preview grid (first 6 produce)
  const heroGrid = document.getElementById('cat-hero-preview');
  heroGrid.innerHTML = cat.produce.slice(0, 6).map(p => `
    <div class="hero-veggie-card">
      <span class="hvc-emoji">${p.emoji}</span>
      <span class="hvc-name">${p.name}</span>
      <span class="hvc-tag">⭐ ${p.freshness}</span>
    </div>
  `).join('');

  // Quality checklist
  document.getElementById('quality-list').innerHTML = cat.qualityChecks.map(item => `
    <div class="quality-item">
      <div class="qi-check">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      ${item}
    </div>
  `).join('');

  // Score panel
  document.getElementById('cat-score').textContent = cat.score;
  document.getElementById('score-breakdown').innerHTML = cat.scores.map(s => `
    <div class="score-row">
      <div class="score-row-label">
        <span>${s.label}</span>
        <span>${s.pct}%</span>
      </div>
      <div class="score-track">
        <div class="score-fill" style="width: 0%" data-target="${s.pct}%"></div>
      </div>
    </div>
  `).join('');

  // Farm strip
  document.getElementById('farm-strip').innerHTML = cat.farms.map(f => `
    <div class="farm-card">
      <div class="farm-card-top">
        <div class="farm-avatar">${f.emoji}</div>
        <div>
          <div class="farm-name">${f.name}</div>
          <div class="farm-location">📍 ${f.location}</div>
        </div>
        <span class="farm-badge">✓ Verified</span>
      </div>
      <div class="farm-stats">
        <div class="farm-stat-item">
          <span class="farm-stat-val">${f.pct}</span>
          <span class="farm-stat-lbl">Supply Share</span>
        </div>
        <div class="farm-stat-item">
          <span class="farm-stat-val">${f.years}</span>
          <span class="farm-stat-lbl">Partnership</span>
        </div>
      </div>
    </div>
  `).join('');

  // Other category buttons
  document.getElementById('other-cats').innerHTML = allKeys.map(k => {
    const c = CATEGORIES[k];
    const isCurrent = k === key;
    return `<a href="category.html?cat=${k}" class="other-cat-btn${isCurrent ? ' current-cat' : ''}">
      ${c.emoji} ${c.name}
    </a>`;
  }).join('');

  // Footer category links
  document.getElementById('footer-cat-links').innerHTML = allKeys.map(k => {
    const c = CATEGORIES[k];
    return `<li><a href="category.html?cat=${k}">${c.emoji} ${c.name}</a></li>`;
  }).join('');

  // Render produce grid
  renderProduceGrid(key, 'all');

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProduceGrid(key, this.dataset.filter);
    });
  });
}

function renderProduceGrid(key, filter) {
  const cat = CATEGORIES[key];
  const grid = document.getElementById('produce-grid');
  const items = filter === 'all'
    ? cat.produce
    : cat.produce.filter(p => p.tag === filter);

  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray-400);font-size:.9rem;">No produce in this filter right now. Check back soon.</div>`;
    return;
  }

  grid.innerHTML = items.map((p, i) => `
    <div class="produce-card" style="animation-delay:${i * 0.06}s">
      <div class="produce-card-image" style="background: linear-gradient(135deg, #f8fafc, #f1f5f9);">
        ${p.emoji}
      </div>
      <div class="produce-card-body">
        <div class="produce-card-name">${p.name}</div>
        <div class="produce-card-aka">${p.aka}</div>
        <div class="produce-card-desc">${p.desc}</div>
        <div class="produce-card-meta">
          <div class="freshness-badge">⭐ ${p.freshness}/10</div>
          <div class="origin-badge">📍 ${p.origin}</div>
        </div>
        <div class="produce-card-qr">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M17 14h3M14 17h3v3"/></svg>
          Scan QR for full farm journey
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// SCORE BARS ANIMATION
// ==========================================
function animateScoreBars() {
  const panel = document.querySelector('.quality-score-panel');
  if (!panel) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        panel.querySelectorAll('.score-fill[data-target]').forEach(fill => {
          setTimeout(() => { fill.style.width = fill.dataset.target; }, 300);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(panel);
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const key = getCatKey();
  render(key);
  initReveal();
  animateScoreBars();
  console.log(`🌿 Fresco — ${CATEGORIES[key].name} page loaded.`);
});
