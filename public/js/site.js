(function () {
  "use strict";

  const path = location.pathname.replace(/\/$/, "") || "/";

  const header = `
    <div class="wrap nav">
      <a class="brand" href="/"><span class="brand-mark">F</span>Fo<em>Digits</em></a>
      <nav class="nav-links" id="navLinks">
        <a href="/" data-nav="/">Studio</a>
        <a href="/catalog" data-nav="/catalog">Software</a>
        <a href="/how-it-works" data-nav="/how-it-works">How it works</a>
        <a href="/licenses" data-nav="/licenses">Licenses</a>
        <a href="/about" data-nav="/about">About</a>
        <a href="/contact" data-nav="/contact">Contact</a>
        <a class="btn btn-forest" href="/catalog">Browse downloads</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>`;

  const footer = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="brand" href="/"><span class="brand-mark">F</span>Fo<em>Digits</em></a>
          <p class="prose" style="margin-top:12px;max-width:280px;color:var(--mute)">
            Software you download and run yourself. Built slowly, sold plainly.
          </p>
        </div>
        <div>
          <h5>Catalog</h5>
          <a href="/catalog">All software</a>
          <a href="/catalog?cat=meetings">Meetings</a>
          <a href="/catalog?cat=operations">Operations</a>
          <a href="/catalog?cat=healthcare">Healthcare</a>
        </div>
        <div>
          <h5>Studio</h5>
          <a href="/how-it-works">How it works</a>
          <a href="/licenses">Licenses</a>
          <a href="/about">About</a>
        </div>
        <div>
          <h5>Talk to us</h5>
          <a href="mailto:hello@fodigits.com">hello@fodigits.com</a>
          <a href="mailto:support@fodigits.com">support@fodigits.com</a>
          <a href="/contact">Write a note</a>
        </div>
      </div>
      <div class="legal">
        <span>© ${new Date().getFullYear()} FoDigits. Software for your own machines.</span>
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
})();
