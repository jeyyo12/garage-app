// ============================================================================
// DATA & STATE MANAGEMENT
// ============================================================================

const items = [
  { id: 'oil-5w30', name: 'Engine Oil 5W-30', desc: 'Synthetic engine oil 5W-30 for modern engines.', category: 'Fluids', stock: 24, price: 35, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80' },
  { id: 'oil-5w40', name: 'Engine Oil 5W-40', desc: 'Synthetic engine oil 5W-40, enhanced protection.', category: 'Fluids', stock: 16, price: 32, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80' },
  { id: 'oil-filter', name: 'Oil Filter', desc: 'Universal oil filter, various sizes.', category: 'Filters', stock: 30, price: 8, image: 'https://images.unsplash.com/photo-1486692212027-944c4aa02842?auto=format&fit=crop&w=600&q=80' },
  { id: 'air-filter', name: 'Air Filter', desc: 'Air intake filter, multiple models.', category: 'Filters', stock: 20, price: 12, image: 'https://images.unsplash.com/photo-1486692212027-944c4aa02842?auto=format&fit=crop&w=600&q=80' },
  { id: 'cabin-filter', name: 'Cabin Filter', desc: 'Pollen/cabin filter for clean cabin air.', category: 'Filters', stock: 18, price: 10, image: 'https://images.unsplash.com/photo-1486692212027-944c4aa02842?auto=format&fit=crop&w=600&q=80' },
  { id: 'brake-pads', name: 'Brake Pads (set)', desc: 'Front/rear brake pads set, various sizes.', category: 'Brakes', stock: 12, price: 45, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
  { id: 'brake-fluid', name: 'Brake Fluid DOT 4', desc: 'High-quality DOT 4 brake fluid.', category: 'Fluids', stock: 14, price: 9, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80' },
  { id: 'coolant', name: 'Coolant (G12+)', desc: 'Concentrated G12+ coolant, winter/summer protection.', category: 'Fluids', stock: 10, price: 15, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80' },
  { id: 'washer-fluid', name: 'Windshield Washer Fluid', desc: 'Anti-freeze windshield washer fluid.', category: 'Fluids', stock: 25, price: 5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=600&q=80' },
  { id: 'spark-plug', name: 'Spark Plugs (set 4)', desc: 'Set of 4 spark plugs for efficient ignition.', category: 'Electrical', stock: 10, price: 28, image: 'https://images.unsplash.com/photo-1486692212027-944c4aa02842?auto=format&fit=crop&w=600&q=80' },
  { id: 'wipers', name: 'Wiper Blades (set)', desc: 'Universal windshield wiper blade set.', category: 'Consumables', stock: 15, price: 14, image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=600&q=80' },
  { id: 'battery-12v', name: 'Battery 12V 60Ah', desc: 'Auto battery 12V 60Ah, reliable starting.', category: 'Electrical', stock: 6, price: 95, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80' },
  { id: 'gloves-nitrile', name: 'Nitrile Gloves (100 pcs)', desc: 'Nitrile protective gloves, box of 100.', category: 'Consumables', stock: 20, price: 12, image: 'https://images.unsplash.com/photo-1584622281867-8a748c404d4b?auto=format&fit=crop&w=600&q=80' },
  { id: 'microfiber', name: 'Microfiber Cloths (set)', desc: 'Microfiber cleaning cloths for detailing.', category: 'Consumables', stock: 22, price: 7, image: 'https://images.unsplash.com/photo-1584622281867-8a748c404d4b?auto=format&fit=crop&w=600&q=80' },
  { id: 'hand-cleaner', name: 'Hand Cleaner Paste', desc: 'Special cleaning paste for mechanics.', category: 'Consumables', stock: 16, price: 6, image: 'https://images.unsplash.com/photo-1584622281867-8a748c404d4b?auto=format&fit=crop&w=600&q=80' },
  { id: 'fuses', name: 'Auto Fuses (set)', desc: 'Set of automotive fuses, various amperages.', category: 'Electrical', stock: 18, price: 5, image: 'https://images.unsplash.com/photo-1486692212027-944c4aa02842?auto=format&fit=crop&w=600&q=80' },
];

// Constants
const LOG_KEY = 'stockLogsV1';
const ITEMS_KEY = 'stockItemsV1';
const RESET_KEY = 'lastResetTime';
const CLIENTS_KEY = 'clientsV2';
const PAID_CLIENTS_KEY = 'paidClientsV2';
const FILTER_PREFS_KEY = 'stockFilterPrefs';
const MONTHLY_HISTORY_KEY = 'monthlyHistoryV1';
const DAILY_HISTORY_KEY = 'dailyHistoryV1';
const LOYAL_CLIENTS_KEY = 'loyalClientsV1';

let lastAction = null;
let resetIntervalId = null;
let currentClientId = null;
let query = '';
let selectedProductId = null;
// Stock thresholds and view state
const LOW_STOCK_THRESHOLD = 5;
const CRITICAL_STOCK_THRESHOLD = 2;
let stockFilterMode = 'all'; // 'all' | 'low' | 'out'
let stockSortMode = 'stock-desc';
let categoryFilter = 'all';

function loadFilterPrefs() {
  try {
    const prefs = JSON.parse(localStorage.getItem(FILTER_PREFS_KEY) || '{}');
    stockFilterMode = prefs.stockFilterMode || 'all';
    stockSortMode = prefs.stockSortMode || 'stock-desc';
    categoryFilter = prefs.categoryFilter || 'all';
  } catch {}
}

function saveFilterPrefs() {
  try {
    localStorage.setItem(FILTER_PREFS_KEY, JSON.stringify({
      stockFilterMode,
      stockSortMode,
      categoryFilter,
    }));
  } catch {}
}

function resetAllFilters() {
  stockFilterMode = 'all';
  stockSortMode = 'stock-desc';
  categoryFilter = 'all';
  saveFilterPrefs();
  // Reset UI: update pills and sort select
  filterPills.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  categoryPills.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
  if (sortSelect) sortSelect.value = 'stock-desc';
  render();
}

// ============================================================================
// DOM ELEMENTS - Cache common selectors
// ============================================================================

// Navigation & Tabs
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Stock Tab
const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const count12hEl = document.querySelector('#count12h');
const revenueTodayEl = document.querySelector('#revenueToday');
const undoBtn = document.querySelector('#undoBtn');
const openModal = document.querySelector('#openModal');
const stockModal = document.querySelector('#stockModal');
const closeStockModal = document.querySelector('#closeStockModal');
const closeStockModalBtn = document.querySelector('#closeStockModalBtn');
const addStockForm = document.querySelector('#addStockForm');
const productSearch = document.querySelector('#productSearch');
const productList = document.querySelector('#productList');
const selectedProduct = document.querySelector('#selectedProduct');
const itemSelect = document.querySelector('#itemSelect');
const qtyInput = document.querySelector('#qty');
const priceInput = document.querySelector('#price');
// Stock summary & toolbar
const sumItems = document.querySelector('#sumItems');
const sumLow = document.querySelector('#sumLow');
const sumOut = document.querySelector('#sumOut');
const sortSelect = document.querySelector('#sortSelect');
const filterPills = document.querySelectorAll('.stock-toolbar .pill');
const categoryPills = document.querySelectorAll('.stock-toolbar .category');
const resetFiltersBtn = document.querySelector('#resetFiltersBtn');

// Clients Tab
const quickClientForm = document.querySelector('#quickClientForm');
const clientSearch = document.querySelector('#clientSearch');
const clientsList = document.querySelector('#clientsList');
const totalDue = document.querySelector('#totalDue');
const clientNameInput = document.querySelector('#clientName');
const clientPhoneInput = document.querySelector('#clientPhone');
const clientCarInput = document.querySelector('#clientCar');

// Client Modal
const clientModal = document.querySelector('#clientModal');
const closeClientModal = document.querySelector('#closeClientModal');
const closeClientModalBtn = document.querySelector('#closeClientModalBtn');
const clientModalTitle = document.querySelector('#clientModalTitle');
const workForm = document.querySelector('#workForm');
const workList = document.querySelector('#workList');
const workDesc = document.querySelector('#workDesc');
const partsList = document.querySelector('#partsList');
const workPrice = document.querySelector('#workPrice');
const partsPrice = document.querySelector('#partsPrice');
const paymentForm = document.querySelector('#paymentForm');
const paymentAmount = document.querySelector('#paymentAmount');
const paymentList = document.querySelector('#paymentList');
const totalWork = document.querySelector('#totalWork');
const totalPaid = document.querySelector('#totalPaid');
const remainingWork = document.querySelector('#remainingWork');
const markClientPaidBtn = document.querySelector('#markClientPaidBtn');
const deleteClientInModalBtn = document.querySelector('#deleteClientInModalBtn');

// Analytics Tab
const statSold = document.querySelector('#stat-sold');
const statRevenue = document.querySelector('#stat-revenue');
const statActiveClients = document.querySelector('#stat-active-clients');
const statTotalDebt = document.querySelector('#stat-total-debt');
const topProducts = document.querySelector('#topProducts');
const topClients = document.querySelector('#topClients');

// Mobile Stats
const mCount12h = document.querySelector('#mCount12h');
const mRevenueToday = document.querySelector('#mRevenueToday');
const mResetCountdown = document.querySelector('#mResetCountdown');
const resetCountdown = document.querySelector('#resetCountdown');

// ============================================================================
// STORAGE & PERSISTENCE
// ============================================================================

function loadClients() {
  try { return JSON.parse(localStorage.getItem(CLIENTS_KEY) || '[]'); }
  catch { return []; }
}

function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

function loadPaidClients() {
  try { return JSON.parse(localStorage.getItem(PAID_CLIENTS_KEY) || '[]'); }
  catch { return []; }
}

function savePaidClients(clients) {
  localStorage.setItem(PAID_CLIENTS_KEY, JSON.stringify(clients));
}

function loadSavedItems() {
  try { return JSON.parse(localStorage.getItem(ITEMS_KEY) || '[]'); }
  catch { return []; }
}

function saveItemsState() {
  try { localStorage.setItem(ITEMS_KEY, JSON.stringify(items)); } catch {}
}

function hydrateItemsFromStorage() {
  const saved = loadSavedItems();
  if (!Array.isArray(saved) || !saved.length) return;
  const map = new Map(saved.map(s => [s.id, s]));
  items.forEach(it => {
    const s = map.get(it.id);
    if (!s) return;
    if (s.stock !== undefined) {
      const sv = parseInt(s.stock, 10);
      if (Number.isFinite(sv)) it.stock = sv;
    }
    if (s.price !== undefined) {
      const pv = parseFloat(s.price);
      if (Number.isFinite(pv)) it.price = pv;
    }
  });
}

function loadLogs() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }
  catch { return []; }
}

function saveLogs(logs) {
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

// ============================================================================
// STOCK FUNCTIONS
// ============================================================================

function recordUse(item) {
  const logs = loadLogs();
  const ts = Date.now();
  logs.push({ id: item.id, ts, price: item.price, quantity: 1 });
  const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000;
  const pruned = logs.filter(e => e.ts >= cutoff);
  saveLogs(pruned);
  lastAction = { type: 'tap', id: item.id, ts, price: item.price };
  updateUndoState();
  renderTodaysSalesLog();
}

function getTodaysSales() {
  const logs = loadLogs();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  
  return logs.filter(log => log.ts >= todayMs).map(log => ({
    ...log,
    itemName: items.find(i => i.id === log.id)?.name || 'Unknown',
    time: new Date(log.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }));
}

function deleteSale(timestamp) {
  const logs = loadLogs();
  const newLogs = logs.filter(log => log.ts !== timestamp);
  saveLogs(newLogs);
  
  // Re-add stock to the item
  const sale = logs.find(log => log.ts === timestamp);
  if (sale) {
    const item = items.find(i => i.id === sale.id);
    if (item) {
      item.stock += (sale.quantity || 1);
      saveItemsState();
    }
  }
  
  updateHeaderStats();
  updateStockSummary();
  render();
  renderTodaysSalesLog();
}

function renderTodaysSalesLog() {
  const tbody = document.getElementById('salesTableBody');
  if (!tbody) return;
  
  const sales = getTodaysSales();
  
  if (sales.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #666; padding: 16px;">No sales yet today</td></tr>';
    return;
  }
  
  tbody.innerHTML = sales.map(sale => {
    const total = (sale.quantity || 1) * sale.price;
    return `
      <tr>
        <td><strong>${sale.itemName}</strong></td>
        <td>${sale.quantity || 1}</td>
        <td>£${sale.price.toFixed(2)}</td>
        <td>£${total.toFixed(2)}</td>
        <td style="color: var(--muted);">${sale.time}</td>
        <td>
          <button class="delete-btn" onclick="window.deleteSale(${sale.ts})">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function range12h() { return Date.now() - 12 * 60 * 60 * 1000; }

function isToday(ts) {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return ts >= d.getTime();
}

function countLast12h(id) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = today.getTime();
  return loadLogs().filter(e => e.ts >= cutoff && (!id || e.id === id)).length;
}

function revenueToday() {
  return loadLogs().filter(e => isToday(e.ts)).reduce((s, e) => s + (Number(e.price) || 0), 0);
}

function formatGBP(v) {
  try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(v); }
  catch { return '£' + (Math.round(v * 100) / 100).toFixed(2); }
}

function stockLevelClass(stock) {
  if (stock === 0) return 'stock-zero';
  if (stock <= CRITICAL_STOCK_THRESHOLD) return 'stock-critical';
  if (stock <= LOW_STOCK_THRESHOLD) return 'stock-low';
  return 'stock-ok';
}

function updateStockSummary() {
  if (!sumItems || !sumLow || !sumOut) return;
  let totalUnits = 0;
  let lowCount = 0;
  let outCount = 0;
  items.forEach(it => {
    const s = Number(it.stock) || 0;
    totalUnits += Math.max(0, s);
    if (s === 0) outCount += 1;
    else if (s <= LOW_STOCK_THRESHOLD) lowCount += 1;
  });
  sumItems.textContent = totalUnits;
  sumLow.textContent = lowCount;
  sumOut.textContent = outCount;
}

function onTap(id, evt) {
  const item = items.find(i => i.id === id);
  if (!item || item.stock <= 0) return;

  item.stock -= 1;
  updateUI(item);
  recordUse(item);
  spawnFloating(evt.clientX, evt.clientY, '-1');
  spawnFloating(evt.clientX + 12, evt.clientY - 8, `+${formatGBP(item.price)}`);
  const u = document.querySelector(`#usedToday-${item.id}`);
  if (u) u.textContent = `${countLast12h(item.id)} today`;
  updateHeaderStats();
  updateStockSummary();
  saveItemsState();
}

function updateUI(item) {
  const counter = document.querySelector(`#counter-${item.id}`);
  const bar = document.querySelector(`#bar-${item.id}`);
  if (counter) counter.textContent = item.stock;
  if (bar) bar.style.transform = `scaleX(${Math.max(item.stock, 0) / 20})`;
  // Update overlay availability and price if present
  const avail = document.querySelector(`#availability-${item.id}`);
  if (avail) {
    const isAvailable = item.stock > 0;
    avail.textContent = isAvailable ? 'Available' : 'Out of stock';
    avail.className = `availability ${isAvailable ? 'available' : 'out'}`;
  }
  const priceEl = document.querySelector(`#price-${item.id}`);
  if (priceEl) priceEl.textContent = formatGBP(item.price);
}

function spawnFloating(x, y, text) {
  const float = document.createElement('div');
  float.className = 'floating';
  float.textContent = text;
  float.style.left = `${x}px`;
  float.style.top = `${y}px`;
  document.body.appendChild(float);
  setTimeout(() => float.remove(), 800);
}

function render() {
  grid.innerHTML = '';
  const normalized = query.trim().toLowerCase();
  const visible = normalized
    ? items.filter(item =>
        item.name.toLowerCase().includes(normalized) ||
        item.desc.toLowerCase().includes(normalized) ||
        item.id.toLowerCase().includes(normalized)
      )
    : items;

  // Apply stock filter
  let filtered = visible;
  if (stockFilterMode === 'low') {
    filtered = visible.filter(i => i.stock > 0 && i.stock <= LOW_STOCK_THRESHOLD);
  } else if (stockFilterMode === 'out') {
    filtered = visible.filter(i => i.stock === 0);
  }

  // Apply category filter
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(i => (i.category || '').toLowerCase() === categoryFilter.toLowerCase());
  }

  // Resolve sort mode from select if present
  if (typeof sortSelect !== 'undefined' && sortSelect && sortSelect.value) {
    stockSortMode = sortSelect.value;
  }

  // Apply sort
  const toRender = [...filtered];
  if (stockSortMode === 'stock-desc') {
    toRender.sort((a, b) => (b.stock || 0) - (a.stock || 0));
  } else if (stockSortMode === 'stock-asc') {
    toRender.sort((a, b) => (a.stock || 0) - (b.stock || 0));
  } else if (stockSortMode === 'name-asc') {
    toRender.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!toRender.length) {
    grid.innerHTML = '<div class="empty">No products found.</div>';
    fillSelect();
    updateStockSummary();
    return;
  }

  toRender.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';

    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.dataset.id = item.id;

    const border = document.createElement('div');
    border.className = 'border-anim';
    photo.appendChild(border);

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    photo.appendChild(img);

    // Product info below image for clear visibility
    const infoBelow = document.createElement('div');
    infoBelow.className = 'product-info-below';
    
    const priceEl = document.createElement('span');
    priceEl.className = 'price';
    priceEl.id = `price-${item.id}`;
    priceEl.textContent = formatGBP(item.price);
    
    const usedEl = document.createElement('span');
    usedEl.className = 'used';
    usedEl.id = `usedToday-${item.id}`;
    usedEl.textContent = `${countLast12h(item.id)} today`;
    
    const availEl = document.createElement('span');
    availEl.className = `availability ${item.stock > 0 ? 'available' : 'out'}`;
    availEl.id = `availability-${item.id}`;
    availEl.textContent = item.stock > 0 ? 'Available' : 'Out of stock';
    
    infoBelow.append(priceEl, usedEl, availEl);
    photo.appendChild(infoBelow);

    const info = document.createElement('div');
    info.className = 'info';
    const h3 = document.createElement('h3');
    h3.textContent = item.name;
    const p = document.createElement('p');
    p.textContent = item.desc;

    const stockLine = document.createElement('div');
    stockLine.className = 'stock-line';
    const counter = document.createElement('div');
    counter.className = 'counter';
    counter.id = `counter-${item.id}`;
    counter.textContent = item.stock;

    const meter = document.createElement('div');
    meter.className = 'meter';
    const bar = document.createElement('span');
    bar.id = `bar-${item.id}`;
    bar.style.transform = `scaleX(${Math.max(item.stock, 0) / 20})`;
    meter.appendChild(bar);

    stockLine.appendChild(counter);
    stockLine.appendChild(meter);

    info.append(h3, p, stockLine);
    card.append(photo, info);
    grid.appendChild(card);

    photo.addEventListener('click', (evt) => onTap(item.id, evt));
  });

  fillSelect();
  updateHeaderStats();
  updateStockSummary();
}

function createChip(text) {
  const chip = document.createElement('span');
  chip.className = 'chip';
  chip.textContent = text;
  return chip;
}

function fillSelect() {
  itemSelect.innerHTML = '';
  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    itemSelect.appendChild(opt);
  });
  if (!itemSelect.value && items.length) {
    itemSelect.value = items[0].id;
  }
}

// ============================================================================
// UNDO FUNCTIONALITY
// ============================================================================

function updateUndoState() {
  if (!undoBtn) return;
  const active = !!lastAction;
  undoBtn.disabled = !active;
  undoBtn.style.opacity = active ? '1' : '0.5';
  undoBtn.style.cursor = active ? 'pointer' : 'not-allowed';
}

function undoLastAction() {
  if (!lastAction || lastAction.type !== 'tap') return;
  const item = items.find(i => i.id === lastAction.id);
  if (!item) { lastAction = null; updateUndoState(); return; }

  item.stock += 1;
  updateUI(item);

  const logs = loadLogs();
  const idx = logs.length ? [...logs].reverse().findIndex(e => e.id === lastAction.id && e.ts === lastAction.ts) : -1;
  if (idx >= 0) {
    const realIndex = logs.length - 1 - idx;
    logs.splice(realIndex, 1);
    saveLogs(logs);
  }

  const u = document.querySelector(`#usedToday-${item.id}`);
  if (u) u.textContent = `${countLast12h(item.id)} today`;
  updateHeaderStats();
  updateStockSummary();
  saveItemsState();
  renderTodaysSalesLog();

  lastAction = null;
  updateUndoState();
}

// ============================================================================
// TIME & RESET FUNCTIONS
// ============================================================================

function getOrInitResetTime() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  let stored = localStorage.getItem(RESET_KEY);
  if (!stored) {
    localStorage.setItem(RESET_KEY, todayMs);
    return todayMs;
  }
  const storedMs = parseInt(stored, 10);
  if (storedMs < todayMs) {
    localStorage.setItem(RESET_KEY, todayMs);
    return todayMs;
  }
  return storedMs;
}

function getTimeUntilReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  const msUntilMidnight = tomorrow.getTime() - now.getTime();
  return Math.max(0, msUntilMidnight);
}

function formatCountdown(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

function updateCountdownDisplay() {
  const timeLeft = getTimeUntilReset();
  const display = formatCountdown(timeLeft);
  if (resetCountdown) resetCountdown.textContent = display;
  if (mResetCountdown) mResetCountdown.textContent = display;
}

function maybeResetSalesAt12h() {
  const stored = parseInt(localStorage.getItem(RESET_KEY) || '0', 10);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  if (stored < todayMs) {
    // Save daily snapshot for yesterday
    saveDailySnapshot();
    
    // Check if month changed and save monthly snapshot
    const lastResetDate = new Date(stored);
    const currentDate = new Date();
    if (lastResetDate.getMonth() !== currentDate.getMonth() || lastResetDate.getFullYear() !== currentDate.getFullYear()) {
      saveMonthlySnapshot();
    }
    localStorage.setItem(RESET_KEY, todayMs);
    updateHeaderStats();
    render();
  }
}

// Monthly History Tracking
function getMonthKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function getDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentDayStats() {
  const now = new Date();
  const dayKey = getDayKey(now);
  
  let stats = {
    revenue: 0,
    transactions: 0,
    productsSold: 0,
  };

  try {
    const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    
    logs.forEach(log => {
      const logDate = new Date(log.timestamp);
      if (getDayKey(logDate) === dayKey) {
        stats.revenue += log.quantity * log.price;
        stats.transactions += 1;
        stats.productsSold += log.quantity;
      }
    });

  } catch (e) {
    console.error('Error calculating day stats:', e);
  }

  return {
    revenue: Math.round(stats.revenue * 100) / 100,
    transactions: stats.transactions,
    productsSold: stats.productsSold,
  };
}

function saveDailySnapshot() {
  try {
    let history = JSON.parse(localStorage.getItem(DAILY_HISTORY_KEY) || '{}');
    const yesterdayKey = getDayKey(new Date(Date.now() - 24*60*60*1000));
    
    if (!history[yesterdayKey]) {
      // Calculate stats for yesterday
      const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      let stats = {
        revenue: 0,
        transactions: 0,
        productsSold: 0,
      };
      
      logs.forEach(log => {
        const logDate = new Date(log.timestamp);
        if (getDayKey(logDate) === yesterdayKey) {
          stats.revenue += log.quantity * log.price;
          stats.transactions += 1;
          stats.productsSold += log.quantity;
        }
      });
      
      history[yesterdayKey] = {
        revenue: Math.round(stats.revenue * 100) / 100,
        transactions: stats.transactions,
        productsSold: stats.productsSold,
      };
      localStorage.setItem(DAILY_HISTORY_KEY, JSON.stringify(history));
    }
  } catch (e) {
    console.error('Error saving daily snapshot:', e);
  }
}

function getCurrentMonthStats() {
  const now = new Date();
  const monthKey = getMonthKey(now);
  
  let stats = {
    revenue: 0,
    transactions: 0,
    productsSold: 0,
    activeClients: new Set(),
  };

  try {
    const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    const clients = JSON.parse(localStorage.getItem(CLIENTS_KEY) || '[]');
    
    logs.forEach(log => {
      const logDate = new Date(log.timestamp);
      if (getMonthKey(logDate) === monthKey) {
        stats.revenue += log.quantity * log.price;
        stats.transactions += 1;
        stats.productsSold += log.quantity;
      }
    });

    // Count unique clients with work in this month
    clients.forEach(client => {
      if (client.work && client.work.length > 0) {
        const hasCurrentMonth = client.work.some(w => {
          const workDate = new Date(w.timestamp);
          return getMonthKey(workDate) === monthKey;
        });
        if (hasCurrentMonth) stats.activeClients.add(client.id);
      }
    });

  } catch (e) {
    console.error('Error calculating stats:', e);
  }

  return {
    revenue: Math.round(stats.revenue * 100) / 100,
    transactions: stats.transactions,
    productsSold: stats.productsSold,
    activeClients: stats.activeClients.size,
  };
}

function saveMonthlySnapshot() {
  try {
    let history = JSON.parse(localStorage.getItem(MONTHLY_HISTORY_KEY) || '{}');
    const monthKey = getMonthKey(new Date(new Date().setDate(0))); // Previous month
    
    if (!history[monthKey]) {
      const stats = getCurrentMonthStats();
      history[monthKey] = stats;
      localStorage.setItem(MONTHLY_HISTORY_KEY, JSON.stringify(history));
    }
  } catch (e) {
    console.error('Error saving monthly snapshot:', e);
  }
}

function getDailyHistory() {
  try {
    return JSON.parse(localStorage.getItem(DAILY_HISTORY_KEY) || '{}');
  } catch {
    return {};
  }
}

function getMonthlyHistory() {
  try {
    return JSON.parse(localStorage.getItem(MONTHLY_HISTORY_KEY) || '{}');
  } catch {
    return {};
  }
}

function renderDailyHistory() {
  const history = getDailyHistory();
  const tbody = document.getElementById('dailyHistoryTableBody');
  
  if (!tbody) return;
  
  const days = Object.keys(history).sort().reverse();
  
  if (days.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #666; padding: 24px;">No daily data yet. Start selling to track daily performance.</td></tr>';
    return;
  }

  tbody.innerHTML = days.map(dayKey => {
    const data = history[dayKey];
    const [year, month, day] = dayKey.split('-');
    const date = new Date(year, month - 1, day);
    const dayName = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    
    return `
      <tr>
        <td><strong>${dayName}</strong></td>
        <td>£${data.revenue.toFixed(2)}</td>
        <td>${data.transactions}</td>
        <td>${data.productsSold}</td>
      </tr>
    `;
  }).join('');
}

function renderMonthlyHistory() {
  const history = getMonthlyHistory();
  const tbody = document.getElementById('monthlyHistoryTableBody');
  
  if (!tbody) return;
  
  const months = Object.keys(history).sort().reverse();
  
  if (months.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666; padding: 24px;">No monthly data yet. Data will be recorded at the end of each month.</td></tr>';
    return;
  }

  tbody.innerHTML = months.map(monthKey => {
    const data = history[monthKey];
    const [year, month] = monthKey.split('-');
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    return `
      <tr>
        <td><strong>${monthName}</strong></td>
        <td>£${data.revenue.toFixed(2)}</td>
        <td>${data.transactions}</td>
        <td>${data.productsSold}</td>
        <td>${data.activeClients}</td>
      </tr>
    `;
  }).join('');
}

function updateHistoryDisplay() {
  renderDailyHistory();
  renderMonthlyHistory();
}

function updateHeaderStats() {
  maybeResetSalesAt12h();
  const c12 = countLast12h();
  const rev = (Math.round(revenueToday() * 100) / 100).toFixed(2);
  if (count12hEl) count12hEl.textContent = c12;
  if (revenueTodayEl) revenueTodayEl.textContent = rev;
  if (mCount12h) mCount12h.textContent = c12;
  if (mRevenueToday) mRevenueToday.textContent = rev;
  updateCountdownDisplay();
}

// ============================================================================
// PRODUCT PICKER FUNCTIONS
// ============================================================================

function renderProductList(searchTerm = '') {
  productList.innerHTML = '';
  const normalized = searchTerm.trim().toLowerCase();
  const filtered = normalized
    ? items.filter(item =>
        item.name.toLowerCase().includes(normalized) ||
        item.id.toLowerCase().includes(normalized)
      )
    : items;

  if (filtered.length === 0) {
    productList.innerHTML = '<div style="padding: 12px; color: var(--muted); text-align: center; font-size: 13px;">No products found</div>';
  } else {
    filtered.forEach(item => {
      const div = document.createElement('div');
      div.className = 'product-item';
      if (item.id === selectedProductId) div.classList.add('selected');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="stock">Stock: ${item.stock}</div>
        </div>
      `;
      div.addEventListener('click', () => selectProduct(item.id, item.name));
      productList.appendChild(div);
    });
  }
  productList.classList.add('active');
}

function selectProduct(id, name) {
  selectedProductId = id;
  itemSelect.value = id;
  productSearch.value = name;
  productList.classList.remove('active');
  selectedProduct.textContent = `Selected: ${name}`;
  selectedProduct.style.display = 'block';
  syncPriceInput();
}

function syncPriceInput() {
  const id = itemSelect.value;
  const item = items.find(i => i.id === id);
  if (!item) return;
  if (priceInput) priceInput.value = item.price ?? '';
}

function initProductSearch() {
  if (productSearch) {
    productSearch.addEventListener('input', debounce((e) => {
      renderProductList(e.target.value);
    }, 150));
    productSearch.addEventListener('focus', () => {
      renderProductList(productSearch.value);
    });
  }
  document.addEventListener('click', (e) => {
    if (!productSearch || !productList) return;
    const wrapper = document.querySelector('.product-picker');
    if (wrapper && !wrapper.contains(e.target)) {
      productList.classList.remove('active');
    }
  });
}

// ============================================================================
// CLIENT FUNCTIONS
// ============================================================================

function addClient(name, phone, car) {
  const clients = loadClients();
  const clientId = Date.now();
  clients.push({ id: clientId, name, phone, car, works: [], payments: [], totalAmount: 0, createdAt: new Date().toISOString() });
  saveClients(clients);
  renderClientsList();
  quickClientForm.reset();
}

function addWork(clientId, desc, parts, workPrice, partsPrice) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  if (!client.works) client.works = [];
  const workId = Date.now();
  const total = parseFloat(workPrice) + parseFloat(partsPrice);
  client.works.push({ id: workId, desc, parts, workPrice: parseFloat(workPrice), partsPrice: parseFloat(partsPrice), total, date: new Date().toISOString() });
  saveClients(clients);
  renderClientInvoice(clientId);
}

function deleteWork(clientId, workId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  client.works = client.works.filter(w => w.id !== workId);
  saveClients(clients);
  renderClientInvoice(clientId);
}

function addPayment(clientId, amount) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  const paymentAmount = parseFloat(amount);
  if (paymentAmount <= 0) return;
  if (!client.payments) client.payments = [];
  client.payments.push({ id: Date.now(), amount: paymentAmount, date: new Date().toISOString() });
  saveClients(clients);
  renderClientInvoice(clientId);
}

function deleteClient(clientId) {
  let clients = loadClients();
  clients = clients.filter(c => c.id !== clientId);
  saveClients(clients);
  renderClientsList();
  clientModal.classList.remove('active');
}

function markClientAsPaid(clientId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  client.paidDate = new Date().toISOString();
  const paid = loadPaidClients();
  paid.unshift(client);
  savePaidClients(paid);
  clients.splice(clients.indexOf(client), 1);
  saveClients(clients);
  renderClientsList();
  clientModal.classList.remove('active');
}

function renderClientsList(searchTerm = '') {
  let clients = loadClients();
  
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    clients = clients.filter(c => 
      c.name.toLowerCase().includes(term) || 
      (c.car && c.car.toLowerCase().includes(term)) ||
      (c.phone && c.phone.includes(term))
    );
  }
  
  // Calculate totals for stats
  const totalDueAmount = clients.reduce((sum, c) => {
    const work = c.works?.reduce((s, w) => s + w.total, 0) || 0;
    const paid = c.payments?.reduce((s, p) => s + p.amount, 0) || 0;
    return sum + Math.max(0, work - paid);
  }, 0);
  
  const paidClientsCount = clients.filter(c => {
    const work = c.works?.reduce((s, w) => s + w.total, 0) || 0;
    const paid = c.payments?.reduce((s, p) => s + p.amount, 0) || 0;
    return work > 0 && (work - paid) <= 0;
  }).length;
  
  // Update stats display
  const activeClientsCountElem = document.getElementById('activeClientsCount');
  const totalDueAmountElem = document.getElementById('totalDueAmount');
  const paidClientsCountElem = document.getElementById('paidClientsCount');
  
  if (activeClientsCountElem) activeClientsCountElem.textContent = clients.length;
  if (totalDueAmountElem) totalDueAmountElem.textContent = '£' + totalDueAmount.toFixed(2);
  if (paidClientsCountElem) paidClientsCountElem.textContent = paidClientsCount;
  
  const clientsList = document.getElementById('clientsList');
  clientsList.innerHTML = '';
  
  if (clients.length === 0) {
    clientsList.innerHTML = '<div class="empty" style="text-align: center; padding: 60px 24px;">No clients found</div>';
  } else {
    clients.forEach(client => {
      const workTotal = client.works?.reduce((sum, w) => sum + w.total, 0) || 0;
      const paidTotal = client.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const remaining = Math.max(0, workTotal - paidTotal);
      
      const card = document.createElement('div');
      card.className = 'client-card';
      
      card.innerHTML = `
        <div class="client-info">
          <h3>${client.name}</h3>
          <p>${client.car || 'Car not specified'}</p>
          <p>${client.phone || 'Phone not specified'}</p>
        </div>
        <div class="client-card-details">
          <div class="client-card-stat">
            <div class="client-card-stat-label">Services</div>
            <div class="client-card-stat-value">${client.works?.length || 0}</div>
          </div>
          <div class="client-card-stat">
            <div class="client-card-stat-label">Total Work</div>
            <div class="client-card-stat-value">£${workTotal.toFixed(2)}</div>
          </div>
          <div class="client-card-stat">
            <div class="client-card-stat-label">Remaining</div>
            <div class="client-card-stat-value" style="color: ${remaining > 0 ? '#c0392b' : '#27ae60'};">£${remaining.toFixed(2)}</div>
          </div>
          <div class="client-card-action">
            <button type="button" class="client-card-btn" onclick="openInvoiceViewer(${client.id})">📋 Invoice</button>
            <button type="button" class="client-card-btn" onclick="openClientModal(${client.id})">✏️ Edit</button>
          </div>
        </div>
      `;
      
      clientsList.appendChild(card);
    });
  }
}

function openInvoiceViewer(clientId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  
  renderInvoiceViewer(client);
  
  const invoiceViewer = document.getElementById('invoiceViewer');
  if (invoiceViewer) {
    invoiceViewer.classList.add('active');
  }
}

function renderInvoiceViewer(client) {
  // Client info
  document.getElementById('viewInvoiceClientName').textContent = client.name;
  document.getElementById('viewInvoiceClientPhone').textContent = `📞 ${client.phone}`;
  document.getElementById('viewInvoiceClientCar').textContent = `🚗 ${client.car}`;
  
  // Date
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('invoiceDate').textContent = `Invoice Date: ${today}`;
  
  // Calculate totals
  const totalWork = client.works?.reduce((sum, w) => sum + w.total, 0) || 0;
  const totalPaid = client.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const totalDue = totalWork - totalPaid;
  
  // Status badge
  const statusBadge = document.getElementById('viewInvoiceStatus');
  if (totalWork === 0) {
    statusBadge.textContent = 'NEW CLIENT';
    statusBadge.className = 'status-badge large pending';
  } else if (totalDue <= 0) {
    statusBadge.textContent = '✓ PAID';
    statusBadge.className = 'status-badge large paid';
  } else {
    statusBadge.textContent = 'PENDING';
    statusBadge.className = 'status-badge large pending';
  }
  
  // Render work items in table
  const itemsContainer = document.getElementById('viewInvoiceItems');
  itemsContainer.innerHTML = '';
  
  if (!client.works || client.works.length === 0) {
    itemsContainer.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999; padding: 24px;">No services recorded</td></tr>';
  } else {
    client.works.forEach(work => {
      const workDate = new Date(work.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${work.desc}</td>
        <td>${work.parts || '-'}</td>
        <td>£${work.workPrice.toFixed(2)}</td>
        <td>£${work.partsPrice.toFixed(2)}</td>
        <td style="font-weight: 700; color: var(--accent-2);">£${work.total.toFixed(2)}</td>
      `;
      itemsContainer.appendChild(row);
    });
  }
  
  // Totals
  document.getElementById('viewSubtotalWork').textContent = `£${totalWork.toFixed(2)}`;
  document.getElementById('viewPaidAmount').textContent = `£${totalPaid.toFixed(2)}`;
  document.getElementById('viewTotalDueInvoice').textContent = `£${Math.max(0, totalDue).toFixed(2)}`;
  
  // Payment history
  renderInvoiceViewerPayments(client);
}

function renderInvoiceViewerPayments(client) {
  const paymentList = document.getElementById('viewPaymentList');
  paymentList.innerHTML = '';
  
  if (!client.payments || client.payments.length === 0) {
    paymentList.innerHTML = '<p style="text-align: center; color: #999; font-size: 13px; padding: 16px;">No payments recorded yet</p>';
  } else {
    client.payments.forEach(payment => {
      const payDate = new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
      const div = document.createElement('div');
      div.className = 'payment-item';
      div.innerHTML = `
        <span class="date">${payDate}</span>
        <span class="amount">✓ £${payment.amount.toFixed(2)}</span>
      `;
      paymentList.appendChild(div);
    });
  }
}

function openClientModal(clientId) {
  currentClientId = clientId;
  renderClientInvoice(clientId);
  const clientModal = document.getElementById('clientModal');
  if (clientModal) {
    clientModal.classList.add('active');
  }
}

function renderClientInvoice(clientId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  
  // Update invoice header
  document.getElementById('invoiceClientName').textContent = client.name;
  document.getElementById('invoiceClientPhone').textContent = `📞 ${client.phone}`;
  document.getElementById('invoiceClientCar').textContent = `🚗 ${client.car}`;
  
  // Calculate totals
  const totalWork = client.works?.reduce((sum, w) => sum + w.total, 0) || 0;
  const totalPaid = client.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const totalDue = totalWork - totalPaid;
  
  // Update status badge
  const statusBadge = document.getElementById('invoiceStatus');
  if (totalWork === 0) {
    statusBadge.textContent = 'NEW CLIENT';
    statusBadge.className = 'status-badge pending';
  } else if (totalDue <= 0) {
    statusBadge.textContent = '✓ PAID';
    statusBadge.className = 'status-badge paid';
  } else {
    statusBadge.textContent = 'PENDING';
    statusBadge.className = 'status-badge pending';
  }
  
  // Render work items
  renderInvoiceItems(client);
  
  // Update summary
  document.getElementById('subtotalWork').textContent = `£${totalWork.toFixed(2)}`;
  document.getElementById('paidAmount').textContent = `£${totalPaid.toFixed(2)}`;
  document.getElementById('totalDueInvoice').textContent = `£${Math.max(0, totalDue).toFixed(2)}`;
  
  // Render payments
  renderPaymentsList(client);
}

function renderInvoiceItems(client) {
  const itemsContainer = document.getElementById('workList');
  itemsContainer.innerHTML = '';
  
  if (!client.works || client.works.length === 0) {
    itemsContainer.innerHTML = '<div class="empty" style="text-align: center; color: #999; padding: 24px;">No services recorded yet</div>';
    return;
  }
  
  client.works.forEach(work => {
    const div = document.createElement('div');
    div.className = 'invoice-item';
    const workDate = new Date(work.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    div.innerHTML = `
      <div class="invoice-item-details">
        <div class="invoice-item-desc">🔧 ${work.desc}</div>
        ${work.parts ? `<div class="invoice-item-parts">Parts: ${work.parts}</div>` : ''}
        <div class="invoice-item-breakdown">
          <span class="labour">Labour: £${work.workPrice.toFixed(2)}</span>
          ${work.partsPrice > 0 ? `<span class="parts">Parts: £${work.partsPrice.toFixed(2)}</span>` : ''}
          <span>${workDate}</span>
        </div>
      </div>
      <div class="invoice-item-total">
        <div class="amount">£${work.total.toFixed(2)}</div>
        <button type="button" class="invoice-item-delete" onclick="deleteWork(${client.id}, ${work.id})">Delete</button>
      </div>
    `;
    itemsContainer.appendChild(div);
  });
}

function renderPaymentsList(client) {
  const paymentList = document.getElementById('paymentList');
  paymentList.innerHTML = '';
  
  if (!client.payments || client.payments.length === 0) {
    paymentList.innerHTML = '<p style="text-align: center; color: #999; font-size: 13px;">No payments recorded</p>';
    return;
  }
  
  client.payments.forEach(payment => {
    const div = document.createElement('div');
    div.className = 'payment-item';
    const payDate = new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    div.innerHTML = `
      <span class="date">${payDate}</span>
      <span class="amount">✓ £${payment.amount.toFixed(2)}</span>
    `;
    paymentList.appendChild(div);
  });
}

function renderClientDetails(clientId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return;
  
  clientModalTitle.textContent = `${client.name} - ${client.car}`;
  renderInvoiceItems(client);
  updatePaymentDisplay(client);
}

function renderWorkEntriesList(client) {
  const workList = document.getElementById('workList');
  workList.innerHTML = '';
  if (!client.works || client.works.length === 0) {
    workList.innerHTML = '<div class="empty">No work recorded.</div>';
    return;
  }
  
  renderInvoiceItems(client);
}

function updatePaymentDisplay(client) {
  const totalWork = client.works?.reduce((sum, w) => sum + w.total, 0) || 0;
  const totalPaid = client.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const totalDue = Math.max(0, totalWork - totalPaid);
  
  const subtotalElem = document.getElementById('subtotalWork');
  const paidElem = document.getElementById('paidAmount');
  const dueElem = document.getElementById('totalDueInvoice');
  
  if (subtotalElem) subtotalElem.textContent = `£${totalWork.toFixed(2)}`;
  if (paidElem) paidElem.textContent = `£${totalPaid.toFixed(2)}`;
  if (dueElem) dueElem.textContent = `£${totalDue.toFixed(2)}`;
  
  renderPaymentsList(client);
}

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

function updateAnalytics() {
  const c12 = countLast12h();
  const rev = revenueToday();
  const clients = loadClients();
  const activeClients = clients.length;
  
  let totalDebt = 0;
  clients.forEach(c => {
    const paid = c.payments.reduce((sum, p) => sum + p.amount, 0);
    totalDebt += Math.max(0, c.totalAmount - paid);
  });
  
  if (statSold) statSold.textContent = c12;
  if (statRevenue) statRevenue.textContent = formatGBP(rev);
  if (statActiveClients) statActiveClients.textContent = activeClients;
  if (statTotalDebt) statTotalDebt.textContent = formatGBP(totalDebt);
  
  // Top Products
  const logs = loadLogs();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLogs = logs.filter(e => e.ts >= today.getTime());
  const productCounts = {};
  todayLogs.forEach(log => {
    productCounts[log.id] = (productCounts[log.id] || 0) + 1;
  });
  
  const topProductsList = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  topProducts.innerHTML = '';
  if (topProductsList.length === 0) {
    topProducts.innerHTML = '<div class="empty">No sales today.</div>';
  } else {
    topProductsList.forEach(([id, count]) => {
      const item = items.find(i => i.id === id);
      const div = document.createElement('div');
      div.className = 'report-item';
      div.innerHTML = `
        <span class="name">${item ? item.name : id}</span>
        <span class="value">${count}x</span>
      `;
      topProducts.appendChild(div);
    });
  }
  
  // Top Clients
  const topClientsList = clients
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);
  
  topClients.innerHTML = '';
  if (topClientsList.length === 0) {
    topClients.innerHTML = '<div class="empty">No clients.</div>';
  } else {
    topClientsList.forEach(client => {
      const div = document.createElement('div');
      div.className = 'report-item';
      div.innerHTML = `
        <span class="name">${client.name}</span>
        <span class="value">£${client.totalAmount.toFixed(2)}</span>
      `;
      topClients.appendChild(div);
    });
  }
}

// ============================================================================
// MODAL FUNCTIONS
// ============================================================================

function toggleStockModal(show) {
  stockModal.classList.toggle('active', show);
  if (show) syncPriceInput();
}

function toggleClientModal(show) {
  clientModal.classList.toggle('active', show);
}

// ============================================================================
// NAVIGATION & TABS
// ============================================================================

function switchTab(tabName) {
  tabContents.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-hidden', 'true');
  });
  navTabs.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  const activeTab = document.getElementById(`${tabName}-tab`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-hidden', 'false');
  }

  const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  if (tabName === 'analytics') {
    updateAnalytics();
  }

  if (tabName === 'sales') {
    renderTodaysSalesLog();
  }

  if (tabName === 'history') {
    updateHistoryDisplay();
  }

  if (tabName === 'loyal') {
    renderLoyalClientsList();
  }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Navigation
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;
    switchTab(tabName);
  });
});

// Stock Tab
if (search) {
  search.addEventListener('input', debounce((e) => {
    query = e.target.value || '';
    render();
  }, 150));
}

// Stock toolbar: sort + filters
if (sortSelect) {
  stockSortMode = sortSelect.value || stockSortMode;
  sortSelect.addEventListener('change', (e) => {
    stockSortMode = e.target.value || 'stock-desc';
    saveFilterPrefs();
    render();
  });
}

if (filterPills && filterPills.length) {
  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.filter || 'all';
      stockFilterMode = mode;
      // Update active state
      filterPills.forEach(b => b.classList.toggle('active', b === btn));
      saveFilterPrefs();
      render();
    });
  });
}

// Category filters
if (categoryPills && categoryPills.length) {
  categoryPills.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category || 'all';
      categoryFilter = cat;
      // Toggle active inside the categories group
      const group = btn.parentElement;
      if (group) {
        group.querySelectorAll('.category').forEach(b => b.classList.toggle('active', b === btn));
      }
      saveFilterPrefs();
      render();
    });
  });
}

if (undoBtn) {
  undoBtn.addEventListener('click', undoLastAction);
}

if (openModal) {
  openModal.addEventListener('click', () => toggleStockModal(true));
}

if (closeStockModal || closeStockModalBtn) {
  closeStockModal && closeStockModal.addEventListener('click', () => toggleStockModal(false));
  closeStockModalBtn && closeStockModalBtn.addEventListener('click', () => toggleStockModal(false));
}

stockModal && stockModal.addEventListener('click', (e) => {
  if (e.target === stockModal) toggleStockModal(false);
});

const loyalClientModal = document.getElementById('loyalClientModal');
loyalClientModal && loyalClientModal.addEventListener('click', (e) => {
  if (e.target === loyalClientModal) closeLoyalClientModal();
});

if (addStockForm) {
  addStockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = itemSelect.value;
    const qty = parseInt(qtyInput.value, 10);
    if (!Number.isFinite(qty) || qty < 1) return;
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.stock += qty;
    const p = parseFloat(priceInput.value);
    if (Number.isFinite(p) && p >= 0) {
      item.price = p;
    }
    updateUI(item);
    fillSelect();
    const u = document.querySelector(`#usage12h-${item.id}`);
    if (u) u.textContent = `12h: ${countLast12h(item.id)}`;
    updateHeaderStats();
    updateStockSummary();
    saveItemsState();
    lastAction = null;
    updateUndoState();
    toggleStockModal(false);
  });
}

// Clients Tab
if (quickClientForm) {
  quickClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = clientNameInput.value.trim();
    const phone = clientPhoneInput.value.trim();
    const car = clientCarInput.value.trim();
    if (!name) return;
    addClient(name, phone, car);
  });
}

if (clientSearch) {
  clientSearch.addEventListener('input', debounce((e) => {
    renderClientsList(e.target.value);
  }, 150));
}

// Client Modal
if (closeClientModal || closeClientModalBtn) {
  closeClientModal && closeClientModal.addEventListener('click', () => toggleClientModal(false));
  closeClientModalBtn && closeClientModalBtn.addEventListener('click', () => toggleClientModal(false));
}

clientModal && clientModal.addEventListener('click', (e) => {
  if (e.target === clientModal) toggleClientModal(false);
});

// Invoice Viewer Modal
const invoiceViewer = document.getElementById('invoiceViewer');
const closeInvoiceViewer = document.getElementById('closeInvoiceViewer');
const closeInvoiceViewerBtn = document.getElementById('closeInvoiceViewerBtn');
const editInvoiceBtn = document.getElementById('editInvoiceBtn');
const printInvoiceBtn = document.getElementById('printInvoiceBtn');

function closeInvoiceViewerModal() {
  if (invoiceViewer) {
    invoiceViewer.classList.remove('active');
  }
}

if (closeInvoiceViewer) {
  closeInvoiceViewer.addEventListener('click', closeInvoiceViewerModal);
}

if (closeInvoiceViewerBtn) {
  closeInvoiceViewerBtn.addEventListener('click', closeInvoiceViewerModal);
}

if (editInvoiceBtn) {
  editInvoiceBtn.addEventListener('click', () => {
    closeInvoiceViewerModal();
    if (currentClientId) {
      setTimeout(() => {
        openClientModal(currentClientId);
      }, 200);
    }
  });
}

if (printInvoiceBtn) {
  printInvoiceBtn.addEventListener('click', () => {
    window.print();
  });
}

if (invoiceViewer) {
  invoiceViewer.addEventListener('click', (e) => {
    if (e.target === invoiceViewer) closeInvoiceViewerModal();
  });
}

if (workForm) {
  workForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentClientId) return;
    const desc = workDesc.value.trim();
    const parts = partsList.value.trim();
    const wPrice = workPrice.value.trim();
    const pPrice = partsPrice.value.trim();
    // Only require description and labour cost; parts price is optional (defaults to 0)
    if (!desc || !wPrice) return;
    addWork(currentClientId, desc, parts, wPrice, pPrice || '0');
    workForm.reset();
    workDesc.focus();
  });
}

if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentClientId) return;
    const amount = paymentAmount.value.trim();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    addPayment(currentClientId, amount);
    paymentAmount.value = '';
    paymentAmount.focus();
  });
}

if (markClientPaidBtn) {
  markClientPaidBtn.addEventListener('click', () => {
    if (!currentClientId) return;
    if (confirm('Mark this client as paid?')) {
      markClientAsPaid(currentClientId);
    }
  });
}

if (deleteClientInModalBtn) {
  deleteClientInModalBtn.addEventListener('click', () => {
    if (!currentClientId) return;
    if (confirm('Are you sure you want to delete this client?')) {
      deleteClient(currentClientId);
    }
  });
}

// Storage sync
window.addEventListener('storage', (e) => {
  if (e.key === ITEMS_KEY) {
    hydrateItemsFromStorage();
    render();
    updateStockSummary();
  }
  if (e.key === LOG_KEY) {
    updateHeaderStats();
    items.forEach(it => {
      const u = document.querySelector(`#usedToday-${it.id}`);
      if (u) u.textContent = `${countLast12h(it.id)} azi`;
    });
  }
});

if (resetFiltersBtn) {
  resetFiltersBtn.addEventListener('click', () => {
    resetAllFilters();
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

loadFilterPrefs();
hydrateItemsFromStorage();
saveItemsState();
getOrInitResetTime();
updateUndoState();
initProductSearch();
updateHistoryDisplay(); // Initialize history display

// Update countdown every second
resetIntervalId = setInterval(() => {
  updateCountdownDisplay();
  maybeResetSalesAt12h();
}, 1000);

window.addEventListener('beforeunload', () => {
  if (resetIntervalId) clearInterval(resetIntervalId);
});

// Make deleteWork global for HTML onclick
window.deleteWork = deleteWork;

// Make deleteSale global for sales log
window.deleteSale = deleteSale;

// ============================================================================
// LOYAL CLIENTS MANAGEMENT
// ============================================================================

let loyalClients = [];
let currentLoyalClientId = null;
let currentVehicleId = null;
let lastDeletedItem = null;
let undoTimeout = null;

function loadLoyalClients() {
  try {
    loyalClients = JSON.parse(localStorage.getItem(LOYAL_CLIENTS_KEY) || '[]');
  } catch {
    loyalClients = [];
  }
}

function saveLoyalClients() {
  localStorage.setItem(LOYAL_CLIENTS_KEY, JSON.stringify(loyalClients));
}

function generateLoyalClientId() {
  return 'loyal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateVehicleId() {
  return 'vehicle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function addLoyalClient(number, name, phone, photo) {
  const newClient = {
    id: generateLoyalClientId(),
    clientNumber: number.trim(),
    name: name.trim(),
    phone: phone.trim() || '',
    photo: photo.trim() || '',
    vehicles: [],
    createdAt: new Date().toISOString()
  };
  loyalClients.push(newClient);
  saveLoyalClients();
  renderLoyalClientsList();
}

function addVehicleToLoyalClient(clientId, car, notes) {
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const newVehicle = {
    id: generateVehicleId(),
    car: car.trim(),
    notes: notes.trim() || '',
    addedDate: new Date().toISOString(),
    works: [],
    payments: []
  };

  client.vehicles.push(newVehicle);
  saveLoyalClients();
  renderLoyalClientDetails(clientId);
  renderLoyalClientsList();
}

function deleteLoyalClient(clientId) {
  if (!confirm('Are you sure you want to delete this loyal client?')) return;
  
  // Save for undo
  const deletedClient = loyalClients.find(c => c.id === clientId);
  lastDeletedItem = {
    type: 'client',
    data: deletedClient
  };
  
  loyalClients = loyalClients.filter(c => c.id !== clientId);
  saveLoyalClients();
  renderLoyalClientsList();
  showUndoNotification();
}

function addWorkToVehicle(clientId, vehicleId, desc, parts, labour, partsCost) {
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const vehicle = client.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const workPrice = parseFloat(labour) || 0;
  const partsPrice = parseFloat(partsCost) || 0;
  const total = workPrice + partsPrice;

  const newWork = {
    id: 'work_' + Date.now(),
    desc: desc.trim(),
    parts: parts.trim() || '',
    workPrice,
    partsPrice,
    total,
    date: new Date().toISOString()
  };

  if (!vehicle.works) vehicle.works = [];
  vehicle.works.push(newWork);
  saveLoyalClients();
  renderVehicleWorkDetails(clientId, vehicleId);
}

function deleteVehicleWork(clientId, vehicleId, workId) {
  if (!confirm('Are you sure you want to delete this work?')) return;
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const vehicle = client.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  // Save for undo
  const deletedWork = vehicle.works.find(w => w.id === workId);
  lastDeletedItem = {
    type: 'work',
    data: deletedWork,
    clientId: clientId,
    vehicleId: vehicleId
  };

  vehicle.works = vehicle.works.filter(w => w.id !== workId);
  saveLoyalClients();
  renderVehicleWorkDetails(clientId, vehicleId);
  showUndoNotification();
}

function addPaymentToVehicle(clientId, vehicleId, amount) {
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const vehicle = client.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const newPayment = {
    id: 'payment_' + Date.now(),
    amount: parseFloat(amount) || 0,
    date: new Date().toISOString()
  };

  if (!vehicle.payments) vehicle.payments = [];
  vehicle.payments.push(newPayment);
  saveLoyalClients();
  renderVehicleWorkDetails(clientId, vehicleId);
}

function deleteVehicle(clientId, vehicleId) {
  if (!confirm('Are you sure you want to delete this vehicle?')) return;
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  // Save for undo
  const deletedVehicle = client.vehicles.find(v => v.id === vehicleId);
  lastDeletedItem = {
    type: 'vehicle',
    data: deletedVehicle,
    clientId: clientId
  };

  client.vehicles = client.vehicles.filter(v => v.id !== vehicleId);
  saveLoyalClients();
  renderLoyalClientDetails(clientId);
  renderLoyalClientsList();
  showUndoNotification();
}

function renderLoyalClientsList() {
  const container = document.getElementById('loyalClientsGrid');
  if (!container) return;

  // Calculate total outstanding
  let totalOutstanding = 0;
  loyalClients.forEach(client => {
    client.vehicles.forEach(vehicle => {
      const totalWork = (vehicle.works || []).reduce((sum, w) => sum + w.total, 0);
      const totalPaid = (vehicle.payments || []).reduce((sum, p) => sum + p.amount, 0);
      totalOutstanding += (totalWork - totalPaid);
    });
  });

  // Update stats
  const totalClients = loyalClients.length;
  const totalVehicles = loyalClients.reduce((sum, c) => sum + c.vehicles.length, 0);
  
  const countEl = document.getElementById('loyalClientsCount');
  const vehiclesEl = document.getElementById('totalVehiclesCount');
  const outstandingEl = document.getElementById('totalOutstanding');
  
  if (countEl) countEl.textContent = totalClients;
  if (vehiclesEl) vehiclesEl.textContent = totalVehicles;
  if (outstandingEl) outstandingEl.textContent = `£${totalOutstanding.toFixed(2)}`;

  if (loyalClients.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">No loyal clients yet. Add your first one above!</p>';
    return;
  }

  // Filter by search
  const searchTerm = document.getElementById('loyalSearch')?.value.toLowerCase() || '';
  const filterValue = document.getElementById('loyalFilterSelect')?.value || 'all';
  const sortValue = document.getElementById('loyalSortSelect')?.value || 'name-asc';
  
  let filtered = loyalClients.filter(c => {
    // Search filter
    const matchesSearch = c.name.toLowerCase().includes(searchTerm) ||
                         c.clientNumber.toLowerCase().includes(searchTerm) ||
                         c.phone.toLowerCase().includes(searchTerm);
    if (!matchesSearch) return false;

    // Status filter
    if (filterValue === 'all') return true;
    
    const totalWork = c.vehicles.reduce((sum, v) => 
      sum + (v.works || []).reduce((s, w) => s + w.total, 0), 0);
    const totalPaid = c.vehicles.reduce((sum, v) => 
      sum + (v.payments || []).reduce((s, p) => s + p.amount, 0), 0);
    const balance = totalWork - totalPaid;

    if (filterValue === 'has-balance') return balance > 0;
    if (filterValue === 'paid') return totalWork > 0 && balance <= 0;
    if (filterValue === 'has-vehicles') return c.vehicles.length > 0;
    
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortValue === 'name-asc') return a.name.localeCompare(b.name);
    if (sortValue === 'name-desc') return b.name.localeCompare(a.name);
    if (sortValue === 'vehicles-desc') return b.vehicles.length - a.vehicles.length;
    if (sortValue === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortValue === 'balance-desc') {
      const balanceA = a.vehicles.reduce((sum, v) => {
        const work = (v.works || []).reduce((s, w) => s + w.total, 0);
        const paid = (v.payments || []).reduce((s, p) => s + p.amount, 0);
        return sum + (work - paid);
      }, 0);
      const balanceB = b.vehicles.reduce((sum, v) => {
        const work = (v.works || []).reduce((s, w) => s + w.total, 0);
        const paid = (v.payments || []).reduce((s, p) => s + p.amount, 0);
        return sum + (work - paid);
      }, 0);
      return balanceB - balanceA;
    }
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">No matching clients found.</p>';
    return;
  }

  container.innerHTML = filtered.map(client => {
    const initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const photoHtml = client.photo
      ? `<img src="${client.photo}" alt="${client.name}" />`
      : initials;

    // Calculate client balance
    const totalWork = client.vehicles.reduce((sum, v) => 
      sum + (v.works || []).reduce((s, w) => s + w.total, 0), 0);
    const totalPaid = client.vehicles.reduce((sum, v) => 
      sum + (v.payments || []).reduce((s, p) => s + p.amount, 0), 0);
    const balance = totalWork - totalPaid;

    const vehiclesHtml = client.vehicles.length > 0
      ? client.vehicles.map(v => {
          const vWork = (v.works || []).reduce((sum, w) => sum + w.total, 0);
          const vPaid = (v.payments || []).reduce((sum, p) => sum + p.amount, 0);
          const vBalance = vWork - vPaid;
          
          return `
          <div class="loyal-vehicle-item">
            <span class="vehicle-icon">🚐</span>
            <span class="vehicle-name">${v.car}</span>
            ${vBalance > 0 ? `<span style="color:#d32f2f;font-weight:700;font-size:12px;margin-left:auto;">£${vBalance.toFixed(2)} due</span>` : ''}
          </div>
        `;
        }).join('')
      : '<p style="color:#999;font-size:13px;">No vehicles added yet</p>';

    const badgesHtml = `
      <div class="client-info-badges">
        <span class="info-badge">🚐 ${client.vehicles.length} Vehicle${client.vehicles.length !== 1 ? 's' : ''}</span>
        ${balance > 0 ? `<span class="info-badge balance-due">💰 £${balance.toFixed(2)} Due</span>` : ''}
        ${totalWork > 0 && balance <= 0 ? `<span class="info-badge paid">✓ Paid</span>` : ''}
      </div>
    `;

    return `
      <div class="loyal-client-card">
        <div class="loyal-client-card-header">
          <div class="loyal-client-photo">${photoHtml}</div>
          <div class="loyal-client-main-info">
            <h3>${client.name}</h3>
            ${client.phone ? `<div class="client-phone">📞 ${client.phone}</div>` : ''}
            ${badgesHtml}
          </div>
          <div class="loyal-client-spent">
            <div class="spent-label">Total Spent</div>
            <div class="spent-amount">£${totalWork.toFixed(2)}</div>
          </div>
        </div>
        <div class="loyal-vehicles">
          <h4>Vehicles (${client.vehicles.length})</h4>
          ${vehiclesHtml}
        </div>
        <div class="loyal-client-actions">
          <button class="btn-view-loyal" onclick="openLoyalClientModal('${client.id}')">👁️ View Details</button>
          <button class="btn-delete-loyal" onclick="deleteLoyalClient('${client.id}')">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function openLoyalClientModal(clientId) {
  currentLoyalClientId = clientId;
  const modal = document.getElementById('loyalClientModal');
  if (modal) {
    modal.classList.add('active');
    renderLoyalClientDetails(clientId);
  }
}

function closeLoyalClientModal() {
  const modal = document.getElementById('loyalClientModal');
  if (modal) modal.classList.remove('active');
  currentLoyalClientId = null;
}

function renderLoyalClientDetails(clientId) {
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const photoHtml = client.photo
    ? `<img src="${client.photo}" alt="${client.name}" />`
    : initials;

  // Update header
  const photoEl = document.getElementById('loyalClientPhotoLarge');
  const nameEl = document.getElementById('loyalClientNameDisplay');
  const numberEl = document.getElementById('loyalClientNumberDisplay');
  const phoneEl = document.getElementById('loyalClientPhoneDisplay');

  if (photoEl) photoEl.innerHTML = photoHtml;
  if (nameEl) nameEl.textContent = client.name;
  if (numberEl) numberEl.textContent = client.clientNumber;
  if (phoneEl) phoneEl.textContent = client.phone || 'N/A';

  // Render vehicles list
  const vehiclesList = document.getElementById('loyalVehiclesList');
  if (!vehiclesList) return;

  if (client.vehicles.length === 0) {
    vehiclesList.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">No vehicles added yet. Add one above!</p>';
    return;
  }

  vehiclesList.innerHTML = client.vehicles.map(vehicle => {
    const totalWork = (vehicle.works || []).reduce((sum, w) => sum + w.total, 0);
    const totalPaid = (vehicle.payments || []).reduce((sum, p) => sum + p.amount, 0);
    const balance = totalWork - totalPaid;

    return `
    <div class="loyal-vehicle-item">
      <div class="vehicle-info-block">
        <div class="vehicle-name">🚐 ${vehicle.car}</div>
        ${vehicle.notes ? `<div class="loyal-vehicle-notes">${vehicle.notes}</div>` : ''}
        <div class="vehicle-date">Added: ${new Date(vehicle.addedDate).toLocaleDateString()}</div>
        ${totalWork > 0 ? `
          <div class="vehicle-balance" style="margin-top:8px; font-size:14px;">
            <strong style="color: ${balance > 0 ? '#ff4757' : '#27ae60'}">
              Balance: £${balance.toFixed(2)}
            </strong>
          </div>
        ` : ''}
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-view-loyal" onclick="openVehicleWorkModal('${client.id}', '${vehicle.id}')" style="padding:8px 16px;font-size:13px;">Manage Work</button>
        <button class="btn-delete-vehicle" onclick="deleteVehicle('${client.id}', '${vehicle.id}')">Delete</button>
      </div>
    </div>
    `;
  }).join('');
}

function openVehicleWorkModal(clientId, vehicleId) {
  currentLoyalClientId = clientId;
  currentVehicleId = vehicleId;
  const modal = document.getElementById('vehicleWorkModal');
  if (modal) {
    modal.classList.add('active');
    renderVehicleWorkDetails(clientId, vehicleId);
  }
}

function closeVehicleWorkModal() {
  const modal = document.getElementById('vehicleWorkModal');
  if (modal) modal.classList.remove('active');
  currentVehicleId = null;
  // Refresh the loyal client details
  if (currentLoyalClientId) {
    renderLoyalClientDetails(currentLoyalClientId);
  }
}

function renderVehicleWorkDetails(clientId, vehicleId) {
  const client = loyalClients.find(c => c.id === clientId);
  if (!client) return;

  const vehicle = client.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  // Update header
  const carEl = document.getElementById('vehicleWorkCarDisplay');
  const clientEl = document.getElementById('vehicleWorkClientDisplay');
  
  if (carEl) carEl.textContent = vehicle.car;
  if (clientEl) clientEl.textContent = client.name;

  // Render works list
  const worksList = document.getElementById('vehicleWorksList');
  if (worksList) {
    if (!vehicle.works || vehicle.works.length === 0) {
      worksList.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">No work recorded yet.</p>';
    } else {
      worksList.innerHTML = vehicle.works.map(work => `
        <div class="vehicle-work-item">
          <div>
            <div class="work-desc">${work.desc}</div>
            ${work.parts ? `<div class="work-parts">Parts: ${work.parts}</div>` : ''}
          </div>
          <div class="work-price">£${work.workPrice.toFixed(2)}</div>
          <div class="work-price">£${work.partsPrice.toFixed(2)}</div>
          <div class="work-price" style="font-weight:700;color:#1a1a1a;">£${work.total.toFixed(2)}</div>
          <button class="btn-delete-work" onclick="deleteVehicleWork('${clientId}', '${vehicleId}', '${work.id}')">Delete</button>
        </div>
      `).join('');
    }
  }

  // Render payments list
  const paymentsList = document.getElementById('vehiclePaymentsList');
  if (paymentsList) {
    if (!vehicle.payments || vehicle.payments.length === 0) {
      paymentsList.innerHTML = '<p style="text-align:center;color:#999;padding:12px;">No payments recorded.</p>';
    } else {
      paymentsList.innerHTML = vehicle.payments.map(payment => `
        <div class="payment-item">
          <span class="payment-amount">£${payment.amount.toFixed(2)}</span>
          <span class="payment-date">${new Date(payment.date).toLocaleDateString()}</span>
        </div>
      `).join('');
    }
  }

  // Update summary
  const totalWork = (vehicle.works || []).reduce((sum, w) => sum + w.total, 0);
  const totalPaid = (vehicle.payments || []).reduce((sum, p) => sum + p.amount, 0);
  const balance = totalWork - totalPaid;

  const totalWorkEl = document.getElementById('vehicleTotalWork');
  const totalPaidEl = document.getElementById('vehicleTotalPaid');
  const balanceEl = document.getElementById('vehicleBalanceDue');

  if (totalWorkEl) totalWorkEl.textContent = `£${totalWork.toFixed(2)}`;
  if (totalPaidEl) totalPaidEl.textContent = `£${totalPaid.toFixed(2)}`;
  if (balanceEl) balanceEl.textContent = `£${balance.toFixed(2)}`;
}

function showUndoNotification() {
  const undoBtn = document.getElementById('undoLoyalBtn');
  if (!undoBtn) return;

  // Clear any existing timeout
  if (undoTimeout) clearTimeout(undoTimeout);

  // Show notification
  undoBtn.style.display = 'flex';

  // Auto-hide after 5 seconds
  undoTimeout = setTimeout(() => {
    undoBtn.style.display = 'none';
    lastDeletedItem = null;
  }, 5000);
}

function undoLastDelete() {
  if (!lastDeletedItem) return;

  const undoBtn = document.getElementById('undoLoyalBtn');
  if (undoBtn) undoBtn.style.display = 'none';

  if (lastDeletedItem.type === 'client') {
    // Restore client
    loyalClients.push(lastDeletedItem.data);
    saveLoyalClients();
    renderLoyalClientsList();
  } else if (lastDeletedItem.type === 'vehicle') {
    // Restore vehicle
    const client = loyalClients.find(c => c.id === lastDeletedItem.clientId);
    if (client) {
      client.vehicles.push(lastDeletedItem.data);
      saveLoyalClients();
      renderLoyalClientDetails(lastDeletedItem.clientId);
      renderLoyalClientsList();
    }
  } else if (lastDeletedItem.type === 'work') {
    // Restore work
    const client = loyalClients.find(c => c.id === lastDeletedItem.clientId);
    if (client) {
      const vehicle = client.vehicles.find(v => v.id === lastDeletedItem.vehicleId);
      if (vehicle) {
        if (!vehicle.works) vehicle.works = [];
        vehicle.works.push(lastDeletedItem.data);
        saveLoyalClients();
        renderVehicleWorkDetails(lastDeletedItem.clientId, lastDeletedItem.vehicleId);
      }
    }
  }

  lastDeletedItem = null;
  if (undoTimeout) clearTimeout(undoTimeout);
}

// Event Listeners for Loyal Clients
document.getElementById('loyalClientForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('loyalClientName').value;
  const phone = document.getElementById('loyalClientPhone').value;
  const photo = document.getElementById('loyalClientPhoto').value;

  if (!name || !phone) {
    alert('Please fill in Client Name and Phone Number');
    return;
  }

  // Auto-generate client number
  const number = 'LC' + String(loyalClients.length + 1).padStart(4, '0');
  
  addLoyalClient(number, name, phone, photo);
  e.target.reset();
});

document.getElementById('addVehicleForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentLoyalClientId) return;

  const car = document.getElementById('vehicleCar').value;
  const notes = document.getElementById('vehicleNotes').value;

  if (!car) {
    alert('Please enter vehicle information');
    return;
  }

  addVehicleToLoyalClient(currentLoyalClientId, car, notes);
  e.target.reset();
});

document.getElementById('closeLoyalClientModal')?.addEventListener('click', closeLoyalClientModal);

document.getElementById('loyalSearch')?.addEventListener('input', debounce(() => {
  renderLoyalClientsList();
}, 300));

document.getElementById('loyalSortSelect')?.addEventListener('change', () => {
  renderLoyalClientsList();
});

document.getElementById('loyalFilterSelect')?.addEventListener('change', () => {
  renderLoyalClientsList();
});

// Vehicle Work Form
document.getElementById('addVehicleWorkForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentLoyalClientId || !currentVehicleId) return;

  const desc = document.getElementById('vehicleWorkDesc').value;
  const parts = document.getElementById('vehicleWorkParts').value;
  const labour = document.getElementById('vehicleWorkLabour').value;
  const partsCost = document.getElementById('vehicleWorkPartsCost').value;

  if (!desc || !labour) {
    alert('Please fill in work description and labour cost');
    return;
  }

  addWorkToVehicle(currentLoyalClientId, currentVehicleId, desc, parts, labour, partsCost);
  e.target.reset();
});

// Vehicle Payment Form
document.getElementById('addVehiclePaymentForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentLoyalClientId || !currentVehicleId) return;

  const amount = document.getElementById('vehiclePaymentAmount').value;

  if (!amount) {
    alert('Please enter payment amount');
    return;
  }

  addPaymentToVehicle(currentLoyalClientId, currentVehicleId, amount);
  e.target.reset();
});

document.getElementById('closeVehicleWorkModal')?.addEventListener('click', closeVehicleWorkModal);

const vehicleWorkModal = document.getElementById('vehicleWorkModal');
vehicleWorkModal && vehicleWorkModal.addEventListener('click', (e) => {
  if (e.target === vehicleWorkModal) closeVehicleWorkModal();
});

// Make functions global
window.openLoyalClientModal = openLoyalClientModal;
window.closeLoyalClientModal = closeLoyalClientModal;
window.deleteLoyalClient = deleteLoyalClient;
window.deleteVehicle = deleteVehicle;
window.openVehicleWorkModal = openVehicleWorkModal;
window.closeVehicleWorkModal = closeVehicleWorkModal;
window.deleteVehicleWork = deleteVehicleWork;
window.undoLastDelete = undoLastDelete;

// Initial render
loadLoyalClients();
render();
renderClientsList();
updateStockSummary();
renderTodaysSalesLog();
renderLoyalClientsList();

// ============================================================================
// UTILITIES
// ============================================================================
function debounce(fn, wait = 150) {
  let t;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
