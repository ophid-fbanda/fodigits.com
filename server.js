"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");
const { categories, products, getProduct } = require("./lib/catalog");
const { createZip } = require("./lib/zip");
const { kitFiles, fileName } = require("./lib/packageKit");

const app = express();
const PORT = process.env.PORT || 80;

const DATA_DIR = path.join(__dirname, "data");
const CONTACT_FILE = path.join(DATA_DIR, "contact-messages.json");
const DOWNLOADS_FILE = path.join(DATA_DIR, "download-log.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.disable("x-powered-by");
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

function readJson(file, fallback) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8")) || fallback;
  } catch (err) {
    /* ignore */
  }
  return fallback;
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

function sanitize(value, max = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function counts() {
  const log = readJson(DOWNLOADS_FILE, []);
  const map = {};
  for (const row of log) {
    map[row.slug] = (map[row.slug] || 0) + 1;
  }
  return map;
}

app.get("/api/catalog", (req, res) => {
  const tally = counts();
  res.json({
    ok: true,
    categories,
    products: products.map((p) => ({ ...p, downloads: 1200 + (tally[p.slug] || 0) * 3 + (p.slug.charCodeAt(0) % 17) * 40 })),
  });
});

app.get("/api/product/:slug", (req, res) => {
  const product = getProduct(req.params.slug);
  if (!product) return res.status(404).json({ ok: false, error: "Unknown product." });
  const tally = counts();
  res.json({
    ok: true,
    product: { ...product, downloads: 1200 + (tally[product.slug] || 0) * 3 + (product.slug.charCodeAt(0) % 17) * 40 },
    categories,
  });
});

app.get("/download/:slug", (req, res) => {
  const product = getProduct(req.params.slug);
  if (!product) return res.status(404).type("text").send("Unknown product.");

  const platform = product.platforms.find((p) => p.id === sanitize(req.query.platform, 40)) || product.platforms[0];
  const edition = product.editions.includes(sanitize(req.query.edition, 40))
    ? sanitize(req.query.edition, 40)
    : product.editions[0];

  const files = kitFiles(product, platform, edition);
  const zip = createZip(files);
  const name = fileName(product, platform);

  const log = readJson(DOWNLOADS_FILE, []);
  log.push({
    slug: product.slug,
    platform: platform.id,
    edition,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    at: new Date().toISOString(),
  });
  writeJson(DOWNLOADS_FILE, log);

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
  res.setHeader("Content-Length", zip.length);
  res.send(zip);
});

app.post("/api/contact", (req, res) => {
  const name = sanitize(req.body.name, 120);
  const email = sanitize(req.body.email, 160);
  const subject = sanitize(req.body.subject, 160);
  const message = sanitize(req.body.message, 4000);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email and message are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
  }

  const list = readJson(CONTACT_FILE, []);
  list.push({
    name,
    email,
    subject: subject || "(no subject)",
    message,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    receivedAt: new Date().toISOString(),
  });
  writeJson(CONTACT_FILE, list);

  return res.json({ ok: true, message: "Message sent. Sales will reply shortly." });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "fodigits", time: new Date().toISOString() });
});

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FoDigits running on http://0.0.0.0:${PORT}`);
});
