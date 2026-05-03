---
name: Odoo Bangladesh community site
overview: Modern, Odoo-inspired (but original) community portal for odoobangladesh.com built on existing Next.js App Router + Tailwind v4 foundation, with programmatic SEO silos and Postgres-backed lead capture for Vercel deployment.
todos:
  - id: design-system-refresh
    content: "Implement an original Odoo-inspired design system: update `src/styles/theme.css`, `src/app/globals.css`, and core UI primitives in `src/components/ui/*` + animation patterns (`Reveal`)."
    status: completed
  - id: homepage-rebuild
    content: Rebuild `src/app/page.js` to match the new wireframe (hero, trust strip, implementation SEO blocks, training split, industries/modules/comparisons highlights, FAQ, CTA band) using reusable sections.
    status: completed
  - id: content-silos
    content: Expand `src/content/**` into structured silos (industries/modules/comparisons/training/career/pages) and extend `src/lib/content/*` validators + indexes accordingly.
    status: completed
  - id: missing-pages
    content: "Add missing public pages referenced by nav/footer: `src/app/about`, `src/app/faq`, `src/app/contact`, `src/app/events`, `src/app/forum` with proper metadata + internal links."
    status: completed
  - id: seo-hardening
    content: Improve schema coverage (Course/Event/BreadcrumbList/WebSite SearchAction), ensure canonical/OG consistency via `src/lib/seo/metadata.js`, and confirm `src/app/sitemap.js` includes all new silos.
    status: completed
  - id: lead-funnel-polish
    content: Refine forms/CTAs (consultation, syllabus download, workshop, newsletter), add lightweight spam protection, and ensure Vercel/Postgres env setup for Prisma.
    status: completed
isProject: false
---

## Principles and constraints
- **Inspiration, not cloning**: keep the clean section-based storytelling, typography hierarchy, soft gradients, subtle shadows, and polished interactions—while using original layout/content and a community/education tone (not corporate/agency).
- **Community positioning**: neutral, informative, trustworthy language; CTAs like “Explore resources” / “Request consultation” / “Join training” (avoid “hire us / best company”).
- **Programmatic SEO**: every module/industry/training topic/comparison gets a dedicated landing page with strong internal linking and schema.
- **Keep current stack**: Next.js App Router (already in `src/app`), Tailwind v4 tokens (already in `src/styles/theme.css` + `src/app/globals.css`), file-based JSON content (`src/content/**`), Prisma + Postgres for lead capture (`prisma/schema.prisma`).

## Current foundation we will build on
- **Routes already implemented** (core programmatic SEO):
  - Blog: `[src/app/blog/page.js](src/app/blog/page.js)`, `[src/app/blog/[slug]/page.js](src/app/blog/[slug]/page.js)` reading `src/content/blog/*.json` via `[src/lib/content/loadContent.js](src/lib/content/loadContent.js)`
  - Industries/modules/comparisons/training topics: `src/app/industries`, `src/app/modules`, `src/app/comparisons`, `src/app/training/*`, `src/app/odoo-module/[module]`, `src/app/odoo-for/[industry]/industry`, `src/app/odoo-*-training/[topic]`
  - SEO helpers: `[src/lib/seo/metadata.js](src/lib/seo/metadata.js)`, `[src/lib/seo/schemaOrg.js](src/lib/seo/schemaOrg.js)`, sitemap/robots routes: `[src/app/sitemap.js](src/app/sitemap.js)`, `[src/app/robots.js](src/app/robots.js)`
  - SEO-friendly rewrites: `[src/middleware.js](src/middleware.js)` (e.g. `/odoo-vs-{slug}` → `/comparisons/{slug}`)
  - Lead capture APIs + Prisma: `src/app/api/**/route.js`, `[src/lib/prisma.js](src/lib/prisma.js)`, `[prisma/schema.prisma](prisma/schema.prisma)`
- **UI building blocks already exist**: header/footer, buttons/cards/inputs/sections/reveal animation, counters, FAQ accordion, sticky CTAs, exit-intent, WhatsApp button under `src/components/**`.
- **Known gap**: header/footer link to missing pages like `/about`, `/faq`, `/contact`, `/events`, `/forum` (need to implement in `src/app/*`).

## Homepage wireframe (original, Odoo-inspired)
- **Sticky header**: community-first nav (Resources, Industries, Modules, Learning, Training, Comparisons, Events, Blog, Contact) + primary CTA “Request consultation”.
- **Hero**: clear headline + subheadline + 3–4 CTAs (Explore Resources / Explore Training / Join Community / Request ERP Consultation). Add subtle gradient background + product-like “resource highlights” tiles.
- **Trust strip**: community stats counters (learners, workshops, modules catalog, contributors) using existing `StatCounters`.
- **Section 1 (What is this?)**: “Independent Odoo community for Bangladesh” with 3 pillars (Learn, Implement, Grow Career).
- **Section 2 (SEO: Implementation in Bangladesh)**: cards for accounting/inventory/manufacturing/retail/SME pages with internal links.
- **Section 3 (Training split)**: Functional vs Technical panels, topic chips, “Download syllabus” + “Join next batch”.
- **Section 4 (Resource library)**: Blog categories + learning center + developer resources + implementation guide.
- **Section 5 (Industries showcase)**: programmatic industry grid linking to `/odoo-for-{industry}-industry` rewrite.
- **Section 6 (Comparisons)**: highlight `/odoo-vs-erpnext`, `/odoo-vs-sap-business-one`, etc.
- **FAQ**: accordion + FAQPage schema.
- **Final CTA band**: newsletter + consultation form entry points.
- **Footer**: multi-column, community/legal/links, newsletter.

## SEO silo structure (topics, clusters, internal linking)
### 1) Core hub pages
- `/` (Bangladesh Odoo community hub)
- `/blog` (content hub)
- `/learning-center` (curated guides)
- `/developer-resources` (technical hub)
- `/implementation-guide` (implementation hub)
- `/pricing-guide` (pricing hub)
- `/career` + `/odoo-career-guide` (career hub)
- `/training/functional`, `/training/technical` (training hubs)

### 2) Programmatic landing pages (already supported by routes/rewrites)
- **Modules**: `/odoo-{module}-bangladesh` → `src/app/odoo-module/[module]`
- **Industries**: `/odoo-for-{industry}-industry` → `src/app/odoo-for/[industry]/industry`
- **Comparisons**: `/odoo-vs-{slug}` → `src/app/comparisons/[slug]`
- **Training topics**:
  - Functional: `/odoo-functional-training/{topic}`
  - Technical: `/odoo-technical-training/{topic}`

### 3) Pillar + cluster mapping (examples)
- **Pillar**: Odoo ERP Bangladesh (homepage + learning center)
  - Clusters: implementation steps, cost/pricing, modules, industries, case studies, FAQs
- **Pillar**: Odoo Functional Training Bangladesh
  - Clusters: Sales/CRM/Purchase/Inventory/Accounting/Manufacturing/HR/Payroll/POS/Project
- **Pillar**: Odoo Technical Training Bangladesh
  - Clusters: Python/Postgres/ORM/Module Dev/XML/QWeb/API/OWL/Deploy/Docker/Perf
- **Pillar**: Odoo vs Other ERP
  - Clusters: ERPNext, SAP Business One, Dynamics 365, Tally/QuickBooks (as appropriate)

### 4) Internal linking rules (implemented via components)
- Each industry page links to: relevant modules + 2–3 blog posts + implementation guide anchors + consultation CTA.
- Each module page links to: 1–2 industries + “getting started” learning center + training topics.
- Each comparison page links to: pricing guide + implementation guide + “who should choose Odoo” article + consultation CTA.
- Each training topic page links to: training hub + career guide + next batch CTA + syllabus download.

## Content model (file-based JSON)
- Keep `src/content/**` as the single source of truth, expand with:
  - `src/content/pages/*.json` (About, FAQ, Contact, Events, Forum placeholder)
  - `src/content/industries/*.json`
  - `src/content/modules/*.json`
  - `src/content/comparisons/*.json`
  - `src/content/training/functional/*.json` and `src/content/training/technical/*.json`
  - `src/content/career/*.json` (career paths, role guides)
- Extend/standardize validation in `[src/lib/content/validateContent.js](src/lib/content/validateContent.js)` so every content type has required SEO fields (title, description, canonical, faq, breadcrumbs, updatedAt).

## Database schema (Vercel + Postgres)
- Keep Prisma as-is (already used for inquiry/newsletter/workshop/syllabus tracking).
- Add/adjust models only if needed for:
  - **Training batch schedule** (optional DB-backed schedule/calendar)
  - **Event registrations** (if not already covered by workshops)
- Ensure all write endpoints remain under `src/app/api/**/route.js` and are rate-limited + spam-protected (bot honeypot + basic throttling).

## Schema.org structured data plan
- Keep helper patterns in `[src/lib/seo/schemaOrg.js](src/lib/seo/schemaOrg.js)` and expand:
  - **`Course`** + **`Event`** schema for training/events
  - **`BreadcrumbList`** for all programmatic landings
  - **`WebSite` + `SearchAction`** for site-wide discovery
  - Keep **`Organization`**, **`Article`**, **`FAQPage`** already present

## Design system structure (Tailwind v4 tokens + reusable components)
- Continue CSS token approach in `[src/styles/theme.css](src/styles/theme.css)`:
  - `--brand` scale, neutral scale, background/surface/elevation, shadow system, radii, spacing scale, focus ring
  - Provide a single “rebrand surface area”: logo assets + `--brand-*` tokens + typographic font variables
- Component system layering:
  - **Primitives**: `Button`, `Input`, `Card`, `Badge`, `Tabs`, `Accordion`, `Modal`, `Toast`
  - **Layout**: `Container`, `Section`, `Grid`, `Stack`, `Divider`
  - **Patterns**: hero, feature grids, comparison tables, CTA bands, lead forms, testimonial cards
  - **SEO blocks**: JSON-LD, breadcrumbs, “related content” blocks

## Conversion + community engagement strategy (non-salesy)
- Sticky CTA remains but language becomes community-aligned: “Request ERP consultation” / “Ask a question” / “Join next workshop”.
- Lead magnets:
  - ERP checklist download
  - Syllabus download
  - Free workshop registration
  - Newsletter
- Community loops:
  - Events/webinars listing with registration
  - “Success stories” submission form (community contributed)
  - Forum initially can be a “coming soon” hub linking to external channels (later: real forum)

## Content publishing workflow
- Git-based editorial workflow:
  - Add/edit JSON content in `src/content/**`
  - Preview on Vercel preview deployments
  - Merge to main → automatic rebuild with updated sitemap
- Optional later: migrate content types to a CMS without changing routes by implementing a “content adapter” layer in `src/lib/content/`.

## Future scalability plan
- Phase 1 (now): file content + programmatic SEO + DB for leads.
- Phase 2: add search (local index or hosted search) + tags/categories + author pages.
- Phase 3: CMS adapter, multi-language (bn/en), partner directory, and a real forum.

## High-level delivery sequence
- Rework global layout to the new design system, update header/footer IA, implement missing public pages.
- Expand programmatic content types and ensure each has metadata, JSON-LD, breadcrumbs, and “related links”.
- Strengthen SEO: canonical + OpenGraph consistency, sitemap coverage, internal linking blocks.
- Harden lead funnel forms + conversion UX (schedule, syllabus, consultation) while keeping tone community-first.
