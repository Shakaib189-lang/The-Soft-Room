/* ==========================================================================
   Eleventh Stitch — site engine
   Header/footer rendering, cart state, filters, PDP, checkout, WhatsApp orders.
   Depends on products.js (STORE, CATEGORIES, PRODUCTS, REVIEWS, FAQS)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- helpers ---------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = (n) => STORE.currency + " " + Math.round(n).toLocaleString("en-PK");
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || slug;
  const stars = (r) => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r));
  const qs = (k) => new URLSearchParams(location.search).get(k);
  const waLink = (msg) => "https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(msg);

  /* ---------------- icons ---------------- */
  const I = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.6 12.1h11.4L21 7H6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="1.9"/><circle cx="17.5" cy="18.5" r="1.9"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3.5v6c0 5-3.4 9.3-8 10.5-4.6-1.2-8-5.5-8-10.5v-6z"/><path d="M9 12l2 2 4-4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 019.8 6.1C15 5 17 4 19 2c1 2 2 4.2 2 8a7 7 0 01-10 10z"/><path d="M2 21c0-3 1.9-5.7 5-7"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4L13.4 20.6a2 2 0 01-2.8 0l-7.2-7.2A2 2 0 012.8 12V4a1.2 1.2 0 011.2-1.2H12a2 2 0 011.4.6l7.2 7.2a2 2 0 010 2.8z"/><circle cx="7.2" cy="7.2" r="1.2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.3-.1-.5l-.9-2c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 3 1.3 3.2c.1.2 2.1 3.4 5.2 4.6 2.6 1 3.1.8 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5 0-.1-.2-.2-.4-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 013.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z"/></svg>',
    tk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3v13.2a2.4 2.4 0 11-2.4-2.4c.3 0 .5 0 .8.1V9.8a5.6 5.6 0 103.9 5.4V8.5c1 .8 2.3 1.3 3.7 1.3V6.6c-1.7 0-3-1.2-3-2.9V2z"/></svg>',
  };

  /* ---------------- cart storage ---------------- */
  const KEY = "es_cart_v1";
  const COUPON_KEY = "es_coupon_v1";

  function readCart() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v.filter((i) => i && i.id && byId(i.id)) : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(c) {
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* ignore */ }
    paintCount();
  }

  const cartQty = () => readCart().reduce((s, i) => s + i.qty, 0);

  function lineTotal(item) {
    const p = byId(item.id);
    if (!p) return 0;
    const opt = p.options ? p.options.list.find((o) => o.name === item.opt) : null;
    return (p.price + (opt ? opt.add : 0)) * item.qty;
  }

  function unitPrice(item) {
    const p = byId(item.id);
    if (!p) return 0;
    const opt = p.options ? p.options.list.find((o) => o.name === item.opt) : null;
    return p.price + (opt ? opt.add : 0);
  }

  function addToCart(id, opt, qty) {
    const cart = readCart();
    const hit = cart.find((i) => i.id === id && i.opt === opt);
    if (hit) hit.qty = Math.min(99, hit.qty + qty);
    else cart.push({ id: id, opt: opt, qty: qty });
    writeCart(cart);
  }

  function totals() {
    const cart = readCart();
    const sub = cart.reduce((s, i) => s + lineTotal(i), 0);
    const code = getCoupon();
    let disc = 0;
    if (code && STORE.coupons[code] && sub >= STORE.coupons[code].min) {
      disc = Math.round((sub * STORE.coupons[code].off) / 100);
    }
    const after = sub - disc;
    const ship = cart.length === 0 || after >= STORE.freeShipOver ? 0 : STORE.shipFlat;
    return { sub: sub, disc: disc, code: code, ship: ship, total: after + ship, count: cartQty() };
  }

  function getCoupon() {
    try { return localStorage.getItem(COUPON_KEY) || ""; } catch (e) { return ""; }
  }

  function setCoupon(c) {
    try {
      if (c) localStorage.setItem(COUPON_KEY, c);
      else localStorage.removeItem(COUPON_KEY);
    } catch (e) { /* ignore */ }
  }

  /* ---------------- toast ---------------- */
  function toast(msg) {
    let wrap = $(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = I.check + "<span>" + esc(msg) + "</span>";
    wrap.appendChild(t);
    setTimeout(() => {
      t.classList.add("out");
      setTimeout(() => t.remove(), 400);
    }, 2600);
  }

  function paintCount() {
    const n = cartQty();
    $$(".cart-count").forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
      el.classList.remove("pop");
      void el.offsetWidth;
      if (n) el.classList.add("pop");
    });
  }

  /* ---------------- chrome (header / footer) ---------------- */
  const NAV = [
    { href: "index.html", label: "Home" },
    { href: "shop.html", label: "Shop" },
    { href: "about.html", label: "About" },
    { href: "faq.html", label: "FAQ" },
    { href: "contact.html", label: "Contact" },
  ];

  function here() {
    const f = location.pathname.split("/").pop();
    return !f || f === "" ? "index.html" : f;
  }

  function buildHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const cur = here();
    const links = NAV.map(
      (n) =>
        '<a href="' + n.href + '"' + (n.href === cur ? ' aria-current="page"' : "") + ">" + n.label + "</a>"
    ).join("");

    mount.innerHTML =
      '<div class="announce">Free delivery on orders over <b>' + money(STORE.freeShipOver) +
      '</b> &nbsp;·&nbsp; Cash on delivery all over Pakistan</div>' +
      '<header class="hdr"><div class="wrap hdr__in">' +
        '<a class="logo" href="index.html" aria-label="' + esc(STORE.name) + ' home">' +
          '<span class="logo__mark">11</span>' +
          '<span class="logo__txt"><span class="logo__name">' + esc(STORE.name) + '</span>' +
          '<span class="logo__sub">' + esc(STORE.tagline) + "</span></span></a>" +
        '<nav class="nav">' + links + "</nav>" +
        '<div class="hdr__acts">' +
          '<a class="icon-btn" href="shop.html" aria-label="Search products">' + I.search + "</a>" +
          '<a class="icon-btn" href="cart.html" aria-label="View cart">' + I.cart +
            '<span class="cart-count" hidden>0</span></a>' +
          '<button class="icon-btn burger" id="burger" aria-label="Open menu">' + I.menu + "</button>" +
        "</div></div></header>" +
      '<div class="scrim" id="scrim"></div>' +
      '<aside class="mnav" id="mnav" aria-label="Mobile menu">' +
        '<div class="mnav__top"><button class="icon-btn" id="mclose" aria-label="Close menu">' + I.close + "</button></div>" +
        "<ul>" + NAV.map((n) => "<li><a href=" + n.href + ">" + n.label + "</a></li>").join("") +
        '<li><a href="cart.html">Cart</a></li></ul>' +
        '<a class="btn btn--wa btn--block" style="margin-top:1.5rem" href="' +
          waLink("Assalam o Alaikum! I have a question about your products.") +
          '" target="_blank" rel="noopener">' + I.wa + " Chat on WhatsApp</a>" +
      "</aside>";

    const mnav = $("#mnav");
    const scrim = $("#scrim");
    const open = () => { mnav.classList.add("open"); scrim.classList.add("show"); };
    const shut = () => { mnav.classList.remove("open"); scrim.classList.remove("show"); };
    $("#burger").addEventListener("click", open);
    $("#mclose").addEventListener("click", shut);
    scrim.addEventListener("click", shut);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") shut(); });
    paintCount();
  }

  function buildFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    const catLinks = CATEGORIES.map(
      (c) => '<li><a href="shop.html?cat=' + c.slug + '">' + esc(c.name) + "</a></li>"
    ).join("");

    mount.innerHTML =
      '<footer class="ftr"><div class="wrap">' +
        '<div class="ftr__grid">' +
          "<div><a class='logo' href='index.html'><span class='logo__mark'>11</span>" +
            "<span class='logo__txt'><span class='logo__name'>" + esc(STORE.name) + "</span>" +
            "<span class='logo__sub'>" + esc(STORE.tagline) + "</span></span></a>" +
            "<p>Mattresses, pillows and bedding made properly — honest materials, real warranties and a straight answer when you ask which one to buy.</p>" +
            '<div class="socials">' +
              '<a href="' + STORE.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + "</a>" +
              '<a href="' + STORE.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + I.fb + "</a>" +
              '<a href="' + STORE.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">' + I.tk + "</a>" +
              '<a href="' + waLink("Assalam o Alaikum!") + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + I.wa + "</a>" +
            "</div></div>" +
          "<div><h4>Shop</h4><ul>" + catLinks + '<li><a href="shop.html">All products</a></li></ul></div>' +
          '<div><h4>Company</h4><ul>' +
            '<li><a href="about.html">About us</a></li>' +
            '<li><a href="faq.html">FAQ</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
            '<li><a href="shipping.html">Shipping &amp; returns</a></li>' +
            '<li><a href="privacy.html">Privacy policy</a></li>' +
          "</ul></div>" +
          "<div><h4>Get sleep tips &amp; offers</h4>" +
            "<p style='margin-top:0'>Join our list for new arrivals and seasonal sales. No spam, ever.</p>" +
            '<form class="sub" id="subForm"><input type="email" placeholder="Your email address" required aria-label="Email address">' +
            '<button class="btn btn--clay btn--sm" type="submit">Join</button></form>' +
            "<ul style='margin-top:1.4rem'>" +
              "<li><a href='tel:" + esc(STORE.phone.replace(/\s/g, "")) + "'>" + esc(STORE.phone) + "</a></li>" +
              "<li><a href='mailto:" + esc(STORE.email) + "'>" + esc(STORE.email) + "</a></li>" +
            "</ul></div>" +
        "</div>" +
        '<div class="ftr__base">' +
          "<span>© " + new Date().getFullYear() + " " + esc(STORE.name) + ". All rights reserved.</span>" +
          '<div class="pay-icons"><span>Cash on delivery</span><span>Bank transfer</span><span>JazzCash</span><span>Easypaisa</span></div>' +
        "</div></div></footer>" +
      '<a class="wa-float" href="' + waLink("Assalam o Alaikum! I want to ask about a product.") +
        '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + I.wa + "</a>";

    const sf = $("#subForm");
    if (sf) {
      sf.addEventListener("submit", (e) => {
        e.preventDefault();
        toast("Thanks for subscribing!");
        sf.reset();
      });
    }
  }

  /* ---------------- product card ---------------- */
  function cardHTML(p) {
    const url = "product.html?id=" + encodeURIComponent(p.id);
    const save = p.was > p.price ? Math.round(((p.was - p.price) / p.was) * 100) : 0;
    let tags = "";
    if (!p.stock) tags += '<span class="tag tag--out">Sold out</span>';
    else if (p.badge === "sale" && save) tags += '<span class="tag tag--sale">' + save + "% off</span>";
    else if (p.badge === "new") tags += '<span class="tag tag--new">New</span>';

    return (
      '<article class="card">' +
        '<a class="card__media" href="' + url + '" aria-label="' + esc(p.name) + '">' +
          '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" width="900" height="900">' +
          (tags ? '<div class="card__tags">' + tags + "</div>" : "") +
        "</a>" +
        '<div class="card__quick"><a class="btn btn--primary btn--sm btn--block" href="' + url + '">View details</a></div>' +
        '<div class="card__body">' +
          '<span class="card__cat">' + esc(catName(p.cat)) + "</span>" +
          '<a class="card__name" href="' + url + '">' + esc(p.name) + "</a>" +
          '<div class="stars"><b>' + stars(p.rating) + "</b><span>" + p.rating.toFixed(1) + " (" + p.reviews + ")</span></div>" +
          '<div class="card__price"><span class="price">' + money(p.price) + "</span>" +
            (p.was > p.price ? '<span class="price--old">' + money(p.was) + "</span>" : "") +
            (save ? '<span class="price--save">Save ' + save + "%</span>" : "") +
          "</div>" +
        "</div></article>"
    );
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
    const els = $$(".rv");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- accordion ---------------- */
  function initAcc(root) {
    $$(".acc__btn", root || document).forEach((b) => {
      b.addEventListener("click", () => {
        const item = b.closest(".acc__item");
        const open = item.classList.contains("on");
        const group = item.parentElement;
        if (group.dataset.single !== "false") {
          $$(".acc__item", group).forEach((i) => i.classList.remove("on"));
        }
        if (!open) item.classList.add("on");
        b.setAttribute("aria-expanded", String(!open));
      });
    });
  }

  /* ================= PAGE: HOME ================= */
  function pageHome() {
    const cm = $("#homeCats");
    if (cm) {
      cm.innerHTML = CATEGORIES.map(
        (c, i) =>
          '<a class="cat rv rv-d' + ((i % 4) + 1) + '" href="shop.html?cat=' + c.slug + '">' +
            '<img src="' + c.img + '" alt="' + esc(c.name) + '" loading="lazy">' +
            '<div class="cat__txt"><h3>' + esc(c.name) + "</h3><span>" + esc(c.blurb) + " →</span></div></a>"
      ).join("");
    }

    const bs = $("#bestSellers");
    if (bs) {
      const picks = PRODUCTS.slice()
        .sort((a, b) => b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1))
        .slice(0, 8);
      bs.innerHTML = picks.map((p, i) => '<div class="rv rv-d' + ((i % 4) + 1) + '">' + cardHTML(p) + "</div>").join("");
    }

    const sale = $("#onSale");
    if (sale) {
      const picks = PRODUCTS.filter((p) => p.was > p.price).slice(0, 4);
      sale.innerHTML = picks.map((p, i) => '<div class="rv rv-d' + ((i % 4) + 1) + '">' + cardHTML(p) + "</div>").join("");
    }

    const rv = $("#homeReviews");
    if (rv) {
      rv.innerHTML = REVIEWS.map(
        (r, i) =>
          '<article class="rev rv rv-d' + (i + 1) + '">' +
            '<div class="stars"><b>' + stars(r.stars) + "</b></div>" +
            '<p class="rev__q">“' + esc(r.quote) + '”</p>' +
            '<div class="rev__who"><span class="rev__av">' + esc(r.name.charAt(0)) + "</span>" +
            "<div><b>" + esc(r.name) + "</b><span>" + esc(r.place) + "</span></div></div></article>"
      ).join("");
    }
  }

  /* ================= PAGE: SHOP ================= */
  function pageShop() {
    const grid = $("#shopGrid");
    if (!grid) return;

    const state = {
      cats: qs("cat") ? [qs("cat")] : [],
      q: qs("q") || "",
      max: 0,
      sort: "featured",
      badge: [],
    };

    /* build filter UI */
    const fCats = $("#fCats");
    if (fCats) {
      fCats.innerHTML = CATEGORIES.map((c) => {
        const n = PRODUCTS.filter((p) => p.cat === c.slug).length;
        const on = state.cats.indexOf(c.slug) > -1;
        return (
          '<label class="fopt"><input type="checkbox" value="' + c.slug + '"' + (on ? " checked" : "") + ">" +
          "<span>" + esc(c.name) + '</span><span class="n">' + n + "</span></label>"
        );
      }).join("");
    }

    const sInput = $("#fSearch");
    if (sInput) sInput.value = state.q;

    function collect() {
      state.cats = $$("#fCats input:checked").map((i) => i.value);
      state.badge = $$("#fBadge input:checked").map((i) => i.value);
      state.q = sInput ? sInput.value.trim() : "";
      const pr = $("#fPrice");
      state.max = pr ? Number(pr.value) : 0;
      const so = $("#fSort");
      state.sort = so ? so.value : "featured";
    }

    function render() {
      let list = PRODUCTS.slice();

      if (state.cats.length) list = list.filter((p) => state.cats.indexOf(p.cat) > -1);
      if (state.max) list = list.filter((p) => p.price <= state.max);

      if (state.badge.length) {
        list = list.filter((p) => {
          return state.badge.every((b) => {
            if (b === "sale") return p.was > p.price;
            if (b === "new") return p.badge === "new";
            if (b === "stock") return p.stock;
            return true;
          });
        });
      }

      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().indexOf(q) > -1 ||
            p.short.toLowerCase().indexOf(q) > -1 ||
            catName(p.cat).toLowerCase().indexOf(q) > -1
        );
      }

      if (state.sort === "low") list.sort((a, b) => a.price - b.price);
      else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
      else if (state.sort === "rated") list.sort((a, b) => b.rating - a.rating);
      else if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

      const cnt = $("#shopCount");
      if (cnt) cnt.innerHTML = "<b>" + list.length + "</b> product" + (list.length === 1 ? "" : "s");

      grid.innerHTML = list.length
        ? list.map((p) => cardHTML(p)).join("")
        : '<div class="empty" style="grid-column:1/-1"><h3>Nothing matched that</h3>' +
          "<p>Try removing a filter or searching a different word.</p>" +
          '<button class="btn btn--ghost" id="clearAll">Clear all filters</button></div>';

      const ca = $("#clearAll");
      if (ca) ca.addEventListener("click", reset);

      const title = $("#shopTitle");
      if (title && state.cats.length === 1) title.textContent = catName(state.cats[0]);
    }

    function reset() {
      $$("#fCats input, #fBadge input").forEach((i) => (i.checked = false));
      if (sInput) sInput.value = "";
      const pr = $("#fPrice");
      if (pr) {
        pr.value = pr.max;
        const lbl = $("#fPriceVal");
        if (lbl) lbl.textContent = "Any";
      }
      const so = $("#fSort");
      if (so) so.value = "featured";
      collect();
      render();
    }

    $$("#fCats input, #fBadge input").forEach((i) =>
      i.addEventListener("change", () => { collect(); render(); })
    );

    const so = $("#fSort");
    if (so) so.addEventListener("change", () => { collect(); render(); });

    if (sInput) {
      let t;
      sInput.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => { collect(); render(); }, 220);
      });
    }

    const pr = $("#fPrice");
    if (pr) {
      const maxP = Math.max.apply(null, PRODUCTS.map((p) => p.price));
      pr.max = Math.ceil(maxP / 5000) * 5000;
      pr.value = pr.max;
      pr.addEventListener("input", () => {
        const lbl = $("#fPriceVal");
        if (lbl) lbl.textContent = Number(pr.value) >= Number(pr.max) ? "Any" : "Up to " + money(pr.value);
        collect();
        render();
      });
    }

    const cr = $("#clearFilters");
    if (cr) cr.addEventListener("click", reset);

    const ft = $("#filterToggle");
    if (ft) {
      ft.addEventListener("click", () => {
        const f = $("#filters");
        f.classList.toggle("open");
        ft.textContent = f.classList.contains("open") ? "Hide filters" : "Show filters";
      });
    }

    collect();
    render();
  }

  /* ================= PAGE: PRODUCT ================= */
  function pageProduct() {
    const root = $("#pdp");
    if (!root) return;

    const p = byId(qs("id")) || PRODUCTS[0];
    document.title = p.name + " — " + STORE.name;

    const sel = { opt: p.options ? p.options.list[0].name : "", qty: 1 };
    const save = p.was > p.price ? Math.round(((p.was - p.price) / p.was) * 100) : 0;

    const crumb = $("#crumb");
    if (crumb) {
      crumb.innerHTML =
        '<a href="index.html">Home</a><span>/</span><a href="shop.html?cat=' + p.cat + '">' +
        esc(catName(p.cat)) + "</a><span>/</span>" + esc(p.name);
    }

    function curPrice() {
      const o = p.options ? p.options.list.find((x) => x.name === sel.opt) : null;
      return p.price + (o ? o.add : 0);
    }

    function paintPrice() {
      const el = $("#pdpPrice");
      const base = curPrice();
      const oldP = p.was > p.price ? p.was + (base - p.price) : 0;
      el.innerHTML =
        '<span class="price">' + money(base) + "</span>" +
        (oldP ? '<span class="price--old">' + money(oldP) + "</span>" : "") +
        (save ? '<span class="price--save">Save ' + save + "%</span>" : "");
    }

    /* media */
    $("#pdpMedia").innerHTML =
      '<div class="pdp__main"><img id="pdpImg" src="' + p.img + '" alt="' + esc(p.name) + '" width="900" height="900"></div>';

    /* info */
    const optHTML = p.options
      ? '<div><span class="opt-lbl">' + esc(p.options.label) + '</span><div class="opt-row" id="optRow">' +
        p.options.list
          .map(
            (o, i) =>
              '<button class="chip' + (i === 0 ? " on" : "") + '" data-opt="' + esc(o.name) + '">' +
              esc(o.name) + (o.sub ? "<small>" + esc(o.sub) + "</small>" : "") + "</button>"
          )
          .join("") +
        "</div></div>"
      : "";

    $("#pdpInfo").innerHTML =
      '<span class="card__cat">' + esc(catName(p.cat)) + "</span>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<div class="stars"><b>' + stars(p.rating) + "</b><span>" + p.rating.toFixed(1) +
        " · " + p.reviews + " reviews</span></div>" +
      '<div class="pdp__price" id="pdpPrice"></div>' +
      '<p class="lead">' + esc(p.short) + "</p>" +
      optHTML +
      '<div><span class="opt-lbl">Quantity</span><div class="qty">' +
        '<button id="qMinus" aria-label="Decrease quantity">−</button>' +
        '<input id="qVal" type="number" value="1" min="1" max="99" aria-label="Quantity">' +
        '<button id="qPlus" aria-label="Increase quantity">+</button></div></div>' +
      '<div class="pdp__buy">' +
        (p.stock
          ? '<button class="btn btn--primary" id="addBtn">Add to cart</button>' +
            '<a class="btn btn--wa" id="waBtn" target="_blank" rel="noopener">Order on WhatsApp</a>'
          : '<button class="btn btn--primary" disabled>Sold out</button>' +
            '<a class="btn btn--ghost" id="waBtn" target="_blank" rel="noopener">Ask when back in stock</a>') +
      "</div>" +
      '<ul class="trust">' +
        "<li>" + I.truck + "<span><b>Free delivery</b> on orders over " + money(STORE.freeShipOver) + " · flat " + money(STORE.shipFlat) + " otherwise</span></li>" +
        "<li>" + I.shield + "<span><b>" + esc(p.specs.Warranty || "Quality guaranteed") + "</b> against manufacturing defects</span></li>" +
        "<li>" + I.tag + "<span><b>Cash on delivery</b> available nationwide</span></li>" +
      "</ul>";

    paintPrice();

    /* accordion details */
    $("#pdpAcc").innerHTML =
      '<div class="acc__item on"><button class="acc__btn" aria-expanded="true">Features <i>+</i></button>' +
        '<div class="acc__panel"><div class="acc__inner"><ul>' +
          p.features.map((f) => "<li>" + esc(f) + "</li>").join("") +
        "</ul></div></div></div>" +
      '<div class="acc__item"><button class="acc__btn" aria-expanded="false">Specifications <i>+</i></button>' +
        '<div class="acc__panel"><div class="acc__inner"><dl class="spec">' +
          Object.keys(p.specs).map((k) => "<div><dt>" + esc(k) + "</dt><dd>" + esc(p.specs[k]) + "</dd></div>").join("") +
        "</dl></div></div></div>" +
      '<div class="acc__item"><button class="acc__btn" aria-expanded="false">Delivery &amp; returns <i>+</i></button>' +
        '<div class="acc__panel"><div class="acc__inner"><ul>' +
          "<li>Dispatched within 24 hours; 2–3 working days to major cities, 3–5 elsewhere</li>" +
          "<li>Flat " + money(STORE.shipFlat) + " shipping, free above " + money(STORE.freeShipOver) + "</li>" +
          "<li>Cash on delivery available across Pakistan</li>" +
          "<li>7-day return on unused, sealed items — see our <a href='shipping.html'>returns policy</a></li>" +
          "<li>Custom sizes made to order in 4–6 working days</li>" +
        "</ul></div></div></div>";

    initAcc();

    /* option chips */
    $$("#optRow .chip").forEach((c) =>
      c.addEventListener("click", () => {
        $$("#optRow .chip").forEach((x) => x.classList.remove("on"));
        c.classList.add("on");
        sel.opt = c.dataset.opt;
        paintPrice();
        paintWA();
      })
    );

    /* qty */
    const qv = $("#qVal");
    const setQ = (n) => {
      sel.qty = Math.max(1, Math.min(99, n || 1));
      qv.value = sel.qty;
      paintWA();
    };
    $("#qMinus").addEventListener("click", () => setQ(sel.qty - 1));
    $("#qPlus").addEventListener("click", () => setQ(sel.qty + 1));
    qv.addEventListener("change", () => setQ(parseInt(qv.value, 10)));

    /* whatsapp direct order */
    function paintWA() {
      const b = $("#waBtn");
      if (!b) return;
      const msg =
        "Assalam o Alaikum! I want to order:\n\n" +
        "*" + p.name + "*\n" +
        (sel.opt ? p.options.label + ": " + sel.opt + "\n" : "") +
        "Quantity: " + sel.qty + "\n" +
        "Price: " + money(curPrice() * sel.qty) + "\n\n" +
        "Please confirm availability and delivery time.";
      b.href = waLink(msg);
    }
    paintWA();

    /* add to cart */
    const ab = $("#addBtn");
    if (ab) {
      ab.addEventListener("click", () => {
        addToCart(p.id, sel.opt, sel.qty);
        toast(p.name + " added to cart");
      });
    }

    /* related */
    const rel = $("#related");
    if (rel) {
      let list = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id);
      if (list.length < 4) {
        list = list.concat(PRODUCTS.filter((x) => x.cat !== p.cat && x.id !== p.id)).slice(0, 4);
      } else {
        list = list.slice(0, 4);
      }
      rel.innerHTML = list.map((x) => cardHTML(x)).join("");
    }
  }

  /* ================= PAGE: CART ================= */
  function pageCart() {
    const wrap = $("#cartWrap");
    if (!wrap) return;

    function render() {
      const cart = readCart();

      if (!cart.length) {
        wrap.innerHTML =
          '<div class="empty"><h3>Your cart is empty</h3>' +
          "<p>Browse our mattresses, pillows and bedding to get started.</p>" +
          '<a class="btn btn--primary" href="shop.html">Start shopping</a></div>';
        return;
      }

      const t = totals();

      const items = cart
        .map((i, idx) => {
          const p = byId(i.id);
          return (
            '<div class="citem">' +
              '<a class="citem__img" href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt="' + esc(p.name) + '"></a>' +
              "<div><a class='citem__name' href='product.html?id=" + p.id + "'>" + esc(p.name) + "</a>" +
                (i.opt ? '<div class="citem__opt">' + esc(p.options.label) + ": " + esc(i.opt) + "</div>" : "") +
                '<div class="citem__opt">' + money(unitPrice(i)) + " each</div>" +
                '<div class="citem__ctrl"><div class="qty">' +
                  '<button data-act="dec" data-i="' + idx + '" aria-label="Decrease">−</button>' +
                  '<input type="number" value="' + i.qty + '" min="1" max="99" data-act="set" data-i="' + idx + '" aria-label="Quantity">' +
                  '<button data-act="inc" data-i="' + idx + '" aria-label="Increase">+</button>' +
                "</div>" +
                '<button class="rm" data-act="rm" data-i="' + idx + '">Remove</button></div></div>' +
              '<div class="citem__right"><span class="price">' + money(lineTotal(i)) + "</span></div>" +
            "</div>"
          );
        })
        .join("");

      const away = STORE.freeShipOver - (t.sub - t.disc);

      wrap.innerHTML =
        '<div class="cart-layout"><div>' + items +
          "<div style='margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap'>" +
            '<a class="btn btn--ghost btn--sm" href="shop.html">Continue shopping</a>' +
            '<button class="btn btn--ghost btn--sm" id="clearCart">Clear cart</button>' +
          "</div></div>" +
          '<aside class="summary"><h3>Order summary</h3>' +
            '<div class="srow"><span>Subtotal (' + t.count + " items)</span><b>" + money(t.sub) + "</b></div>" +
            (t.disc ? '<div class="srow"><span>Discount (' + esc(t.code) + ')</span><b style="color:var(--clay)">− ' + money(t.disc) + "</b></div>" : "") +
            '<div class="srow"><span>Shipping</span>' +
              (t.ship ? "<b>" + money(t.ship) + "</b>" : '<b class="free">Free</b>') + "</div>" +
            (away > 0
              ? '<div class="ship-note">' + I.truck + "<span>Add <b>" + money(away) + "</b> more to get free delivery.</span></div>"
              : '<div class="ship-note">' + I.check + "<span>You have unlocked <b>free delivery</b>.</span></div>") +
            '<div class="coupon"><input type="text" id="couponIn" placeholder="Coupon code" value="' + esc(t.code) + '" aria-label="Coupon code">' +
              '<button class="btn btn--ghost btn--sm" id="applyCoupon">Apply</button></div>' +
            '<div class="srow srow--total"><span>Total</span><b>' + money(t.total) + "</b></div>" +
            '<a class="btn btn--primary btn--block" style="margin-top:1.2rem" href="checkout.html">Proceed to checkout</a>' +
            '<a class="btn btn--wa btn--block" style="margin-top:.6rem" id="waCart" target="_blank" rel="noopener">' + I.wa + " Order on WhatsApp</a>" +
            "<p style='font-size:.76rem;color:var(--ink-3);margin-top:1rem;text-align:center'>Cash on delivery available · 7-day returns on unused items</p>" +
          "</aside></div>";

      /* whatsapp full-cart message */
      const wa = $("#waCart");
      if (wa) {
        let msg = "Assalam o Alaikum! I want to place this order:\n\n";
        cart.forEach((i, n) => {
          const p = byId(i.id);
          msg += n + 1 + ". *" + p.name + "*\n";
          if (i.opt) msg += "   " + p.options.label + ": " + i.opt + "\n";
          msg += "   Qty: " + i.qty + " × " + money(unitPrice(i)) + " = " + money(lineTotal(i)) + "\n\n";
        });
        msg += "Subtotal: " + money(t.sub) + "\n";
        if (t.disc) msg += "Discount (" + t.code + "): -" + money(t.disc) + "\n";
        msg += "Shipping: " + (t.ship ? money(t.ship) : "Free") + "\n";
        msg += "*Total: " + money(t.total) + "*\n\nPlease confirm my order.";
        wa.href = waLink(msg);
      }

      /* item controls */
      $$("[data-act]", wrap).forEach((el) => {
        const act = el.dataset.act;
        const idx = Number(el.dataset.i);
        const ev = act === "set" ? "change" : "click";
        el.addEventListener(ev, () => {
          const c = readCart();
          if (!c[idx]) return;
          if (act === "inc") c[idx].qty = Math.min(99, c[idx].qty + 1);
          if (act === "dec") c[idx].qty = Math.max(1, c[idx].qty - 1);
          if (act === "set") c[idx].qty = Math.max(1, Math.min(99, parseInt(el.value, 10) || 1));
          if (act === "rm") c.splice(idx, 1);
          writeCart(c);
          render();
        });
      });

      $("#clearCart").addEventListener("click", () => {
        writeCart([]);
        setCoupon("");
        render();
        toast("Cart cleared");
      });

      $("#applyCoupon").addEventListener("click", () => {
        const code = $("#couponIn").value.trim().toUpperCase();
        if (!code) {
          setCoupon("");
          render();
          return;
        }
        const c = STORE.coupons[code];
        if (!c) {
          toast("That coupon code is not valid");
          return;
        }
        if (totals().sub < c.min) {
          toast("Coupon needs a minimum order of " + money(c.min));
          return;
        }
        setCoupon(code);
        render();
        toast(c.off + "% discount applied");
      });
    }

    render();
  }

  /* ================= PAGE: CHECKOUT ================= */
  function pageCheckout() {
    const form = $("#coForm");
    if (!form) return;

    const cart = readCart();
    if (!cart.length) {
      $("#coRoot").innerHTML =
        '<div class="empty"><h3>Your cart is empty</h3><p>Add something before checking out.</p>' +
        '<a class="btn btn--primary" href="shop.html">Go to shop</a></div>';
      return;
    }

    /* order summary panel */
    function paintSummary() {
      const t = totals();
      const items = readCart()
        .map((i) => {
          const p = byId(i.id);
          return (
            '<div class="mini-item"><div class="mini-item__img"><img src="' + p.img + '" alt="' + esc(p.name) + '"></div>' +
            "<div><b>" + esc(p.name) + "</b><span>" + (i.opt ? esc(i.opt) + " · " : "") + "Qty " + i.qty + "</span></div>" +
            '<span class="mini-item__price">' + money(lineTotal(i)) + "</span></div>"
          );
        })
        .join("");

      $("#coSummary").innerHTML =
        "<h3>Your order</h3>" + items +
        '<div class="srow" style="margin-top:.8rem"><span>Subtotal</span><b>' + money(t.sub) + "</b></div>" +
        (t.disc ? '<div class="srow"><span>Discount (' + esc(t.code) + ')</span><b style="color:var(--clay)">− ' + money(t.disc) + "</b></div>" : "") +
        '<div class="srow"><span>Shipping</span>' + (t.ship ? "<b>" + money(t.ship) + "</b>" : '<b class="free">Free</b>') + "</div>" +
        '<div class="srow srow--total"><span>Total payable</span><b>' + money(t.total) + "</b></div>" +
        "<p style='font-size:.78rem;color:var(--ink-3);margin-top:.9rem'>You will get a confirmation on WhatsApp within a few hours of placing this order.</p>";
    }
    paintSummary();

    /* payment method toggle */
    $$(".pay__opt").forEach((o) => {
      o.addEventListener("click", () => {
        $$(".pay__opt").forEach((x) => x.classList.remove("on"));
        o.classList.add("on");
        const r = $("input", o);
        if (r) r.checked = true;
        const bank = $("#bankBox");
        if (bank) bank.classList.toggle("show", r && r.value === "bank");
      });
    });
    const firstPay = $(".pay__opt");
    if (firstPay) firstPay.classList.add("on");

    /* validation */
    function invalid(el, on) {
      el.classList.toggle("invalid", on);
      const e = el.parentElement.querySelector(".err");
      if (e) e.classList.toggle("show", on);
    }

    function validate() {
      let ok = true;
      $$("[data-req]", form).forEach((el) => {
        const v = el.value.trim();
        let bad = !v;
        if (!bad && el.type === "tel") bad = v.replace(/\D/g, "").length < 10;
        if (!bad && el.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        if (!bad && el.dataset.req === "long") bad = v.length < 12;
        invalid(el, bad);
        if (bad && ok) {
          el.focus();
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (bad) ok = false;
      });
      return ok;
    }

    $$("[data-req]", form).forEach((el) =>
      el.addEventListener("input", () => {
        if (el.classList.contains("invalid")) invalid(el, false);
      })
    );

    /* build order text */
    function orderText() {
      const g = (n) => {
        const el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : "";
      };
      const pay = (form.querySelector('input[name="pay"]:checked') || {}).value || "cod";
      const payLabel = { cod: "Cash on Delivery", bank: "Bank / JazzCash transfer", wa: "Discuss on WhatsApp" }[pay];
      const t = totals();
      const ref = "ES" + Date.now().toString().slice(-6);

      let msg = "*NEW ORDER — " + STORE.name + "*\nRef: " + ref + "\n\n*ITEMS*\n";
      readCart().forEach((i, n) => {
        const p = byId(i.id);
        msg += n + 1 + ". " + p.name + "\n";
        if (i.opt) msg += "   " + p.options.label + ": " + i.opt + "\n";
        msg += "   Qty " + i.qty + " × " + money(unitPrice(i)) + " = " + money(lineTotal(i)) + "\n";
      });
      msg += "\nSubtotal: " + money(t.sub) + "\n";
      if (t.disc) msg += "Discount (" + t.code + "): -" + money(t.disc) + "\n";
      msg += "Shipping: " + (t.ship ? money(t.ship) : "Free") + "\n";
      msg += "*TOTAL: " + money(t.total) + "*\n\n";
      msg += "*CUSTOMER*\n" + g("name") + "\n" + g("phone") + "\n";
      if (g("email")) msg += g("email") + "\n";
      msg += "\n*DELIVERY ADDRESS*\n" + g("address") + "\n" + g("city") + (g("postal") ? " " + g("postal") : "") + "\n";
      if (g("notes")) msg += "\n*NOTES*\n" + g("notes") + "\n";
      msg += "\n*PAYMENT*\n" + payLabel;
      return { msg: msg, ref: ref, pay: pay, name: g("name") };
    }

    /* submit */
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) {
        toast("Please fill the highlighted fields");
        return;
      }
      const o = orderText();
      try {
        sessionStorage.setItem(
          "es_last_order",
          JSON.stringify({ ref: o.ref, total: totals().total, name: o.name, pay: o.pay })
        );
      } catch (err) { /* ignore */ }

      window.open(waLink(o.msg), "_blank");
      writeCart([]);
      setCoupon("");
      location.href = "thankyou.html?ref=" + o.ref;
    });

    /* prefill bank details */
    const bd = $("#bankDetails");
    if (bd) {
      const b = STORE.bank;
      bd.innerHTML =
        "<dl><div><dt>Bank</dt><dd>" + esc(b.bankName) + "</dd></div>" +
        "<div><dt>Title</dt><dd>" + esc(b.title) + "</dd></div>" +
        "<div><dt>Account</dt><dd>" + esc(b.account) + "</dd></div>" +
        "<div><dt>IBAN</dt><dd>" + esc(b.iban) + "</dd></div>" +
        "<div><dt>JazzCash</dt><dd>" + esc(b.jazzcash) + "</dd></div>" +
        "<div><dt>Easypaisa</dt><dd>" + esc(b.easypaisa) + "</dd></div></dl>" +
        "<p style='margin-top:.7rem'>Send the screenshot of your transfer to <b>" + esc(STORE.phone) +
        "</b> on WhatsApp and we will dispatch the same day.</p>";
    }
  }

  /* ================= PAGE: THANK YOU ================= */
  function pageThanks() {
    const el = $("#thanksBody");
    if (!el) return;
    let data = null;
    try { data = JSON.parse(sessionStorage.getItem("es_last_order")); } catch (e) { /* ignore */ }
    const ref = qs("ref") || (data && data.ref) || "—";

    el.innerHTML =
      '<div style="width:64px;height:64px;border-radius:50%;background:var(--sage);color:#fff;display:grid;place-items:center;margin:0 auto 1.5rem">' +
        '<span style="width:30px;height:30px;display:block">' + I.check + "</span></div>" +
      "<h1>Order placed" + (data && data.name ? ", " + esc(data.name.split(" ")[0]) : "") + "</h1>" +
      '<p class="lead" style="margin:1rem auto 0">Your order reference is <b>' + esc(ref) + "</b>." +
      (data && data.total ? " Total <b>" + money(data.total) + "</b>." : "") +
      " We have opened WhatsApp with your order details — please send that message so we can confirm.</p>" +
      "<div style='background:var(--white);border:1px solid var(--line);border-radius:6px;padding:1.5rem;margin-top:2rem;text-align:left;max-width:520px;margin-inline:auto'>" +
        "<h3 style='font-size:1.1rem;margin-bottom:.9rem'>What happens next</h3>" +
        '<ul class="tick">' +
          "<li>" + I.check + "<span>We confirm your order and stock on WhatsApp</span></li>" +
          "<li>" + I.check + "<span>Your parcel is dispatched within 24 hours</span></li>" +
          "<li>" + I.check + "<span>Delivery in 2–3 working days to major cities</span></li>" +
          "<li>" + I.check + "<span>Pay cash to the courier, or transfer in advance</span></li>" +
        "</ul></div>" +
      "<div style='display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:2rem'>" +
        '<a class="btn btn--primary" href="shop.html">Continue shopping</a>' +
        '<a class="btn btn--wa" href="' + waLink("Hi, I just placed order " + ref + ". ") +
          '" target="_blank" rel="noopener">Message us</a></div>';
  }

  /* ================= PAGE: FAQ ================= */
  function pageFaq() {
    const el = $("#faqAcc");
    if (!el) return;
    el.innerHTML = FAQS.map(
      (f, i) =>
        '<div class="acc__item' + (i === 0 ? " on" : "") + '"><button class="acc__btn" aria-expanded="' +
        (i === 0) + '">' + esc(f.q) + " <i>+</i></button>" +
        '<div class="acc__panel"><div class="acc__inner"><p>' + esc(f.a) + "</p></div></div></div>"
    ).join("");
    initAcc();
  }

  /* ================= PAGE: CONTACT ================= */
  function pageContact() {
    const info = $("#contactInfo");
    if (info) {
      info.innerHTML =
        "<li>" + I.wa + "<div><b>WhatsApp (fastest)</b><a href='" + waLink("Assalam o Alaikum!") +
          "' target='_blank' rel='noopener'>" + esc(STORE.phone) + "</a></div></li>" +
        "<li>" + I.phone + "<div><b>Call us</b><a href='tel:" + esc(STORE.phone.replace(/\s/g, "")) + "'>" + esc(STORE.phone) + "</a></div></li>" +
        "<li>" + I.mail + "<div><b>Email</b><a href='mailto:" + esc(STORE.email) + "'>" + esc(STORE.email) + "</a></div></li>" +
        "<li>" + I.pin + "<div><b>Showroom</b><span>" + esc(STORE.address) + "</span></div></li>" +
        "<li>" + I.clock + "<div><b>Open</b><span>" + esc(STORE.hours) + "</span></div></li>";
    }

    const f = $("#contactForm");
    if (f) {
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const g = (n) => (f.querySelector('[name="' + n + '"]') || {}).value || "";
        const msg =
          "*Website enquiry*\n\nName: " + g("name") + "\nPhone: " + g("phone") +
          (g("email") ? "\nEmail: " + g("email") : "") +
          "\nSubject: " + g("subject") + "\n\nMessage:\n" + g("message");
        window.open(waLink(msg), "_blank");
        toast("Opening WhatsApp with your message");
        f.reset();
      });
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    buildHeader();
    buildFooter();
    pageHome();
    pageShop();
    pageProduct();
    pageCart();
    pageCheckout();
    pageThanks();
    pageFaq();
    pageContact();
    initAcc();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
