"use strict";

const categories = [
  { id: "operations", name: "Operations", blurb: "Asset registers and inventory control." },
  { id: "meetings", name: "Meetings", blurb: "Video and voice rooms on your network." },
  { id: "healthcare", name: "Healthcare", blurb: "Scheduling, records, and teleconsults." },
  { id: "support", name: "Support", blurb: "Ticketing and customer portals." },
  { id: "education", name: "Education", blurb: "Enrolment, classes, and fees." },
  { id: "people", name: "People", blurb: "Directory, leave, and documents." },
  { id: "finance", name: "Finance", blurb: "Invoices, expenses, and ledgers." },
  { id: "documents", name: "Documents", blurb: "E-sign and form collection." },
  { id: "communication", name: "Communication", blurb: "Team chat and file sharing." },
  { id: "security", name: "Security", blurb: "Backups and restore." },
];

const products = [
  {
    slug: "assets",
    tone: "#3b82f6",
    name: "Assets",
    short: "Track equipment, locations, and custody in one register.",
    category: "operations",
    version: "2.6.1",
    released: "2026-08-12",
    badge: "Flagship",
    featured: true,
    editions: ["Home", "Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
      { id: "windows", label: "Windows installer", ext: "zip" },
    ],
    requirements: "2 vCPU · 2 GB RAM · Docker 24+ or Ubuntu 22.04",
    highlights: ["Custom fields & tags", "QR labels", "Assignments & custody", "Audit history", "CSV import"],
    description:
      "Register assets from purchase to retirement. Assign owners, print QR labels, import CSV, and keep a full audit trail.",
    story:
      "Deploy with Docker Compose. Data stays on your database volume. Integrates with Stock for warehouse counts.",
  },
  {
    slug: "meet",
    tone: "#22c55e",
    name: "Meet",
    short: "HD video meetings with waiting rooms and local recording.",
    category: "meetings",
    version: "1.4.2",
    released: "2026-09-02",
    badge: "New",
    featured: true,
    editions: ["Home", "Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
    ],
    requirements: "4 vCPU · 4 GB RAM · UDP open · a domain with HTTPS",
    highlights: ["Waiting room", "One-link join", "Your logo & colors", "Screen share", "Local recording"],
    description:
      "Browser-based video and voice. Waiting room, screen share, chat, and optional recording stored on your disk.",
    story:
      "The Compose stack includes the app, media server, and TURN. Pair with Clinic for scheduled teleconsults.",
  },
  {
    slug: "clinic",
    tone: "#06b6d4",
    name: "Clinic",
    short: "Scheduling, patient records, and teleconsult links.",
    category: "healthcare",
    version: "1.9.0",
    released: "2026-07-28",
    badge: "Popular",
    featured: true,
    editions: ["Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
    ],
    requirements: "2 vCPU · 4 GB RAM · PostgreSQL 15+",
    highlights: ["Scheduling", "Patient files", "Visit notes", "Meet link per visit", "Role-based access"],
    description:
      "Daily appointment board, patient files, visit notes, and role-based access. Attach a Meet room to any remote visit.",
    story:
      "Requires PostgreSQL (included in the Docker stack). White-label ready for clinic brands.",
  },
  {
    slug: "desk",
    tone: "#a78bfa",
    name: "Desk",
    short: "Email-to-ticket help desk with SLAs and a customer portal.",
    category: "support",
    version: "3.1.4",
    released: "2026-06-19",
    editions: ["Home", "Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
    ],
    requirements: "1 vCPU · 1 GB RAM · SQLite or Postgres",
    highlights: ["Email-to-ticket", "SLAs", "Canned replies", "Customer portal", "Reports"],
    description:
      "Convert inbound email to tickets. SLAs, canned replies, reports, and a branded customer portal.",
    story:
      "Runs on SQLite or Postgres. Horizontal-ready queue for support teams.",
  },
  {
    slug: "campus",
    tone: "#f59e0b",
    name: "Campus",
    short: "Enrolment, timetables, guardians, and fee ledgers.",
    category: "education",
    version: "2.2.0",
    released: "2026-05-03",
    editions: ["Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
    ],
    requirements: "2 vCPU · 2 GB RAM · Docker",
    highlights: ["Enrolment", "Timetables", "Guardians", "Fee ledgers", "Report cards"],
    description:
      "Manage students, classes, guardians, fees, and report cards. Staff and teacher roles included.",
    story:
      "Docker-only package. White-label editions support school branding.",
  },
  {
    slug: "stock",
    tone: "#38bdf8",
    name: "Stock",
    short: "Locations, bins, purchase orders, and barcode scan.",
    category: "operations",
    version: "1.8.3",
    released: "2026-04-21",
    editions: ["Home", "Pro"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "windows", label: "Windows installer", ext: "zip" },
    ],
    requirements: "1 vCPU · 1 GB RAM",
    highlights: ["Locations & bins", "Low-stock alerts", "Purchase orders", "Barcode scan", "Suppliers"],
    description:
      "Track stock by location and bin. Low-stock alerts, suppliers, purchase orders, and barcode scanning.",
    story:
      "Tablet-ready receiving screen. Works alongside Assets.",
  },
  {
    slug: "people",
    tone: "#fb7185",
    name: "People",
    short: "Staff directory, leave, contracts, and onboarding.",
    category: "people",
    version: "1.5.0",
    released: "2026-03-14",
    editions: ["Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
    ],
    requirements: "1 vCPU · 2 GB RAM",
    highlights: ["Directory", "Leave", "Documents", "Org chart", "Onboarding checklists"],
    description:
      "Centralize employee records, leave requests, documents, and org structure with access controls.",
    story:
      "Pro and White-label. Docker Compose install.",
  },
  {
    slug: "books",
    tone: "#34d399",
    name: "Books",
    short: "Invoices, expenses, clients, and CSV export.",
    category: "finance",
    version: "0.9.7",
    released: "2026-08-30",
    badge: "Preview",
    editions: ["Home", "Pro"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
    ],
    requirements: "1 vCPU · 1 GB RAM",
    highlights: ["Invoices", "Expenses", "Clients", "VAT-ready totals", "CSV export"],
    description:
      "Issue invoices, record expenses, and export totals for accounting. VAT-ready line items.",
    story:
      "Preview release focused on invoicing. Ledger modules follow in 1.0.",
  },
  {
    slug: "sign",
    tone: "#818cf8",
    name: "Sign",
    short: "Send PDFs, collect signatures, keep an audit trail.",
    category: "documents",
    version: "1.3.1",
    released: "2026-02-11",
    editions: ["Pro", "White-label"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
    ],
    requirements: "1 vCPU · 1 GB RAM",
    highlights: ["PDF send-out", "Audit trail", "Reminders", "Templates", "Self-hosted storage"],
    description:
      "Upload a PDF, send a signing link, store the signed file and audit log on your volume.",
    story:
      "Templates and reminders included. White-label available.",
  },
  {
    slug: "talk",
    tone: "#2dd4bf",
    name: "Talk",
    short: "Channels, DMs, files, and search for internal teams.",
    category: "communication",
    version: "2.0.5",
    released: "2026-01-20",
    editions: ["Home", "Pro"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
    ],
    requirements: "2 vCPU · 2 GB RAM",
    highlights: ["Channels", "DMs", "Files", "Search", "Mobile-friendly web"],
    description:
      "Persistent team chat with channels, direct messages, file sharing, and full-text search.",
    story:
      "Web client included. History stored on your volume.",
  },
  {
    slug: "vault",
    tone: "#94a3b8",
    name: "Vault",
    short: "Scheduled snapshots, off-box copy, and one-click restore.",
    category: "security",
    version: "1.1.8",
    released: "2026-06-02",
    editions: ["Home", "Pro"],
    platforms: [
      { id: "linux", label: "Linux (x86_64)", ext: "tar.gz" },
      { id: "docker", label: "Docker Compose", ext: "zip" },
    ],
    requirements: "1 vCPU · 512 MB RAM · storage for snapshots",
    highlights: ["Scheduled snapshots", "Off-box copy", "Restore wizard", "Encryption at rest", "Email alerts"],
    description:
      "Schedule encrypted snapshots, copy them off-box, and restore through a guided wizard.",
    story:
      "Works with other FoDigits products. Alerts by email.",
  },
  {
    slug: "forms",
    tone: "#f472b6",
    name: "Forms",
    short: "Build forms, collect uploads, export CSV.",
    category: "documents",
    version: "1.0.4",
    released: "2026-04-02",
    editions: ["Home", "Pro"],
    platforms: [
      { id: "docker", label: "Docker Compose", ext: "zip" },
    ],
    requirements: "1 vCPU · 512 MB RAM",
    highlights: ["Builder", "File uploads", "Notify by email", "CSV export", "Embed on your site"],
    description:
      "Drag-and-drop form builder with file uploads, email notifications, and CSV export. Embed on any site.",
    story:
      "Use for intake, applications, and internal requests.",
  },
];

function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

function getCategory(id) {
  return categories.find((c) => c.id === id) || null;
}

module.exports = { categories, products, getProduct, getCategory };
