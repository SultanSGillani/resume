# Sultan Gillani — Resume Website

A fast, SEO-optimised personal resume site built with React, TypeScript, and Vite. All content is driven by a single `resume.json` file — no CMS, no database. Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

Live site: **[sultangillani.com](https://sultangillani.com)**

---

## What the site does

- **Hero section** — name, title, summary, contact buttons, and a badge list of core technologies
- **Experience timeline** — every role from `resume.json` rendered with company, position, date range, and auto-calculated duration (e.g. "2 yrs 4 mos")
- **Skills grid** — skill name and proficiency level for each entry
- **Credentials panel** — certifications/awards and languages with fluency level
- **Contact sidebar** — email, phone, website, and social profile links
- **SEO** — Open Graph tags, Twitter Card meta, JSON-LD structured data (`Person` schema), and canonical URL baked into `index.html`
- **Responsive design** — CSS custom properties and a two-column grid that collapses gracefully on mobile

---

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Language | TypeScript 5 |
| Bundler | Vite 6 |
| Testing | Vitest + Testing Library |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Content | `resume.json` (JSON Resume schema) |

---

## Project structure

```
resume/
├── public/          # Static assets (me.png, CNAME)
├── src/
│   ├── App.tsx      # Main UI component
│   ├── main.tsx     # React entry point
│   ├── utils.ts     # Pure utility functions (formatDate, getDuration, profileLabel)
│   ├── types.ts     # TypeScript interfaces for resume.json shape
│   ├── styles.css   # All styles
│   └── test/
│       ├── setup.ts         # jest-dom setup
│       └── utils.test.ts    # Unit tests for utility functions
├── resume.json      # All resume content — edit this to update the site
├── index.html       # HTML shell with SEO meta tags
├── vite.config.ts   # Vite + Vitest config
└── tsconfig.json
```

---

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start local dev server (http://localhost:5173)
npm run build      # Type-check and produce production build in dist/
npm run preview    # Preview production build locally
npm test           # Run unit tests
```

---

## Tests

Tests live in `src/test/` and use **Vitest** with **@testing-library/jest-dom**.

```bash
npm test
```

Current coverage:

| Suite | Tests | What's covered |
|---|---|---|
| `formatDate` | 3 | Undefined input → "Present", date string formatting |
| `getDuration` | 5 | Months-only, years-only, years+months, open-ended (current role), minimum 1 month |
| `profileLabel` | 2 | Network name preferred, falls back to username |

---

## Updating content

Edit `resume.json` — the UI reads it directly at build time. The file follows the [JSON Resume](https://jsonresume.org/schema/) schema with these top-level keys:

- `basics` — name, label, contact info, location, profiles
- `work` — array of roles with highlights
- `skills` — name and level
- `languages` — language and fluency
- `awards` — certifications and credentials

---

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`) which:

1. Checks out the repo
2. Installs dependencies with `npm ci`
3. Builds with `npm run build`
4. Uploads `dist/` as a Pages artifact
5. Deploys to GitHub Pages

The custom domain `sultangillani.com` is configured via `public/CNAME`.

