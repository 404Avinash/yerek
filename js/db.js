/* ============================================================
   YAKUZAZ — Central Data Layer (db.js)
   All Supabase queries go here. Pages import nothing else.
   Load order: supabase CDN → supabase-client.js → db.js
   ============================================================ */

const DB = (() => {
  'use strict';

  /* ── tiny cache to avoid repeat fetches on same page ── */
  const _cache = new Map();

  /* ─────────────────────────────────────────────────────────
     CATEGORIES
  ───────────────────────────────────────────────────────── */
  async function getCategories() {
    if (_cache.has('categories')) return _cache.get('categories');
    const { data, error } = await _supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('id');
    if (error) { console.error('[DB] getCategories:', error.message); return []; }
    _cache.set('categories', data);
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     PRODUCTS
  ───────────────────────────────────────────────────────── */
  async function getProducts(categorySlug = null) {
    const key = 'products:' + (categorySlug || 'all');
    if (_cache.has(key)) return _cache.get(key);

    let query = _supabase
      .from('products')
      .select(`*, farms(id, name, owner_name, location, emoji, is_certified)`)
      .order('name');

    if (categorySlug) query = query.eq('category_slug', categorySlug);

    const { data, error } = await query;
    if (error) { console.error('[DB] getProducts:', error.message); return []; }
    _cache.set(key, data);
    return data;
  }

  async function getProduct(slug) {
    const key = 'product:' + slug;
    if (_cache.has(key)) return _cache.get(key);

    const { data, error } = await _supabase
      .from('products')
      .select(`*, farms(id, name, owner_name, location, emoji, supply_pct, years_partnered, is_certified)`)
      .eq('slug', slug)
      .single();
    if (error) { console.error('[DB] getProduct:', error.message); return null; }
    _cache.set(key, data);
    return data;
  }

  async function getProductsByIds(ids) {
    if (!ids || !ids.length) return [];
    const { data, error } = await _supabase
      .from('products')
      .select('*')
      .in('id', ids);
    if (error) { console.error('[DB] getProductsByIds:', error.message); return []; }
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     FARMS
  ───────────────────────────────────────────────────────── */
  async function getFarms() {
    if (_cache.has('farms')) return _cache.get('farms');
    const { data, error } = await _supabase
      .from('farms')
      .select('*')
      .order('name');
    if (error) { console.error('[DB] getFarms:', error.message); return []; }
    _cache.set('farms', data);
    return data;
  }

  async function getFarm(id) {
    const { data, error } = await _supabase
      .from('farms')
      .select('*')
      .eq('id', id)
      .single();
    if (error) { console.error('[DB] getFarm:', error.message); return null; }
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     BATCHES — QR Trace
  ───────────────────────────────────────────────────────── */
  async function getBatch(batchCode) {
    const { data, error } = await _supabase
      .from('batches')
      .select(`
        *,
        products(id, slug, name, aka, emoji, description, category_slug),
        farms(id, name, owner_name, location, emoji, is_certified)
      `)
      .eq('batch_code', batchCode)
      .single();
    if (error) { console.error('[DB] getBatch:', error.message); return null; }
    return data;
  }

  async function getBatches({ onlyActive = false, date = null } = {}) {
    let query = _supabase
      .from('batches')
      .select(`*, products(slug, name, emoji), farms(name, location)`)
      .order('created_at', { ascending: false });
    if (onlyActive) query = query.eq('is_active', true);
    if (date) {
      const start = date + 'T00:00:00';
      const end   = date + 'T23:59:59';
      query = query.gte('created_at', start).lte('created_at', end);
    }
    const { data, error } = await query;
    if (error) { console.error('[DB] getBatches:', error.message); return []; }
    return data;
  }

  async function createBatch(batchData) {
    const { data, error } = await _supabase
      .from('batches')
      .insert([batchData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async function updateBatch(id, updates) {
    const { data, error } = await _supabase
      .from('batches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     ORDERS
  ───────────────────────────────────────────────────────── */
  function _generateOrderNumber() {
    const d = new Date();
    const dateStr = d.getFullYear().toString().slice(-2)
      + String(d.getMonth() + 1).padStart(2, '0')
      + String(d.getDate()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `YKZ-${dateStr}-${rand}`;
  }

  async function createOrder(orderData, items) {
    /* orderData: { user_id?, user_name, user_phone, user_email?, pickup_date, pickup_slot, notes?, total_amount } */
    /* items: [{ product_slug, product_name, product_emoji, qty_kg, price_per_kg, subtotal }] */
    const orderNumber = _generateOrderNumber();

    const { data: order, error: orderErr } = await _supabase
      .from('orders')
      .insert([{ ...orderData, order_number: orderNumber }])
      .select()
      .single();
    if (orderErr) throw new Error('Order failed: ' + orderErr.message);

    const itemRows = items.map(item => ({ ...item, order_id: order.id }));
    const { error: itemsErr } = await _supabase
      .from('order_items')
      .insert(itemRows);
    if (itemsErr) throw new Error('Order items failed: ' + itemsErr.message);

    return order;
  }

  async function getOrders({ status = null, date = null, limit = 50 } = {}) {
    let query = _supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (status) query = query.eq('status', status);
    if (date) {
      query = query
        .gte('created_at', date + 'T00:00:00')
        .lte('created_at', date + 'T23:59:59');
    }
    const { data, error } = await query;
    if (error) { console.error('[DB] getOrders:', error.message); return []; }
    return data;
  }

  async function getOrder(id) {
    const { data, error } = await _supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('id', id)
      .single();
    if (error) { console.error('[DB] getOrder:', error.message); return null; }
    return data;
  }

  async function getMyOrders(userId) {
    const { data, error } = await _supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) { console.error('[DB] getMyOrders:', error.message); return []; }
    return data;
  }

  async function updateOrderStatus(id, status) {
    const { data, error } = await _supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     WAITLIST
  ───────────────────────────────────────────────────────── */
  async function submitWaitlist(name, email, city = '') {
    const { data, error } = await _supabase
      .from('waitlist')
      .insert([{ name, email, city, source: 'web' }])
      .select()
      .single();
    if (error) {
      if (error.code === '23505') throw new Error('DUPLICATE'); // unique email
      throw new Error(error.message);
    }
    return data;
  }

  async function getWaitlist() {
    const { data, error } = await _supabase
      .from('waitlist')
      .select('*')
      .order('joined_at', { ascending: false });
    if (error) { console.error('[DB] getWaitlist:', error.message); return []; }
    return data;
  }

  async function markWaitlistNotified(id) {
    const { error } = await _supabase
      .from('waitlist')
      .update({ is_notified: true })
      .eq('id', id);
    if (error) throw new Error(error.message);
  }

  /* ─────────────────────────────────────────────────────────
     QR SCANS
  ───────────────────────────────────────────────────────── */
  async function logQrScan(batchCode, productSlug) {
    const { data: { session } } = await _supabase.auth.getSession();
    await _supabase.from('qr_scans').insert([{
      batch_code: batchCode,
      product_slug: productSlug,
      user_id: session?.user?.id || null
    }]);
    // fire-and-forget — no error thrown
  }

  async function getQrScans({ limit = 100 } = {}) {
    const { data, error } = await _supabase
      .from('qr_scans')
      .select('*')
      .order('scanned_at', { ascending: false })
      .limit(limit);
    if (error) { console.error('[DB] getQrScans:', error.message); return []; }
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     PROMO CODES
  ───────────────────────────────────────────────────────── */
  async function validatePromo(code, orderAmount) {
    const { data, error } = await _supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();
    if (error || !data) return { valid: false, reason: 'Code not found' };
    if (data.expires_at && new Date(data.expires_at) < new Date())
      return { valid: false, reason: 'Code has expired' };
    if (data.max_uses && data.uses_count >= data.max_uses)
      return { valid: false, reason: 'Code limit reached' };
    if (data.min_order && orderAmount < data.min_order)
      return { valid: false, reason: `Min order ₹${data.min_order}` };
    const discount = data.discount_type === 'percent'
      ? Math.round(orderAmount * data.discount_value / 100)
      : data.discount_value;
    return { valid: true, discount, code: data };
  }

  async function getPromoCodes() {
    const { data, error } = await _supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('[DB] getPromoCodes:', error.message); return []; }
    return data;
  }

  async function createPromo(promoData) {
    const { data, error } = await _supabase
      .from('promo_codes')
      .insert([{ ...promoData, code: promoData.code.toUpperCase() }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async function togglePromo(id, isActive) {
    const { error } = await _supabase
      .from('promo_codes')
      .update({ is_active: isActive })
      .eq('id', id);
    if (error) throw new Error(error.message);
  }

  /* ─────────────────────────────────────────────────────────
     PROFILES / ADMIN USER MANAGEMENT
  ───────────────────────────────────────────────────────── */
  async function getMyProfile() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return null;
    const { data, error } = await _supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    if (error) { console.error('[DB] getMyProfile:', error.message); return null; }
    return data;
  }

  async function updateMyProfile(updates) {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) throw new Error('Not logged in');
    const { data, error } = await _supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', session.user.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async function getAllUsers() {
    const { data, error } = await _supabase
      .from('profiles')
      .select('*')
      .order('joined_at', { ascending: false });
    if (error) { console.error('[DB] getAllUsers:', error.message); return []; }
    return data;
  }

  async function updateUserRole(id, role) {
    const { error } = await _supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);
    if (error) throw new Error(error.message);
  }

  /* ─────────────────────────────────────────────────────────
     ADMIN: PRODUCTS CRUD
  ───────────────────────────────────────────────────────── */
  async function createProduct(productData) {
    const { data, error } = await _supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    _cache.clear(); // bust cache
    return data;
  }

  async function updateProduct(id, updates) {
    const { data, error } = await _supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    _cache.clear();
    return data;
  }

  async function deleteProduct(id) {
    const { error } = await _supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    _cache.clear();
  }

  /* ─────────────────────────────────────────────────────────
     ADMIN: FARMS CRUD
  ───────────────────────────────────────────────────────── */
  async function createFarm(farmData) {
    const { data, error } = await _supabase
      .from('farms')
      .insert([farmData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    _cache.delete('farms');
    return data;
  }

  async function updateFarm(id, updates) {
    const { data, error } = await _supabase
      .from('farms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    _cache.delete('farms');
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     DASHBOARD STATS
  ───────────────────────────────────────────────────────── */
  async function getDashboardStats() {
    const today = new Date().toISOString().slice(0, 10);

    const [orders, waitlist, batches, scans] = await Promise.all([
      _supabase.from('orders').select('id, status, total_amount, created_at').gte('created_at', today + 'T00:00:00'),
      _supabase.from('waitlist').select('id', { count: 'exact', head: true }),
      _supabase.from('batches').select('id', { count: 'exact', head: true }).eq('is_active', true),
      _supabase.from('qr_scans').select('id', { count: 'exact', head: true }).gte('scanned_at', today + 'T00:00:00')
    ]);

    const todayOrders = orders.data || [];
    return {
      todayOrderCount:   todayOrders.length,
      todayRevenue:      todayOrders.reduce((s, o) => s + (o.total_amount || 0), 0),
      pendingOrders:     todayOrders.filter(o => o.status === 'pending').length,
      waitlistCount:     waitlist.count || 0,
      activeBatches:     batches.count || 0,
      todayScans:        scans.count || 0
    };
  }

  /* ─────────────────────────────────────────────────────────
     REVIEWS
  ───────────────────────────────────────────────────────── */
  async function getReviews(productSlug) {
    const { data, error } = await _supabase
      .from('reviews')
      .select('*, profiles(full_name)')
      .eq('product_slug', productSlug)
      .order('created_at', { ascending: false });
    if (error) { console.error('[DB] getReviews:', error.message); return []; }
    return data;
  }

  async function submitReview(productSlug, rating, comment) {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) throw new Error('Login required');
    const profile = await getMyProfile();
    const { data, error } = await _supabase
      .from('reviews')
      .insert([{
        product_slug: productSlug,
        rating,
        comment,
        user_id: session.user.id,
        user_name: profile?.full_name || 'Customer'
      }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  /* ─────────────────────────────────────────────────────────
     CACHE CONTROL
  ───────────────────────────────────────────────────────── */
  function clearCache(key = null) {
    if (key) _cache.delete(key);
    else _cache.clear();
  }

  /* ─────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────── */
  return {
    // Categories
    getCategories,
    // Products
    getProducts, getProduct, getProductsByIds,
    createProduct, updateProduct, deleteProduct,
    // Farms
    getFarms, getFarm, createFarm, updateFarm,
    // Batches
    getBatch, getBatches, createBatch, updateBatch,
    // Orders
    createOrder, getOrders, getOrder, getMyOrders, updateOrderStatus,
    // Waitlist
    submitWaitlist, getWaitlist, markWaitlistNotified,
    // QR Scans
    logQrScan, getQrScans,
    // Promos
    validatePromo, getPromoCodes, createPromo, togglePromo,
    // Profiles
    getMyProfile, updateMyProfile, getAllUsers, updateUserRole,
    // Dashboard
    getDashboardStats,
    // Reviews
    getReviews, submitReview,
    // Cache
    clearCache,
    // QR code URL helper
    batchQrUrl: (batchCode) => `${window.location.origin}/product.html?batch=${batchCode}`,
  };
})();
