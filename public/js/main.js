/* ===============================
   FoDigits Hosting — interactions
   =============================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Navbar scroll state + progress ---- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("show", y > 500);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          const el = e.target;
          setTimeout(function () { el.classList.add("in"); }, Math.min(i * 60, 240));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Typed hero text ---- */
  const typed = document.getElementById("typed");
  if (typed) {
    const words = ["magic ✨", "lightspeed ⚡", "coming home 🏠", "effortless 🚀"];
    if (prefersReduced) {
      typed.textContent = "magic ✨";
    } else {
      let wi = 0, ci = 0, deleting = false;
      function tick() {
        const word = words[wi];
        typed.textContent = word.slice(0, ci);
        if (!deleting && ci < word.length) { ci++; setTimeout(tick, 90); }
        else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1500); }
        else if (deleting && ci > 0) { ci--; setTimeout(tick, 45); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 350); }
      }
      tick();
    }
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll(".stat-num");
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const isFloat = String(target).indexOf(".") !== -1;
    const dur = 1600;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let val = target * eased;
      let text = isFloat ? val.toFixed(2) : Math.floor(val).toLocaleString();
      el.textContent = text + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = (isFloat ? target.toFixed(2) : target.toLocaleString()) + suffix;
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window && !prefersReduced) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      const t = parseFloat(el.getAttribute("data-count")) || 0;
      el.textContent = (String(t).indexOf(".") !== -1 ? t.toFixed(2) : t.toLocaleString()) + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---- Billing toggle ---- */
  const billingSwitch = document.getElementById("billingSwitch");
  const btMonthly = document.getElementById("btMonthly");
  const btYearly = document.getElementById("btYearly");
  const amounts = document.querySelectorAll(".amt");
  if (billingSwitch) {
    billingSwitch.addEventListener("click", function () {
      const yearly = billingSwitch.classList.toggle("on");
      btMonthly.classList.toggle("active", !yearly);
      btYearly.classList.toggle("active", yearly);
      amounts.forEach(function (a) {
        a.textContent = yearly ? a.getAttribute("data-yearly") : a.getAttribute("data-monthly");
      });
    });
  }

  /* ---- Card tilt (hero) ---- */
  const tilt = document.querySelector(".tilt");
  if (tilt && !prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    const parent = tilt.parentElement;
    parent.addEventListener("mousemove", function (e) {
      const r = parent.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = "rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg)";
    });
    parent.addEventListener("mouseleave", function () { tilt.style.transform = ""; });
  }

  /* ---- Star rating ---- */
  const rating = document.getElementById("rating");
  const ratingValue = document.getElementById("ratingValue");
  if (rating) {
    const stars = Array.prototype.slice.call(rating.querySelectorAll(".star"));
    function paint(n) { stars.forEach(function (s, i) { s.classList.toggle("active", i < n); }); }
    stars.forEach(function (s) {
      s.addEventListener("mouseenter", function () { paint(parseInt(s.dataset.value, 10)); });
      s.addEventListener("click", function () {
        ratingValue.value = s.dataset.value;
        paint(parseInt(s.dataset.value, 10));
      });
    });
    rating.addEventListener("mouseleave", function () { paint(parseInt(ratingValue.value || 0, 10)); });
  }

  /* ---- Form submissions ---- */
  function handleForm(formId, statusId, endpoint, validate) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";
      const data = Object.fromEntries(new FormData(form).entries());
      const err = validate ? validate(data, form) : null;
      if (err) {
        status.textContent = err;
        status.classList.add("err");
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j.ok) {
            status.textContent = res.j.message || "Sent!";
            status.classList.add("ok");
            form.reset();
            if (formId === "feedbackForm") {
              document.querySelectorAll("#rating .star").forEach(function (s) { s.classList.remove("active"); });
              if (ratingValue) ratingValue.value = "";
            }
          } else {
            status.textContent = (res.j && res.j.error) || "Something went wrong. Please try again.";
            status.classList.add("err");
          }
        })
        .catch(function () {
          status.textContent = "Network error. Please try again in a moment.";
          status.classList.add("err");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  }

  function markInvalid(form, names) {
    form.querySelectorAll(".invalid").forEach(function (el) { el.classList.remove("invalid"); });
    names.forEach(function (n) {
      const el = form.querySelector('[name="' + n + '"]');
      if (el) el.classList.add("invalid");
    });
  }

  handleForm("contactForm", "contactStatus", "/api/contact", function (d, form) {
    const bad = [];
    if (!d.name || !d.name.trim()) bad.push("name");
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) bad.push("email");
    if (!d.message || !d.message.trim()) bad.push("message");
    markInvalid(form, bad);
    return bad.length ? "Please fill in your name, a valid email and a message." : null;
  });

  handleForm("feedbackForm", "feedbackStatus", "/api/feedback", function (d) {
    if (!d.rating) return "Please pick a star rating first.";
    return null;
  });

  /* ---- Lightweight particle field ---- */
  const canvas = document.getElementById("particles");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, dots;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(80, Math.floor((w * h) / 22000));
      dots = Array.from({ length: count }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
        };
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,165,255,0.5)";
        ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dist = Math.hypot(d.x - o.x, d.y - o.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = "rgba(108,139,255," + (0.12 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
  }
})();
