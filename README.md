# FoDigits

A software studio site. FoDigits sells tools you **download and host yourself** —
asset registers, private meetings, clinic desks, and the rest of the catalog.

This repository is the public catalog and download desk (starter kits). Full
product binaries are not included.

## Run

```bash
npm install
PORT=3000 npm start
```

Open http://localhost:3000

## What is here

- Catalog of products under categories (operations, meetings, healthcare, …)
- Product pages with edition + package selection
- `GET /download/:slug` — a real zip starter kit (README, license, compose, env)
- `POST /api/contact` — studio inbox (`data/contact-messages.json`)

Production listens on `PORT` (default 80) via `fodigits.service` on the VPS.
