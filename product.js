/* ==========================================
   YAKUZAZ — product.js
   Individual product detail pages
   ========================================== */

// ==========================================
// DYNAMIC BATCH ID HELPER
// Batch IDs auto-update with today's date
// ==========================================
function getBatchId(code, daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `FRS-${code}-${mm}${dd}`;
}

// Price lookup (₹/kg). Used by cart system.
const PRODUCT_PRICES = {
  spinach: 40, coriander: 60, fenugreek: 50, lettuce: 80, mint: 70, amaranth: 50,
  carrot: 40, radish: 30, beetroot: 50, turnip: 35,
  potato: 25, 'sweet-potato': 45, yam: 55, colocasia: 60,
  tomato: 35, capsicum: 80, brinjal: 40, chilly: 90, peas: 70, 'bitter-gourd': 50,
  banana: 50, apple: 150, orange: 80, papaya: 45, guava: 60, pomegranate: 120
};

// ==========================================
// FULL PRODUCT DATA
// ==========================================
const PRODUCTS = {
  // ---- LEAFY ----
  spinach: {
    name: 'Spinach', aka: 'Palak', emoji: '🥬', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Iron-rich, farm-fresh, zero compromise.',
    desc: 'Freshly harvested dark leafy spinach from Sharma Greens, Sonipat. Picked at dawn and delivered to our store within 6 hours. Rich in iron, folate, and vitamins A, C, K.',
    freshness: '9.6', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 5:30 AM', farm: 'Sharma Greens', location: 'Sonipat, Haryana',
      transit: '5 hrs 20 min', arrivedAt: '10:50 AM',
      storage: '4°C · 85% Humidity', batchId: getBatchId('SPN', 0), qty: '40 kg'
    },
    nutrition: [
      { label: 'Calories', value: '23 kcal', per: 'per 100g' },
      { label: 'Protein', value: '2.9g', per: 'per 100g' },
      { label: 'Iron', value: '2.7mg', per: '15% DV' },
      { label: 'Vitamin C', value: '28mg', per: '31% DV' },
      { label: 'Folate', value: '194µg', per: '49% DV' },
      { label: 'Vitamin K', value: '483µg', per: '403% DV' },
    ],
    storage: [
      '🧊 Store in refrigerator at 4°C',
      '💧 Keep slightly moist — wrap in a damp paper towel',
      '🚫 Do not wash before storing — moisture causes rot',
      '📅 Best consumed within 3 days of purchase',
      '🔒 Store in an open bag — need airflow',
    ],
    recipes: [
      { name: 'Palak Paneer', time: '30 min', emoji: '🍛', desc: 'Creamy spinach curry with cottage cheese. A North Indian classic.' },
      { name: 'Palak Dal', time: '20 min', emoji: '🍲', desc: 'Nutritious lentil and spinach soup — perfect weekday comfort food.' },
      { name: 'Spinach Paratha', time: '25 min', emoji: '🫓', desc: 'Flatbread stuffed with spiced spinach. Great for breakfast or lunchbox.' },
    ],
    farm: { name: 'Sharma Greens', owner: 'Rajesh Sharma', location: 'Sonipat, Haryana', years: 3, emoji: '🌿', supply: '45%', certified: true },
    related: ['coriander', 'fenugreek', 'mint', 'lettuce'],
  },

  coriander: {
    name: 'Coriander', aka: 'Dhaniya', emoji: '🌿', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Fragrant. Fresh. Same-day from farm to shelf.',
    desc: 'Bright green coriander bunches sourced same-day from Patel Organics, Karnal. Hand-picked, rubber-banded, and chilled immediately after harvest for maximum aroma.',
    freshness: '9.4', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 4:00 AM', farm: 'Patel Organics', location: 'Karnal, Haryana',
      transit: '4 hrs 10 min', arrivedAt: '8:10 AM',
      storage: '3°C · 90% Humidity', batchId: getBatchId('DHN', 0), qty: '15 kg'
    },
    nutrition: [
      { label: 'Calories', value: '23 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '27mg', per: '30% DV' },
      { label: 'Vitamin K', value: '310µg', per: '258% DV' },
      { label: 'Potassium', value: '521mg', per: '15% DV' },
      { label: 'Manganese', value: '0.5mg', per: '22% DV' },
      { label: 'Iron', value: '1.8mg', per: '10% DV' },
    ],
    storage: [
      '🧊 Store upright in a glass of water like flowers',
      '💧 Cover loosely with a plastic bag, refrigerate',
      '📅 Stays fresh for up to 2 weeks this way',
      '🌡️ Ideal temperature: 2–5°C',
      '🚫 Don\'t store near ethylene-producing fruits',
    ],
    recipes: [
      { name: 'Green Chutney', time: '10 min', emoji: '🟢', desc: 'Coriander, mint, green chilli, lemon — the ultimate Indian condiment.' },
      { name: 'Dhaniya Chutney Sandwich', time: '15 min', emoji: '🥪', desc: 'Quick and fresh snack with coriander chutney spread.' },
      { name: 'Coriander Rice', time: '20 min', emoji: '🍚', desc: 'Fragrant herb rice that pairs perfectly with any curry.' },
    ],
    farm: { name: 'Patel Organics', owner: 'Suresh Patel', location: 'Karnal, Haryana', years: 2, emoji: '🥬', supply: '33%', certified: true },
    related: ['spinach', 'mint', 'fenugreek', 'lettuce'],
  },

  fenugreek: {
    name: 'Fenugreek', aka: 'Methi', emoji: '🌱', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Slightly bitter. Powerfully nutritious.',
    desc: 'Winter-season methi harvested at the ideal growth stage from Verma Farms, Panipat. The slight bitterness mellows beautifully when cooked and is a hallmark of authentic Indian cuisine.',
    freshness: '9.1', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: 'Yesterday, 6:00 AM', farm: 'Verma Farms', location: 'Panipat, Haryana',
      transit: '6 hrs', arrivedAt: 'Yesterday 12:00 PM',
      storage: '4°C · 80% Humidity', batchId: getBatchId('MTH', 1), qty: '20 kg'
    },
    nutrition: [
      { label: 'Calories', value: '49 kcal', per: 'per 100g' },
      { label: 'Protein', value: '4.4g', per: 'per 100g' },
      { label: 'Iron', value: '33mg', per: '183% DV' },
      { label: 'Calcium', value: '395mg', per: '40% DV' },
      { label: 'Fibre', value: '24.6g', per: 'per 100g' },
      { label: 'Vitamin C', value: '3mg', per: '3% DV' },
    ],
    storage: [
      '🧊 Refrigerate in a loose plastic bag',
      '📅 Best used within 2–3 days',
      '🌡️ Keep at 3–5°C',
      '💧 Slightly damp is okay — not soaking wet',
      '🍃 Separate leaves from stems before storing',
    ],
    recipes: [
      { name: 'Methi Thepla', time: '30 min', emoji: '🫓', desc: 'Gujarati flatbread with fresh methi and spices — great for travel.' },
      { name: 'Methi Malai Murgh', time: '45 min', emoji: '🍗', desc: 'Creamy fenugreek chicken curry — rich, aromatic, restaurant-quality.' },
      { name: 'Methi Dal', time: '25 min', emoji: '🍲', desc: 'Simple lentil dal elevated with fresh fenugreek leaves.' },
    ],
    farm: { name: 'Verma Farms', owner: 'Dinesh Verma', location: 'Panipat, Haryana', years: 1, emoji: '🌱', supply: '22%', certified: false },
    related: ['spinach', 'coriander', 'amaranth'],
  },

  mint: {
    name: 'Mint', aka: 'Pudina', emoji: '🌿', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Cool, refreshing, cut fresh this morning.',
    desc: 'Fresh mint bundles from Patel Organics, Karnal — freshly cut and bundled before sunrise. Contains menthol essential oils that are retained only when the herb is extremely fresh.',
    freshness: '9.5', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 4:30 AM', farm: 'Patel Organics', location: 'Karnal, Haryana',
      transit: '4 hrs', arrivedAt: '8:30 AM',
      storage: '3°C · 90% Humidity', batchId: getBatchId('PDN', 0), qty: '8 kg'
    },
    nutrition: [
      { label: 'Calories', value: '70 kcal', per: 'per 100g' },
      { label: 'Vitamin A', value: '4248IU', per: '85% DV' },
      { label: 'Iron', value: '5.1mg', per: '28% DV' },
      { label: 'Manganese', value: '1.1mg', per: '48% DV' },
      { label: 'Folate', value: '114µg', per: '29% DV' },
      { label: 'Vitamin C', value: '31mg', per: '35% DV' },
    ],
    storage: [
      '🧊 Store in a jar of water in the fridge like fresh flowers',
      '📅 Stays fresh up to 3 weeks with water method',
      '🌡️ Ideal at 3°C',
      '🍃 Alternatively dry and crumble for longer shelf life',
      '💧 Change water every 3 days',
    ],
    recipes: [
      { name: 'Pudina Chutney', time: '5 min', emoji: '🟩', desc: 'The essential dip for kebabs, samosas, and parathas.' },
      { name: 'Mint Lemonade', time: '10 min', emoji: '🥤', desc: 'Refreshing summer drink with fresh mint, lemon and kala namak.' },
      { name: 'Raita', time: '10 min', emoji: '🥣', desc: 'Yogurt-based mint raita — perfect accompaniment for biryani.' },
    ],
    farm: { name: 'Patel Organics', owner: 'Suresh Patel', location: 'Karnal, Haryana', years: 2, emoji: '🥬', supply: '33%', certified: true },
    related: ['coriander', 'spinach', 'lettuce'],
  },

  lettuce: {
    name: 'Lettuce', aka: 'Salad Patta', emoji: '🥗', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Greenhouse grown. Crisp. Pesticide-tested.',
    desc: 'Iceberg and Romaine lettuce heads grown under controlled greenhouse conditions at Sharma Greens. Tested for pesticide residue on every batch before leaving the farm.',
    freshness: '9.3', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 6:00 AM', farm: 'Sharma Greens', location: 'Sonipat, Haryana',
      transit: '5 hrs 30 min', arrivedAt: '11:30 AM',
      storage: '2°C · 95% Humidity', batchId: getBatchId('LTC', 0), qty: '25 kg'
    },
    nutrition: [
      { label: 'Calories', value: '14 kcal', per: 'per 100g' },
      { label: 'Vitamin K', value: '102µg', per: '85% DV' },
      { label: 'Vitamin A', value: '740IU', per: '15% DV' },
      { label: 'Folate', value: '73µg', per: '18% DV' },
      { label: 'Vitamin C', value: '9mg', per: '10% DV' },
      { label: 'Water', value: '96%', per: 'hydrating' },
    ],
    storage: [
      '🧊 Wrap in slightly damp paper towel, refrigerate',
      '📅 Best within 5 days of purchase',
      '🌡️ Keep at 0–2°C for maximum crispness',
      '🚫 Don\'t cut or wash until ready to eat',
      '🧴 Remove outer wilted leaves and store inner head',
    ],
    recipes: [
      { name: 'Garden Salad', time: '10 min', emoji: '🥗', desc: 'Crisp lettuce with cucumber, tomato, onion, and lemon dressing.' },
      { name: 'Lettuce Wrap', time: '15 min', emoji: '🌮', desc: 'Fill with spiced paneer or chicken for a low-carb meal.' },
      { name: 'Caesar Salad (desi style)', time: '20 min', emoji: '🧀', desc: 'Romaine lettuce with parmesan, croutons and tangy dressing.' },
    ],
    farm: { name: 'Sharma Greens', owner: 'Rajesh Sharma', location: 'Sonipat, Haryana', years: 3, emoji: '🌿', supply: '45%', certified: true },
    related: ['spinach', 'coriander', 'mint'],
  },

  // ---- ROOT ----
  carrot: {
    name: 'Carrot', aka: 'Gajar', emoji: '🥕', category: 'root',
    categoryName: 'Root Vegetables',
    tagline: 'Sandy-loam grown. Naturally sweet. Vitamin A powerhouse.',
    desc: 'Vibrant orange carrots from Ramesh Farm, Sonipat — grown in sandy loam soil that gives them their signature natural sweetness. Rich in beta-carotene which converts to Vitamin A in the body.',
    freshness: '9.3', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '2 days ago', farm: 'Ramesh Farm', location: 'Sonipat, Haryana',
      transit: '8 hrs', arrivedAt: 'Yesterday 6:00 PM',
      storage: '5°C · 90% Humidity', batchId: getBatchId('GJR', 2), qty: '60 kg'
    },
    nutrition: [
      { label: 'Calories', value: '41 kcal', per: 'per 100g' },
      { label: 'Vitamin A', value: '835µg', per: '93% DV' },
      { label: 'Vitamin K', value: '13.2µg', per: '11% DV' },
      { label: 'Fibre', value: '2.8g', per: '10% DV' },
      { label: 'Potassium', value: '320mg', per: '9% DV' },
      { label: 'Beta-carotene', value: '8285µg', per: 'high' },
    ],
    storage: [
      '🧊 Remove leafy tops before refrigerating (tops drain moisture)',
      '💧 Store in water or damp container for crunchiness',
      '📅 Lasts 2–3 weeks refrigerated',
      '🌡️ Optimal at 0–4°C',
      '🚫 Keep away from ethylene producers (apples, pears)',
    ],
    recipes: [
      { name: 'Gajar Ka Halwa', time: '60 min', emoji: '🍮', desc: 'The beloved winter dessert — slow-cooked grated carrot in milk and ghee.' },
      { name: 'Carrot Soup', time: '25 min', emoji: '🍵', desc: 'Creamy blended soup with ginger and coconut milk. Warming and nourishing.' },
      { name: 'Gajar Achar', time: '15 min', emoji: '🫙', desc: 'Quick pickled carrots with mustard seeds and turmeric.' },
    ],
    farm: { name: 'Ramesh Farm', owner: 'Ramesh Kumar', location: 'Sonipat, Haryana', years: 4, emoji: '🥕', supply: '50%', certified: true },
    related: ['radish', 'beetroot', 'turnip'],
  },

  radish: {
    name: 'Radish', aka: 'Mooli', emoji: '🥬', category: 'root',
    categoryName: 'Root Vegetables',
    tagline: 'Winter favourite. Crisp. Harvested at peak size.',
    desc: 'White daikon-style radish from Gupta Roots, Rohtak. Harvested at the ideal 30–40cm size for perfect balance of pungency and mild sweetness. A winter staple across North India.',
    freshness: '9.0', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '3 days ago', farm: 'Gupta Roots', location: 'Rohtak, Haryana',
      transit: '6 hrs', arrivedAt: '2 days ago',
      storage: '4°C · 88% Humidity', batchId: getBatchId('MOL', 3), qty: '45 kg'
    },
    nutrition: [
      { label: 'Calories', value: '16 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '14.8mg', per: '16% DV' },
      { label: 'Folate', value: '25µg', per: '6% DV' },
      { label: 'Potassium', value: '233mg', per: '7% DV' },
      { label: 'Fibre', value: '1.6g', per: '6% DV' },
      { label: 'Water', value: '94%', per: 'hydrating' },
    ],
    storage: [
      '🧊 Remove greens, refrigerate in a bag',
      '📅 Stays crisp up to 2 weeks',
      '🌡️ Keep at 0–4°C',
      '💧 Wrap in damp cloth to maintain moisture',
      '🍃 Can store greens separately — use in sabzi!',
    ],
    recipes: [
      { name: 'Mooli Paratha', time: '35 min', emoji: '🫓', desc: 'Classic stuffed flatbread with grated radish and spices. Punjabi breakfast staple.' },
      { name: 'Mooli Ki Sabzi', time: '20 min', emoji: '🍛', desc: 'Quick stir-fried radish with mustard seeds and dry spices.' },
      { name: 'Mooli Salad', time: '10 min', emoji: '🥗', desc: 'Raw grated radish with lemon juice and coriander — cooling and digestive.' },
    ],
    farm: { name: 'Gupta Roots', owner: 'Mahesh Gupta', location: 'Rohtak, Haryana', years: 2, emoji: '🌰', supply: '30%', certified: true },
    related: ['carrot', 'beetroot', 'turnip'],
  },

  beetroot: {
    name: 'Beetroot', aka: 'Chukandar', emoji: '🫀', category: 'root',
    categoryName: 'Root Vegetables',
    tagline: 'Deep red. Antioxidant-rich. Earthy and sweet.',
    desc: 'Vibrant red beetroots from Singh\'s Earth Farm, Hisar. Packed with betalain antioxidants, nitrates for blood pressure, and natural earthy sweetness. Great for salads, juices, and curries.',
    freshness: '9.1', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '2 days ago', farm: 'Singh\'s Earth Farm', location: 'Hisar, Haryana',
      transit: '9 hrs', arrivedAt: 'Yesterday',
      storage: '4°C · 85% Humidity', batchId: getBatchId('CHK', 2), qty: '30 kg'
    },
    nutrition: [
      { label: 'Calories', value: '43 kcal', per: 'per 100g' },
      { label: 'Nitrates', value: 'High', per: 'blood pressure' },
      { label: 'Folate', value: '109µg', per: '27% DV' },
      { label: 'Potassium', value: '325mg', per: '9% DV' },
      { label: 'Iron', value: '0.8mg', per: '4% DV' },
      { label: 'Fibre', value: '2.8g', per: '10% DV' },
    ],
    storage: [
      '🧊 Remove leafy tops (3cm stem), refrigerate',
      '📅 Lasts 2–4 weeks uncooked',
      '🌡️ Keep at 0–4°C',
      '🧤 Wear gloves when cutting — stains intensely!',
      '🫙 Cooked beetroot stores for 5 days in fridge',
    ],
    recipes: [
      { name: 'Beetroot Poriyal', time: '20 min', emoji: '🍛', desc: 'South Indian stir-fry with coconut, curry leaves, and mustard seeds.' },
      { name: 'Beet & Carrot Juice', time: '10 min', emoji: '🥤', desc: 'Energising daily juice blend with ginger and lemon.' },
      { name: 'Pickled Beetroot', time: '15 min', emoji: '🫙', desc: 'Quick-pickled with vinegar and star anise — great on sandwiches.' },
    ],
    farm: { name: "Singh's Earth Farm", owner: 'Gurpreet Singh', location: 'Hisar, Haryana', years: 1, emoji: '🥔', supply: '20%', certified: false },
    related: ['carrot', 'radish', 'turnip'],
  },

  // ---- TUBER ----
  potato: {
    name: 'Potato', aka: 'Aloo', emoji: '🥔', category: 'tuber',
    categoryName: 'Tuber Vegetables',
    tagline: 'The everyday essential. Washed, sorted, farm-direct.',
    desc: 'Freshly washed potatoes from Yadav Tubers, Agra — sourced from India\'s most fertile tuber belt. Available in all three sizes: small (baby potatoes), medium, and large. Each batch tested for moisture and blight.',
    freshness: '9.0', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '4 days ago', farm: 'Yadav Tubers', location: 'Agra, UP',
      transit: '10 hrs', arrivedAt: '3 days ago',
      storage: '12°C · 80% Humidity', batchId: getBatchId('ALO', 4), qty: '120 kg'
    },
    nutrition: [
      { label: 'Calories', value: '77 kcal', per: 'per 100g (boiled)' },
      { label: 'Vitamin C', value: '19.7mg', per: '22% DV' },
      { label: 'Potassium', value: '421mg', per: '12% DV' },
      { label: 'Vitamin B6', value: '0.3mg', per: '18% DV' },
      { label: 'Carbohydrates', value: '17g', per: 'per 100g' },
      { label: 'Fibre', value: '2.2g', per: '(with skin)' },
    ],
    storage: [
      '🌑 Store in a dark, cool, dry place — NOT the fridge',
      '🌡️ Ideal temperature: 10–15°C',
      '🚫 Keep away from onions — they cause each other to spoil faster',
      '📅 Lasts 2–4 weeks at room temperature',
      '✂️ Remove sprouted eyes before cooking — do not eat green potatoes',
    ],
    recipes: [
      { name: 'Aloo Sabzi', time: '20 min', emoji: '🍛', desc: 'Simple spiced potato curry — the dish every Indian grew up with.' },
      { name: 'Jeera Aloo', time: '15 min', emoji: '🫚', desc: 'Pan-fried potatoes with cumin, coriander and green chilli. Classic.' },
      { name: 'Dum Aloo', time: '45 min', emoji: '🍲', desc: 'Baby potatoes slow-cooked in rich yogurt and spice gravy.' },
    ],
    farm: { name: 'Yadav Tubers', owner: 'Santosh Yadav', location: 'Agra, UP', years: 3, emoji: '🥔', supply: '55%', certified: true },
    related: ['sweet-potato', 'yam', 'colocasia'],
  },

  'sweet-potato': {
    name: 'Sweet Potato', aka: 'Shakarkandi', emoji: '🍠', category: 'tuber',
    categoryName: 'Tuber Vegetables',
    tagline: 'Naturally sweet. Fibre-rich. Seasonal superfood.',
    desc: 'Orange-fleshed sweet potatoes from Narmada Farms, Gwalior. A nutritious seasonal alternative with naturally occurring sugars, high fibre, and a rich beta-carotene content that turns them vibrant orange.',
    freshness: '9.2', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '3 days ago', farm: 'Narmada Farms', location: 'Gwalior, MP',
      transit: '12 hrs', arrivedAt: '2 days ago',
      storage: '15°C · 75% Humidity', batchId: getBatchId('SKR', 3), qty: '35 kg'
    },
    nutrition: [
      { label: 'Calories', value: '86 kcal', per: 'per 100g' },
      { label: 'Vitamin A', value: '961µg', per: '107% DV' },
      { label: 'Vitamin C', value: '2.4mg', per: '3% DV' },
      { label: 'Fibre', value: '3g', per: '11% DV' },
      { label: 'Potassium', value: '337mg', per: '10% DV' },
      { label: 'Natural Sugar', value: '4.2g', per: 'per 100g' },
    ],
    storage: [
      '🌑 Store in a cool, dark, well-ventilated place',
      '🌡️ Ideal temperature: 15°C — do NOT refrigerate',
      '📅 Lasts 2–5 weeks in proper conditions',
      '🚫 Keep away from moisture — causes rot quickly',
      '🍠 Cure freshly harvested ones for 1 week before eating',
    ],
    recipes: [
      { name: 'Roasted Sweet Potato', time: '35 min', emoji: '🍠', desc: 'Simply roasted with olive oil, cumin, and chilli flakes. Caramelised perfection.' },
      { name: 'Shakarkandi Chaat', time: '15 min', emoji: '🥗', desc: 'Boiled sweet potato with chaat masala, lemon, and coriander. Street food classic.' },
      { name: 'Sweet Potato Halwa', time: '40 min', emoji: '🍮', desc: 'A healthier riff on traditional halwa — naturally sweet, no added sugar.' },
    ],
    farm: { name: 'Narmada Farms', owner: 'Anil Patel', location: 'Gwalior, MP', years: 1, emoji: '🥕', supply: '15%', certified: false },
    related: ['potato', 'yam', 'colocasia'],
  },

  // ---- FRUITING ----
  tomato: {
    name: 'Tomato', aka: 'Tamatar', emoji: '🍅', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Vine-ripened. Same-day delivery from Ramesh Farm.',
    desc: 'Plump, vine-ripened Hybrid Red tomatoes from Ramesh Farm, Sonipat. Bright red, firm, and packed with lycopene. Our most popular produce — restocked every single day.',
    freshness: '9.1', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 3:00 AM', farm: 'Ramesh Farm', location: 'Sonipat, Haryana',
      transit: '8 hrs', arrivedAt: '11:00 AM',
      storage: '18°C · 65% Humidity', batchId: getBatchId('TMT', 0), qty: '80 kg'
    },
    nutrition: [
      { label: 'Calories', value: '18 kcal', per: 'per 100g' },
      { label: 'Lycopene', value: '2573µg', per: 'antioxidant' },
      { label: 'Vitamin C', value: '14mg', per: '15% DV' },
      { label: 'Vitamin K', value: '7.9µg', per: '7% DV' },
      { label: 'Potassium', value: '237mg', per: '7% DV' },
      { label: 'Folate', value: '15µg', per: '4% DV' },
    ],
    storage: [
      '🌡️ Store at room temperature (18–21°C) — never refrigerate uncut',
      '☀️ Keep stem-side up to prevent bruising',
      '📅 Ripe tomatoes last 3–5 days at room temp',
      '🔪 Once cut, store in fridge for up to 2 days',
      '🚫 Cold kills tomato flavour — room temp always!',
    ],
    recipes: [
      { name: 'Makhani Gravy Base', time: '30 min', emoji: '🍅', desc: 'Rich tomato-onion base for butter chicken, paneer makhani, and more.' },
      { name: 'Tamatar Ki Sabzi', time: '15 min', emoji: '🍛', desc: 'Simple tomato curry with mustard seeds — everyday comfort food.' },
      { name: 'Tomato Rasam', time: '20 min', emoji: '🍵', desc: 'South Indian tangy tomato broth — immunity booster and soul food.' },
    ],
    farm: { name: 'Ramesh Farm', owner: 'Ramesh Kumar', location: 'Sonipat, Haryana', years: 4, emoji: '🍅', supply: '40%', certified: true },
    related: ['capsicum', 'chilly', 'brinjal', 'peas'],
  },

  capsicum: {
    name: 'Capsicum', aka: 'Shimla Mirch', emoji: '🫑', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Crisp, sweet, pesticide-tested. Three colours, one quality.',
    desc: 'Green, red, and yellow bell peppers from Joshi Polyhouse, Alwar — grown in a controlled environment greenhouse. Each batch is tested for pesticide residue before leaving the farm.',
    freshness: '9.4', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 5:00 AM', farm: 'Joshi Polyhouse', location: 'Alwar, Rajasthan',
      transit: '7 hrs', arrivedAt: '12:00 PM',
      storage: '8°C · 90% Humidity', batchId: getBatchId('CAP', 0), qty: '40 kg'
    },
    nutrition: [
      { label: 'Calories', value: '31 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '80mg', per: '89% DV' },
      { label: 'Vitamin A', value: '157µg', per: '17% DV' },
      { label: 'Vitamin B6', value: '0.3mg', per: '17% DV' },
      { label: 'Fibre', value: '2.1g', per: '8% DV' },
      { label: 'Antioxidants', value: 'High', per: '(red > yellow > green)' },
    ],
    storage: [
      '🧊 Refrigerate in the crisper drawer — whole, unwashed',
      '📅 Lasts 1–2 weeks refrigerated',
      '🌡️ Optimal at 7–10°C',
      '🔪 Cut capsicum stores for 3–5 days in an airtight container',
      '💡 Red capsicums spoil faster than green — use first',
    ],
    recipes: [
      { name: 'Capsicum Masala', time: '25 min', emoji: '🍛', desc: 'Stuffed or stir-fried capsicum in spiced onion-tomato gravy.' },
      { name: 'Stir Fry Noodles', time: '20 min', emoji: '🍜', desc: 'Quick hakka noodles with colourful capsicum strips and soy sauce.' },
      { name: 'Stuffed Capsicum', time: '40 min', emoji: '🫑', desc: 'Capsicum stuffed with spiced rice or paneer, baked until tender.' },
    ],
    farm: { name: 'Joshi Polyhouse', owner: 'Deepak Joshi', location: 'Alwar, Rajasthan', years: 2, emoji: '🫑', supply: '35%', certified: true },
    related: ['tomato', 'chilly', 'brinjal'],
  },

  chilly: {
    name: 'Green Chilly', aka: 'Hari Mirch', emoji: '🌶️', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Fresh-cut daily. Essential oils locked in.',
    desc: 'Fresh green chillies — mild to hot varieties sourced daily from Ramesh Farm. The essential oils that give chillies their heat and aroma are at peak levels only when extremely fresh.',
    freshness: '9.5', status: 'Fresh Today', seasonal: false,
    batch: {
      harvested: 'Today, 4:00 AM', farm: 'Ramesh Farm', location: 'Sonipat, Haryana',
      transit: '8 hrs', arrivedAt: '12:00 PM',
      storage: '8°C · 85% Humidity', batchId: getBatchId('CHI', 0), qty: '20 kg'
    },
    nutrition: [
      { label: 'Calories', value: '40 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '242mg', per: '269% DV' },
      { label: 'Capsaicin', value: 'Present', per: 'anti-inflammatory' },
      { label: 'Vitamin A', value: '529IU', per: '11% DV' },
      { label: 'Vitamin K', value: '14µg', per: '12% DV' },
      { label: 'Iron', value: '1.2mg', per: '7% DV' },
    ],
    storage: [
      '🧊 Store in the fridge in a paper bag or perforated bag',
      '📅 Lasts 1–2 weeks refrigerated',
      '🌡️ Keep at 7–10°C — too cold causes pitting',
      '🌶️ Dried/frozen chillies last months — buy in bulk and freeze',
      '🧤 Wash hands after handling — do NOT touch eyes',
    ],
    recipes: [
      { name: 'Mirchi Ka Salan', time: '35 min', emoji: '🌶️', desc: 'Hyderabadi chilli curry in peanut and sesame gravy — served with biryani.' },
      { name: 'Hari Mirch Achaar', time: '15 min', emoji: '🫙', desc: 'Quick green chilli pickle with mustard, lemon and salt.' },
      { name: 'Chilli Tempering (Tadka)', time: '3 min', emoji: '🍳', desc: 'The sizzling foundation of most Indian dals and curries.' },
    ],
    farm: { name: 'Ramesh Farm', owner: 'Ramesh Kumar', location: 'Sonipat, Haryana', years: 4, emoji: '🍅', supply: '40%', certified: true },
    related: ['tomato', 'capsicum', 'brinjal'],
  },

  brinjal: {
    name: 'Brinjal', aka: 'Baingan', emoji: '🍆', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Glossy, firm, grown without excessive irrigation.',
    desc: 'Glossy purple brinjal in standard and baby varieties from Khatri Gardens, Rewari. Grown using water-efficient irrigation to produce a firm texture that holds up beautifully in bhartha and curries.',
    freshness: '9.0', status: 'Fresh', seasonal: false,
    batch: {
      harvested: 'Yesterday', farm: 'Khatri Gardens', location: 'Rewari, Haryana',
      transit: '7 hrs', arrivedAt: 'Yesterday 5:00 PM',
      storage: '10°C · 85% Humidity', batchId: getBatchId('BNG', 1), qty: '35 kg'
    },
    nutrition: [
      { label: 'Calories', value: '25 kcal', per: 'per 100g' },
      { label: 'Fibre', value: '3g', per: '11% DV' },
      { label: 'Nasunin', value: 'Present', per: 'brain antioxidant' },
      { label: 'Potassium', value: '229mg', per: '7% DV' },
      { label: 'Vitamin C', value: '2.2mg', per: '2% DV' },
      { label: 'Manganese', value: '0.25mg', per: '11% DV' },
    ],
    storage: [
      '🌡️ Store at cool room temperature (12–14°C), NOT in cold fridge',
      '📅 Keeps 3–5 days — use quickly!',
      '🚫 Refrigerator damages brinjal texture — avoid',
      '☀️ Keep away from direct sunlight',
      '🔪 Cut brinjal oxidizes fast — cook immediately after cutting',
    ],
    recipes: [
      { name: 'Baingan Bhartha', time: '40 min', emoji: '🍆', desc: 'Flame-roasted mashed brinjal with spices and onion. A smoky North Indian classic.' },
      { name: 'Baingan Ki Sabzi', time: '20 min', emoji: '🍛', desc: 'Simple stir-fried brinjal with mustard seeds and curry leaves.' },
      { name: 'Begun Bhaja', time: '15 min', emoji: '🍳', desc: 'Bengali pan-fried brinjal slices with turmeric — crispy and simple.' },
    ],
    farm: { name: 'Khatri Gardens', owner: 'Sunita Khatri', location: 'Rewari, Haryana', years: 1, emoji: '🍆', supply: '25%', certified: false },
    related: ['tomato', 'capsicum', 'bitter-gourd'],
  },

  // ---- FRUITS ----
  banana: {
    name: 'Banana', aka: 'Kela', emoji: '🍌', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Robusta. Elaichi. Ready today or ripe in 2 days.',
    desc: 'Robusta and Elaichi banana varieties from Nashik Orchards, Maharashtra. Available at multiple ripeness stages — bright yellow for immediate use, or with green tips if you prefer to ripen at home.',
    freshness: '9.1', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '3 days ago', farm: 'Nashik Orchards', location: 'Nashik, Maharashtra',
      transit: '18 hrs', arrivedAt: '2 days ago',
      storage: '14°C · 70% Humidity', batchId: getBatchId('KEL', 3), qty: '70 kg'
    },
    nutrition: [
      { label: 'Calories', value: '89 kcal', per: 'per 100g' },
      { label: 'Potassium', value: '358mg', per: '10% DV' },
      { label: 'Vitamin B6', value: '0.4mg', per: '23% DV' },
      { label: 'Vitamin C', value: '8.7mg', per: '10% DV' },
      { label: 'Carbohydrates', value: '23g', per: 'per 100g' },
      { label: 'Fibre', value: '2.6g', per: '9% DV' },
    ],
    storage: [
      '🌡️ Store at room temperature — never refrigerate green bananas',
      '📅 Ripen naturally at 18–23°C in 2–5 days',
      '🧊 Once fully ripe, refrigerate to slow browning (skin darkens but flesh is fine)',
      '🍌 Overripe bananas are perfect for baking',
      '🚫 Separate from bunch to slow ripening',
    ],
    recipes: [
      { name: 'Kela Halwa', time: '25 min', emoji: '🍮', desc: 'Mashed banana cooked in ghee and sugar — quick festive dessert.' },
      { name: 'Banana Lassi', time: '5 min', emoji: '🥤', desc: 'Banana blended with yogurt, cardamom, and honey. Thick and nourishing.' },
      { name: 'Raw Banana Sabzi', time: '20 min', emoji: '🍛', desc: 'Raw green banana stir-fry with mustard and coconut — South Indian classic.' },
    ],
    farm: { name: 'Nashik Orchards', owner: 'Vijay Patil', location: 'Nashik, Maharashtra', years: 2, emoji: '🍇', supply: '35%', certified: true },
    related: ['apple', 'papaya', 'guava'],
  },

  apple: {
    name: 'Apple', aka: 'Seb', emoji: '🍎', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Shimla\'s finest. Crisp. Seasonal harvest.',
    desc: 'Royal Delicious and Fuji apples from HP Apple Growers, Shimla — picked at peak seasonal harvest when sugar and crispness are at their best. Zero chemical ripening used at any stage.',
    freshness: '9.4', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '4 days ago', farm: 'HP Apple Growers', location: 'Shimla, Himachal Pradesh',
      transit: '24 hrs', arrivedAt: '3 days ago',
      storage: '3°C · 90% Humidity', batchId: getBatchId('SEB', 4), qty: '50 kg'
    },
    nutrition: [
      { label: 'Calories', value: '52 kcal', per: 'per 100g' },
      { label: 'Fibre', value: '2.4g', per: '9% DV' },
      { label: 'Vitamin C', value: '4.6mg', per: '5% DV' },
      { label: 'Quercetin', value: 'Present', per: 'anti-inflammatory' },
      { label: 'Potassium', value: '107mg', per: '3% DV' },
      { label: 'Polyphenols', value: 'High', per: 'gut health' },
    ],
    storage: [
      '🧊 Refrigerate in the crisper drawer',
      '📅 Lasts 4–6 weeks refrigerated',
      '🚫 Keep away from vegetables — ethylene causes them to spoil faster',
      '🌡️ Optimal storage at 1–4°C',
      '🍎 Store unwashed, wash only before eating',
    ],
    recipes: [
      { name: 'Apple Chutney', time: '20 min', emoji: '🫙', desc: 'Sweet and tangy apple chutney with cinnamon and cloves. Great with cheese or roti.' },
      { name: 'Seb Ka Murabba', time: '60 min', emoji: '🍮', desc: 'Traditional Indian preserved apple in sugar syrup with cardamom.' },
      { name: 'Apple Salad', time: '10 min', emoji: '🥗', desc: 'Crisp apple with cucumber, pomegranate, and chaat masala.' },
    ],
    farm: { name: 'HP Apple Growers', owner: 'Mohan Thakur', location: 'Shimla, Himachal Pradesh', years: 3, emoji: '🍎', supply: '40%', certified: true },
    related: ['guava', 'pomegranate', 'banana'],
  },
  // ---- MISSING TUBERS ----
  yam: {
    name: 'Yam', aka: 'Suran / Jimikand', emoji: '🍠', category: 'tuber',
    categoryName: 'Tuber Vegetables',
    tagline: 'A winter delicacy. Starchy, earthy, and deeply nourishing.',
    desc: 'Large purple-skinned yam from Mathur Harvest, Aligarh. Harvested at full maturity for maximum starch content. A winter staple used in traditional Indian preparations — from curries to crisps.',
    freshness: '8.8', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '5 days ago', farm: 'Mathur Harvest', location: 'Aligarh, UP',
      transit: '11 hrs', arrivedAt: '4 days ago',
      storage: '13°C · 75% Humidity', batchId: getBatchId('SRN', 5), qty: '50 kg'
    },
    nutrition: [
      { label: 'Calories', value: '118 kcal', per: 'per 100g' },
      { label: 'Potassium', value: '816mg', per: '23% DV' },
      { label: 'Vitamin C', value: '17.1mg', per: '19% DV' },
      { label: 'Vitamin B6', value: '0.3mg', per: '18% DV' },
      { label: 'Fibre', value: '4.1g', per: '15% DV' },
      { label: 'Carbohydrates', value: '27.9g', per: 'per 100g' },
    ],
    storage: [
      '🌑 Store in a cool, dark, dry place — not the fridge',
      '🌡️ Ideal temperature: 10–15°C',
      '📅 Lasts 2–3 weeks at room temperature',
      '🚫 Avoid washing before storage — moisture causes rot',
      '🧤 Raw yam can irritate skin — handle with gloves or oil hands before peeling',
    ],
    recipes: [
      { name: 'Suran Ki Sabzi', time: '30 min', emoji: '🍛', desc: 'Spiced yam curry with tamarind and mustard seeds — a Maharashtrian classic.' },
      { name: 'Jimikand Fry', time: '25 min', emoji: '🍳', desc: 'Crispy pan-fried yam slices with chilli and coriander.' },
      { name: 'Yam Chips', time: '20 min', emoji: '🥔', desc: 'Thinly sliced yam tossed in oil and salt, baked until golden and crisp.' },
    ],
    farm: { name: 'Mathur Harvest', owner: 'Prem Mathur', location: 'Aligarh, UP', years: 2, emoji: '🌿', supply: '30%', certified: true },
    related: ['potato', 'sweet-potato', 'colocasia'],
  },

  colocasia: {
    name: 'Colocasia', aka: 'Arbi', emoji: '🫙', category: 'tuber',
    categoryName: 'Tuber Vegetables',
    tagline: 'Creamy texture when cooked. Cleaned and farm-fresh.',
    desc: 'Small taro roots from Yadav Tubers, Agra — carefully cleaned and sorted. Colocasia has a uniquely creamy, slightly sticky texture when cooked and is a staple in Bengali and North Indian cuisine.',
    freshness: '8.9', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '3 days ago', farm: 'Yadav Tubers', location: 'Agra, UP',
      transit: '10 hrs', arrivedAt: '2 days ago',
      storage: '12°C · 78% Humidity', batchId: getBatchId('ARB', 3), qty: '30 kg'
    },
    nutrition: [
      { label: 'Calories', value: '112 kcal', per: 'per 100g' },
      { label: 'Carbohydrates', value: '26.5g', per: 'per 100g' },
      { label: 'Potassium', value: '591mg', per: '17% DV' },
      { label: 'Vitamin E', value: '2.4mg', per: '16% DV' },
      { label: 'Magnesium', value: '33mg', per: '8% DV' },
      { label: 'Fibre', value: '4.1g', per: '15% DV' },
    ],
    storage: [
      '🌑 Store in a cool, dry, dark place — not the refrigerator',
      '🌡️ Ideal temperature: 10–13°C',
      '📅 Lasts 1–2 weeks in proper conditions',
      '🚫 Raw taro can cause skin irritation — cook thoroughly before eating',
      '💧 Do not store wet or unwashed roots — they rot quickly',
    ],
    recipes: [
      { name: 'Arbi Ki Sabzi', time: '25 min', emoji: '🍛', desc: 'Spiced colocasia curry with amchur and cumin — a North Indian staple.' },
      { name: 'Arbi Fry', time: '20 min', emoji: '🍳', desc: 'Boiled and pan-fried arbi with carom seeds — crispy outside, soft inside.' },
      { name: 'Patrode', time: '60 min', emoji: '🌿', desc: 'Colocasia leaves rolled with spiced besan paste and steamed — Coastal classic.' },
    ],
    farm: { name: 'Yadav Tubers', owner: 'Santosh Yadav', location: 'Agra, UP', years: 3, emoji: '🥔', supply: '55%', certified: true },
    related: ['potato', 'yam', 'sweet-potato'],
  },

  // ---- MISSING LEAFY ----
  amaranth: {
    name: 'Amaranth', aka: 'Chaulai', emoji: '🌿', category: 'leafy',
    categoryName: 'Leafy Vegetables',
    tagline: 'Ancient grain leaf. Iron-dense. A traditional seasonal treasure.',
    desc: 'Dark red and green amaranth leaves from Verma Farms, Panipat. One of the most iron-rich leafy greens available, traditionally eaten across India as a cooling summer vegetable.',
    freshness: '8.9', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: 'Yesterday, 5:00 AM', farm: 'Verma Farms', location: 'Panipat, Haryana',
      transit: '6 hrs', arrivedAt: 'Yesterday 11:00 AM',
      storage: '4°C · 80% Humidity', batchId: getBatchId('CHL', 1), qty: '12 kg'
    },
    nutrition: [
      { label: 'Calories', value: '23 kcal', per: 'per 100g' },
      { label: 'Protein', value: '2.5g', per: 'per 100g' },
      { label: 'Iron', value: '2.3mg', per: '13% DV' },
      { label: 'Calcium', value: '215mg', per: '22% DV' },
      { label: 'Vitamin C', value: '43mg', per: '48% DV' },
      { label: 'Vitamin K', value: '1140µg', per: '950% DV' },
    ],
    storage: [
      '🧊 Refrigerate loosely in a plastic bag',
      '📅 Best used within 2 days — very delicate',
      '🌡️ Keep at 3–5°C',
      '💧 Slightly moist is fine, but not wet',
      '🍃 Separate leaves from stems before refrigerating',
    ],
    recipes: [
      { name: 'Chaulai Saag', time: '20 min', emoji: '🍛', desc: 'Simple stir-fried amaranth leaves with garlic and dry chilli — served with roti.' },
      { name: 'Chaulai Dal', time: '25 min', emoji: '🍲', desc: 'Lentil dal cooked with amaranth — nutritious and earthy.' },
      { name: 'Amaranth Stir Fry', time: '15 min', emoji: '🥬', desc: 'Quick sauté with mustard seeds, turmeric, and coconut.' },
    ],
    farm: { name: 'Verma Farms', owner: 'Dinesh Verma', location: 'Panipat, Haryana', years: 1, emoji: '🌱', supply: '22%', certified: false },
    related: ['spinach', 'fenugreek', 'coriander'],
  },

  // ---- MISSING ROOT ----
  turnip: {
    name: 'Turnip', aka: 'Shalgam', emoji: '🫐', category: 'root',
    categoryName: 'Root Vegetables',
    tagline: 'Traditional winter root. Mild, peppery, and deeply versatile.',
    desc: 'White and purple turnips from Gupta Roots, Rohtak — a traditional winter root vegetable with a mild peppery flavour that mellows when cooked. Both the root and greens are edible and nutritious.',
    freshness: '8.8', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '4 days ago', farm: 'Gupta Roots', location: 'Rohtak, Haryana',
      transit: '6 hrs', arrivedAt: '3 days ago',
      storage: '4°C · 88% Humidity', batchId: getBatchId('SHG', 4), qty: '28 kg'
    },
    nutrition: [
      { label: 'Calories', value: '28 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '21mg', per: '23% DV' },
      { label: 'Fibre', value: '1.8g', per: '6% DV' },
      { label: 'Potassium', value: '191mg', per: '5% DV' },
      { label: 'Folate', value: '15µg', per: '4% DV' },
      { label: 'Calcium', value: '30mg', per: '3% DV' },
    ],
    storage: [
      '🧊 Remove tops and refrigerate in a bag',
      '📅 Lasts 1–2 weeks refrigerated',
      '🌡️ Optimal at 0–4°C',
      '🍃 Store turnip greens separately — use within 3 days',
      '💧 Keep slightly moist to avoid drying out',
    ],
    recipes: [
      { name: 'Shalgam Gosht', time: '50 min', emoji: '🍲', desc: 'Slow-cooked mutton with turnips — a Punjabi winter favourite.' },
      { name: 'Shalgam Saag', time: '25 min', emoji: '🥬', desc: 'Turnip greens cooked with garlic and mustard — simple and satisfying.' },
      { name: 'Turnip Pickle', time: '10 min', emoji: '🫙', desc: 'Quick-pickled in vinegar with red chilli and black pepper.' },
    ],
    farm: { name: 'Gupta Roots', owner: 'Mahesh Gupta', location: 'Rohtak, Haryana', years: 2, emoji: '🌰', supply: '30%', certified: true },
    related: ['radish', 'carrot', 'beetroot'],
  },

  // ---- MISSING FRUITING ----
  peas: {
    name: 'Peas', aka: 'Matar', emoji: '🫛', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Sweet green pods. Hand-picked at peak ripeness.',
    desc: 'Sweet green peas in the pod from Khatri Gardens, Rewari — a winter seasonal highlight. Hand-picked at the perfect stage when the peas are plump, sweet, and tender. Shelled fresh for maximum flavour.',
    freshness: '9.3', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: 'Today, 4:00 AM', farm: 'Khatri Gardens', location: 'Rewari, Haryana',
      transit: '7 hrs', arrivedAt: '11:00 AM',
      storage: '3°C · 92% Humidity', batchId: getBatchId('MTR', 0), qty: '25 kg'
    },
    nutrition: [
      { label: 'Calories', value: '81 kcal', per: 'per 100g' },
      { label: 'Protein', value: '5.4g', per: 'per 100g' },
      { label: 'Vitamin C', value: '40mg', per: '44% DV' },
      { label: 'Vitamin K', value: '24.8µg', per: '21% DV' },
      { label: 'Fibre', value: '5.7g', per: '20% DV' },
      { label: 'Folate', value: '65µg', per: '16% DV' },
    ],
    storage: [
      '🧊 Keep pods in the refrigerator in a perforated bag',
      '📅 Best within 3–4 days of purchase',
      '🌡️ Store at 0–3°C',
      '🫛 Shell just before cooking for maximum sweetness',
      '🔒 Blanch and freeze shelled peas for up to 12 months',
    ],
    recipes: [
      { name: 'Matar Paneer', time: '30 min', emoji: '🍛', desc: 'The iconic peas and cottage cheese curry in spiced tomato gravy.' },
      { name: 'Matar Pulao', time: '20 min', emoji: '🍚', desc: 'Fragrant basmati rice cooked with fresh green peas and whole spices.' },
      { name: 'Aloo Matar', time: '25 min', emoji: '🥔', desc: 'Potato and peas curry — a timeless everyday North Indian meal.' },
    ],
    farm: { name: 'Khatri Gardens', owner: 'Sunita Khatri', location: 'Rewari, Haryana', years: 1, emoji: '🍆', supply: '25%', certified: false },
    related: ['tomato', 'capsicum', 'brinjal'],
  },

  'bitter-gourd': {
    name: 'Bitter Gourd', aka: 'Karela', emoji: '🥒', category: 'fruiting',
    categoryName: 'Fruiting Vegetables',
    tagline: 'Medicinal. Bold. Selected before over-maturity sets in.',
    desc: 'Fresh ridged bitter gourd from Joshi Polyhouse, Alwar. Selected at exactly the right maturity stage — before the seeds harden and the bitterness becomes overwhelming. Known for regulating blood sugar.',
    freshness: '8.9', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: 'Yesterday', farm: 'Joshi Polyhouse', location: 'Alwar, Rajasthan',
      transit: '7 hrs', arrivedAt: 'Yesterday 4:00 PM',
      storage: '10°C · 85% Humidity', batchId: getBatchId('KRL', 1), qty: '18 kg'
    },
    nutrition: [
      { label: 'Calories', value: '17 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '84mg', per: '93% DV' },
      { label: 'Vitamin A', value: '471IU', per: '9% DV' },
      { label: 'Iron', value: '0.4mg', per: '2% DV' },
      { label: 'Charantin', value: 'Present', per: 'blood sugar' },
      { label: 'Fibre', value: '2.8g', per: '10% DV' },
    ],
    storage: [
      '🧊 Store in fridge in a perforated plastic bag',
      '📅 Best within 5 days of purchase',
      '🌡️ Keep at 8–10°C',
      '🚫 Don\'t wash before storing — speeds spoilage',
      '🔪 Remove seeds to reduce bitterness when cooking',
    ],
    recipes: [
      { name: 'Karela Sabzi', time: '25 min', emoji: '🍛', desc: 'Stuffed or sliced bitter gourd stir-fried with onions, spices, and jaggery.' },
      { name: 'Karela Chips', time: '20 min', emoji: '🥒', desc: 'Thinly sliced, salted, and pan-fried until crispy — addictive!' },
      { name: 'Karela Juice', time: '5 min', emoji: '🥤', desc: 'Fresh bitter gourd juice with lemon and ginger — traditional morning health drink.' },
    ],
    farm: { name: 'Joshi Polyhouse', owner: 'Deepak Joshi', location: 'Alwar, Rajasthan', years: 2, emoji: '🫑', supply: '35%', certified: true },
    related: ['tomato', 'brinjal', 'capsicum'],
  },

  // ---- MISSING FRUITS ----
  orange: {
    name: 'Orange', aka: 'Santra', emoji: '🍊', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Nagpur mandarins. Thin-skinned, seedless, sweet.',
    desc: 'Juicy Nagpur-style mandarin oranges from Coorg Estates — thin-skinned, seedless, and naturally sweet with a clean acidic balance. A Vitamin C powerhouse that\'s in peak season right now.',
    freshness: '9.2', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '3 days ago', farm: 'Coorg Estates', location: 'Nagpur, Maharashtra',
      transit: '16 hrs', arrivedAt: '2 days ago',
      storage: '8°C · 85% Humidity', batchId: getBatchId('SNT', 3), qty: '60 kg'
    },
    nutrition: [
      { label: 'Calories', value: '47 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '53.2mg', per: '59% DV' },
      { label: 'Folate', value: '30µg', per: '8% DV' },
      { label: 'Potassium', value: '181mg', per: '5% DV' },
      { label: 'Thiamine', value: '0.1mg', per: '7% DV' },
      { label: 'Fibre', value: '2.4g', per: '9% DV' },
    ],
    storage: [
      '🌡️ Room temperature for 1 week or refrigerate for up to 3 weeks',
      '🧊 Refrigerate in the crisper for extended shelf life',
      '🚫 Don\'t store in airtight bags — need airflow',
      '📅 Best within 2 weeks of purchase',
      '🍊 Zest the peel before juicing — great for baking!',
    ],
    recipes: [
      { name: 'Santra Sharbat', time: '5 min', emoji: '🥤', desc: 'Fresh-squeezed orange juice with black salt and roasted cumin.' },
      { name: 'Orange Halwa', time: '30 min', emoji: '🍮', desc: 'Semolina halwa infused with fresh orange juice — bright and citrusy.' },
      { name: 'Orange Raita', time: '10 min', emoji: '🥣', desc: 'Chilled yogurt with orange segments, cumin and mint — refreshing summer side.' },
    ],
    farm: { name: 'Coorg Estates', owner: 'Anand Shetty', location: 'Nagpur, Maharashtra', years: 1, emoji: '🍊', supply: '25%', certified: true },
    related: ['banana', 'guava', 'pomegranate', 'apple'],
  },

  papaya: {
    name: 'Papaya', aka: 'Papita', emoji: '🍈', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Semi-ripe. High enzyme content. Sourced from southern farms.',
    desc: 'Yellow-fleshed papayas from Coorg Estates, Karnataka — sourced semi-ripe so they reach perfect sweetness at your home within 1–2 days. Rich in papain enzyme that aids digestion.',
    freshness: '9.0', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '4 days ago', farm: 'Coorg Estates', location: 'Coorg, Karnataka',
      transit: '20 hrs', arrivedAt: '3 days ago',
      storage: '13°C · 75% Humidity', batchId: getBatchId('PPT', 4), qty: '40 kg'
    },
    nutrition: [
      { label: 'Calories', value: '43 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '61.8mg', per: '69% DV' },
      { label: 'Vitamin A', value: '47µg', per: '5% DV' },
      { label: 'Folate', value: '37µg', per: '9% DV' },
      { label: 'Papain', value: 'High', per: 'digestive enzyme' },
      { label: 'Potassium', value: '182mg', per: '5% DV' },
    ],
    storage: [
      '🌡️ Store at room temp until ripe (skin turns yellow)',
      '🧊 Once ripe, refrigerate for up to 5 days',
      '📅 Unripe papaya ripens in 2–5 days at room temp',
      '🔪 Cut papaya must be wrapped and refrigerated',
      '🌑 Keep unripe papaya away from direct sunlight',
    ],
    recipes: [
      { name: 'Raw Papaya Sabzi', time: '20 min', emoji: '🍛', desc: 'Grated raw papaya stir-fried with mustard seeds and curry leaves — South Indian style.' },
      { name: 'Papaya Salad', time: '10 min', emoji: '🥗', desc: 'Ripe papaya with chaat masala, lemon, and coriander — refreshing and digestive.' },
      { name: 'Papaya Smoothie', time: '5 min', emoji: '🥤', desc: 'Blended ripe papaya with yogurt, honey, and cardamom.' },
    ],
    farm: { name: 'Coorg Estates', owner: 'Anand Shetty', location: 'Coorg, Karnataka', years: 1, emoji: '🍊', supply: '25%', certified: true },
    related: ['banana', 'guava', 'apple'],
  },

  guava: {
    name: 'Guava', aka: 'Amrood', emoji: '🍐', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Allahabad belt guavas. Pink and white. Crunchy or soft-ripe.',
    desc: 'Pink and white guavas from the famous Allahabad belt — the most prized guava-growing region in India. Available in crunchy (underripe) and soft-ripe varieties. Exceptionally high in Vitamin C.',
    freshness: '9.3', status: 'Fresh', seasonal: false,
    batch: {
      harvested: '2 days ago', farm: 'Nashik Orchards', location: 'Allahabad, UP',
      transit: '14 hrs', arrivedAt: 'Yesterday',
      storage: '8°C · 88% Humidity', batchId: getBatchId('AMR', 2), qty: '35 kg'
    },
    nutrition: [
      { label: 'Calories', value: '68 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '228mg', per: '253% DV' },
      { label: 'Fibre', value: '5.4g', per: '19% DV' },
      { label: 'Folate', value: '49µg', per: '12% DV' },
      { label: 'Potassium', value: '417mg', per: '12% DV' },
      { label: 'Lycopene', value: 'High', per: '(pink variety)' },
    ],
    storage: [
      '🧊 Store ripe guavas in the refrigerator',
      '🌡️ Unripe guavas ripen best at 20–25°C room temp',
      '📅 Ripe guavas last 2–4 days in the fridge',
      '🚫 Don\'t stack — bruises quickly',
      '🍃 Guava leaves make excellent herbal tea!',
    ],
    recipes: [
      { name: 'Amrood Ki Chaat', time: '10 min', emoji: '🥗', desc: 'Guava with black salt, red chilli powder, and lemon — a classic street snack.' },
      { name: 'Guava Juice', time: '5 min', emoji: '🥤', desc: 'Blended guava with ginger water and kala namak — refreshing and digestive.' },
      { name: 'Guava Jelly', time: '40 min', emoji: '🫙', desc: 'Homemade guava jelly set with lemon juice — spread on roti or bread.' },
    ],
    farm: { name: 'Nashik Orchards', owner: 'Vijay Patil', location: 'Allahabad, UP', years: 2, emoji: '🍇', supply: '35%', certified: true },
    related: ['banana', 'papaya', 'orange', 'apple'],
  },

  pomegranate: {
    name: 'Pomegranate', aka: 'Anar', emoji: '🍎', category: 'fruits',
    categoryName: 'Fruits',
    tagline: 'Bhagwa variety. Deep red arils. Naturally sweet with low acidity.',
    desc: 'Bhagwa pomegranates from Solapur farms, Maharashtra — India\'s most prized pomegranate variety. Deep ruby-red arils with natural sweetness and low acidity. Rich in antioxidants and heart-healthy polyphenols.',
    freshness: '9.1', status: 'Seasonal', seasonal: true,
    batch: {
      harvested: '5 days ago', farm: 'Coorg Estates', location: 'Solapur, Maharashtra',
      transit: '18 hrs', arrivedAt: '4 days ago',
      storage: '5°C · 90% Humidity', batchId: getBatchId('ANR', 5), qty: '45 kg'
    },
    nutrition: [
      { label: 'Calories', value: '83 kcal', per: 'per 100g' },
      { label: 'Vitamin C', value: '10.2mg', per: '11% DV' },
      { label: 'Vitamin K', value: '16.4µg', per: '14% DV' },
      { label: 'Folate', value: '38µg', per: '10% DV' },
      { label: 'Potassium', value: '236mg', per: '7% DV' },
      { label: 'Punicalagins', value: 'High', per: 'powerful antioxidant' },
    ],
    storage: [
      '🧊 Refrigerate whole pomegranates for up to 2 months',
      '🌡️ Store at 5–8°C',
      '📅 Arils (seeds) store for 5 days in airtight container',
      '🔒 Whole fruit keeps far longer than seeded',
      '🍎 Tap the back of a half-pomegranate to release seeds quickly!',
    ],
    recipes: [
      { name: 'Anar Ki Chaat', time: '10 min', emoji: '🥗', desc: 'Pomegranate arils with chaat masala, roasted cumin, and coriander — simple and stunning.' },
      { name: 'Pomegranate Raita', time: '10 min', emoji: '🥣', desc: 'Thick yogurt with ruby arils and mint — beautiful alongside biryani.' },
      { name: 'Anar Juice', time: '5 min', emoji: '🥤', desc: 'Fresh-pressed pomegranate juice — no sugar needed.' },
    ],
    farm: { name: 'Coorg Estates', owner: 'Anand Shetty', location: 'Solapur, Maharashtra', years: 1, emoji: '🍊', supply: '25%', certified: true },
    related: ['apple', 'guava', 'orange'],
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
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => observer.observe(el));
}

// ==========================================
// GET ITEM KEY FROM URL — returns null if not found (no silent fallback)
// ==========================================
function getItemKey() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('item') || '';
  return (key && PRODUCTS[key]) ? key : null;
}

// ==========================================
// RENDER
// ==========================================
function render(key) {
  const p = PRODUCTS[key];

  document.getElementById('page-title').textContent = `${p.name} (${p.aka}) — YAKUZAZ`;
  document.getElementById('breadcrumb-cat').textContent = p.categoryName;
  document.getElementById('breadcrumb-cat').href = `category.html?cat=${p.category}`;
  document.getElementById('breadcrumb-item').textContent = p.name;

  // Hero
  document.getElementById('prod-emoji').textContent = p.emoji;
  document.getElementById('prod-name').textContent = p.name;
  document.getElementById('prod-aka').textContent = p.aka;
  document.getElementById('prod-tagline').textContent = p.tagline;
  document.getElementById('prod-desc').textContent = p.desc;
  document.getElementById('prod-score').textContent = p.freshness;
  document.getElementById('prod-status').textContent = p.status;
  if (p.seasonal) document.getElementById('seasonal-tag').style.display = 'inline-flex';

  // Set hero gradient based on category
  const gradients = {
    leafy: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
    root: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)',
    tuber: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 60%, #fef08a 100%)',
    fruiting: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fecdd3 100%)',
    fruits: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 60%, #f5d0fe 100%)',
  };
  document.getElementById('prod-hero-bg').style.background = gradients[p.category] || gradients.leafy;

  // Batch info
  document.getElementById('batch-harvested').textContent = p.batch.harvested;
  document.getElementById('batch-farm').textContent = p.batch.farm;
  document.getElementById('batch-location').textContent = p.batch.location;
  document.getElementById('batch-transit').textContent = p.batch.transit;
  document.getElementById('batch-arrived').textContent = p.batch.arrivedAt;
  document.getElementById('batch-storage').textContent = p.batch.storage;
  document.getElementById('batch-id').textContent = p.batch.batchId;
  document.getElementById('batch-qty').textContent = p.batch.qty;

  // Nutrition
  document.getElementById('nutrition-grid').innerHTML = p.nutrition.map(n => `
    <div class="nutrition-card">
      <span class="nutrition-value">${n.value}</span>
      <span class="nutrition-label">${n.label}</span>
      <span class="nutrition-per">${n.per}</span>
    </div>
  `).join('');

  // Storage tips
  document.getElementById('storage-list').innerHTML = p.storage.map(tip => `
    <div class="storage-tip">${tip}</div>
  `).join('');

  // Recipes
  document.getElementById('recipes-grid').innerHTML = p.recipes.map((r, i) => `
    <div class="recipe-card reveal" style="animation-delay:${i * 0.1}s">
      <div class="recipe-emoji">${r.emoji}</div>
      <div class="recipe-content">
        <div class="recipe-name">${r.name}</div>
        <div class="recipe-time">⏱ ${r.time}</div>
        <div class="recipe-desc">${r.desc}</div>
      </div>
    </div>
  `).join('');

  // Farm
  document.getElementById('farm-name').textContent = p.farm.name;
  document.getElementById('farm-owner').textContent = p.farm.owner;
  document.getElementById('farm-location').textContent = p.farm.location;
  document.getElementById('farm-years').textContent = `${p.farm.years} year${p.farm.years !== 1 ? 's' : ''}`;
  document.getElementById('farm-supply').textContent = p.farm.supply;
  document.getElementById('farm-emoji-big').textContent = p.farm.emoji;
  document.getElementById('farm-verified').style.display = p.farm.certified ? 'inline-flex' : 'none';

  // Upload category name
  document.querySelectorAll('.upload-cat-name').forEach(el => el.textContent = p.name.toLowerCase());

  // Related products
  const relatedKeys = (p.related || []).slice(0, 4).filter(k => PRODUCTS[k]);
  document.getElementById('related-grid').innerHTML = relatedKeys.map(k => {
    const rp = PRODUCTS[k];
    return `
      <a href="product.html?item=${k}" class="related-card">
        <div class="related-emoji">${rp.emoji}</div>
        <div class="related-name">${rp.name}</div>
        <div class="related-aka">${rp.aka}</div>
        <div class="related-score">⭐ ${rp.freshness}</div>
      </a>
    `;
  }).join('');

  // Back to category link
  document.getElementById('back-to-cat').href = `category.html?cat=${p.category}`;
  document.getElementById('back-to-cat').textContent = `← ${p.categoryName}`;
}

// ==========================================
// QR TRACE ANIMATION
// ==========================================
function initQrAnimation() {
  const ring = document.querySelector('.ring-progress');
  const panelEl = document.querySelector('.qr-trace-panel');
  if (!ring || !panelEl) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      ring.style.strokeDashoffset = '23.7';
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(panelEl);
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
// INIT — only run on product.html
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Guard: only run product-page logic when we're actually on product.html
  if (!window.location.pathname.includes('product.html') &&
      !window.location.pathname.endsWith('/product')) return;

  const key = getItemKey();
  if (!key) {
    // Product not found — show a helpful error state
    document.body.innerHTML = `
      <nav id="navbar" class="scrolled" style="position:fixed;top:0;left:0;right:0;background:#fff;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;padding:0 40px;height:68px;z-index:1000;">
        <a href="index.html" style="font-family:Outfit,sans-serif;font-weight:800;font-size:1.2rem;color:#166534;text-decoration:none;">🌿 YAKUZAZ</a>
      </nav>
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Outfit,sans-serif;padding:80px 24px 0;text-align:center;">
        <div style="font-size:4rem;margin-bottom:16px;">🥬</div>
        <h1 style="font-size:1.8rem;font-weight:700;color:#111827;margin-bottom:8px;">Product not found</h1>
        <p style="color:#6b7280;max-width:400px;line-height:1.7;margin-bottom:32px;">
          We couldn't find this vegetable in our store. It may have been removed, misspelled, or is not yet available.
        </p>
        <a href="index.html#categories"
           style="background:#16a34a;color:#fff;padding:12px 28px;border-radius:99px;text-decoration:none;font-weight:600;font-size:.9rem;">
          ← Back to Store
        </a>
      </div>
    `;
    return;
  }
  render(key);
  initReveal();
  initQrAnimation();

  // Add-to-Cart setup
  const prod = PRODUCTS[key];
  let prodQty = 0.5;
  const pricePerKg = PRODUCT_PRICES[key] || prod.price || 50;

  function updateAtcDisplay() {
    const disp = document.getElementById('prodQtyDisplay');
    const priceDisp = document.getElementById('prodPriceDisplay');
    if (disp) disp.textContent = prodQty + ' kg';
    if (priceDisp) priceDisp.textContent = Math.round(pricePerKg * prodQty);
  }

  window.adjustProdQty = function(delta) {
    prodQty = Math.max(0.5, Math.min(10, +(prodQty + delta).toFixed(1)));
    updateAtcDisplay();
  };

  window.handleProdAddToCart = function() {
    if (typeof addToCart === 'function') {
      const cart = getCart();
      const existing = cart.find(i => i.slug === key);
      if (existing) {
        updateQty(key, +(existing.qty + prodQty).toFixed(1));
      } else {
        addToCart(key, prod.name, prod.emoji, pricePerKg);
        if (prodQty !== 0.5) updateQty(key, prodQty);
      }
    }
  };

  updateAtcDisplay();

  // Load reviews
  loadReviews(key);

  console.log(`🌿 YAKUZAZ — ${PRODUCTS[key].name} page loaded.`);
});

// ==========================================
// REVIEWS
// ==========================================
async function loadReviews(slug) {
  const el = document.getElementById('reviews-content');
  if (!el) return;

  const [{ data: reviews }, { data: { session } }] = await Promise.all([
    _supabase.from('reviews').select('*').eq('product_slug', slug).order('created_at', { ascending: false }),
    _supabase.auth.getSession()
  ]);

  const list = reviews || [];
  const avgRating = list.length ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1) : null;
  const userId = session?.user?.id;
  const alreadyReviewed = list.some(r => r.user_id === userId);

  const stars = (n, hl = false) => [1,2,3,4,5].map(i =>
    `<span style="font-size:${hl?'1.4':'1'}rem;color:${i <= n ? '#f59e0b' : '#e5e7eb'}">★</span>`
  ).join('');

  el.innerHTML = `
    ${avgRating ? `
    <div style="display:flex;align-items:center;gap:16px;background:#fffbeb;border:1.5px solid #fde047;border-radius:16px;padding:16px 20px;margin-bottom:24px">
      <div style="text-align:center">
        <div style="font-size:2.2rem;font-weight:800;color:#d97706;font-family:'Outfit',sans-serif">${avgRating}</div>
        <div style="font-size:.75rem;color:#92400e">${list.length} review${list.length !== 1 ? 's' : ''}</div>
      </div>
      <div>${stars(Math.round(Number(avgRating)), true)}</div>
    </div>` : ''}

    ${session && !alreadyReviewed ? `
    <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:24px" id="reviewForm">
      <div style="font-weight:700;color:#14532d;margin-bottom:12px;font-size:.95rem">Write a Review</div>
      <div style="margin-bottom:12px">
        <div style="font-size:.82rem;font-weight:600;color:#374151;margin-bottom:6px">Your Rating *</div>
        <div id="starPicker" style="display:flex;gap:6px;cursor:pointer">
          ${[1,2,3,4,5].map(i => `<span data-star="${i}" onclick="pickStar(${i})" style="font-size:1.8rem;color:#e5e7eb;transition:.1s">★</span>`).join('')}
        </div>
      </div>
      <textarea id="reviewComment" placeholder="Share your experience with this vegetable…" style="width:100%;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:.88rem;font-family:'Outfit',sans-serif;resize:vertical;min-height:80px;box-sizing:border-box;outline:none"></textarea>
      <button onclick="submitReview('${slug}')" style="margin-top:10px;background:#16a34a;color:#fff;border:none;border-radius:999px;padding:10px 24px;font-weight:700;font-size:.88rem;cursor:pointer;font-family:'Outfit',sans-serif">Submit Review</button>
      <div id="reviewErr" style="margin-top:8px;font-size:.82rem;color:#dc2626;display:none"></div>
    </div>` : session && alreadyReviewed ? `
    <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:.85rem;color:#15803d;font-weight:600">
      ✓ You've already reviewed this product. Thank you!
    </div>` : `
    <div style="background:#f9fafb;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:.85rem;color:#6b7280">
      <a href="/consumer/login.html" style="color:#16a34a;font-weight:700">Sign in</a> to write a review.
    </div>`}

    <div id="reviewsList">
      ${list.length ? list.map(r => `
        <div style="padding:16px 0;border-bottom:1px solid #f3f4f6">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <div style="width:34px;height:34px;border-radius:50%;background:#16a34a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.82rem;flex-shrink:0">${(r.user_name||'?')[0].toUpperCase()}</div>
            <div>
              <div style="font-weight:700;font-size:.88rem;color:#111827">${escHtmlR(r.user_name || 'Customer')}</div>
              <div style="font-size:.75rem;color:#9ca3af">${new Date(r.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
            </div>
            <div style="margin-left:auto">${stars(r.rating)}</div>
          </div>
          ${r.comment ? `<p style="font-size:.88rem;color:#374151;line-height:1.7;margin:0 0 0 44px">${escHtmlR(r.comment)}</p>` : ''}
        </div>`).join('') : '<p style="color:#9ca3af;text-align:center;padding:30px 0;font-size:.9rem">No reviews yet — be the first!</p>'}
    </div>`;

  window._selectedStar = 0;
}

window.pickStar = function(n) {
  window._selectedStar = n;
  document.querySelectorAll('#starPicker span').forEach(s => {
    s.style.color = parseInt(s.dataset.star) <= n ? '#f59e0b' : '#e5e7eb';
  });
};

window.submitReview = async function(slug) {
  const rating = window._selectedStar;
  const comment = (document.getElementById('reviewComment')?.value || '').trim();
  const errEl = document.getElementById('reviewErr');

  if (!rating) { errEl.style.display = 'block'; errEl.textContent = 'Please select a star rating.'; return; }

  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) { errEl.style.display = 'block'; errEl.textContent = 'Please sign in first.'; return; }

  const { data: profile } = await _supabase.from('profiles').select('full_name').eq('id', session.user.id).single();

  const { error } = await _supabase.from('reviews').insert({
    user_id: session.user.id,
    user_name: profile?.full_name || session.user.email.split('@')[0],
    product_slug: slug,
    rating,
    comment: comment || null
  });

  if (error) {
    errEl.style.display = 'block';
    errEl.textContent = error.code === '23505' ? 'You already reviewed this product.' : 'Failed: ' + error.message;
    return;
  }

  document.getElementById('reviewForm').innerHTML = `
    <div style="text-align:center;padding:16px;color:#15803d;font-weight:700">🎉 Thanks for your review!</div>`;
  loadReviews(slug);
};

function escHtmlR(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ==========================================
// FARM-TO-TABLE TRACE TIMELINE
// Rendered into #farm-trace-container after main render()
// ==========================================
function renderTraceTimeline(key) {
  const p = PRODUCTS[key];
  const container = document.getElementById('farm-trace-container');
  if (!container || !p) return;

  const steps = [
    {
      icon: '🌱', label: 'Planted & Grown', status: 'done',
      detail: `${p.farm.name}, ${p.farm.location}`,
      time: `${p.farm.years} yr${p.farm.years !== 1 ? 's' : ''} farm partner`
    },
    {
      icon: '🌅', label: 'Harvested', status: 'done',
      detail: `${p.batch.farm}`,
      time: p.batch.harvested
    },
    {
      icon: '🚛', label: 'In Transit', status: 'done',
      detail: `Cold-chain delivery`,
      time: `${p.batch.transit} transit time`
    },
    {
      icon: '🏪', label: 'Arrived at Store', status: 'done',
      detail: `YAKUZAZ Store — Delhi`,
      time: `Arrived ${p.batch.arrivedAt}`
    },
    {
      icon: '🧊', label: 'Stored & Monitored', status: 'now',
      detail: p.batch.storage,
      time: `Batch #${p.batch.batchId}`
    }
  ];

  container.innerHTML = `
    <div class="farm-trace-section">
      <div class="farm-trace-title">FARM → TABLE TRACE</div>
      <div class="trace-timeline" id="traceTimeline">
        ${steps.map(s => `
          <div class="trace-step">
            <div class="trace-icon ${s.status}">${s.icon}</div>
            <div class="trace-info">
              <div class="trace-step-label">${s.label}</div>
              <div class="trace-step-detail">${s.detail}</div>
              <div class="trace-step-time">${s.time}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  // Scroll-triggered reveal
  const steps_els = container.querySelectorAll('.trace-step');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -20px 0px' });
  steps_els.forEach(el => observer.observe(el));
}

// ==========================================
// ANIMATED NUTRITION BARS
// Replaces static nutrition grid with bars
// ==========================================
function renderAnimatedNutrition(key) {
  const p = PRODUCTS[key];
  const grid = document.getElementById('nutrition-grid');
  if (!grid || !p) return;

  // Determine max numeric value for relative bar sizing
  const nums = p.nutrition.map(n => parseFloat(n.value) || 0);
  const maxNum = Math.max(...nums, 1);

  grid.innerHTML = p.nutrition.map((n, i) => {
    const num = parseFloat(n.value) || 0;
    const pct = num > 0 ? Math.max(10, (num / maxNum) * 100) : 8;
    return `
    <div class="nutr-bar-card" style="animation-delay:${i * 0.07}s">
      <div class="nutr-bar-value">${n.value}</div>
      <div class="nutr-bar-label">${n.label}</div>
      <div class="nutr-bar-per">${n.per}</div>
      <div class="nutr-bar-track">
        <div class="nutr-bar-fill" data-pct="${pct}" style="width:0%"></div>
      </div>
    </div>`;
  }).join('');

  // Animate fill bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      grid.querySelectorAll('.nutr-bar-fill').forEach((el, i) => {
        setTimeout(() => {
          el.style.width = el.dataset.pct + '%';
        }, i * 60);
      });
    }, 100);
  });
}

// ==========================================
// HOOK INTO PRODUCT PAGE DOMContentLoaded
// Run after existing render() + initReveal()
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('product.html') &&
      !window.location.pathname.endsWith('/product')) return;
  const key = (new URLSearchParams(window.location.search)).get('item');
  if (!key || !PRODUCTS[key]) return;

  // Give the main render() time to finish
  setTimeout(() => {
    renderTraceTimeline(key);
    renderAnimatedNutrition(key);
  }, 80);
}, { capture: true });
