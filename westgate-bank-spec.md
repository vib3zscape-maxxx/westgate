# Westgate Bank — Demo Platform Build Specification

**Status:** Locked design direction. Build sequentially, section by section. Do not deviate from token values, copy, or IA without flagging the deviation first.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, motion/react, lucide-react, react-router-dom v7, Supabase (Postgres + Auth).

**What this is:** A demo banking platform for a board presentation. No real money movement, no real authentication risk, no real compliance. Every screen must look and feel like a real premium American corporate/treasury bank. Visual polish is the primary success metric — architecture is secondary and should stay light.

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [Information Architecture / Full Sitemap](#2-information-architecture--full-sitemap)
3. [Component Library Specs](#3-component-library-specs)
4. [Hero Section Build](#4-hero-section-build)
5. [Marketing Pages — Page-by-Page Briefs](#5-marketing-pages--page-by-page-briefs)
6. [Authentication Flow](#6-authentication-flow)
7. [User Dashboard — Page-by-Page Briefs](#7-user-dashboard--page-by-page-briefs)
8. [Admin Dashboard — Page-by-Page Briefs](#8-admin-dashboard--page-by-page-briefs)
9. [Mock Data Model](#9-mock-data-model)
10. [Supabase Schema](#10-supabase-schema)
11. [States, Edge Cases & Empty States](#11-states-edge-cases--empty-states)
12. [Copy Bank](#12-copy-bank)
13. [Build Order / Sequencing](#13-build-order--sequencing)

---

## 1. Design Tokens

### 1.1 Tailwind v4 `@theme` block

This is the locked palette. Drop directly into the global CSS entry file (e.g. `src/index.css`).

```css
@import "tailwindcss";

@theme {
  /* === Brand core === */
  --color-primary: #0F172A;          /* near-black navy — headings, nav, primary text */
  --color-secondary: #374151;        /* slate — body text */
  --color-accent: #A87C3F;           /* warm brass/gold — CTAs, active states */
  --color-accent-dark: #C9A467;      /* brighter brass for dark mode contrast */
  --color-navy: #0A0F1C;             /* deepest navy — hero/footer backgrounds */
  --color-light: #F5F6F8;            /* cool off-white page background */
  --color-muted: #F1F3F6;            /* surfaces, input backgrounds */
  --color-border: #CBD5E1;           /* borders, dividers */
  --color-success: #1D9E75;          /* deposits / positive money movement only */

  /* === Dark mode surface scale (custom, not Tailwind defaults) === */
  --color-navy-50: #1A2236;          /* dark mode card surface */
  --color-navy-100: #131B2C;         /* dark mode secondary surface */
  --color-navy-200: #0D1424;         /* dark mode sunken surface (inputs) */

  /* === Semantic status (beyond success) === */
  --color-warning: #B9852E;          /* pending / hold states — brass-adjacent, not alarm-red */
  --color-danger: #B3463F;           /* declined / error — desaturated brick red, not pure red */
  --color-info: #3B6FA0;             /* informational badges, FX/SWIFT tags */

  /* === Typography === */
  --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;

  /* === Radius scale (banned: rounded-3xl, rounded-full on cards/buttons) === */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* === Shadow scale — soft, low-opacity, navy-tinted (not default gray) === */
  --shadow-card: 0 1px 2px 0 rgb(15 23 42 / 0.04), 0 4px 12px -2px rgb(15 23 42 / 0.06);
  --shadow-card-hover: 0 2px 4px 0 rgb(15 23 42 / 0.06), 0 12px 24px -4px rgb(15 23 42 / 0.10);
  --shadow-elevated: 0 8px 30px -4px rgb(15 23 42 / 0.18);
}

/* Font import — self-host in production; CDN acceptable for demo */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..600;1,9..40,400..600&display=swap');

/* Dark mode override block — class-based, toggled on <html> */
@layer base {
  html.dark {
    --color-light: #0A0F1C;
    --color-muted: #131B2C;
    --color-border: #2A3450;
    --color-secondary: #B8C0D0;
    --color-accent: #C9A467;
  }
}
```

### 1.2 Token usage rules (enforce in every component)

| Token | Allowed uses | Forbidden uses |
|---|---|---|
| `primary` (#0F172A) | Headings, nav text/bg, primary buttons (on light surfaces), icons | Body copy paragraphs (use `secondary`) |
| `accent` (#A87C3F) | CTAs, active nav state, card action buttons, focus rings, link hover, chart highlight series | Large background fills, error/danger states, body text |
| `success` (#1D9E75) | Deposit amounts, "completed" badges, positive balance deltas | CTA buttons, brand decoration — must stay semantically tied to money-in only |
| `navy` (#0A0F1C) | Hero background, footer background, dark mode page background | Card surfaces in light mode |
| `warning` / `danger` / `info` | Status badges only (transaction states, alerts) | Decorative use |

### 1.3 Typography rules

- Single font family sitewide: **DM Sans**. No serif anywhere, no secondary display font.
- Weight ceiling: **600 (semibold)**. `font-bold` (700) and above are banned in Tailwind config — remove `font-bold`, `font-extrabold`, `font-black` utilities from the build, or simply never invoke them in code review.
- Scale (Tailwind defaults are fine, used consistently):
  - Page H1 (marketing hero): `text-5xl md:text-6xl font-semibold tracking-tight`
  - Section H2: `text-3xl md:text-4xl font-semibold tracking-tight`
  - Card/subsection H3: `text-xl font-semibold`
  - Body: `text-base font-normal leading-relaxed text-secondary`
  - Small/meta: `text-sm text-secondary/70`
  - Numerals (balances, amounts): use `tabular-nums` utility everywhere a number appears in a table or list, so columns align.
- Casing: **sentence case only**. `text-3xl font-semibold` headers read "Treasury built for scale," never "TREASURY BUILT FOR SCALE." Nav items, buttons, and badges are also sentence case ("Open a corporate account," not "OPEN A CORPORATE ACCOUNT").

### 1.4 Radius rules

- `rounded-sm` → checkboxes, small chips
- `rounded-md` → inputs, small buttons, badges
- `rounded-lg` → buttons (default), table row hover surfaces
- `rounded-xl` → cards, modals, panels — this is the ceiling
- **Banned:** `rounded-2xl`, `rounded-3xl`, `rounded-full` on any card, button, container, or panel. Exception: perfectly circular elements that are unambiguously circular by nature — avatar initials, a single status dot — may use `rounded-full`, but never as a stylistic softening choice on rectangular containers.

### 1.5 Motion rules

- Library: `motion/react` (Framer Motion successor) for page transitions and entrance animations.
- Entrance: fade + 8px translate-y, 300–400ms, ease-out, staggered ~60ms between siblings for card grids.
- Hover: subtle scale (1.0 → 1.01) on cards, or shadow elevation change (`shadow-card` → `shadow-card-hover`); never both at once for the same element, pick one signal.
- **Banned:** `animate-pulse` on any lock icon, shield icon, 2FA indicator, or security/status badge — a pulsing security icon reads as an alarm, not reassurance. Pulse is acceptable only on inert loading skeletons (gray placeholder blocks), never on anything semantically tied to trust/security.
- Page transitions: simple cross-fade, 200ms, no slide/wipe transitions (too playful for the register).
- Numbers that update (balances after admin fund injection) may count up on change — this is a positive, restrained "premium fintech" touch and the one place a slightly more expressive animation is appropriate.

### 1.6 Imagery rules

- **Never** use stock photography of people holding cards, tapping phones, smiling at laptops, shaking hands over a desk — these read as instant templates and undercut the premium register.
- Two acceptable image strategies, in order of preference:
  1. **Coded product mockups** (preferred): browser-frame or device-frame components built from actual app screens/design tokens — e.g., a CSS-built "dashboard preview" card showing a fake balance widget, rendered in real components, not a screenshot. Pixel-perfect, no external image dependency, scales infinitely, never looks stocky.
  2. **Abstract/architectural/material photography**: brushed metal macro textures, glass-and-steel atrium interiors, aerial night-time city grids — all toned navy/brass via CSS overlay (`bg-navy/60` gradient overlays, or CSS `mix-blend-mode: multiply` with a navy tint layer) so any third-party photo still reads as part of the unified palette. Source via the image_search tool only when a coded mockup truly cannot substitute (e.g., a generic textured background panel) — never source images of identifiable people, branded buildings, or any copyrighted/trademarked subject.
- Every hero, every marketing section background, and every dashboard "empty state" illustration should default to option 1 wherever feasible, since this build has zero image-loading risk and reads as more custom-built.

### 1.7 CTA rules

- One strong primary CTA per section/viewport. If a section needs a secondary action, render it as a low-emphasis text link or ghost button, never a second filled button competing for attention.
- CTA copy is always a concrete commitment: "Open a corporate account," "Request a treasury consultation," "Start a wire transfer" — never vague browse verbs like "Explore," "Learn more" as a primary CTA (those are fine as tertiary links).
- Primary CTA visual spec: `bg-accent text-white` (light mode) — confirm AA contrast — `rounded-lg px-6 py-3 font-semibold text-sm md:text-base`, hover state darkens to a computed darker brass (`#8F6A36`) rather than relying on opacity tricks, since opacity over a navy hero would muddy the brass.

### 1.8 Trust signal rules

- Lead with facts, never adjectives. Banned standalone trust copy: "Secure," "Trusted," "Reliable" used as unsupported claims.
- Required factual trust elements, present in the footer of every page and reinforced near any CTA on financial pages:
  - "Member FDIC" badge (text + small badge icon, not an animated seal)
  - A routing number format reference (placeholder, fictitious, clearly fake-context but formatted realistically: `Routing No. 021000089` is a real Chase number — **do not reuse real routing numbers**; generate a fictitious 9-digit ABA-format number, e.g. `074000078`-style but invented, and label clearly as demo data in code comments)
  - Founding year: "Chartered 1998" (fictitious but used consistently across the site — see Section 12 for the canonical founding fact block)
  - A regulatory badge row: FDIC, and a generic "Equal Housing Lender" style badge is not applicable (commercial bank, not mortgage-consumer) — instead use "Member FDIC," "Federal Reserve Member Bank" (fictitious claim, demo only), and an SOC 2-style "Audited annually" badge.

---

## 2. Information Architecture / Full Sitemap

```
Westgate Bank
│
├── PUBLIC / MARKETING SITE
│   ├── / .................................. Home
│   ├── /business .......................... Corporate & Business Banking
│   ├── /loans .............................. Loans & Trade/Working Capital
│   ├── /treasury ........................... Investments / Treasury Yield
│   ├── /resources .......................... Resources / Help Center
│   ├── /about .............................. About Westgate Bank
│   ├── /contact ............................ Contact
│   ├── /legal/terms ........................ Terms of Service (placeholder)
│   ├── /legal/privacy ...................... Privacy Policy (placeholder)
│   ├── /legal/disclosures .................. Regulatory Disclosures (placeholder)
│   ├── /login .............................. Sign in
│   └── /signup ............................. Open a corporate account (lead form, not real KYC)
│
├── USER DASHBOARD (post-login, persistent sidebar shell)
│   ├── /app/overview ....................... Account Overview (multi-currency)
│   ├── /app/transactions ................... Transaction History (filterable)
│   ├── /app/transfers ...................... Transfer & Payment Hub
│   │   ├── /app/transfers/domestic ......... Domestic wire
│   │   ├── /app/transfers/international .... International / SWIFT + FX
│   │   └── /app/transfers/payroll .......... Bulk / payroll run
│   ├── /app/cards .......................... Card Management
│   ├── /app/statements ..................... Statements & Documents
│   ├── /app/notifications .................. Notifications (incl. fraud alerts)
│   └── /app/settings
│       ├── /app/settings/security .......... Security & 2FA
│       ├── /app/settings/profile ........... Company / profile details
│       └── /app/settings/preferences ....... Currency display, notification prefs
│
└── ADMIN DASHBOARD (post-admin-login, separate persistent sidebar shell)
    ├── /admin/overview ..................... Platform health & analytics
    ├── /admin/companies .................... Company / user account management
    │   └── /admin/companies/:id ............ Single company detail (balances, users, history)
    ├── /admin/fund-injection ............... Manual balance-setting / deposit tool
    ├── /admin/approvals ..................... Transaction approval queue
    │   ├── tab: Single high-value transfers
    │   ├── tab: International / SWIFT
    │   └── tab: Bulk / payroll runs
    ├── /admin/auth-codes .................... 2FA / auth code generator
    ├── /admin/fraud-alerts .................. Fraud alert dispatcher
    └── /admin/settings ....................... Admin account settings
```

### 2.1 Route-to-layout mapping

| Route group | Layout shell | Nav pattern |
|---|---|---|
| Marketing (`/`, `/business`, etc.) | `MarketingLayout` | Top nav (sticky, transparent→solid on scroll) + footer |
| User dashboard (`/app/*`) | `AppLayout` | Persistent left sidebar + top bar (company switcher disabled for v1 since single account, but slot reserved; notification bell; profile menu) |
| Admin dashboard (`/admin/*`) | `AdminLayout` | Persistent left sidebar (visually distinct: navy sidebar with brass accent rail, same component family as AppLayout but a distinct sidebar header reading "Westgate Admin" so it's never confused with the customer app in a live demo) |

### 2.2 Top navigation (marketing) — exact items

`Business banking` · `Loans` · `Treasury & yield` · `Resources` · `About` — right-aligned: `Sign in` (ghost button) + `Open a corporate account` (filled accent button).

### 2.3 Footer (marketing) — exact column structure

| Column 1: Company | Column 2: Solutions | Column 3: Resources | Column 4: Legal |
|---|---|---|---|
| About | Business banking | Help center | Terms of Service |
| Contact | Loans & trade finance | Security center (anchor on resources page) | Privacy Policy |
| Careers (placeholder, no page — render as disabled/greyed text, not a dead link, or link to /about#careers anchor) | Treasury & yield | FAQs (anchor on resources page) | Regulatory disclosures |

Below the four columns, full-width bottom bar: founding fact line + FDIC/Fed Member/Audited badge row + routing number reference + copyright line. See Section 12.4 for exact copy.

---

## 3. Component Library Specs

Build these once as reusable primitives before building any page. Keep custom CSS near-zero — Tailwind utilities + these wrapper components only.

### 3.1 Button

```
<Button variant="primary" | "secondary" | "ghost" | "danger" size="sm" | "md" | "lg">
```
- `primary`: `bg-accent text-white hover:bg-[#8F6A36] rounded-lg font-semibold shadow-card`
- `secondary`: `bg-white text-primary border border-border hover:border-accent rounded-lg font-semibold`
- `ghost`: `text-primary hover:text-accent font-semibold underline-offset-4 hover:underline bg-transparent`
- `danger`: `bg-danger text-white hover:bg-[#962F29] rounded-lg font-semibold` — used only inside admin actions (decline transaction, suspend account)
- Sizes control padding/text-size only, never radius (radius is fixed at `rounded-lg` for all buttons).
- Disabled state: `opacity-40 cursor-not-allowed`, no color shift.
- Loading state: replace label with a small inline spinner (a simple rotating ring built from a div + border, not a GIF) plus retained label at reduced opacity, button stays same width (reserve width to prevent layout shift).

### 3.2 Card

```
<Card padding="sm"|"md"|"lg" interactive?: boolean>
```
- Base: `bg-white rounded-xl border border-border shadow-card p-6` (md default)
- `interactive`: adds `hover:shadow-card-hover transition-shadow cursor-pointer`
- Dark mode: `bg-navy-50 border-navy-200/60`

### 3.3 Badge / Status Pill

```
<Badge tone="success"|"warning"|"danger"|"info"|"neutral">
```
- Shape: `rounded-md px-2.5 py-0.5 text-xs font-semibold` — explicitly not `rounded-full`, per radius rules (a pill-shaped badge is a common default but is banned here; use the boxier rounded-md chip instead to stay on-brand).
- Tone backgrounds at 10% opacity of the tone color with full-opacity text of the same tone color, e.g. `bg-success/10 text-success`.
- Used for: transaction status (Completed / Pending / Held / Declined), account status (Active / Restricted), currency tags.

### 3.4 Dropdown / Select

- Single reusable `<Dropdown>` built on a simple controlled `<button>` + absolutely-positioned panel (no heavy library needed — keep it light per the brief). Panel: `bg-white rounded-lg border border-border shadow-elevated p-1`, items `rounded-md px-3 py-2 hover:bg-muted text-sm`.
- Used for: currency selector, date-range filter, account selector, table column filters.

### 3.5 Table

- Header row: `text-xs font-semibold uppercase tracking-wide text-secondary/60 border-b border-border` — **note:** this is the one sanctioned use of uppercase in the whole system (small table headers only, not page headers), since it's a standard data-table convention rather than a "section header," and is kept at `text-xs` so it never reads as shouting.
- Body rows: `border-b border-border last:border-0 hover:bg-muted/60 text-sm`
- Numeric columns: right-aligned, `tabular-nums`.
- Row click → navigates to detail or opens a side-panel drawer (transactions).

### 3.6 Sidebar Nav (App + Admin shells)

- Width: `w-64` expanded, collapsible to `w-20` icon-only rail on desktop (toggle persisted in local component state, not localStorage per artifact rules if this is ever previewed as an artifact — for the real app, fine to persist in browser storage).
- Background: `bg-primary` (navy) with white/muted-white text, active item gets `bg-accent/15 text-accent border-l-2 border-accent` (no fill-rounded pill — a left border rail accent, which is the correct institutional pattern vs. a rounded active-state chip).
- Icons: `lucide-react`, 20px, stroke-width 1.75.
- Sidebar header: company name + small "Demo account" tag in the user app; "Westgate Admin" wordmark in the admin shell.

### 3.7 Modal / Drawer

- Modal: centered, `max-w-lg rounded-xl bg-white shadow-elevated p-8`, backdrop `bg-primary/40 backdrop-blur-sm`.
- Drawer (transaction detail, used from tables): slides from right, `w-full sm:w-[480px] h-full bg-white shadow-elevated`, used wherever a table row needs more detail without losing list context.

### 3.8 Stat / KPI tile

- Used on dashboard overview and admin analytics panel.
- `Card` with: label (`text-sm text-secondary`), big number (`text-3xl font-semibold tabular-nums text-primary`), delta badge (`Badge tone="success"` or `"danger"` with ↑/↓ + percentage), optional sparkline (lightweight inline SVG, not a full chart library, to keep these tiles fast).

### 3.9 Currency Tag

- Small inline component: flag-style two-letter or three-letter ISO code in a `rounded-md bg-muted px-1.5 py-0.5 text-xs font-semibold text-secondary` chip, e.g. `USD`, `EUR`, `JPY`. No actual flag emoji/images (avoids inconsistent rendering across OS and avoids any "consumer travel app" register).

### 3.10 Form Inputs

- Text input: `bg-muted border border-border rounded-md px-3 py-2.5 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none`
- Label: `text-sm font-medium text-primary mb-1.5`
- Helper/error text: `text-xs text-secondary/70` normally, `text-danger` on validation error, positioned directly under the field.
- Amount input (transfers): large variant, `text-2xl font-semibold tabular-nums`, currency selector docked inside the input on the right as a compact `Dropdown`.

---

## 4. Hero Section Build

### 4.1 Layout

Full-bleed section, `min-h-screen` capped sensibly (`min-h-[88vh]` desktop, `min-h-screen` mobile is fine since mobile viewport is naturally shorter relative to content) with the nav bar overlaid on top (transparent nav over hero, becomes solid `bg-light/95 backdrop-blur` on scroll past hero height — implement via a scroll listener toggling a class, or an IntersectionObserver on a sentinel div at hero's bottom edge).

Split-layout (preferred over fully-centered for the corporate register — split layout signals "product/platform," centered signals "marketing landing page"):

- **Left 55%:** headline, subhead, CTA, trust line — vertically centered.
- **Right 45%:** coded product mockup — a browser-frame component showing a fake "Account overview" dashboard card (balances in 3 currencies, a small sparkline, one recent transaction row) — built from real design tokens, floating with a subtle `shadow-elevated` and a soft accent-colored glow behind it (`blur-3xl bg-accent/20` positioned behind the mockup, very low opacity, just enough to lift it off the dark background).
- On mobile: stack vertically, mockup either moves below the text content at reduced scale, or is omitted in favor of a simpler abstract background treatment if the mockup component doesn't compress gracefully under ~420px width — test both and prefer keeping the mockup, scaled down, since it's a strong differentiator from generic bank marketing pages.

### 4.2 Background treatment (theme-aware — critical fix vs. prior attempt)

- Background: `bg-navy` (#0A0F1C) base in **both** light and dark mode — do not swap this to a light background in light mode. The hero is intentionally a dark "anchor" section regardless of overall page theme; this is normal pattern even on light-mode marketing sites (e.g., dark hero, light body below) and avoids the prior failure mode entirely by never making the hero theme-dependent in the first place.
- Layer on top of `bg-navy`:
  1. A subtle architectural texture: an abstract SVG pattern (thin navy-on-navy grid lines suggesting a city grid / ledger grid, 4–6% opacity white lines) — build this as inline SVG or CSS `background-image: linear-gradient` grid, not a raster photo, for zero load-risk and perfect tiling.
  2. A radial brass glow, very low opacity, top-right or behind the mockup only — never wash the whole background in brass, brass is an accent not a field color.
- Light mode vs dark mode difference is **only**: the page chrome around the hero (nav becomes solid light on scroll, body sections below are light) — the hero itself stays visually identical in both modes. This guarantees neither mode "looks broken." Document this explicitly in code comments at the hero component so a future contributor doesn't "fix" it back into the failure mode.

### 4.3 Headline direction (corporate, not consumer)

Avoid: "Save more, pay less," "Banking that works for you," anything implying personal savings goals.
Target themes: scale, control, treasury precision, multi-entity/multi-currency operations.

**Locked headline (primary):**
> Treasury infrastructure for companies that move at scale.

**Locked subhead:**
> Westgate Bank gives finance teams a single command center for accounts, payments, and yield — across 50+ currencies, with same-day domestic wires and same-day SWIFT initiation.

**CTA:** `Open a corporate account` (primary, accent-filled) + secondary ghost link `Talk to treasury sales` (text-only, no competing filled button).

**Trust line directly under CTA (small text, factual not adjective-driven):**
> Member FDIC · Chartered 1998 · $0 minimum balance to open

### 4.4 Hero mockup component spec

Build as its own component `<HeroDashboardMockup />` so it's reusable later as a generic "product preview" component on the business/treasury pages too.

- Outer frame: `rounded-xl border border-white/10 bg-navy-50 shadow-elevated overflow-hidden`, fixed aspect ratio container (`aspect-[4/3]` or similar), width constrained (`max-w-md`).
- Fake browser chrome strip on top: three small dots (`bg-white/20`, not red/yellow/green traffic-light colors — those read as macOS/dev-tool cliché and slightly undercut the institutional register; use neutral monochrome dots) + a thin fake URL bar showing `app.westgatebank.com` in muted text.
- Content inside: a miniature version of the real `Card` + `Stat tile` components — three currency balance tiles (USD, EUR, GBP placeholder figures, see Section 9 mock data), one small line-sparkline, one transaction row with a `Badge tone="success"` "Completed" tag. This should literally reuse the real Stat/Card/Badge components at a smaller scale, not be a one-off illustration, so it never drifts from the live app's actual look (and the board can be told "this preview is pulled from real components," which is true and a nice talking point).

### 4.5 Viewport-fit requirement

- No forced scroll to see headline + CTA + trust line on common desktop (1440×900) and mobile (390×844) viewports — test against both explicitly.
- No dead space between hero bottom and the next section's top — hero section should end with the mockup/content naturally filling height, next section (logo strip / trust bar, see 5.1) should sit flush, no large empty padding gap.

---

## 5. Marketing Pages — Page-by-Page Briefs

Each brief below lists: purpose, sections in order, and key copy/content direction. All marketing pages share `MarketingLayout` (nav + footer per Section 2.2–2.3).

### 5.1 Home (`/`)

1. **Hero** — per Section 4.
2. **Trust/logo bar** — thin full-width strip directly under hero, `bg-light` (or `bg-navy-50` dark mode), single line: "Trusted by finance teams managing treasury across 40+ countries" with 5–6 abstract wordmark placeholders (simple geometric monogram blocks, not real company logos — never imply real client relationships in a demo) in muted gray, `opacity-50 hover:opacity-100` on hover.
3. **Three pillars** — exactly three cards, equal visual weight (per brief: treasury ops, trade/working capital, yield are equal priority). Each card: icon (lucide), heading, 2-line description, text link "Learn more →" (not a button — secondary navigation, not a competing CTA).
   - Pillar 1: **Treasury operations** — "Real-time visibility across every account and currency, with controls built for finance teams, not individuals."
   - Pillar 2: **Trade & working capital** — "Lines of credit, trade finance, and payroll-scale payment infrastructure that scales with your business."
   - Pillar 3: **Yield on idle cash** — "Put working capital to work overnight without sacrificing same-day liquidity."
4. **Product preview / feature showcase** — alternating left/right layout (image-right, then image-left), 2 rows, each row = headline + 2–3 supporting bullet facts + a `<HeroDashboardMockup>`-style coded preview (different fake screen each time — one shows the multi-currency overview, one shows the SWIFT transfer screen with routing fields visible).
5. **By-the-numbers stat band** — full-width `bg-navy` band, 4 stat tiles in a row (white text on navy): "$ Simulated AUM," "Currencies supported (50+)," "Avg. SWIFT initiation time," "Founded (1998)." Numbers can mirror the admin analytics placeholder numbers (Section 9.5) for consistency.
6. **Testimonial / case-study strip** — **omit or use fictitious, clearly-generic placeholder quotes attributed to "VP of Treasury, mid-market manufacturer" style role-only attributions, never a named real person or real company** — keep this section light; given the demo nature, a single understated quote card is enough, not a full carousel.
7. **Final CTA band** — `bg-navy` or `bg-accent`-tinted band, centered, headline "Ready to move your treasury operations to Westgate?" + primary CTA `Open a corporate account` + trust line repeat.
8. **Footer** — per Section 2.3.

### 5.2 Corporate & Business Banking (`/business`)

1. Page hero (shorter than home hero — `min-h-[50vh]`, same navy treatment, headline: "Operating accounts built for how finance teams actually work.")
2. **Account types grid** — 3 cards: Operating account, Multi-currency account, Payroll account. Each: feature bullets (no fees on X, FX rate on Y, etc. — see Section 12.2 for exact bullet copy).
3. **Multi-currency deep section** — visual: a coded mockup of the currency selector/balance grid showing ~6 currency rows (USD, EUR, GBP, JPY, CAD, AUD) to make the "50+ currencies" claim feel concrete without listing all 50 in the marketing page itself (the full list lives in mock data / the dashboard).
4. **Payment rails section** — three-column comparison: Domestic wire / International SWIFT / Bulk payroll — speed, cost (placeholder figures), use case, in a clean comparison table (use the `Table` component, not cards, since this is genuinely tabular data).
5. **Security & controls band** — bullet list of controls (approval workflows, 2FA, fraud monitoring) — paired with a static, non-pulsing shield icon illustration.
6. CTA band + footer.

### 5.3 Loans (`/loans`)

1. Page hero: "Capital that moves as fast as your business does." Subhead referencing trade finance + working capital lines.
2. **Product cards** (3): Working capital line of credit, Trade finance / letters of credit, Equipment & growth financing. Each card: target use case, indicative rate range (placeholder, labeled "indicative, subject to underwriting"), term range.
3. **How it works** — simple 3-step horizontal process strip (Apply → Underwriting review → Funds available), each step a numbered circle (small `rounded-full` is fine here — it's a numbered step indicator, a legitimate circular-by-nature UI element, not a stylistic card softening) + label, connected by a thin horizontal line.
4. **Indicative rate table** — real `Table` component, columns: Product / Indicative APR range / Term / Collateral. Mark clearly as "Indicative only — not a commitment to lend" directly above the table (legal-safety copy even in a demo, good practice to model correctly).
5. CTA band: "Talk to a relationship manager" (this page's CTA differs slightly from the account-opening CTA since loans are a sales-assisted product, not self-serve — correct B2B banking pattern) + footer.

### 5.4 Investments / Treasury Yield (`/treasury`)

1. Page hero: "Idle cash is a missed decision, not a default." Subhead on overnight sweep / money market style yield products.
2. **Yield product cards** (3): Overnight sweep account, Money market deposit account, Short-duration treasury ladder. Each: placeholder indicative APY (clearly labeled "rates shown are illustrative for demo purposes" in a small caption — important since yield figures are the kind of claim that should never look like an unlabeled real rate, even in a demo build), liquidity terms, minimum balance.
3. **Yield calculator (interactive, fake-but-functional)** — a real working slider/input component: user enters a hypothetical idle balance, selects a product, sees a computed illustrative annual yield (pure client-side math against the placeholder APY, no backend call needed). This is a genuinely good premium-bank pattern and is cheap to build for high visual/interactivity payoff.
4. **Comparison table**: this account's yield vs. "typical non-interest operating account" (illustrative bar comparison, simple two-bar chart, not a full charting library needed — two styled divs with widths set by computed percentage is sufficient).
5. CTA band + footer.

### 5.5 Resources / Help Center (`/resources`)

1. Page hero: simple, shorter, search-bar-forward layout: headline "How can we help?" + a non-functional (or client-side filter only) search input over a `bg-muted` card.
2. **Category tiles** (4–6): Getting started, Payments & transfers, Security & fraud, Statements & tax docs, API & integrations (placeholder — fine to list even if not built, boards expect to see the category exists), Fees & pricing.
3. **FAQ accordion** — real accordion component (simple expand/collapse, no library needed), 6–8 FAQs covering: account opening time, FX fee structure, wire cutoff times, 2FA setup, international transfer limits, statement availability. Anchor target `#faqs` for footer link.
4. **Security center anchor section** (`#security`) — brief explainer + link to settings/security pattern, reinforces trust without overclaiming.
5. Contact/escalation CTA band ("Still need help? Contact support") + footer.

### 5.6 About (`/about`)

1. Page hero: shorter, headline "Built for the businesses that keep the economy moving." 
2. **Founding story block** — 2–3 paragraph fictitious-but-plausible institutional history paragraph (chartered 1998, grew from a single regional office to a national commercial bank — see Section 12.5 for exact copy block), paired with a simple coded "milestone timeline" component (horizontal line, 4–5 year markers: 1998 chartered, 2004 expanded national charter, 2012 launched multi-currency treasury platform, 2019 crossed $10B simulated AUM, 2024 launched current platform).
3. **Leadership** — explicitly **omit named individual executives with photos** (avoids the "real person" and stock-photo-of-people problems simultaneously) — instead render as role-based cards: "Chief Executive Officer," "Chief Treasury Officer," "Chief Risk Officer," each with a 1-line generic bio and a simple monogram/initial avatar built from CSS (colored circle + initials), not a photo.
4. **Careers anchor** (`#careers`) — since footer links here — short block: "We're not currently displaying open roles in this demo environment" or simply a generic "Careers at Westgate" paragraph with a disabled/ghost "View open roles" button (clearly non-functional is fine here, this is explicitly a placeholder page per the brief).
5. Footer.

### 5.7 Contact (`/contact`)

1. Short page hero or no hero — a clean two-column layout: left = contact form (Name, Company, Email, Phone, "What can we help with" dropdown, Message — submits to nowhere real, show a success toast/confirmation state on submit), right = contact info card (Sales line, Support line, mailing address — fictitious but realistic — and office hours).
2. Optional: a simple embedded map placeholder is **not needed**; skip real map integration entirely (out of scope, adds dependency risk for zero demo value).
3. Footer.

### 5.8 Legal placeholder pages (`/legal/terms`, `/legal/privacy`, `/legal/disclosures`)

- Single shared `LegalPageLayout`: simple centered max-width prose column, page title, "Last updated [date]" line, then 4–6 generic section headers with 1–2 placeholder paragraphs each (lorem-adjacent but on-topic, e.g. for Terms: "Account eligibility," "Fees and charges," "Limitation of liability," etc.) — these exist so the board sees the page exists and is styled correctly; content depth is intentionally minimal per the brief ("placeholder legal pages... sufficient trust signals, the substance behind them does not need to be real").
- Style: same typography tokens, no special treatment — should look like a normal, slightly dry legal page, which is itself correct for the register.

---

## 6. Authentication Flow

### 6.1 Sign in (`/login`)

- Centered card on a `bg-light` (or subtle navy-textured) page background, `Card` component, max-w-md.
- Fields: Email, Password, "Remember this device" checkbox, primary `Button` "Sign in," secondary ghost link "Forgot password?" (can route to a simple static "check your email" confirmation state, no real email needed), divider, ghost link "Don't have an account? Open a corporate account →" routing to `/signup`.
- On submit (using Supabase Auth — real auth mechanics, fake-context users): if credentials match a seeded demo user → route to `/app/overview`. If they match the seeded admin → route to `/admin/overview`. This means **one login page serves both roles**, role-routing happens after auth based on a `role` field — simpler than maintaining two separate login UIs, and realistic (most B2B platforms have one login gate).
- 2FA step (after password): a second screen, "Enter your 6-digit code," 6 boxed digit inputs, copy: "We've sent a code to your registered device" (fake — in reality the admin pre-generates and shares codes out-of-band per the brief). Accepts whatever code the admin most recently generated for that test user (see Section 8.5/10).

### 6.2 Sign up (`/signup`)

- This is a **lead-capture form styled as an account-opening flow**, not real KYC (per brief, no real onboarding logic needed).
- Multi-step visual (3 steps, progress bar at top, all client-side, no validation against real business registries):
  1. Company details: Legal company name, EIN (format-validated only, not verified), Industry dropdown, Estimated annual revenue range dropdown.
  2. Primary contact: Name, Title, Email, Phone.
  3. Account preferences: Primary currency, expected use (Treasury / Trade finance / Both), "How did you hear about us" (optional).
- Final screen: confirmation state, "Thanks — a relationship manager will follow up within 1 business day," NOT an instant working dashboard (correct B2B pattern — self-serve instant accounts are a personal-banking/neobank pattern, which the brief explicitly says to avoid). The actual demo-able dashboard is accessed via the seeded `/login` demo credentials, not by completing this form — make this distinction clear in a code comment.

---

## 7. User Dashboard — Page-by-Page Briefs

All pages render inside `AppLayout` (persistent sidebar). Sidebar items: Overview, Transactions, Transfers, Cards, Statements, Notifications (with unread-count badge), Settings (sub-items: Security, Profile, Preferences).

### 7.1 Account Overview (`/app/overview`)

- Top: greeting line ("Good afternoon, [Company name]") + last-login meta text.
- **Multi-currency balance grid**: a row of `Stat` tiles, one per currency the company holds (mock data gives each seeded company 3–5 currencies), each tile: currency code (`CurrencyTag`), balance in that currency (`tabular-nums`, large), small secondary line showing USD-equivalent in muted text, tiny sparkline.
- Below: **two-column layout**:
  - Left (60%): "Recent activity" — a compact `Table` (last 8 transactions across all currencies, with currency tag column), "View all →" link to `/app/transactions`.
  - Right (40%): "Quick actions" card stack — 3 buttons stacked: "New transfer," "Add a card," "Download statement" — each routes to the relevant page/flow.
- Below that: a "Notifications preview" card showing the latest 1–2 notifications including, if the admin has dispatched one, a fraud alert banner (see 7.6 and 8.6) — this is the most likely place the board will see the live fraud-alert demo trigger land, so make sure new notifications surface here without requiring a manual page refresh beyond a simple polling interval (e.g., poll every 15–20s, acceptable per brief's "no real-time required, polling is fine").

### 7.2 Transaction History (`/app/transactions`)

- Filter bar: date range `Dropdown`, currency `Dropdown` (multi-select), status `Dropdown` (Completed/Pending/Held/Declined), search input (matches counterparty name/memo client-side).
- `Table`: columns — Date, Description/counterparty, Currency, Amount (tabular-nums, right-aligned, negative amounts in `text-secondary` not red — outgoing money is normal business activity, not an error state; reserve red/danger purely for declined/failed status badges), Status (`Badge`), Channel (Wire/SWIFT/ACH/Card — small `Badge tone="neutral"` or plain text).
- Row click → opens right-side `Drawer` with full transaction detail: full counterparty info, routing/SWIFT code if international, fee breakdown, FX rate applied if cross-currency, a simple vertical status timeline (Initiated → Processing → [Held, if applicable] → Completed) using small dots connected by a vertical line, each dot's color reflecting tone (`success`/`warning`/`neutral`).
- Pagination or "load more" at bottom (client-side against mock data is fine; real pagination only matters if connected to genuinely large seeded datasets).

### 7.3 Transfer & Payment Hub (`/app/transfers`)

Landing page is a simple **selector**, not a form — three large `Card` options (Domestic wire / International SWIFT / Bulk payroll run), each with icon + 1-line description + "Start →", routing to the respective sub-route. This avoids cramming three very different forms onto one page and mirrors how real commercial banking platforms branch payment types upfront.

#### 7.3.1 Domestic wire (`/app/transfers/domestic`)

Form fields, single page, no multi-step needed (domestic wire is the simplest case): From account/currency `Dropdown`, Recipient name, Recipient routing number, Recipient account number, Amount (`tabular-nums` large input), Memo, "Send today" vs "Schedule for [date]" toggle. Submit → confirmation screen (not a real send) showing a receipt-style summary card with a fake confirmation number, then a `Button` "Done" returning to overview.

#### 7.3.2 International / SWIFT (`/app/transfers/international`)

Multi-step (this is the brief's stated "complexity tier 2," so the UI should visually communicate more rigor than domestic): 
1. Recipient & bank details: Recipient name, Recipient country `Dropdown`, Recipient bank name, **SWIFT/BIC code** field, IBAN/account number field.
2. Amount & currency: From-currency account selector, send amount, **live FX conversion display** — a clean two-line "you send / they receive" block showing the static mock exchange rate (e.g., "1 USD = 0.93 EUR — rate locked for 10 minutes" with a small countdown-style static label, no need for a real countdown timer) plus a transparent fee line ("Wire fee: $35.00" placeholder).
3. Review & confirm: full summary card, submit → confirmation receipt with fake SWIFT reference number (format like a real MT103 reference, e.g. `WGB2026061600147`).

#### 7.3.3 Bulk / payroll run (`/app/transfers/payroll`)

This is brief's stated "complexity tier 3" — the most visually substantial transfer flow:
1. **Upload or build a payee list** — a simple CSV-upload UI (accepts a file, but actually just triggers a pre-seeded mock payee list rather than truly parsing arbitrary CSVs — fine for demo) OR "Add payee manually" repeatable row form (Name, Account, Amount).
2. **Review table** — a full `Table` of all payees in the run: Name, Account (masked, e.g. `••••4821`), Amount, a small inline edit/remove action per row, and a running total footer row (bold-but-not-bold-font-weight, i.e. visually emphasized via background tint `bg-muted` on the total row, not via banned heavy font weights).
3. **Confirm & submit** — summary card: total payees, total amount, funding account, submit button labeled "Submit payroll run for approval" (correctly signals this goes to the admin approval queue, matching the backend brief — bulk runs are explicitly the thing the admin approval queue demos in its most complex tier).
4. Post-submit state: status badge "Pending approval" with explanatory copy ("Payroll runs above $X require manual review — typical turnaround under 2 hours") — this directly sets up the live admin-approval demo moment.

### 7.4 Card Management (`/app/cards`)

- Card visual: a coded credit/debit card mockup component (`rounded-xl`, navy-to-near-black gradient background, brass embossed-style "WESTGATE" wordmark, masked number `•••• •••• •••• 4821`, company name, expiry) — built entirely in CSS/SVG, no photo.
- Grid of 1–3 such cards (mock data), each with a status `Badge` (Active/Frozen) and a "Freeze card" toggle button (client-state only, no real card network call obviously).
- Below: "Spend by category" small bar/donut breakdown (simple CSS-based bars are sufficient, avoid pulling in a full chart library just for this if `recharts` isn't already in use elsewhere — but since recharts is available, it's fine to use it consistently across the dashboard for all charts, see 7.1 sparkline note: prefer one charting approach throughout rather than mixing raw CSS bars and a real library across different pages).
- "Request new card" button → simple modal form (Cardholder name, card type Physical/Virtual, shipping address) → confirmation toast.

### 7.5 Statements & Documents (`/app/statements`)

- `Table`: Period (e.g., "May 2026"), Account/currency, Type (Statement / Tax document), a "Download PDF" button per row (can be a genuinely generated lightweight placeholder PDF via the pdf skill if real download functionality is desired, or simply a disabled-but-styled button with a tooltip "Demo environment — download disabled" if generating real PDFs per statement is out of scope; recommend the latter for speed, the former is a nice-to-have polish item).
- Filter by year `Dropdown` and account `Dropdown` at top.

### 7.6 Notifications (`/app/notifications`)

- Feed-style vertical list, newest first, each item: icon (matches type — info/warning/danger styling per Section 1.2), title, timestamp, short body.
- **Fraud alert items** (admin-dispatched, see 8.6) render with `tone="danger"` left accent bar and a slightly more prominent card (not a banned pulsing icon — use a static `Badge tone="danger"` reading "Action recommended" instead of any motion effect), plus two inline actions: "This was me" / "This wasn't me" (both purely client-state, no real fraud pipeline).
- Mark-all-as-read action top-right (ghost button).

### 7.7 Settings

#### 7.7.1 Security (`/app/settings/security`)

- 2FA section: shows enrollment status, "Method: Authenticator code" (matches the admin-generated-code mechanic), a working-but-fake "Enter code to confirm" re-auth pattern for sensitive changes.
- Active sessions list (mock data: 2–3 fake sessions with device/browser/location text, "Sign out" button per row — client-state only).
- Password change form (standard fields, real Supabase Auth call if wired to real auth — otherwise client-validated only).

#### 7.7.2 Profile (`/app/settings/profile`)

- Company details (read-mostly, a couple of editable fields like "Display name" and "Primary contact email"), masked EIN, account opening date.

#### 7.7.3 Preferences (`/app/settings/preferences`)

- Default display currency `Dropdown` (affects which currency the overview's "USD-equivalent" style secondary line uses as base — purely cosmetic given mock data, but a nice realism touch).
- Notification preferences: toggle list (Email me for: large transactions, new device login, fraud alerts, statement ready) — all client-state toggles.

---

## 8. Admin Dashboard — Page-by-Page Briefs

Admin shell uses the same component family as the user `AppLayout` but with the distinct sidebar header noted in Section 2.1, so it is visually unmistakable as "the other side of the platform" during a live demo (avoids the presenter accidentally confusing which screen they're on mid-walkthrough). Same design tokens throughout — **must be fully polished to the same standard**, not a bare CRUD afterthought, per the brief's explicit instruction.

### 8.1 Admin Overview / Platform Health (`/admin/overview`)

- `Stat` tile row: Active companies, Total simulated AUM, Transactions processed (30d), Pending approvals (this last one should visually link/route to `/admin/approvals` since it's actionable).
- A simple line chart (recharts) of "Simulated platform volume, last 30 days" — purely decorative mock series, but a real rendered chart, not a static image, since it's cheap with recharts already in the stack.
- Recent admin activity log (small table: action, target company, admin user, timestamp) — reinforces "this is a real operating console" feel for the board.

### 8.2 Company / User Management (`/admin/companies`)

- `Table`: Company name, Primary contact, Status (`Badge`: Active/Restricted), Total balance (USD-equiv), Created date, action menu (View / Suspend / Delete — Delete should have a confirm modal, standard good practice even in a demo).
- Top-right: "+ New test company" button → modal form (Company name, primary contact email, starting currencies, optional starting balance) — **per brief, admin can create unlimited new test companies on the fly**, so this must genuinely write a new row to Supabase, not just be decorative.
- Row click → `/admin/companies/:id` detail page: company profile card, balance breakdown by currency (editable inline, or "Adjust balance" button deep-linking into the fund-injection tool pre-filled with this company), full transaction history for that company (reuses the same `Table`/`Drawer` pattern as the user-side transaction history for consistency), list of that company's users (just one per company per brief's "single user per company" rule, but render the list structure anyway so it's obviously extensible).

### 8.3 Fund Injection Tool (`/admin/fund-injection`)

- Simple, single-purpose form (this is a demo-critical "wow" moment, so make it fast and clear): Company `Dropdown` (searchable), Currency `Dropdown`, Action toggle ("Set balance to" vs "Inject deposit of"), Amount input, optional Memo ("Demo: pre-loaded for board walkthrough"), `Button` "Apply."
- On submit: writes to Supabase, shows an inline success state ("Balance updated — visible on [Company]'s dashboard within ~15s" — referencing the polling interval honestly), and ideally also creates a corresponding mock transaction row (a "Deposit" transaction with `tone="success"`) so the injected fund shows up naturally in the company's transaction history too, not just as a balance number that appeared from nowhere — this is the detail that makes the demo feel real rather than like an obvious admin cheat code.
- Below the form: a small "Recent injections" log table for the admin's own reference during the live demo (so the presenter can see what they just did and to which company, in case they're clicking through multiple test companies live).

### 8.4 Transaction Approval Queue (`/admin/approvals`)

- Tabbed interface, three tabs matching the brief's stated complexity tiers exactly, in order:
  1. **Single high-value transfers** — `Table` of pending domestic wires above a threshold: Company, Amount, Recipient, Submitted at, actions (`Button variant="primary"` Approve / `Button variant="danger"` Decline / `Button variant="secondary"` Hold for review).
  2. **International / SWIFT** — same pattern plus additional visible fields (SWIFT/BIC, recipient country, FX rate locked) and, on Approve, a visible "Routing code generated: [fake reference]" confirmation state appearing inline — this directly demonstrates the brief's "routing code generation" feature live.
  3. **Bulk / payroll runs** — instead of one row per transaction, one row per *run* (Company, payee count, total amount, submitted at), row click expands/opens a `Drawer` listing every payee in that run (reuses the same review-table component built for the user-side payroll flow in 7.3.3, just rendered in admin/review mode with the per-row edit actions removed and approve/decline actions added at the run level).
- Every approve/decline action should update the underlying transaction status in Supabase so it's reflected back on the relevant company's user-side transaction history/notifications — this cross-session visibility is the entire reason the brief specifies a real (if minimal) backend rather than local-only mocks.

### 8.5 2FA / Auth Code Generator (`/admin/auth-codes`)

- Company/user `Dropdown` (searchable), `Button` "Generate code" → displays a large, clearly-readable 6-digit code (`text-4xl font-semibold tabular-nums tracking-widest`) plus "Expires in 10 minutes" countdown-style label and a "Copy" button — this is what the presenter reads aloud or types into the test user's 2FA screen during the live demo, so legibility and copy-ability are the entire design goal here, keep this screen extremely simple and uncluttered.
- Below: a small log of recently generated codes (company, code, generated at, expires at, used/unused `Badge`) so the presenter can re-find a code if they navigate away.

### 8.6 Fraud Alert Dispatcher (`/admin/fraud-alerts`)

- Company/user `Dropdown`, Alert template `Dropdown` (e.g., "Unusual login location," "Large transfer flagged," "Card used internationally" — a small set of pre-written realistic templates rather than a free-text field, since canned realistic copy will read better live than whatever the presenter improvises on stage), optional custom message override textarea, `Button` "Dispatch alert."
- On submit: writes a notification row tagged `tone="danger"` to that user's notifications feed in Supabase — confirms success inline ("Alert sent — will appear on [Company]'s dashboard within ~15s," same honest polling-interval framing as 8.3).
- Below: log of previously dispatched alerts for reference during the live demo.

### 8.7 Admin Settings (`/admin/settings`)

- Minimal: admin's own profile (name, email), password change, and a "Demo environment" info card stating clearly this is a non-production sandbox (genuinely useful as an on-screen reminder during the live board demo that nothing here is real money — protects against any post-demo confusion).

---

## 9. Mock Data Model

All mock/seed data should be defined as TypeScript fixtures (e.g., `src/data/mock/*.ts`) used both for any Storybook-less component preview and as the seed payload inserted into Supabase tables on first setup (a simple seed script, see Section 10.4).

### 9.1 Currencies (50+ list)

Seed the full ISO 4217 major-currency list. A representative subset to hand-author with realistic display data (the rest can be generated programmatically with placeholder rates):

```ts
export const FEATURED_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  // ... extend programmatically to 50+ using a static ISO 4217 list;
  // attach a static mock USD cross-rate to each for FX display purposes.
];
```

Static mock FX rate table (`USD_TO_X`), all hardcoded floats, refreshed manually if ever — never call a real FX API (out of scope, and a real API call would be the one "live" dependency risk in an otherwise fully self-contained demo).

### 9.2 Companies (seed ~6–8 test companies for demo variety)

```ts
export const MOCK_COMPANIES = [
  { name: "Brightline Manufacturing Co.", contact: "J. Alvarez", status: "active", currencies: ["USD","EUR","CAD"] },
  { name: "Harlow & Voss Logistics", contact: "P. Okafor", status: "active", currencies: ["USD","GBP","JPY"] },
  { name: "Meridian Retail Group", contact: "S. Tanaka", status: "active", currencies: ["USD","EUR","AUD","SGD"] },
  { name: "Ironwood Industrial Supply", contact: "D. Reyes", status: "restricted", currencies: ["USD"] },
  { name: "Castellan Biotech", contact: "M. Chen", status: "active", currencies: ["USD","EUR","CHF"] },
  { name: "Nordpoint Energy Partners", contact: "K. Larsen", status: "active", currencies: ["USD","CAD","GBP"] },
];
```

Each company gets seeded with starting balances per held currency (randomized in a realistic $250K–$15M range per currency, since this is a treasury-scale audience), 15–30 seeded historical transactions across statuses (mostly Completed, a handful Pending/Held to populate filter states meaningfully), and one seeded login user.

### 9.3 Transactions — shape

```ts
type Transaction = {
  id: string;
  companyId: string;
  date: string; // ISO
  description: string; // counterparty or memo
  channel: "ACH" | "Wire" | "SWIFT" | "Card" | "Internal";
  currency: string;
  amount: number; // negative = outgoing
  fxRate?: number;
  feeAmount?: number;
  status: "completed" | "pending" | "held" | "declined";
  swiftRef?: string;
  routingNumber?: string;
};
```

### 9.4 Cards — shape

```ts
type Card = {
  id: string;
  companyId: string;
  holderName: string;
  type: "physical" | "virtual";
  last4: string;
  status: "active" | "frozen";
  expiry: string; // MM/YY
};
```

### 9.5 Admin analytics placeholder numbers

```ts
export const PLATFORM_STATS = {
  activeCompanies: 184,
  totalSimulatedAUM_USD: 2_840_000_000,
  transactionsProcessed30d: 12_406,
  avgSwiftInitiationMinutes: 6,
  pendingApprovals: 7, // should reflect actual seeded pending queue count
};
```

### 9.6 Notification templates (for fraud alert dispatcher dropdown)

```ts
export const FRAUD_ALERT_TEMPLATES = [
  { id: "login-location", label: "Unusual login location", body: "We noticed a sign-in to your account from a new location. If this wasn't you, secure your account immediately." },
  { id: "large-transfer", label: "Large transfer flagged", body: "A transfer exceeding your typical activity pattern was flagged for review." },
  { id: "card-international", label: "Card used internationally", body: "A card on your account was just used for an international transaction." },
];
```

---

## 10. Supabase Schema

Minimal real backend per brief — enough for admin actions to persist and appear cross-session via polling, nothing more.

### 10.1 Tables

```sql
-- companies
create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  primary_contact text,
  status text not null default 'active', -- active | restricted
  created_at timestamptz default now()
);

-- balances (one row per company per currency)
create table balances (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  currency text not null,
  amount numeric not null default 0,
  updated_at timestamptz default now(),
  unique (company_id, currency)
);

-- transactions
create table transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  description text,
  channel text, -- ACH | Wire | SWIFT | Card | Internal
  currency text not null,
  amount numeric not null,
  fx_rate numeric,
  fee_amount numeric,
  status text not null default 'completed', -- completed | pending | held | declined
  swift_ref text,
  routing_number text,
  created_at timestamptz default now()
);

-- payroll_runs (bulk transfer batches)
create table payroll_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  total_amount numeric not null,
  currency text not null,
  payee_count int not null,
  status text not null default 'pending', -- pending | approved | declined
  created_at timestamptz default now()
);

create table payroll_payees (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references payroll_runs(id) on delete cascade,
  name text,
  account_masked text,
  amount numeric
);

-- notifications (incl. admin-dispatched fraud alerts)
create table notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  type text not null, -- info | warning | danger
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- auth_codes (admin-generated fake 2FA codes)
create table auth_codes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- admin_activity_log
create table admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  admin_user text,
  action text,
  target_company_id uuid references companies(id),
  created_at timestamptz default now()
);
```

### 10.2 Auth

- Use Supabase Auth's built-in `auth.users` for both demo company users and the admin user; add a `role` field via a `profiles` table (`user_id`, `company_id` nullable, `role` = `'company_user' | 'admin'`) joined on login to decide which dashboard shell to route into (per Section 6.1).
- Real 2FA is **not** wired through Supabase's actual MFA — the "2FA screen" is a custom UI step that checks the entered code against the `auth_codes` table (per brief: "accepts admin-pre-generated codes").

### 10.3 Polling pattern (no websockets needed)

- User dashboard: on `/app/overview` and `/app/notifications`, a `setInterval` (15–20s) re-fetches balances/notifications for the logged-in company; simplest possible implementation, no Supabase Realtime channel required (explicitly out of scope per brief).

### 10.4 Seeding

- A single `seed.ts` script (run once via `tsx scripts/seed.ts` or similar) that inserts the Section 9 mock fixtures into the tables above via the Supabase JS client using a service-role key (local/dev only, never shipped client-side).

---

## 11. States, Edge Cases & Empty States

Every screen needs these explicitly designed, not left to "whatever happens" — boards notice broken-looking empty/loading states more than they notice missing features.

| Context | Empty state | Loading state | Error state |
|---|---|---|---|
| Transaction table | Illustration (simple coded icon, not photo) + "No transactions yet" + CTA to start a transfer | Skeleton rows (gray `bg-muted animate-pulse` blocks — pulse is fine here, it's an inert skeleton not a security icon) | "Couldn't load transactions — retry" with `Button variant="secondary"` |
| Account overview (new company, no balances) | "No accounts yet — fund this account or contact your relationship manager" | Skeleton stat tiles | Same retry pattern |
| Notifications | "You're all caught up" + simple checkmark icon | Skeleton list rows | Retry pattern |
| Admin approval queue (empty tab) | "Nothing pending in this queue" | Skeleton rows | Retry pattern |
| Card management (no cards) | "No cards issued yet" + "Request a card" CTA | Skeleton card shape | Retry pattern |
| Form validation | n/a | n/a | Inline field-level errors per Section 3.10, never a single top-of-form generic error blob |
| 2FA code entry | n/a | Spinner on submit | "That code didn't match — check with your admin and try again" (never say "invalid" alone — give the demo presenter a graceful recovery line) |
| Fund injection success | n/a | Inline button spinner | "Couldn't reach the database — check your connection" if Supabase write fails |

Dark mode must be explicitly checked against every state above — confirm skeleton grays, border colors, and badge tint colors all still pass contrast in dark mode (`navy-50`/`navy-100`/`navy-200` scale exists specifically to give dark mode its own surface hierarchy rather than just inverting light-mode values).

---

## 12. Copy Bank

Canonical copy blocks — reuse verbatim across pages rather than re-improvising per page, so the institutional voice stays consistent.

### 12.1 Brand fact block (reused in footer, about page, hero trust line)

> Westgate Bank, N.A. · Member FDIC · Chartered 1998 · Routing No. 074000078 (demo/fictitious) · Headquartered in Charlotte, NC (fictitious)

### 12.2 Business banking account bullet copy

- **Operating account:** "No monthly minimum balance requirement · Same-day domestic wire cutoff at 5pm ET · Unlimited ACH transfers"
- **Multi-currency account:** "Hold and settle in 50+ currencies · Live FX rates at point of transfer · No conversion required to receive foreign payments"
- **Payroll account:** "Bulk payment runs up to 10,000 payees · Same-day ACH for domestic payroll · Built-in approval workflow for finance teams"

### 12.3 Hero copy (canonical, repeat exactly per Section 4.3)

> **Headline:** Treasury infrastructure for companies that move at scale.
> **Subhead:** Westgate Bank gives finance teams a single command center for accounts, payments, and yield — across 50+ currencies, with same-day domestic wires and same-day SWIFT initiation.
> **CTA:** Open a corporate account
> **Trust line:** Member FDIC · Chartered 1998 · $0 minimum balance to open

### 12.4 Footer bottom bar copy

> Westgate Bank, N.A. is a Member FDIC institution. Chartered 1998. Routing No. 074000078. This is a demonstration environment — no real funds, accounts, or transactions are processed.
> Badges: `Member FDIC` · `Federal Reserve Member Bank` · `Audited annually`
> © 2026 Westgate Bank, N.A. All rights reserved.

**Note:** the explicit "This is a demonstration environment" line is a deliberate addition beyond the original brief — recommended because any board-facing demo of a fictitious bank benefits from one small, honest, unobtrusive disclosure rather than zero acknowledgment; it sits in the smallest, least prominent line in the footer and does not undercut the premium visual presentation anywhere else on the site.

### 12.5 About page founding story (exact paragraph block)

> Westgate Bank was chartered in 1998 as a single-office commercial bank serving manufacturers and distributors in the Carolinas. As our clients grew into national and international operations, our platform grew with them — from a single ledger system to a full multi-currency treasury infrastructure spanning more than 50 currencies today.
>
> We built Westgate around a simple premise: finance teams managing serious sums of money deserve infrastructure that matches the scale of what they're moving, not a retrofitted consumer banking app. Every account type, payment rail, and yield product on our platform is built first for the treasury function, not adapted from it.

### 12.6 Loans page indicative disclaimer (exact line, place directly above rate table)

> Indicative only — not a commitment to lend. Final rates and terms are subject to underwriting and credit approval.

### 12.7 Treasury/yield page illustrative-rate disclaimer (exact line, place directly under every APY figure)

> Rates shown are illustrative for demonstration purposes only.

---

## 13. Build Order / Sequencing

Recommended order, matching the brief's own stated priority (visual direction locked before broad build work):

1. **Tokens** — implement Section 1 `@theme` block exactly as written. Confirm visually with a throwaway token-swatch page before anything else.
2. **Component library** — Section 3, all primitives, previewed in isolation (a temporary `/dev/components` route is fine to scaffold these against, delete before final delivery).
3. **Hero section** — Section 4, built and confirmed in both light and dark mode, both desktop and mobile viewport, before any other marketing page.
4. **Marketing shell** (nav + footer) — Section 2.2/2.3, then the remaining marketing pages in this order: Home → Business → Treasury → Loans → Resources → About → Contact → Legal placeholders.
5. **Supabase schema + seed script** — Section 10, run once, confirm data is queryable before building any page that depends on it.
6. **Auth flow** — Section 6, including the 2FA step, confirmed working end-to-end (real Supabase Auth call + fake-code check against `auth_codes`) before building dashboard pages behind it.
7. **User dashboard shell + Overview** — Section 7.1, since this is the page every other dashboard page links back to.
8. **Remaining user dashboard pages** in this order: Transactions → Transfers (domestic → international → payroll) → Cards → Statements → Notifications → Settings.
9. **Admin dashboard shell + Overview** — Section 8.1.
10. **Remaining admin pages** in this order: Companies → Fund injection → Approval queue (single → SWIFT → payroll, matching brief's stated demo complexity order) → Auth code generator → Fraud alert dispatcher → Admin settings.
11. **Cross-cutting polish pass**: Section 11 states (empty/loading/error) across every page, dark mode parity check across every page, and a final pass confirming no `rounded-3xl`/`rounded-full`/`font-bold`-and-above/`animate-pulse`-on-security-icon violations crept in anywhere (a simple project-wide grep for these forbidden class names before delivery is a fast, worthwhile check).

---

*End of specification.*
