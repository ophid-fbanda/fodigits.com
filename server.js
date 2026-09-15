"use strict";

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 80;

const DATA_DIR = path.join(__dirname, "data");
const CONTACT_FILE = path.join(DATA_DIR, "contact-messages.json");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.disable("x-powered-by");
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

function appendSubmission(file, entry) {
  let list = [];
  try {
    if (fs.existsSync(file)) {
      list = JSON.parse(fs.readFileSync(file, "utf8")) || [];
    }
  } catch (err) {
    list = [];
  }
  list.push(entry);
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

function sanitize(value, max = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

  appendSubmission(CONTACT_FILE, {
    name,
    email,
    subject: subject || "(no subject)",
    message,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    receivedAt: new Date().toISOString(),
  });

  return res.json({ ok: true, message: "Thanks! Your message has landed in our inbox — we'll reply shortly." });
});

app.post("/api/feedback", (req, res) => {
  const name = sanitize(req.body.name, 120);
  const rating = parseInt(req.body.rating, 10);
  const comment = sanitize(req.body.comment, 4000);

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ ok: false, error: "Please select a rating between 1 and 5." });
  }

  appendSubmission(FEEDBACK_FILE, {
    name: name || "Anonymous",
    rating,
    comment,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    receivedAt: new Date().toISOString(),
  });

  return res.json({ ok: true, message: "Thank you for the feedback — it helps us build a better cloud!" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "fodigits-hosting", time: new Date().toISOString() });
});

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FoDigits Hosting running on http://0.0.0.0:${PORT}`);
});
