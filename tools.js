/* ==========================================
   YAKUZAZ — tools.js v2
   Smart Tools: Compare, Box Builder, Stock Board
   All data-driven from product.js PRODUCTS object
   ========================================== */

// ==========================================
// NAV SCROLL
// ==========================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ==========================================
// PRICE MAP (₹ per kg approx)
// ==========================================
const PRICES = {
  spinach: 40, coriander: 30, fenugreek: 35, mint: 25, lettuce: 60, amaranth: 30,
  carrot: 45, radish: 25, beetroot: 50, turnip: 30,
  potato: 25, 'sweet-potato': 40, yam: 55, colocasia: 50,
  tomato: 35, capsicum: 80, chilly: 60, brinjal: 40, peas: 70, 'bitter-gourd': 55,
  banana: 50, apple: 120, orange: 60, papaya: 40, guava: 55, pomegranate: 150,
};

// ==========================================
// TAB SWITCHING
// ==========================================
function initTabs() {
  document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tool-' + tab.dataset.tool).classList.add('active');
    });
  });
}

// ==========================================
// TOOL 1: NUTRITION COMPARATOR
// — Fixed: using event delegation, no inline onclick with hyphenated IDs
// ==========================================
let compareA = null, compareB = null;

function initCompare() {
  buildChipGrid('pick-a');
  buildChipGrid('pick-b');

  // Use event delegation — no more window.__selectFn_pick-a hack
  document.getElementById('pick-a').addEventListener('click', e => {
    const btn = e.target.closest('.veg-chip');
    if (!btn) return;
    document.querySelectorAll('#pick-a .veg-chip').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    compareA = btn.dataset.key;
    runCompare();
  });

  document.getElementById('pick-b').addEventListener('click', e => {
    const btn = e.target.closest('.veg-chip');
    if (!btn) return;
    document.querySelectorAll('#pick-b .veg-chip').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    compareB = btn.dataset.key;
    runCompare();
  });
}

function buildChipGrid(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = Object.keys(PRODUCTS).map(key => {
    const p = PRODUCTS[key];
    return `<button class="veg-chip" data-key="${key}" type="button">
      <span class="chip-emoji">${p.emoji}</span>
      <span class="chip-name">${p.name}</span>
    </button>`;
  }).join('');
}


// Active chart instance — destroy before redraw
let _radarChart = null;

function runCompare() {
  const placeholder = document.getElementById('compare-placeholder');
  const result      = document.getElementById('compare-result');

  if (!compareA || !compareB) {
    placeholder.classList.remove('hidden');
    result.classList.add('hidden');
    return;
  }

  const a = PRODUCTS[compareA];
  const b = PRODUCTS[compareB];

  placeholder.classList.add('hidden');
  result.classList.remove('hidden');

  /* ── Header cards ──────────────────────────────── */
  document.getElementById('compare-cards').innerHTML = `
    <div class="cmp-card cmp-card-a">
      <div class="cmp-emoji">${a.emoji}</div>
      <div class="cmp-name">${a.name}</div>
      <div class="cmp-aka">${a.aka}</div>
      <div class="cmp-score">⭐ ${a.freshness}/10</div>
    </div>
    <div class="cmp-card-vs">VS</div>
    <div class="cmp-card cmp-card-b">
      <div class="cmp-emoji">${b.emoji}</div>
      <div class="cmp-name">${b.name}</div>
      <div class="cmp-aka">${b.aka}</div>
      <div class="cmp-score">⭐ ${b.freshness}/10</div>
    </div>`;

  /* ── Build unified nutrient list ───────────────── */
  const aNutr = Object.fromEntries(a.nutrition.map(n => [n.label, parseFloat(n.value)]));
  const bNutr = Object.fromEntries(b.nutrition.map(n => [n.label, parseFloat(n.value)]));
  const allLabels = [...new Set([...a.nutrition.map(n => n.label), ...b.nutrition.map(n => n.label)])];

  // Pick top 6 by max value for radar (radar gets crowded beyond 6)
  const radarLabels = allLabels
    .filter(l => !isNaN(aNutr[l] || bNutr[l]))
    .slice(0, 6);

  /* ── RADAR CHART ───────────────────────────────── */
  const radarWrap = document.getElementById('compare-radar-wrap');
  if (radarWrap) {
    radarWrap.innerHTML = '<canvas id="radarCanvas"></canvas>';
    const ctx = document.getElementById('radarCanvas').getContext('2d');

    if (_radarChart) { _radarChart.destroy(); _radarChart = null; }

    const aVals = radarLabels.map(l => aNutr[l] || 0);
    const bVals = radarLabels.map(l => bNutr[l] || 0);
    const maxVal = Math.max(...aVals, ...bVals, 1);

    _radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: radarLabels,
        datasets: [
          {
            label: a.name,
            data: aVals.map(v => (v / maxVal) * 100),
            backgroundColor: 'rgba(220,20,60,0.12)',
            borderColor: '#DC143C',
            borderWidth: 2,
            pointBackgroundColor: '#DC143C',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: b.name,
            data: bVals.map(v => (v / maxVal) * 100),
            backgroundColor: 'rgba(74,222,128,0.1)',
            borderColor: '#4ade80',
            borderWidth: 2,
            pointBackgroundColor: '#4ade80',
            pointRadius: 4,
            pointHoverRadius: 6,
          }
        ]
      },
      options: {
        animation: { duration: 900, easing: 'easeOutQuart' },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: '#AAAAAA',
              font: { family: 'Space Grotesk, sans-serif', size: 12, weight: '600' },
              boxWidth: 12, boxHeight: 12, padding: 20,
            }
          },
          tooltip: {
            backgroundColor: '#141414',
            borderColor: '#252525',
            borderWidth: 1,
            titleColor: '#F2EDE4',
            bodyColor: '#AAAAAA',
            titleFont: { family: 'Space Grotesk, sans-serif', size: 12, weight: '700' },
            bodyFont:  { family: 'Space Grotesk, sans-serif', size: 11 },
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.raw.toFixed(1)}%`,
            }
          }
        },
        scales: {
          r: {
            min: 0, max: 100,
            backgroundColor: 'transparent',
            grid:        { color: 'rgba(255,255,255,0.06)', lineWidth: 1 },
            angleLines:  { color: 'rgba(255,255,255,0.08)', lineWidth: 1 },
            pointLabels: { color: '#7A7A7A', font: { family: 'Space Grotesk, sans-serif', size: 11, weight: '600' } },
            ticks:       { display: false, stepSize: 25 },
          }
        }
      }
    });
  }

  /* ── BAR RACE TABLE ────────────────────────────── */
  const tableWrap = document.getElementById('compare-table-wrap');
  if (tableWrap) {
    let aWins = 0, bWins = 0;

    const rows = allLabels.map(label => {
      const aRaw = a.nutrition.find(n => n.label === label);
      const bRaw = b.nutrition.find(n => n.label === label);
      const aStr = aRaw ? aRaw.value : '—';
      const bStr = bRaw ? bRaw.value : '—';
      const aNum = parseFloat(aStr) || 0;
      const bNum = parseFloat(bStr) || 0;
      const maxNum = Math.max(aNum, bNum, 0.1);
      const aPct = ((aNum / maxNum) * 100).toFixed(1);
      const bPct = ((bNum / maxNum) * 100).toFixed(1);
      const aWin = aNum > bNum;
      const bWin = bNum > aNum;
      if (aWin) aWins++;
      if (bWin) bWins++;

      return `
      <div class="nutr-race-row">
        <div class="race-label">${label}</div>
        <div class="race-bars">
          <div class="race-bar-wrap race-a">
            <span class="race-val ${aWin ? 'race-win' : ''}">${aStr}</span>
            <div class="race-track">
              <div class="race-fill race-fill-a" data-pct="${aPct}" style="width:0%"></div>
            </div>
          </div>
          <div class="race-bar-wrap race-b">
            <div class="race-track">
              <div class="race-fill race-fill-b" data-pct="${bPct}" style="width:0%"></div>
            </div>
            <span class="race-val ${bWin ? 'race-win' : ''}">${bStr}</span>
          </div>
        </div>
      </div>`;
    });

    tableWrap.innerHTML = `
      <div class="race-header">
        <span class="race-header-a">${a.emoji} ${a.name}</span>
        <span class="race-header-mid">NUTRITION</span>
        <span class="race-header-b">${b.emoji} ${b.name}</span>
      </div>
      <div class="nutr-race-list">${rows.join('')}</div>
      <div class="winner-summary">
        ${aWins > bWins
          ? `<span class="winner-badge winner-a">🏆 ${a.name} wins ${aWins}–${bWins} nutrients</span>`
          : bWins > aWins
          ? `<span class="winner-badge winner-b">🏆 ${b.name} wins ${bWins}–${aWins} nutrients</span>`
          : `<span class="winner-badge winner-tie">🤝 Tied — ${aWins} nutrients each</span>`
        }
      </div>`;

    // Animate bars after a frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.race-fill').forEach(el => {
          el.style.transition = 'width 0.7s cubic-bezier(0.16,1,0.3,1)';
          el.style.width = el.dataset.pct + '%';
        });
      }, 60);
    });
  }
}


// ==========================================
// TOOL 2: BOX BUILDER
// ==========================================
let boxSelected = new Set();

function initBoxBuilder() {
  const grid = document.getElementById('box-picker');
  grid.innerHTML = Object.keys(PRODUCTS).map(key => {
    const p = PRODUCTS[key];
    const priceKg = PRICES[key] || 50;
    return `<button class="box-chip" data-key="${key}" type="button">
      <div class="box-chip-top">
        <span class="chip-emoji">${p.emoji}</span>
        <span class="chip-freshness">⭐ ${p.freshness}</span>
      </div>
      <span class="chip-name">${p.name}</span>
      <span class="chip-price">~₹${priceKg}/kg</span>
    </button>`;
  }).join('');

  // Event delegation for box chips
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.box-chip');
    if (!btn) return;
    toggleBox(btn.dataset.key, btn);
  });

  document.getElementById('box-clear-btn')?.addEventListener('click', () => {
    boxSelected.clear();
    document.querySelectorAll('.box-chip').forEach(b => b.classList.remove('selected'));
    updateBoxSummary();
  });
}

function toggleBox(key, btn) {
  if (boxSelected.has(key)) {
    boxSelected.delete(key);
    btn.classList.remove('selected');
  } else {
    if (boxSelected.size >= 5) {
      btn.classList.add('shake');
      setTimeout(() => btn.classList.remove('shake'), 400);
      return;
    }
    boxSelected.add(key);
    btn.classList.add('selected');
  }
  updateBoxSummary();
}

function updateBoxSummary() {
  const count = boxSelected.size;
  document.getElementById('box-count').textContent = `${count} / 5 selected`;

  const empty = document.getElementById('box-empty');
  const filled = document.getElementById('box-filled');

  if (count === 0) {
    empty.classList.remove('hidden');
    filled.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  filled.classList.remove('hidden');

  const keys = [...boxSelected];
  const products = keys.map(k => PRODUCTS[k]);

  document.getElementById('box-selected-list').innerHTML = keys.map(key => {
    const p = PRODUCTS[key];
    const price = PRICES[key] || 50;
    return `<div class="box-item">
      <span>${p.emoji} ${p.name}</span>
      <span class="box-item-price">₹${price}/kg</span>
      <button class="box-remove" data-remove="${key}" type="button">×</button>
    </div>`;
  }).join('');

  // Wire remove buttons via delegation
  document.getElementById('box-selected-list').addEventListener('click', e => {
    const btn = e.target.closest('.box-remove');
    if (!btn) return;
    removeFromBox(btn.dataset.remove);
  });

  // Combined nutrition
  const nutritionMap = {};
  products.forEach(p => {
    p.nutrition.forEach(n => {
      if (!nutritionMap[n.label]) nutritionMap[n.label] = [];
      nutritionMap[n.label].push(n.value);
    });
  });

  const topLabels = Object.keys(nutritionMap).slice(0, 6);
  document.getElementById('box-nutrition-grid').innerHTML = topLabels.map(label => {
    const vals = nutritionMap[label];
    return `<div class="box-nutr-card">
      <span class="box-nutr-label">${label}</span>
      <span class="box-nutr-val">${vals[0]}</span>
      <span class="box-nutr-note">${vals.length > 1 ? `+${vals.length - 1} more` : 'from 1 item'}</span>
    </div>`;
  }).join('');

  const weeklyKg = 0.5;
  const totalCost = keys.reduce((sum, key) => sum + (PRICES[key] || 50) * weeklyKg, 0);
  const minCost = Math.round(totalCost * 0.9);
  const maxCost = Math.round(totalCost * 1.15);
  document.getElementById('box-cost').innerHTML = `
    <div class="box-cost-amount">₹${minCost} – ₹${maxCost} <span class="box-cost-note">/ week</span></div>
    <div class="box-cost-basis">Based on ~500g per item per week at market rate</div>
  `;

  const allRecipes = [];
  products.forEach(p => {
    p.recipes.forEach(r => {
      if (!allRecipes.find(x => x.name === r.name)) allRecipes.push({ ...r, source: p.name });
    });
  });
  document.getElementById('box-recipes-list').innerHTML = allRecipes.slice(0, 6).map(r => `
    <div class="box-recipe-row">
      <span class="box-recipe-emoji">${r.emoji}</span>
      <div>
        <div class="box-recipe-name">${r.name}</div>
        <div class="box-recipe-meta">⏱ ${r.time} · from ${r.source}</div>
      </div>
    </div>
  `).join('');
}

function removeFromBox(key) {
  boxSelected.delete(key);
  document.querySelector(`.box-chip[data-key="${key}"]`)?.classList.remove('selected');
  updateBoxSummary();
}

// ==========================================
// TOOL 3: STOCK BOARD
// ==========================================
function initStockBoard() {
  renderStockBoard('all');
  document.querySelectorAll('.stock-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stock-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStockBoard(btn.dataset.cat);
    });
  });
}

function renderStockBoard(cat) {
  const board = document.getElementById('stock-board');
  const keys = Object.keys(PRODUCTS).filter(k => cat === 'all' || PRODUCTS[k].category === cat);

  board.innerHTML = keys.map(key => {
    const p = PRODUCTS[key];
    const qtyNum = parseInt(p.batch.qty);
    const stockPct = Math.min(100, Math.max(10, qtyNum * 1.5));
    const freshScore = parseFloat(p.freshness);
    const freshColor = freshScore >= 9.3 ? '#16a34a' : freshScore >= 9.0 ? '#ca8a04' : '#dc2626';
    const statusBadge = p.status === 'Fresh Today' ? 'status-green' :
                        p.status === 'Seasonal' ? 'status-amber' : 'status-blue';
    return `<a href="product.html?item=${key}" class="stock-row">
      <div class="stock-emoji">${p.emoji}</div>
      <div class="stock-info">
        <div class="stock-name">${p.name} <span class="stock-aka">${p.aka}</span></div>
        <div class="stock-meta">
          <span class="stock-harvest">🌾 ${p.batch.harvested}</span>
          <span class="stock-farm">📍 ${p.batch.farm}</span>
        </div>
      </div>
      <div class="stock-right">
        <div class="stock-score" style="color:${freshColor}">⭐ ${p.freshness}</div>
        <span class="stock-status-badge ${statusBadge}">${p.status}</span>
        <div class="stock-qty">${p.batch.qty}</div>
      </div>
      <div class="stock-bar-wrap">
        <div class="stock-bar-fill" style="width:${stockPct}%"></div>
      </div>
    </a>`;
  }).join('');
}

// ==========================================
// INIT ALL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCompare();
  initBoxBuilder();
  initStockBoard();
  console.log('🌿 YAKUZAZ Smart Tools v2 loaded.');
});
