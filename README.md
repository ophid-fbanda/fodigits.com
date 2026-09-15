# FoDigits Hosting

A rich, modern, animated and fully responsive marketing website for a web hosting
company. Built with a lightweight Node.js/Express backend that serves the static
front-end and handles **contact** and **feedback** form submissions.

Live demo domain: fodigits.com

## Features

- **Classic + modern design** — glassmorphism, aurora gradient background, animated particle field.
- **Highly animated** — scroll-reveal, animated counters, typing hero, floating chips, 3D card tilt, scroll progress bar, hover micro-interactions.
- **Fully responsive** — desktop, tablet and mobile with an animated mobile menu.
- **Several products / services** — Shared Hosting, VPS, Cloud, Dedicated Servers, Managed WordPress, Domains & SSL.
- **Pricing** — monthly/yearly billing toggle with three plans.
- **Contact & feedback** — working forms with validation posting to the backend
  (`/api/contact`, `/api/feedback`); submissions are stored under `data/`.
- **Direct contact channels** — email (`support@fodigits.com`, `sales@fodigits.com`), phone, address.
- Respects `prefers-reduced-motion`.

## Project structure

```
server.js            Express server + form APIs
public/
  index.html         Single-page site
  css/styles.css     Styles + animations
  js/main.js         Interactions & animations
data/                Stored form submissions (git-ignored)
```

## Run locally

```bash
npm install
PORT=3000 npm start
# open http://localhost:3000
```

## API

| Method | Endpoint        | Body                                        |
|--------|-----------------|---------------------------------------------|
| POST   | `/api/contact`  | `{ name, email, subject?, message }`        |
| POST   | `/api/feedback` | `{ name?, rating (1-5), comment? }`          |
| GET    | `/api/health`   | health check                                |

Submissions are appended to `data/contact-messages.json` and `data/feedback.json`.

## Deployment

The app listens on `PORT` (default **80**). On the production VPS it is managed by
a `systemd` service (`fodigits.service`) so it starts on boot and restarts on failure:

```bash
npm install --omit=dev
sudo PORT=80 node server.js   # or via the systemd unit
```
