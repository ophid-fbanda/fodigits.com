"use strict";

const categories = [
  { id: "operations", name: "Operations", blurb: "Assets, inventory, and the work of running a place." },
  { id: "meetings", name: "Meetings", blurb: "Private video rooms you host yourself." },
  { id: "healthcare", name: "Healthcare", blurb: "Clinic tools, visits, and waiting rooms." },
  { id: "support", name: "Support", blurb: "Tickets, queues, and help desks." },
  { id: "education", name: "Education", blurb: "Schools, campuses, and class lists." },
  { id: "people", name: "People", blurb: "Staff files, leave, and directories." },
  { id: "finance", name: "Finance", blurb: "Books, invoices, and day-to-day money." },
  { id: "documents", name: "Documents", blurb: "Signing, forms, and paper that used to pile up." },
  { id: "communication", name: "Communication", blurb: "Team chat that stays on your server." },
  { id: "security", name: "Security", blurb: "Backups, vaults, and quiet peace of mind." },
];

const products = [
  {
    slug: "assets",
    name: "FoDigits Assets",
    short: "Know what you own, where it lives, and who is responsible.",
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
      "A calm asset register for workshops, schools, clinics, and offices. Track equipment from purchase to retirement, print labels, and hand custody between people — all on a server you control.",
    story:
      "Built for teams who are tired of a spreadsheet that only one person understands. You download it, point it at your own database, and it becomes your register — not ours.",
  },
  {
    slug: "meet",
    name: "FoDigits Meet",
    short: "Private video and voice rooms. Zoom-quiet, hosted by you.",
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
      "A small, beautiful meeting house. Guests join from a browser. No accounts for visitors, no cloud in the middle. Clinics use it for visits; offices use it for stand-ups.",
    story:
      "Made for people who liked the ease of a video link and disliked sending the conversation to someone else’s data center.",
  },
  {
    slug: "clinic",
    name: "FoDigits Clinic",
    short: "Appointments, records, and a door to the consult room.",
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
      "A compact clinic desk: the day’s list, a file for each patient, and a button that opens a private video room when the visit is remote.",
    story:
      "For practices that want the record on their premises. Pair it with FoDigits Meet or use the built-in waiting room.",
  },
  {
    slug: "desk",
    name: "FoDigits Desk",
    short: "A help desk that does not live in someone else’s queue.",
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
      "Tickets in, answers out. Your staff see one queue. Your customers see a status page that looks like you — because it is you.",
    story: "Replace the shared inbox without renting a seat for every agent.",
  },
  {
    slug: "campus",
    name: "FoDigits Campus",
    short: "Students, classes, fees, and a notice board that stays put.",
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
      "A school office in software. Built for secretaries first: search a child, see a class, print a list. Teachers get a quieter view.",
    story: "Designed around how a real campus already works, not how a Silicon Valley LMS wishes it did.",
  },
  {
    slug: "stock",
    name: "FoDigits Stock",
    short: "Shelves, bins, and the story of what left the building.",
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
      "Inventory without the ERP fog. Count it, move it, reorder it. Works on a tablet at the door.",
    story: "For shops and stores that need the truth of the shelf, not a twelve-module suite.",
  },
  {
    slug: "people",
    name: "FoDigits People",
    short: "A staff file that is not a folder on someone’s desktop.",
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
      "Names, roles, contracts, and days off — held on your server, visible to the people who should see them.",
    story: "HR software that prefers paper-honest fields over engagement dashboards.",
  },
  {
    slug: "books",
    name: "FoDigits Books",
    short: "Invoices, payments, and a ledger you can explain.",
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
      "Day-to-day books for a small firm. Send an invoice, mark it paid, see the month. Export when your accountant asks.",
    story: "A preview release: solid for invoicing, with the fuller ledger still being lined up.",
  },
  {
    slug: "sign",
    name: "FoDigits Sign",
    short: "Signatures that never leave your building.",
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
      "Send a document, collect a name, keep the file. No third-party vault holding your contracts.",
    story: "For offices that have been asked one too many times to ‘just DocuSign it’.",
  },
  {
    slug: "talk",
    name: "FoDigits Talk",
    short: "Team chat on a machine you can point at.",
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
      "A quiet Slack-shaped room with none of the tenant. Your history stays in your volume.",
    story: "When the team is small and the conversations are not for a vendor’s model.",
  },
  {
    slug: "vault",
    name: "FoDigits Vault",
    short: "Backups you can restore without opening a ticket.",
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
      "Take a picture of the things that matter, keep a copy elsewhere, and bring it back on a bad day.",
    story: "Pairs with every other FoDigits product. Unexciting, on purpose.",
  },
  {
    slug: "forms",
    name: "FoDigits Forms",
    short: "Forms that submit to you, not to a survey company.",
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
      "Build a form in the afternoon. Embed it. Read the answers in your own admin.",
    story: "For intake, applications, and the little questionnaires that used to live in a free-tier cloud.",
  },
];

function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

function getCategory(id) {
  return categories.find((c) => c.id === id) || null;
}

module.exports = { categories, products, getProduct, getCategory };
