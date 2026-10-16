/* =============================================================
   PRIME GADGET — script.js
   Intro reveal · nav · scroll reveal · countdown · cart · data render
   ============================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* -----------------------------------------------------------
     1. DATA — swap these for your real catalogue / a CMS feed
     ----------------------------------------------------------- */
  const products = [
    { name: "Fit 020 Pro · AI Smart Watch", price: 149, old: 249, rating: 4.9, reviews: 812,  img: "p-watch-black.png" },
    { name: "BudsAir 5 · ANC Earbuds",      price: 89,  old: 129, rating: 4.8, reviews: 1204, img: "p-buds-white.png" },
    { name: "Fit 020 Active · Smart Watch", price: 129, old: 199, rating: 4.8, reviews: 655,  img: "p-watch-green.png" },
    { name: "BudsAir 5 Pro · Wireless",     price: 109, old: null, rating: 4.9, reviews: 431, img: "p-buds-orange.png" },
  ];

  const bestSellers = [
    { name: "Fit 020 Rose · Smart Watch",   price: 149, old: 229, rating: 4.9, reviews: 980,  img: "p-watch-pink.png" },
    { name: "BudsAir 5 Lite · Earbuds",     price: 69,  old: 99,  rating: 4.7, reviews: 1520, img: "p-buds-beige.png" },
    { name: "Fit 020 Pro · AI Smart Watch", price: 149, old: 249, rating: 4.9, reviews: 812,  img: "p-watch-black.png" },
    { name: "BudsAir 5 · ANC Earbuds",      price: 89,  old: 129, rating: 4.8, reviews: 1204, img: "p-buds-white.png" },
  ];

  const categories = [
    { icon: "⌚", name: "Smart Watches", count: "18 items" },
    { icon: "🎧", name: "Earbuds",       count: "12 items" },
    { icon: "🎮", name: "Gaming",        count: "22 items" },
    { icon: "🔌", name: "Accessories",   count: "34 items" },
    { icon: "⚡", name: "Chargers",      count: "16 items" },
    { icon: "🔊", name: "Speakers",      count: "9 items" },
    { icon: "📱", name: "Phone Cases",   count: "27 items" },
    { icon: "🔋", name: "Power Banks",   count: "11 items" },
  ];

  const features = [
    { t: "Premium Quality",    d: "Aerospace-grade materials, tested to last." , i: "M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z" },
    { t: "AI Innovation",      d: "On-device intelligence that learns your day.", i: "M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" },
    { t: "Fast Delivery",      d: "Free 24-hour express on every order.",        i: "M3 12h13l-4-4M16 12l-4 4M20 6v12" },
    { t: "Secure Payments",    d: "256-bit encryption on every checkout.",       i: "M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" },
    { t: "Official Warranty",  d: "2-year manufacturer warranty, no fine print.", i: "M9 12l2 2 4-4M12 3l7 4v5c0 5-3 7-7 9-4-2-7-4-7-9V7z" },
    { t: "24/7 Support",       d: "Real humans, any timezone, always on.",       i: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  ];

  const reviews = [
    { name: "Amara O.",   role: "Verified buyer", text: "The Fit 020 nails everything my old watch got wrong. Battery genuinely lasts the week.", init: "A" },
    { name: "Daniel K.",  role: "Verified buyer", text: "BudsAir 5 ANC is shockingly good for the price. Delivery landed next morning.", init: "D" },
    { name: "Lena M.",    role: "Verified buyer", text: "Site made it easy, packaging felt premium, product feels premium. Repeat customer now.", init: "L" },
  ];

  /* -----------------------------------------------------------
     2. RENDER helpers
     ----------------------------------------------------------- */
  const stars = (r) => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r));

  function productCard(p) {
    const old = p.old ? `<s>$${p.old}</s>` : "";
    return `
      <article class="card">
        <div class="card__media">
          <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" />
          <button class="wish" aria-label="Add ${p.name} to wishlist" type="button">
            <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
          </button>
        </div>
        <h3 class="card__name">${p.name}</h3>
        <div class="card__rating">${stars(p.rating)} <small>${p.rating} · ${p.reviews}</small></div>
        <div class="card__foot">
          <span class="price"><b>$${p.price}</b>${old}</span>
          <button class="add-btn" type="button">Add to cart</button>
        </div>
      </article>`;
  }

  const render = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  render("#productGrid", products.map(productCard).join(""));
  render("#bestGrid",    bestSellers.map(productCard).join(""));
  render("#catGrid", categories.map(c => `
    <a class="cat" href="#products">
      <span class="cat__icon" aria-hidden="true">${c.icon}</span>
      <h3>${c.name}</h3><span>${c.count}</span>
    </a>`).join(""));
  render("#featureGrid", features.map(f => `
    <div class="feature">
      <div class="feature__icon"><svg viewBox="0 0 24 24"><path d="${f.i}"/></svg></div>
      <h3>${f.t}</h3><p>${f.d}</p>
    </div>`).join(""));
  render("#reviewGrid", reviews.map(r => `
    <div class="review">
      <div class="review__stars">${stars(5)}</div>
      <p>“${r.text}”</p>
      <div class="review__who">
        <span class="review__avatar" aria-hidden="true">${r.init}</span>
        <span><b>${r.name}</b><small>${r.role}</small></span>
      </div>
    </div>`).join(""));

  /* -----------------------------------------------------------
     3. INTRO — letters fall, then merge; once per session
     ----------------------------------------------------------- */
  (function intro() {
    const intro = $("#intro"), word = $("#introWord"), slogan = $("#introSlogan");
    let seen = false;
    try { seen = sessionStorage.getItem("pg_intro") === "1"; } catch (e) {}

    const finish = () => {
      intro.classList.add("is-done");
      try { sessionStorage.setItem("pg_intro", "1"); } catch (e) {}
      setTimeout(() => intro.remove(), 800);
    };

    if (seen || reduceMotion) { finish(); return; }

    document.body.style.overflow = "hidden";
    const text = "PRIME GADGET";
    word.innerHTML = [...text].map(ch =>
      ch === " " ? `<span class="space"></span>` : `<span>${ch}</span>`
    ).join("");

    const letters = $$("#introWord span:not(.space)");
    letters.forEach((l, i) => setTimeout(() => l.classList.add("drop"), 120 + i * 90));

    const total = 120 + letters.length * 90 + 700;
    setTimeout(() => slogan.classList.add("show"), total);
    setTimeout(() => { document.body.style.overflow = ""; finish(); }, total + 1400);
  })();

  /* -----------------------------------------------------------
     4. NAV — scroll darken, mobile drawer
     ----------------------------------------------------------- */
  const nav = $("#nav"), burger = $("#navBurger"), menu = $("#navMenu");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navMenu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("open"); burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  /* -----------------------------------------------------------
     5. SCROLL REVEAL
     ----------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  // reveal section heads and existing .reveal, plus rendered cards
  $$(".reveal").forEach(el => io.observe(el));
  $$(".card, .cat, .feature, .review").forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 60 + "ms";
    io.observe(el);
  });

  /* -----------------------------------------------------------
     6. CART + WISHLIST (delegated)
     ----------------------------------------------------------- */
  let cart = 0;
  const cartCount = $("#cartCount");
  document.addEventListener("click", (e) => {
    const add = e.target.closest(".add-btn");
    if (add) {
      cart++;
      cartCount.textContent = cart;
      cartCount.classList.add("show");
      add.textContent = "Added ✓";
      setTimeout(() => (add.textContent = "Add to cart"), 1100);
    }
    const wish = e.target.closest(".wish");
    if (wish) wish.classList.toggle("active");
  });

  /* -----------------------------------------------------------
     7. COUNTDOWN — resets to the next midnight
     ----------------------------------------------------------- */
  const cdH = $("#cdH"), cdM = $("#cdM"), cdS = $("#cdS");
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const now = new Date();
    const end = new Date(now); end.setHours(24, 0, 0, 0);
    let s = Math.floor((end - now) / 1000);
    cdH.textContent = pad(Math.floor(s / 3600));
    cdM.textContent = pad(Math.floor((s % 3600) / 60));
    cdS.textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* -----------------------------------------------------------
     8. NEWSLETTER
     ----------------------------------------------------------- */
  const form = $("#newsletterForm"), email = $("#emailInput"), msg = $("#newsletterMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!valid) { msg.style.color = "#ff7a7a"; msg.textContent = "Enter a valid email address."; return; }
    msg.style.color = ""; msg.textContent = "You're in. Watch your inbox for the next drop.";
    email.value = "";
  });

})();