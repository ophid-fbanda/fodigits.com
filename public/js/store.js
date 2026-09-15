(function (global) {
  "use strict";

  async function loadCatalog() {
    const res = await fetch("/api/catalog");
    if (!res.ok) throw new Error("Could not load the catalog.");
    return res.json();
  }

  function categoryName(categories, id) {
    const c = (categories || []).find((x) => x.id === id);
    return c ? c.name : id;
  }

  function card(p, categories) {
    const badge = p.badge ? `<span class="pill">${p.badge}</span>` : "";
    const letter = p.name.replace("FoDigits ", "").slice(0, 1);
    const tone = p.tone || "#4f8cff";
    return `
      <article class="card">
        <a href="/product?p=${encodeURIComponent(p.slug)}" class="card-art" aria-hidden="true">
          <span class="orb" style="background:${tone}">${letter}</span>
        </a>
        <div class="card-body">
          <div class="meta">
            <span class="tag">${categoryName(categories, p.category)}</span>
            ${badge}
          </div>
          <h3><a href="/product?p=${encodeURIComponent(p.slug)}">${p.name}</a></h3>
          <p>${p.short}</p>
          <div class="card-foot">
            <span>v${p.version}</span>
            <a href="/product?p=${encodeURIComponent(p.slug)}">View &amp; download →</a>
          </div>
        </div>
      </article>`;
  }

  function renderGrid(el, products, categories) {
    if (!el) return;
    if (!products.length) {
      el.innerHTML = `<p class="prose">Nothing in this shelf yet. Try another category.</p>`;
      return;
    }
    el.innerHTML = products.map((p) => card(p, categories)).join("");
  }

  function bindDownload(form) {
    if (!form) return;
    const bar = form.querySelector(".progress");
    const fill = form.querySelector(".progress > i");
    const status = form.querySelector(".status");
    const btn = form.querySelector("[data-download]");
    const license = form.querySelector("[name=agree]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (license && !license.checked) {
        status.textContent = "Please accept the license to continue.";
        status.className = "status err";
        return;
      }
      const slug = form.getAttribute("data-slug");
      const platform = form.querySelector("[name=platform]").value;
      const edition = form.querySelector("[name=edition]").value;
      const url = `/download/${encodeURIComponent(slug)}?platform=${encodeURIComponent(platform)}&edition=${encodeURIComponent(edition)}`;

      status.className = "status";
      status.textContent = "Preparing your package…";
      bar.style.display = "block";
      fill.style.width = "8%";
      btn.disabled = true;

      let n = 8;
      const tick = setInterval(function () {
        n = Math.min(n + Math.random() * 18, 92);
        fill.style.width = n + "%";
      }, 140);

      // Kick the real browser download, then finish the bar.
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = url;
      document.body.appendChild(iframe);

      setTimeout(function () {
        clearInterval(tick);
        fill.style.width = "100%";
        status.textContent = "Download started — check your browser’s downloads.";
        status.className = "status ok";
        btn.disabled = false;
        setTimeout(function () { iframe.remove(); }, 8000);
      }, 900);
    });
  }

  global.FoStore = { loadCatalog, categoryName, card, renderGrid, bindDownload };
})(window);
