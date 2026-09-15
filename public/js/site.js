(function () {
  "use strict";

  const path = location.pathname.replace(/\/$/, "") || "/";

  const header = `
    <div class="wrap nav">
      <a class="brand" href="/"><span class="brand-mark">F</span>Fo<em>Digits</em></a>
      <nav class="nav-links" id="navLinks">
        <a href="/" data-nav="/">Home</a>
        <a href="/catalog" data-nav="/catalog">Products</a>
        <a href="/how-it-works" data-nav="/how-it-works">Deploy</a>
        <a href="/licenses" data-nav="/licenses">Licenses</a>
        <a href="/about" data-nav="/about">About</a>
        <a href="/contact" data-nav="/contact">Contact</a>
        <a class="btn btn-primary" href="/catalog">View products</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>`;

  const footer = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="brand" href="/"><span class="brand-mark">F</span>Fo<em>Digits</em></a>
          <p class="prose" style="margin-top:12px;max-width:280px">
            Asset management, meetings, clinic, and team software.
          </p>
        </div>
        <div>
          <h5>Products</h5>
          <a href="/catalog">All software</a>
          <a href="/catalog?cat=meetings">Meetings</a>
          <a href="/catalog?cat=operations">Operations</a>
          <a href="/catalog?cat=healthcare">Healthcare</a>
        </div>
        <div>
          <h5>Company</h5>
          <a href="/how-it-works">Deployment</a>
          <a href="/licenses">Licenses</a>
          <a href="/about">About</a>
        </div>
        <div>
          <h5>Contact</h5>
          <a href="mailto:hello@fodigits.com">hello@fodigits.com</a>
          <a href="mailto:support@fodigits.com">support@fodigits.com</a>
          <a href="/contact">Send a message</a>
        </div>
      </div>
      <div class="legal">
        <span>© ${new Date().getFullYear()} FoDigits</span>
        <span>hello@fodigits.com</span>
      </div>
    </div>`;

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;

  document.querySelectorAll("[data-nav]").forEach((a) => {
    const n = a.getAttribute("data-nav");
    if (n === path || (n === "/catalog" && path.startsWith("/product"))) a.classList.add("is-on");
  });

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* Boot splash — once per tab, like a product coming online */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!sessionStorage.getItem("fd-booted") && !reduce) {
    sessionStorage.setItem("fd-booted", "1");
    const splash = document.createElement("div");
    splash.className = "splash";
    splash.innerHTML = '<div class="splash-box"><div class="splash-logo">F</div><div class="splash-track"><i id="spFill"></i></div><div class="splash-meta"><span>Loading</span><span id="spPct">0%</span></div></div>';
    document.body.appendChild(splash);
    const fill = splash.querySelector("#spFill");
    const pct = splash.querySelector("#spPct");
    const start = performance.now();
    const dur = 1100;
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const n = Math.round(p * 100);
      fill.style.width = n + "%";
      pct.textContent = n + "%";
      if (p < 1) requestAnimationFrame(frame);
      else setTimeout(function () { splash.classList.add("done"); }, 180);
    }
    requestAnimationFrame(frame);
  }

  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);
  const top = document.createElement("a");
  top.className = "to-top";
  top.href = "#";
  top.setAttribute("aria-label", "Back to top");
  top.textContent = "↑";
  document.body.appendChild(top);
  top.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  const headerEl = document.getElementById("site-header");
  function onScroll() {
    const y = window.scrollY;
    bar.style.width = (document.documentElement.scrollHeight - window.innerHeight > 0
      ? (y / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0) + "%";
    if (headerEl) headerEl.classList.toggle("scrolled", y > 16);
    top.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    const mo = new MutationObserver(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
