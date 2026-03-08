// ============================================================
// Fresco Admin — Shared Utilities
// Load order: supabase CDN → supabase-client.js → admin.js → page script
// ============================================================

// ---- Auth Guard ----
// Call on every protected admin page. Returns { session, profile } or redirects.
async function requireAdmin(allowedRoles = ['owner', 'staff']) {
  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) {
    window.location.href = '/admin/index.html';
    return null;
  }
  const { data: profile } = await _supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (!profile || !allowedRoles.includes(profile.role)) {
    await _supabase.auth.signOut();
    window.location.href = '/admin/index.html';
    return null;
  }
  return { session, profile };
}

// ---- Sign Out ----
async function adminSignOut() {
  await _supabase.auth.signOut();
  window.location.href = '/admin/index.html';
}

// ---- Toast Notification ----
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `admin-toast admin-toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ---- Confirm Dialog ----
function adminConfirm(message) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'admin-modal-overlay';
    overlay.innerHTML = `
      <div class="admin-modal">
        <p>${message}</p>
        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px">
          <button class="btn-cancel-c">Cancel</button>
          <button class="btn-confirm-c btn-danger-c">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.btn-cancel-c').onclick = () => { overlay.remove(); resolve(false); };
    overlay.querySelector('.btn-confirm-c').onclick = () => { overlay.remove(); resolve(true); };
  });
}

// ---- Sidebar HTML ----
function renderSidebar(activePage, role) {
  const isOwner = role === 'owner';
  return `
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <span>🌿</span>
        <span class="sidebar-brand-text">Fresco</span>
        <span class="sidebar-admin-badge">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <a href="dashboard.html" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''}">
          <span>📊</span> Dashboard
        </a>
        <a href="batches.html" class="sidebar-link ${activePage === 'batches' ? 'active' : ''}">
          <span>📦</span> Today's Batches
        </a>
        <a href="orders.html" class="sidebar-link ${activePage === 'orders' ? 'active' : ''}">
          <span>🛒</span> Orders
        </a>
        <a href="products.html" class="sidebar-link ${activePage === 'products' ? 'active' : ''}">
          <span>🥬</span> Products
        </a>
        <a href="farms.html" class="sidebar-link ${activePage === 'farms' ? 'active' : ''}">
          <span>🌾</span> Farms
        </a>
        ${isOwner ? `<a href="users.html" class="sidebar-link ${activePage === 'users' ? 'active' : ''}">
          <span>👥</span> Users & Roles
        </a>` : ''}
        <a href="waitlist.html" class="sidebar-link ${activePage === 'waitlist' ? 'active' : ''}">
          <span>📋</span> Waitlist
        </a>
        <a href="qrscans.html" class="sidebar-link ${activePage === 'qrscans' ? 'active' : ''}">
          <span>📱</span> QR Scans
        </a>
      </nav>
      <div class="sidebar-bottom">
        <a href="/" class="sidebar-link" target="_blank"><span>🌐</span> View Live Site</a>
        <button class="sidebar-link sidebar-logout" onclick="adminSignOut()"><span>🚪</span> Sign Out</button>
      </div>
    </aside>`;
}

// ---- Date Formatter ----
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function fmtDateShort(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// ---- Greeting ----
function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
}

// ---- Score badge class ----
function scoreBadgeClass(score) {
  if (score >= 9) return '';
  if (score >= 7.5) return 'amber';
  return 'red';
}

// ---- Slug generator ----
function toSlug(str) {
  return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
