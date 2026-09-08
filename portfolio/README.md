# Prashant Sinha — Systems Portfolio

> **PRASHANT // SYSTEMS** — A premium personal portfolio built as a "personal operating system" interface.

Live at: [prashantsinha.dev](https://prashantsinha.dev) *(update with your domain)*

---

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + CSS custom properties design token system
- **Fonts**: Geist Sans, Geist Mono, Press Start 2P (pixel labels only)
- **Deployment**: Vercel

---

## Features

- ✅ Light / dark theme with system detection, user persistence, and zero hydration flash
- ✅ Cursor-reactive pixel grid canvas in hero
- ✅ Typewriter role cycling
- ✅ System status panel
- ✅ TCS experience with metric cards + expandable technical details
- ✅ The Building Years — 4 mission cards
- ✅ OnyxFlow project with expandable architecture diagram
- ✅ Backtest metrics with clear "BACKTEST RESULT" labelling and disclaimer
- ✅ Skills matrix (6 categories, no fake percentages)
- ✅ Certifications (completed vs. in-progress, visually distinct)
- ✅ Education card
- ✅ Contact form with validation and mailto fallback
- ✅ Subtle achievement system (scroll-triggered toasts)
- ✅ Fully responsive (360px → 1440px+)
- ✅ WCAG 2.2 AA accessible (semantic HTML, focus states, ARIA, reduced motion)
- ✅ SEO: title, meta, OG, JSON-LD structured data, sitemap, robots

---

## Local Development

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Currently only `NEXT_PUBLIC_SITE_URL` is used for canonical URLs.

The contact form uses a `mailto:` fallback — no email provider API key is required.

---

## Content Updates

All personal content is in structured TypeScript data files — **never edit layout components** to update content:

| File | What it controls |
|------|-----------------|
| `src/data/profile.ts` | Name, email, links, status, location |
| `src/data/experience.ts` | TCS experience, mission cards |
| `src/data/projects.ts` | OnyxFlow, OldtownFunk |
| `src/data/skills.ts` | Skill categories + certifications |

---

## Resume Download

Place your resume PDF at:

```
public/resume.pdf
```

The nav "RÉSUMÉ ↓" button links to `/resume.pdf` automatically.

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Build command: `npm run build`
4. Output directory: `.next`
5. Set `NEXT_PUBLIC_SITE_URL` environment variable to your domain
6. Deploy

---

## Design System

Colours, spacing, borders, shadows and motion are all CSS custom properties in `src/app/globals.css`. Both light and dark themes are separately designed — not inverted.

**Never use raw hex values in components. Always use tokens.**

---

## License

Personal portfolio — all rights reserved. Do not reuse content or design without permission.
