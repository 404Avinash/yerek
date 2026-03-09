/* ============================================================
   YAKUZAZ — Cart Utility (js/cart.js)
   Include this script on any page that needs cart features.
   Works with localStorage — no login required to add items.
   ============================================================ */

const YAKUZAZ_CART_KEY = 'YAKUZAZ_cart_v1';

/* ---------- Core CRUD ---------- */

function getCart() {
  try { return JSON.parse(localStorage.getItem(YAKUZAZ_CART_KEY)) || []; }
  catch { return []; }
}

function _saveCart(items) {
  localStorage.setItem(YAKUZAZ_CART_KEY, JSON.stringify(items));
  _updateAllCartBadges();
}

function addToCart(slug, name, emoji, price) {
  const cart = getCart();
  const existing = cart.find(i => i.slug === slug);
  if (existing) {
    existing.qty = +(existing.qty + 0.5).toFixed(1);
    if (existing.qty > 10) existing.qty = 10;
  } else {
    cart.push({ slug, name, emoji, price: parseInt(price, 10), qty: 0.5 });
  }
  _saveCart(cart);
  _showCartToast(name);
}

function removeFromCart(slug) {
  _saveCart(getCart().filter(i => i.slug !== slug));
}

function updateQty(slug, qty) {
  qty = parseFloat(qty);
  if (qty <= 0) { removeFromCart(slug); return; }
  if (qty > 10) qty = 10;
  const cart = getCart();
  const item = cart.find(i => i.slug === slug);
  if (item) { item.qty = +qty.toFixed(1); _saveCart(cart); }
}

function clearCart() {
  localStorage.removeItem(YAKUZAZ_CART_KEY);
  _updateAllCartBadges();
}

/* ---------- Computed values ---------- */

function getCartCount() {
  return getCart().length; // number of distinct items
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + Math.round(i.price * i.qty), 0);
}

/* ---------- UI helpers ---------- */

function _updateAllCartBadges() {
  const count = getCartCount();
  document.querySelectorAll('.YAKUZAZ-cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function _showCartToast(name) {
  let toast = document.getElementById('YAKUZAZCartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'YAKUZAZCartToast';
    toast.style.cssText = [
      'position:fixed', 'bottom:28px', 'left:50%', 'transform:translateX(-50%) translateY(0)',
      'background:#16a34a', 'color:#fff', 'padding:11px 22px', 'border-radius:999px',
      'font-family:Outfit,sans-serif', 'font-size:.88rem', 'font-weight:700',
      'z-index:99999', 'box-shadow:0 6px 24px rgba(0,0,0,.18)',
      'transition:opacity .35s ease, transform .35s ease', 'pointer-events:none'
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.innerHTML = `✓ <strong>${name}</strong> added — <a href="/consumer/cart.html" style="color:#bbf7d0;text-decoration:underline">View cart</a>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
  }, 2800);
}

/* ---------- Auto-init on page load ---------- */
document.addEventListener('DOMContentLoaded', _updateAllCartBadges);
