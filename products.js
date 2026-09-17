/* ==========================================================================
   Eleventh Stitch — PRODUCT CATALOGUE + STORE SETTINGS
   --------------------------------------------------------------------------
   YAHI EK FILE EDIT KARO apna product, price, WhatsApp number badalne ke liye.
   Baqi kisi file ko chhune ki zaroorat nahi.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) STORE SETTINGS  — apni details yahan daalein
   -------------------------------------------------------------------------- */
const STORE = {
  name: "Eleventh Stitch",
  tagline: "Sleep, Stitched Right",

  // WhatsApp number: country code ke saath, koi +, space ya dash nahi
  // Pakistan example: 923299796093  ->  923299796093
  whatsapp: "923299796093",

  phone: "+92 3299796093",
  email: "orders@eleventhstitch.com",
  address: "Shop 11, Textile Plaza, Main Boulevard, Lahore, Pakistan",
  hours: "Mon – Sat, 10:00 am – 9:00 pm",

  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",

  currency: "Rs.",
  freeShipOver: 10000,      // is amount se upar shipping free
  shipFlat: 350,            // normal delivery charges
  codFee: 0,                // cash on delivery extra fee (0 = free)

  // Bank / mobile wallet — checkout par customer ko dikhega
  bank: {
    bankName: "Meezan Bank",
    title: "Eleventh Stitch",
    account: "0123 4567 8901 2345",
    iban: "PK00MEZN0001234567890123",
    jazzcash: "0300 123 4567",
    easypaisa: "0300 123 4567",
  },

  // Coupon codes: CODE -> { off: percent, min: minimum order }
  coupons: {
    STITCH10: { off: 10, min: 5000 },
    SLEEP15: { off: 15, min: 15000 },
    NEW5: { off: 5, min: 0 },
  },
};

/* --------------------------------------------------------------------------
   2) CATEGORIES
   -------------------------------------------------------------------------- */
const CATEGORIES = [
  { slug: "mattresses", name: "Mattresses", blurb: "Orthopedic, memory foam, spring & hybrid", img: "assets/img/cat-mattress.jpg" },
  { slug: "pillows", name: "Pillows", blurb: "Cervical, fiber, cooling gel & body", img: "assets/img/cat-pillow.jpg" },
  { slug: "bedding", name: "Bedding", blurb: "Sheets, comforters, quilts & blankets", img: "assets/img/cat-bedding.jpg" },
  { slug: "protectors", name: "Protectors & Toppers", blurb: "Waterproof covers & foam toppers", img: "assets/img/cat-protector.jpg" },
  { slug: "decor", name: "Cushions & Decor", blurb: "Velvet cushions, poufs & sofa foam", img: "assets/img/cat-decor.jpg" },
];

/* --------------------------------------------------------------------------
   3) PRODUCTS
   --------------------------------------------------------------------------
   id       : unique (URL mein use hota hai) — badalne se purane link toot jayenge
   price    : bechne wali qeemat
   was      : original qeemat (0 rakho to discount nahi dikhega)
   badge    : "sale" | "new" | "" (khali)
   stock    : true = available, false = out of stock
   options  : size/variant list. add = us size par extra paisay
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  /* ================= MATTRESSES ================= */
  {
    id: "orthopedic-support-mattress",
    name: "Orthopedic Support Mattress",
    cat: "mattresses",
    price: 42500, was: 52000, badge: "sale", stock: true,
    rating: 4.8, reviews: 214,
    img: "assets/products/mattress-orthopedic.jpg",
    short: "High-density orthopedic core with a quilted knit cover — firm, posture-correcting support for back and joint comfort.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 9500 },
        { name: "Queen", sub: "60 × 78 in", add: 17000 },
        { name: "King", sub: "72 × 78 in", add: 24500 },
      ],
    },
    features: [
      "High-density rebonded orthopedic foam core",
      "Firm support that keeps the spine naturally aligned",
      "Quilted stretch-knit cover with reinforced edge stitching",
      "Breathable side panel reduces heat build-up",
      "Recommended for back pain and heavier body weight",
    ],
    specs: {
      "Thickness": "8 inches",
      "Firmness": "Firm (8/10)",
      "Core": "High-density rebonded foam",
      "Cover": "Quilted stretch knit, removable",
      "Warranty": "10 years",
    },
  },
  {
    id: "cloud-memory-foam-mattress",
    name: "Cloud Memory Foam Mattress",
    cat: "mattresses",
    price: 48900, was: 58000, badge: "sale", stock: true,
    rating: 4.9, reviews: 178,
    img: "assets/products/mattress-memory-foam.jpg",
    short: "Pressure-relieving memory foam that contours to your body — for side sleepers who want a plush, sinking-in feel.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 11000 },
        { name: "Queen", sub: "60 × 78 in", add: 19500 },
        { name: "King", sub: "72 × 78 in", add: 27000 },
      ],
    },
    features: [
      "3-inch visco-elastic memory foam comfort layer",
      "Contours to shoulders and hips, relieving pressure points",
      "Motion-isolating — partner movement barely transfers",
      "Soft cream stretch-knit cover with zip closure",
      "Ideal for side and combination sleepers",
    ],
    specs: {
      "Thickness": "10 inches",
      "Firmness": "Medium soft (4/10)",
      "Core": "Memory foam over HR base foam",
      "Cover": "Knit, removable & washable",
      "Warranty": "10 years",
    },
  },
  {
    id: "pocket-spring-mattress",
    name: "Pocket Spring Mattress",
    cat: "mattresses",
    price: 56500, was: 0, badge: "", stock: true,
    rating: 4.7, reviews: 96,
    img: "assets/products/mattress-spring.jpg",
    short: "Individually pocketed springs with a quilted damask top — bouncy, breathable and beautifully supportive.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 12500 },
        { name: "Queen", sub: "60 × 78 in", add: 21000 },
        { name: "King", sub: "72 × 78 in", add: 29500 },
      ],
    },
    features: [
      "Individually wrapped pocket springs move independently",
      "Excellent airflow keeps the bed cool through summer",
      "Quilted damask top panel with plush fibre fill",
      "Reinforced perimeter for firm, stable edges",
      "Ventilated mesh side border with air vents",
    ],
    specs: {
      "Thickness": "10 inches",
      "Firmness": "Medium firm (6/10)",
      "Core": "Pocket spring unit",
      "Cover": "Quilted damask",
      "Warranty": "8 years",
    },
  },
  {
    id: "medicated-firm-mattress",
    name: "Medicated Firm Mattress",
    cat: "mattresses",
    price: 31900, was: 37500, badge: "sale", stock: true,
    rating: 4.6, reviews: 152,
    img: "assets/products/mattress-medicated.jpg",
    short: "Extra-firm medicated foam recommended for chronic back pain — the classic doctor-advised mattress.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 8000 },
        { name: "Queen", sub: "60 × 78 in", add: 14500 },
        { name: "King", sub: "72 × 78 in", add: 20500 },
      ],
    },
    features: [
      "Extra-firm medicated rebonded foam",
      "Recommended for lower back and disc discomfort",
      "Tight-woven cover with double edge stitching",
      "Holds its shape for years without sagging",
      "Great value firm option for guest and family rooms",
    ],
    specs: {
      "Thickness": "6 inches",
      "Firmness": "Extra firm (9/10)",
      "Core": "Medicated rebonded foam",
      "Cover": "Tight-woven poly cotton",
      "Warranty": "7 years",
    },
  },
  {
    id: "hybrid-luxe-mattress",
    name: "Hybrid Luxe Mattress",
    cat: "mattresses",
    price: 74900, was: 89000, badge: "new", stock: true,
    rating: 5.0, reviews: 43,
    img: "assets/products/mattress-hybrid.jpg",
    short: "Our flagship — memory foam comfort layers over pocket springs, wrapped in a cool tencel cover.",
    options: {
      label: "Size",
      list: [
        { name: "Double", sub: "48 × 75 in", add: 0 },
        { name: "Queen", sub: "60 × 78 in", add: 11000 },
        { name: "King", sub: "72 × 78 in", add: 19500 },
      ],
    },
    features: [
      "Gel memory foam over a bronze pocket spring core",
      "Best of both worlds: contouring plus springy support",
      "Cool-touch tencel cover wicks away moisture",
      "Zoned lumbar reinforcement in the centre third",
      "Handcrafted side stitching with reinforced corners",
    ],
    specs: {
      "Thickness": "12 inches",
      "Firmness": "Medium (5/10)",
      "Core": "Pocket spring + gel memory foam",
      "Cover": "Tencel blend, removable",
      "Warranty": "12 years",
    },
  },
  {
    id: "everyday-single-mattress",
    name: "Everyday Single Mattress",
    cat: "mattresses",
    price: 16900, was: 21000, badge: "sale", stock: true,
    rating: 4.4, reviews: 187,
    img: "assets/products/mattress-single.jpg",
    short: "Light, affordable single foam mattress for kids' rooms, hostels and servant quarters.",
    options: {
      label: "Thickness",
      list: [
        { name: "4 inch", sub: "Light use", add: 0 },
        { name: "5 inch", sub: "Daily use", add: 2500 },
        { name: "6 inch", sub: "Best comfort", add: 5000 },
      ],
    },
    features: [
      "Budget-friendly PU foam core",
      "Quilted white cover with tan piping trim",
      "Light enough for one person to move and flip",
      "Perfect for children's beds and hostel rooms",
      "Standard single size 36 × 75 inches",
    ],
    specs: {
      "Size": "36 × 75 inches",
      "Firmness": "Medium firm (6/10)",
      "Core": "PU foam",
      "Cover": "Quilted poly cotton",
      "Warranty": "3 years",
    },
  },
  {
    id: "trifold-floor-mattress",
    name: "Tri-Fold Floor Mattress",
    cat: "mattresses",
    price: 13500, was: 0, badge: "", stock: true,
    rating: 4.5, reviews: 74,
    img: "assets/products/mattress-foldable.jpg",
    short: "Folds into three with a carry handle — instant guest bedding that stores inside a cupboard.",
    options: {
      label: "Size",
      list: [
        { name: "Single fold", sub: "30 × 72 in", add: 0 },
        { name: "Wide fold", sub: "36 × 75 in", add: 3200 },
      ],
    },
    features: [
      "Folds into a compact z-shape for easy storage",
      "Oatmeal cotton canvas cover with carry handle",
      "Ideal for guests, majlis seating and travel",
      "Firm enough for floor sleeping, soft on top",
      "Removable cover, machine washable",
    ],
    specs: {
      "Folded size": "24 × 30 × 12 in",
      "Firmness": "Medium firm (6/10)",
      "Core": "Tri-layer PU foam",
      "Cover": "Cotton canvas",
      "Warranty": "2 years",
    },
  },

  /* ================= PILLOWS ================= */
  {
    id: "cervical-memory-pillow",
    name: "Cervical Memory Foam Pillow",
    cat: "pillows",
    price: 4200, was: 5500, badge: "sale", stock: true,
    rating: 4.8, reviews: 326,
    img: "assets/products/pillow-memory-foam.jpg",
    short: "Contoured wave shape that cradles the neck — the fix for morning neck stiffness.",
    options: {
      label: "Loft",
      list: [
        { name: "Low", sub: "Back sleepers", add: 0 },
        { name: "Medium", sub: "Most people", add: 0 },
        { name: "High", sub: "Side sleepers", add: 400 },
      ],
    },
    features: [
      "Ergonomic contoured wave supports cervical curve",
      "Slow-rebound memory foam holds its shape all night",
      "Breathable dove grey cover with hidden zip",
      "Relieves neck, shoulder and upper back tension",
      "Odour-treated foam, airs out in 24 hours",
    ],
    specs: {
      "Size": "24 × 14 inches",
      "Fill": "Moulded memory foam",
      "Cover": "Knit polyester, washable",
      "Care": "Spot clean foam, wash cover",
      "Warranty": "2 years",
    },
  },
  {
    id: "hotel-fiber-pillow-pair",
    name: "Hotel Fibre Pillow (Pair)",
    cat: "pillows",
    price: 3600, was: 4800, badge: "sale", stock: true,
    rating: 4.7, reviews: 412,
    img: "assets/products/pillow-fiber.jpg",
    short: "Two plush microfibre pillows with a crisp sateen shell — that five-star hotel bounce.",
    options: {
      label: "Fill",
      list: [
        { name: "Soft", sub: "Cloud-like", add: 0 },
        { name: "Medium", sub: "Balanced", add: 0 },
        { name: "Firm", sub: "Extra support", add: 500 },
      ],
    },
    features: [
      "Set of two — complete pair for one bed",
      "Siliconised microfibre fill stays fluffy after washing",
      "Crisp cotton sateen shell with corded piping edge",
      "Machine washable, dries quickly",
      "Hypoallergenic and dust-mite resistant",
    ],
    specs: {
      "Size": "20 × 30 inches each",
      "Quantity": "2 pillows",
      "Fill": "Siliconised microfibre",
      "Cover": "Cotton sateen 200TC",
      "Care": "Machine wash cold",
    },
  },
  {
    id: "body-support-pillow",
    name: "Body & Maternity Pillow",
    cat: "pillows",
    price: 6900, was: 0, badge: "", stock: true,
    rating: 4.9, reviews: 118,
    img: "assets/products/pillow-body.jpg",
    short: "Long C-curve pillow that supports belly, back and knees together — a pregnancy essential.",
    options: {
      label: "Length",
      list: [
        { name: "Standard", sub: "52 inches", add: 0 },
        { name: "Long", sub: "60 inches", add: 1400 },
      ],
    },
    features: [
      "C-shaped curve supports bump, back and knees at once",
      "Soft blush-taupe jersey cover, gentle on skin",
      "Reduces hip and lower back strain in side sleeping",
      "Doubles as a nursing and reading support pillow",
      "Removable, machine-washable cover",
    ],
    specs: {
      "Shape": "C-curve",
      "Fill": "Virgin polyfibre",
      "Cover": "Cotton jersey, removable",
      "Care": "Machine wash cover",
      "Warranty": "1 year",
    },
  },
  {
    id: "cooling-gel-pillow",
    name: "Cooling Gel Pillow",
    cat: "pillows",
    price: 5400, was: 6800, badge: "new", stock: true,
    rating: 4.6, reviews: 89,
    img: "assets/products/pillow-cooling.jpg",
    short: "Gel-topped pillow that stays cool through humid summer nights.",
    options: {
      label: "Loft",
      list: [
        { name: "Medium", sub: "Standard", add: 0 },
        { name: "High", sub: "Side sleepers", add: 600 },
      ],
    },
    features: [
      "Cooling gel panel absorbs and disperses body heat",
      "Stays noticeably cooler than plain foam pillows",
      "Quilted white cover with breathable mesh gusset",
      "Great for hot sleepers and humid coastal weather",
      "No electricity or refrigeration needed",
    ],
    specs: {
      "Size": "24 × 15 inches",
      "Fill": "Gel-infused memory foam",
      "Cover": "Quilted knit with mesh gusset",
      "Care": "Wash cover only",
      "Warranty": "2 years",
    },
  },
  {
    id: "travel-neck-pillow",
    name: "Travel Neck Pillow",
    cat: "pillows",
    price: 1850, was: 2400, badge: "sale", stock: true,
    rating: 4.3, reviews: 205,
    img: "assets/products/pillow-neck.jpg",
    short: "U-shaped velour neck pillow with a snap closure — for flights, buses and long drives.",
    options: {
      label: "Colour",
      list: [
        { name: "Charcoal", sub: "", add: 0 },
        { name: "Grey", sub: "", add: 0 },
        { name: "Navy", sub: "", add: 0 },
      ],
    },
    features: [
      "U-shape cradles the neck while seated upright",
      "Soft charcoal velour with a front snap closure",
      "Memory foam core compresses for packing",
      "Clips onto luggage handles and bag straps",
      "Removable cover, washable",
    ],
    specs: {
      "Size": "12 × 11 inches",
      "Fill": "Memory foam",
      "Cover": "Velour, removable",
      "Care": "Machine wash cover",
      "Warranty": "6 months",
    },
  },

  /* ================= BEDDING ================= */
  {
    id: "egyptian-cotton-sheet-set",
    name: "Egyptian Cotton Sheet Set",
    cat: "bedding",
    price: 8900, was: 11500, badge: "sale", stock: true,
    rating: 4.9, reviews: 267,
    img: "assets/products/sheet-cotton-set.jpg",
    short: "300 thread-count long-staple cotton sateen — one flat sheet, one fitted and two pillowcases.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "2 pc + 1 case", add: 0 },
        { name: "Double", sub: "3 pc set", add: 1600 },
        { name: "Queen", sub: "3 pc set", add: 2800 },
        { name: "King", sub: "3 pc set", add: 4200 },
      ],
    },
    features: [
      "300 thread count long-staple Egyptian cotton",
      "Silky sateen weave that softens with every wash",
      "Deep-pocket fitted sheet fits up to 12-inch mattresses",
      "Colour-fast dye, resists fading",
      "Includes flat sheet, fitted sheet and pillowcases",
    ],
    specs: {
      "Material": "100% Egyptian cotton",
      "Thread count": "300 TC",
      "Weave": "Sateen",
      "Pieces": "3 (Double and above)",
      "Care": "Machine wash warm",
    },
  },
  {
    id: "block-print-sheet-set",
    name: "Block Print Sheet Set",
    cat: "bedding",
    price: 6500, was: 0, badge: "", stock: true,
    rating: 4.6, reviews: 143,
    img: "assets/products/sheet-printed.jpg",
    short: "Hand-blocked terracotta and olive botanical print on soft cotton percale.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "2 pc + 1 case", add: 0 },
        { name: "Double", sub: "3 pc set", add: 1300 },
        { name: "Queen", sub: "3 pc set", add: 2400 },
        { name: "King", sub: "3 pc set", add: 3600 },
      ],
    },
    features: [
      "Traditional block-print botanical motif",
      "Breathable cotton percale, crisp and cool",
      "Terracotta and olive palette on a cream ground",
      "Azo-free dyes, safe for sensitive skin",
      "Gets softer with each wash without losing colour",
    ],
    specs: {
      "Material": "100% cotton percale",
      "Thread count": "200 TC",
      "Print": "Block print, azo-free dye",
      "Pieces": "3 (Double and above)",
      "Care": "Machine wash cold, wash separately first time",
    },
  },
  {
    id: "winter-comforter",
    name: "Winter Comforter Quilt",
    cat: "bedding",
    price: 12500, was: 15900, badge: "sale", stock: true,
    rating: 4.8, reviews: 191,
    img: "assets/products/comforter-winter.jpg",
    short: "Deep teal channel-stitched comforter with heavy microfibre fill — proper Lahore winter warmth.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "60 × 90 in", add: 0 },
        { name: "Double", sub: "90 × 100 in", add: 3200 },
        { name: "King", sub: "100 × 108 in", add: 5400 },
      ],
    },
    features: [
      "400 GSM microfibre fill for serious winter warmth",
      "Channel stitching stops the filling from shifting",
      "Deep teal satin top with a cream reverse side",
      "Down-like loft without any feather allergens",
      "Comes in a reusable zip storage bag",
    ],
    specs: {
      "Fill weight": "400 GSM",
      "Shell": "Satin polyester",
      "Fill": "Siliconised microfibre",
      "Stitch": "Channel quilted",
      "Care": "Dry clean recommended",
    },
  },
  {
    id: "linen-duvet-cover-set",
    name: "Linen Blend Duvet Cover Set",
    cat: "bedding",
    price: 11900, was: 0, badge: "new", stock: true,
    rating: 4.7, reviews: 62,
    img: "assets/products/duvet-cover.jpg",
    short: "Relaxed clay-toned linen blend with that perfectly lived-in crumple. Cover plus two shams.",
    options: {
      label: "Size",
      list: [
        { name: "Double", sub: "Cover + 2 shams", add: 0 },
        { name: "Queen", sub: "Cover + 2 shams", add: 2200 },
        { name: "King", sub: "Cover + 2 shams", add: 3800 },
      ],
    },
    features: [
      "Stonewashed linen-cotton blend, soft from day one",
      "Muted clay terracotta with a natural slub texture",
      "Hidden button closure and interior corner ties",
      "Includes duvet cover and two matching shams",
      "Breathable in summer, cosy layered in winter",
    ],
    specs: {
      "Material": "55% linen, 45% cotton",
      "Closure": "Hidden buttons",
      "Pieces": "3",
      "Finish": "Stonewashed",
      "Care": "Machine wash cold, tumble low",
    },
  },
  {
    id: "summer-quilt",
    name: "Lightweight Summer Quilt",
    cat: "bedding",
    price: 7200, was: 8900, badge: "sale", stock: true,
    rating: 4.5, reviews: 134,
    img: "assets/products/quilt-summer.jpg",
    short: "Thin diamond-stitched cotton quilt in dusty blue — just enough cover for warm nights and AC rooms.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "60 × 90 in", add: 0 },
        { name: "Double", sub: "90 × 100 in", add: 1900 },
        { name: "King", sub: "100 × 108 in", add: 3400 },
      ],
    },
    features: [
      "Light 150 GSM fill — ideal for AC rooms",
      "Fine diamond stitching in pale dusty blue cotton",
      "Narrow white binding for a tailored edge",
      "Folds down small, easy to store",
      "Machine washable at home",
    ],
    specs: {
      "Fill weight": "150 GSM",
      "Shell": "100% cotton",
      "Stitch": "Diamond quilted",
      "Season": "Summer / AC use",
      "Care": "Machine wash cold",
    },
  },
  {
    id: "fleece-blanket",
    name: "Plush Fleece Blanket",
    cat: "bedding",
    price: 4800, was: 6200, badge: "sale", stock: true,
    rating: 4.7, reviews: 288,
    img: "assets/products/blanket-fleece.jpg",
    short: "Thick caramel fleece throw — the one everyone fights over on the sofa.",
    options: {
      label: "Size",
      list: [
        { name: "Throw", sub: "50 × 60 in", add: 0 },
        { name: "Double", sub: "80 × 90 in", add: 1700 },
        { name: "King", sub: "90 × 108 in", add: 3100 },
      ],
    },
    features: [
      "Dense 320 GSM double-sided fleece pile",
      "Warm camel caramel tone that suits any room",
      "Neatly bound edges resist fraying",
      "Anti-pill finish keeps it smooth after washing",
      "Sofa throw, bed layer or travel blanket",
    ],
    specs: {
      "Weight": "320 GSM",
      "Material": "Polyester fleece",
      "Finish": "Anti-pill, bound edge",
      "Care": "Machine wash cold, low tumble",
      "Warranty": "1 year",
    },
  },

  /* ================= PROTECTORS & TOPPERS ================= */
  {
    id: "waterproof-mattress-protector",
    name: "Waterproof Mattress Protector",
    cat: "protectors",
    price: 3900, was: 4900, badge: "sale", stock: true,
    rating: 4.8, reviews: 356,
    img: "assets/products/protector-waterproof.jpg",
    short: "Terry cotton on top, silent waterproof membrane underneath — saves the mattress from spills and accidents.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 800 },
        { name: "Queen", sub: "60 × 78 in", add: 1500 },
        { name: "King", sub: "72 × 78 in", add: 2300 },
      ],
    },
    features: [
      "100% waterproof TPU membrane — completely silent",
      "Soft terry cotton surface, feels like a normal sheet",
      "Deep elasticated skirt grips mattresses up to 14 inches",
      "Essential for kids, elderly care and new mattresses",
      "Breathable — traps liquid, not heat",
    ],
    specs: {
      "Surface": "Terry cotton",
      "Backing": "TPU waterproof membrane",
      "Fit": "Fitted skirt, up to 14 in depth",
      "Care": "Machine wash warm, low tumble",
      "Warranty": "3 years",
    },
  },
  {
    id: "memory-foam-topper",
    name: "Memory Foam Mattress Topper",
    cat: "protectors",
    price: 14900, was: 18500, badge: "sale", stock: true,
    rating: 4.7, reviews: 128,
    img: "assets/products/topper-memory-foam.jpg",
    short: "Two inches of memory foam that turns a hard old mattress soft again — cheapest upgrade in the house.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 3600 },
        { name: "Queen", sub: "60 × 78 in", add: 6400 },
        { name: "King", sub: "72 × 78 in", add: 9200 },
      ],
    },
    features: [
      "2-inch memory foam layer adds instant plushness",
      "Revives a firm or ageing mattress without replacing it",
      "Quilted bamboo-blend cover with elastic corner straps",
      "Relieves pressure on hips and shoulders",
      "Rolls up for storage and shifting",
    ],
    specs: {
      "Thickness": "2 inches",
      "Fill": "Memory foam",
      "Cover": "Bamboo blend, removable",
      "Fixing": "Elastic corner straps",
      "Warranty": "3 years",
    },
  },
  {
    id: "quilted-fibre-topper",
    name: "Quilted Fibre Topper",
    cat: "protectors",
    price: 6800, was: 0, badge: "", stock: true,
    rating: 4.4, reviews: 97,
    img: "assets/products/topper-quilted.jpg",
    short: "Box-stitched cotton topper with plump fibre fill — light softness at a light price.",
    options: {
      label: "Size",
      list: [
        { name: "Single", sub: "36 × 75 in", add: 0 },
        { name: "Double", sub: "48 × 75 in", add: 1500 },
        { name: "Queen", sub: "60 × 78 in", add: 2700 },
        { name: "King", sub: "72 × 78 in", add: 3900 },
      ],
    },
    features: [
      "Box-stitched pockets keep the fill evenly spread",
      "Breathable cotton shell, cooler than foam toppers",
      "Elastic corner straps hold it firmly in place",
      "Fully machine washable at home",
      "Adds a soft layer without changing firmness much",
    ],
    specs: {
      "Fill weight": "250 GSM",
      "Shell": "100% cotton",
      "Stitch": "Box quilted",
      "Fixing": "Elastic corner straps",
      "Care": "Machine wash cold",
    },
  },
  {
    id: "zippered-pillow-protectors",
    name: "Zippered Pillow Protectors (Pair)",
    cat: "protectors",
    price: 1650, was: 2200, badge: "sale", stock: true,
    rating: 4.6, reviews: 174,
    img: "assets/products/protector-pillow.jpg",
    short: "Two zip-close cotton covers that keep pillows clean, white and allergen-free.",
    options: {
      label: "Size",
      list: [
        { name: "Standard", sub: "20 × 30 in", add: 0 },
        { name: "King", sub: "20 × 36 in", add: 350 },
      ],
    },
    features: [
      "Set of two protectors",
      "Full-length zip seals out dust and mites",
      "Crisp white cotton, breathable and quiet",
      "Doubles the life of a good pillow",
      "Machine washable, colour-fast white",
    ],
    specs: {
      "Quantity": "2 protectors",
      "Material": "100% cotton",
      "Closure": "Full-length zip",
      "Care": "Machine wash warm",
      "Warranty": "1 year",
    },
  },

  /* ================= CUSHIONS & DECOR ================= */
  {
    id: "velvet-cushion-pair",
    name: "Velvet Cushion (Pair)",
    cat: "decor",
    price: 3400, was: 4400, badge: "sale", stock: true,
    rating: 4.7, reviews: 219,
    img: "assets/products/cushion-velvet.jpg",
    short: "Two plush piped velvet cushions in jewel tones — instant richness on any sofa or bed.",
    options: {
      label: "Colour",
      list: [
        { name: "Emerald", sub: "", add: 0 },
        { name: "Ochre", sub: "", add: 0 },
        { name: "Rust", sub: "", add: 0 },
        { name: "Charcoal", sub: "", add: 0 },
      ],
    },
    features: [
      "Set of two filled cushions, ready to use",
      "Dense velvet pile with a soft natural sheen",
      "Crisp piped edges hold a sharp square shape",
      "Hidden zip — covers come off for washing",
      "Deep jewel tones that lift neutral rooms",
    ],
    specs: {
      "Size": "18 × 18 inches",
      "Quantity": "2 cushions",
      "Cover": "Polyester velvet",
      "Fill": "Polyfibre insert included",
      "Care": "Dry clean or gentle hand wash",
    },
  },
  {
    id: "woven-cushion-cover-set",
    name: "Woven Cushion Cover Set of 5",
    cat: "decor",
    price: 4200, was: 5600, badge: "sale", stock: true,
    rating: 4.5, reviews: 165,
    img: "assets/products/cushion-cover-set.jpg",
    short: "Five jacquard covers in cream, rust, olive and charcoal — a whole sofa refresh in one box.",
    options: {
      label: "Size",
      list: [
        { name: "16 × 16 in", sub: "Standard", add: 0 },
        { name: "18 × 18 in", sub: "Large", add: 600 },
        { name: "20 × 20 in", sub: "Extra large", add: 1100 },
      ],
    },
    features: [
      "Five coordinated covers in one set",
      "Woven cotton with subtle geometric jacquard texture",
      "Curated palette: cream, rust, olive, charcoal",
      "Concealed zip closures, neat corners",
      "Covers only — use your existing inserts",
    ],
    specs: {
      "Quantity": "5 covers (no inserts)",
      "Material": "Woven cotton jacquard",
      "Closure": "Concealed zip",
      "Care": "Machine wash cold",
      "Note": "Inserts sold separately",
    },
  },
  {
    id: "linen-bolster-cushion",
    name: "Striped Linen Bolster",
    cat: "decor",
    price: 2900, was: 0, badge: "", stock: true,
    rating: 4.6, reviews: 58,
    img: "assets/products/cushion-bolster.jpg",
    short: "Long cylindrical bolster in ecru striped linen with button ends — for daybeds and headboards.",
    options: {
      label: "Length",
      list: [
        { name: "24 inch", sub: "Standard", add: 0 },
        { name: "32 inch", sub: "Long", add: 900 },
      ],
    },
    features: [
      "Cylindrical bolster with gathered, covered-button ends",
      "Natural ecru linen with fine charcoal stripes",
      "Supports the lower back on daybeds and floor seating",
      "Filled insert included",
      "Removable cover with a side zip",
    ],
    specs: {
      "Diameter": "7 inches",
      "Cover": "Linen blend",
      "Fill": "Polyfibre insert included",
      "Closure": "Side zip",
      "Care": "Dry clean or gentle wash",
    },
  },
  {
    id: "tufted-floor-pouf",
    name: "Tufted Floor Pouf",
    cat: "decor",
    price: 8900, was: 11000, badge: "new", stock: true,
    rating: 4.8, reviews: 71,
    img: "assets/products/floor-cushion.jpg",
    short: "Big round oatmeal pouf with a carry handle — extra seating that also works as a footrest.",
    options: {
      label: "Size",
      list: [
        { name: "Medium", sub: "24 in wide", add: 0 },
        { name: "Large", sub: "30 in wide", add: 2400 },
      ],
    },
    features: [
      "Firm-filled round pouf, sturdy enough to sit on",
      "Textured oatmeal cotton with a central covered button",
      "Woven side handle makes it easy to move",
      "Works as seating, footstool or side table with a tray",
      "Handy overflow seating for guests",
    ],
    specs: {
      "Height": "14 inches",
      "Cover": "Textured cotton",
      "Fill": "High-density foam crumb",
      "Handle": "Woven cotton",
      "Care": "Spot clean",
    },
  },
  {
    id: "high-density-sofa-foam",
    name: "High-Density Sofa Foam",
    cat: "decor",
    price: 5600, was: 0, badge: "", stock: true,
    rating: 4.6, reviews: 112,
    img: "assets/products/sofa-foam.jpg",
    short: "Cut-to-order high-density foam blocks for re-cushioning tired sofas and majlis seating.",
    options: {
      label: "Thickness",
      list: [
        { name: "3 inch", sub: "Back cushions", add: 0 },
        { name: "4 inch", sub: "Seat cushions", add: 1600 },
        { name: "5 inch", sub: "Deep seating", add: 3200 },
      ],
    },
    features: [
      "40-density foam that resists sagging under daily use",
      "Clean square-cut edges for a tailored cushion look",
      "Price is per block up to 24 × 24 inches",
      "Optional upholstery fabric wrapping available",
      "Custom sizes cut free on request over WhatsApp",
    ],
    specs: {
      "Density": "40 kg/m³",
      "Block size": "Up to 24 × 24 inches",
      "Cut": "Square edge, precision cut",
      "Custom sizes": "Yes, on request",
      "Warranty": "2 years on density",
    },
  },
];

/* --------------------------------------------------------------------------
   4) CUSTOMER REVIEWS — homepage par dikhte hain
   -------------------------------------------------------------------------- */
const REVIEWS = [
  {
    quote: "Bought the orthopedic mattress for my father after his back surgery. Three months in and he says he finally sleeps through the night.",
    name: "Ayesha Malik",
    place: "DHA, Lahore",
    stars: 5,
  },
  {
    quote: "Ordered on WhatsApp at 11pm, got a reply in the morning and the delivery came in two days. The cotton sheets are genuinely hotel quality.",
    name: "Bilal Ahmed",
    place: "Clifton, Karachi",
    stars: 5,
  },
  {
    quote: "The memory foam topper saved our old mattress. Same bed, completely different sleep. Wish I had done it years ago.",
    name: "Sana Riaz",
    place: "F-11, Islamabad",
    stars: 5,
  },
];

/* --------------------------------------------------------------------------
   5) FAQ — FAQ page par dikhte hain
   -------------------------------------------------------------------------- */
const FAQS = [
  {
    q: "Delivery mein kitna time lagta hai?",
    a: "Lahore, Karachi and Islamabad orders are dispatched within 24 hours and usually arrive in 2–3 working days. Other cities take 3–5 working days. Custom-size mattresses and cut foam need 4–6 working days to make before dispatch.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes. Cash on delivery is available across Pakistan with no extra fee. You pay the courier when the parcel reaches you. For custom-size orders we ask for a 30% advance so the piece can be made.",
  },
  {
    q: "Shipping charges kitne hain?",
    a: "Flat Rs. 350 nationwide, and completely free on orders above Rs. 10,000. Mattresses in Queen and King size are delivered free within Lahore city limits.",
  },
  {
    q: "Can I return a mattress if it doesn't suit me?",
    a: "Sleep products are returnable within 7 days if unused and still sealed in the original packaging. Once a mattress has been slept on we cannot resell it, so opened mattresses are only exchanged in the case of a manufacturing fault. Pillows, protectors and cut foam are non-returnable for hygiene reasons.",
  },
  {
    q: "Is the warranty real, and what does it cover?",
    a: "Yes. Warranty covers manufacturing defects — sagging beyond 1.5 inches, foam breakdown, broken springs and stitching failure. It does not cover normal softening, stains, burns, water damage or damage from using the mattress without a base. Keep your invoice; that is your warranty proof.",
  },
  {
    q: "Custom size mattress bana sakte hain?",
    a: "Absolutely, this is a large part of what we do. Send us your exact length, width and required thickness on WhatsApp and we will quote you the same day. Bed frames from older houses rarely match standard sizes, so custom is very common.",
  },
  {
    q: "Which mattress should I pick for back pain?",
    a: "Most people with back pain do best on the Orthopedic Support or Medicated Firm mattress — both keep the spine aligned instead of letting the hips sink. If you sleep on your side and still want firm support, the Hybrid Luxe is the better choice. Message us with your weight, sleeping position and complaint and we will recommend honestly.",
  },
  {
    q: "Do you supply to hotels, hostels and offices?",
    a: "Yes, we handle bulk and contract orders with special pricing from 10 pieces upward. Hostels, guest houses, hospitals and offices are regular clients. Contact us for a quotation.",
  },
];
