# PBN Template

Astro-based static site template for PBN (Private Blog Network). Each site fetches articles from Supabase at build time and generates static HTML.

## Quick Start — New Site

### 1. Copy the template
```bash
cp -r sites/first-site sites/your-site-name
```

### 2. Customize the site

Each site needs a unique visual identity. Modify these files:

**`sites/your-site-name/src/styles/theme.css`** (create this file):
```css
/* Override CSS variables from packages/core/src/styles/base.css */
:root {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  --color-bg: #fafafa;
  --color-text: #1a1a1a;
  --color-link: #0066cc;
  /* ... see base.css for all variables */
}
```

Then import it in `sites/your-site-name/src/pages/index.astro` and `[slug].astro`:
```astro
---
import '../../styles/theme.css'  // after BaseLayout import
---
```

### 3. Environment variables (Vercel)
| Variable | Description | Per-site? |
|----------|-------------|-----------|
| `SITE_ID` | UUID from `seedbox_sites` table | Yes |
| `SUPABASE_URL` | Supabase project URL | No (shared) |
| `SUPABASE_SERVICE_KEY` | Service role key | No (shared) |
| `SITE_URL` | Canonical URL (e.g. `https://glowseoulskin.com`) | Yes |

## Skincare Variant Guide

For K-beauty/skincare PBN sites, use these differentiation axes:

### Site Concepts (each site = different "magazine")

| Concept | Font Stack | Color Palette | Tone |
|---------|-----------|---------------|------|
| Clinical/dermatology | Inter, system-ui | White + navy blue | Evidence-based, clinical |
| K-beauty editorial | Playfair Display + Lato | Soft pink + warm gray | Trendy, editorial |
| Runner/outdoor | Space Grotesk + monospace | Forest green + charcoal | Utilitarian, performance |
| Wellness/lifestyle | Cormorant + Montserrat | Cream + sage green | Calm, mindful |
| Budget beauty | DM Sans + system-ui | Bright coral + white | Direct, value-focused |
| Science review | IBM Plex Sans + Mono | Cool gray + teal | Analytical, data-driven |

### Differentiation Checklist

When creating a new variant:

- [ ] **Site name** — reflects the concept (not the brand)
- [ ] **Font pairing** — heading + body, distinct from other sites
- [ ] **Color scheme** — 2-3 colors max, CSS variables
- [ ] **Header/nav style** — minimal vs. magazine-style vs. blog-style
- [ ] **Footer content** — site-specific tagline, about blurb
- [ ] **Editorial pages** (3-5 static pages that establish site identity)
  - About / Mission
  - Editorial guidelines
  - Category pages (e.g. "Ingredients", "Routines", "Reviews")
- [ ] **Author persona** — consistent name, bio, expertise area
- [ ] **Tone of writing** — adjust via content rewrite or selection

### What NOT to change
- `packages/core/` — shared across all sites, don't modify per-site
- Supabase fetching logic — same for all sites
- JSON-LD schema structure — standardized
- Build config (astro.config.mjs) — only change `site` URL via env

## Architecture

```
pbn/
├── packages/core/          # Shared (DO NOT modify per-site)
│   └── src/
│       ├── layouts/        # BaseLayout.astro
│       ├── components/     # ArticlePage, SEOHead
│       ├── lib/            # Supabase client, content fetcher
│       └── styles/         # base.css (CSS variables)
├── sites/
│   ├── first-site/         # Template site
│   └── your-new-site/      # Copy of first-site + theme override
├── pnpm-workspace.yaml
└── turbo.json
```

## Automated Provisioning

The Admin app (`admin.tryaeolo.com`) can provision new sites automatically:
1. Enter site name + niche → clicks "Provision"
2. Creates Vercel project (linked to this repo, root = `sites/first-site`)
3. Sets environment variables (SITE_ID, SUPABASE credentials)
4. Creates deploy hook
5. Registers in `seedbox_sites` database

All new sites use `sites/first-site` as the base. Visual customization is done post-provisioning by modifying the CSS variables.
