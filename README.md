# Prashant Sinha — Systems Engineering & Developer Portfolio

A personal systems engineering portfolio and digital archive designed with an editorial, publication-grade aesthetic, authentic typography tokens, and responsive interactive modules.

---

## Technical Stack

- **Framework**: [Next.js 16 (Turbopack / App Router)](https://nextjs.org/)
- **Core**: React 19, TypeScript (strict mode)
- **Styling**: Tailored Design Token System (CSS custom properties, zero unvetted utility clutter)
- **Icons**: Lucide React
- **Deployment Platform**: [Vercel](https://vercel.com/)

---

## Repository Structure

```
My_portfolio/
├── .gitignore               # Root gitignore protecting dependencies, builds & secrets
├── README.md                # Repository overview & deployment documentation
└── portfolio/               # Next.js Application Root
    ├── .env.example         # Environment template
    ├── .gitignore           # Next.js specific gitignore
    ├── package.json         # Pinned dependencies & build scripts
    ├── next.config.ts       # Security headers & image optimization
    ├── tsconfig.json        # Strict TypeScript rules
    ├── public/              # Static assets (Resume PDF, retro cursors, OnyxFlow spec)
    │   ├── assets/.gitkeep  # Asset directory anchor
    │   ├── cursors/         # Classic Macintosh vector cursor assets
    │   ├── resume.pdf       # Verified Curriculum Vitae
    │   └── onyxflow_system_architecture_overview.md
    └── src/
        ├── app/             # Next.js App Router (layout, page, metadata)
        ├── components/      # Modular layout & section exhibits
        │   ├── layout/      # Navigation, Footer, Status bar
        │   └── sections/    # Hero, Impact, Work, Projects, Matrix, Story, Certs, About, Contact
        └── data/            # Single-source-of-truth TypeScript models
```

---

## Local Development

```bash
# 1. Navigate into the application directory
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build Verification

```bash
cd portfolio
npm run lint
npm run build
```

---

## Vercel Deployment Guide

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete personal systems engineering portfolio"
   git remote add origin https://github.com/prashantsinha3698/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
   - In the **Configure Project** screen:
     - Under **Root Directory**, click **Edit** and select **`portfolio`**.
     - Framework Preset will automatically detect **Next.js**.
     - Build Command: `next build` (default).
     - Output Directory: `.next` (default).
     - Install Command: `npm install` (default).
   - Click **Deploy**.

---

## Git & Deployment Checklist

- [x] `node_modules` ignored (installed fresh by Vercel)
- [x] `.next` build cache and `.turbo` ignored
- [x] `.env*` secret files ignored (`.env.example` preserved)
- [x] `.vercel` CLI state ignored
- [x] Operating system files (`.DS_Store`, `Thumbs.db`) ignored
- [x] Empty asset directory tracked via `.gitkeep`
- [x] Zero TypeScript errors (`npm run build` passes with Exit Code 0)
- [x] Zero ESLint errors (`npm run lint` passes with Exit Code 0)
- [x] Static assets verified (`resume.pdf`, `onyxflow_system_architecture_overview.md`, cursors)
