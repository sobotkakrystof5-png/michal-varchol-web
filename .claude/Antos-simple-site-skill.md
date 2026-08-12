Antos-skill
One-page Craftsman Site Layout — Skill Export (Zámečnictví MB template)
SKILL.md
---
name: onepage-craftsman-site-layout
description: Reusable single-page (scrolling, anchor-nav) layout template from the Zámečnictví MB reference site (a metalworking/locksmith craftsman site). Covers the sticky header with anchor nav, hero with inline stat strip, prose-led about section with a 4-item value-prop grid, plain text-card services grid, filterable gallery section, two-column contact section (info+map beside a form with inline validation hint text), and a compact footer. Colors, fonts, and copy are intentionally excluded — only structure, hierarchy, and layout. Use whenever the user wants a single-page ("one-pager", "jednostránkový web") marketing site for a craftsman, trade, workshop, or small local service business, especially something leaner than a full multi-page site, or when they reference "the Zámečnictví MB template/layout". If the user wants a full multi-page site instead, prefer a multi-page template skill if one is available.
---

# One-page craftsman site layout (Zámečnictví MB template)

A content-agnostic, color-agnostic layout system extracted from analyzing `zamecnictvi-mb.vercel.app` — a **single scrolling page** with anchor-linked navigation (as opposed to a multi-page site). It captures structure only: section order, hierarchy, and recurring layout components. Colors, typography, photos, and copy are placeholders to be replaced per project.

## When to use this

- User wants a lean, single-page marketing site for a craftsman/trade/local-service business — everything reachable by scrolling or by clicking an anchor nav item, no separate page loads.
- User explicitly references "Zámečnictví MB layout", "jednostránkový web", "scroll site", or wants something simpler than a full multi-page portfolio site.
- Good fit for smaller businesses that don't need a dedicated portfolio/blog/product catalog — just: who we are, what we do, proof of work, how to reach us.

## How this differs from a multi-page site

This is **one HTML page** with `id`-anchored sections (`#o-nas`, `#sluzby`, `#galerie`, `#kontakt`) and a nav that scrolls to them instead of navigating to new URLs. If the user's project needs dedicated sub-pages (a real portfolio with project detail pages, a priced product catalog, multiple service detail pages), a multi-page structure is a better fit — check whether a multi-page template skill is available before defaulting to this one. This template is deliberately leaner: fewer sections, no numbered-index motif, no timeline, no alternating image blocks — everything is compressed into 4 content sections plus hero.

## How to use this skill

1. **Read `references/section-templates.md`** — full breakdown of every section on the page, in scroll order, with what goes in each.
2. **Read `references/components.md`** — the recurring atomic patterns (value-prop grid, plain text-card grid, filterable gallery, two-column contact block with inline-validated form, etc.).
3. **Use `assets/skeleton.html`** as a working structural starting point — grayscale placeholder tokens (spacing/typography only), `[bracketed]` content placeholders, ready to restyle and re-copy for the new project.
4. Keep the section order, the anchor-nav pattern, and the header/footer structure intact. Swap in the new project's own palette, fonts, photography, and copy.
5. Never carry over Zámečnictví MB's real copy, phone numbers, address, or brand colors.

## Site-wide architecture

**Single page, anchor navigation.** Header nav items scroll to same-page section IDs rather than linking to separate URLs. A "skip to content" link precedes the header for accessibility.

**Header** (sticky across the single page):
- Logo/wordmark image — far left, links back to the top/hero
- Horizontal anchor nav — 4 items in the reference (About → Services → Gallery → Contact)
- One visually distinct primary CTA button — far right, anchors straight to the contact section
- Nav markup is duplicated in the source (one set for desktop bar, one for a mobile off-canvas/drawer menu) — build both if a mobile breakpoint needs a hamburger drawer

**Footer** (bottom of the single page), lighter/more compact than a multi-page footer:
- Logo image
- Legal ID line (business registration numbers)
- "Quick links" list mirroring the header nav
- Contact list (address / phone / email)
- Copyright line
- No long brand-mission paragraph column here — this footer is intentionally terser than a multi-page site's footer

## Section order (top to bottom)

1. **Hero** — full-bleed photo placeholder, H1 statement, one-line subhead, 2 CTAs (primary → contact anchor, secondary → gallery anchor), plus a lightweight **2-item stat strip** directly below/overlapping the hero (not a full 4-column animated stats bar — just two short "years of experience" / "founding year" style facts)
2. **About** (`#o-nas`) — H2 + multi-paragraph prose description (no timeline device) → **4-item value-prop grid** (icon + short title + one-line description) → single supporting photo
3. **Services** (`#sluzby`) — H2 + grid of plain text service cards (title + paragraph, no images, no per-card CTA — flatter than a multi-page site's alternating image blocks)
4. **Gallery** (`#galerie`) — H2 + category filter pills + filtered image grid + a "view full gallery" button/expand action (kept in-page, not a separate route)
5. **Contact** (`#kontakt`) — H2 + intro line → two-column layout: (a) billing/contact-info list + call/email buttons + embedded map, (b) inquiry form with per-field inline validation hint text and a honeypot field
6. **Footer**

See `references/section-templates.md` for full detail on every section and `references/components.md` for how to build each reusable block.
​
references/components.md
# Reusable layout components — one-page template

Atomic blocks that make up the single-page site. No colors or copy — structure and hierarchy only.

---

## 1. Sticky header with anchor nav
- Skip-to-content link, visually hidden until focused (accessibility) — first element in the DOM.
- Logo image, links to the hero/top.
- Horizontal nav: plain anchor links (`#section-id`), not page routes.
- One primary CTA button, visually distinct (filled), anchors to the contact section — present in both the desktop nav bar and (duplicated) in a mobile drawer/off-canvas menu.
- No dropdowns, no utility bar, no search — same minimalism as the multi-page template but even leaner (4 nav items instead of 8).

## 2. Hero with inline stat strip
- Full-bleed background photo placeholder behind the content.
- H1: one strong declarative statement, can include a short trailing fragment (e.g. "...since [year].") as its own visual beat rather than a full second line.
- One-line supporting paragraph.
- Two CTAs side by side: primary (filled, → contact) + secondary (outline, → gallery).
- **Stat strip**: just 2 short facts (not 4), positioned directly below or overlapping the hero's lower edge — e.g. "[25+] years of experience" and "[1999] founding year". Much lighter-weight than a full stats-bar section; treat as part of the hero, not its own section.

## 3. Prose-led about section
- H2 heading.
- 2–3 full paragraphs of plain descriptive copy (company history/positioning/capabilities) — no numbered timeline, no index-number motif. This section is copy-first, not device-led.
- Followed by a **value-prop grid** (see #4).
- Followed by one single supporting photo (not a gallery, not a portrait+quote — just one image reinforcing the section).

## 4. Value-prop grid (4 items)
- 4-column grid (wraps to 2×2 on mobile).
- Each item: small icon (or icon placeholder) + short title (1–3 words) + one-line supporting description.
- No images, no borders/cards — pure icon+text, lighter than the multi-page template's photo-led card grid.
- This is the signature differentiator of this template vs. the multi-page one: value props are icon-led abstractions, not photo-led content pillars.

## 5. Plain text-card services grid
- H2 heading.
- Grid of N service items (5 in the reference), each just:
  - H3 title
  - One paragraph description
  - No image, no numbered index, no per-card CTA link
- Flatter and more compact than the multi-page template's alternating photo+text service blocks — appropriate when the business has many small offerings rather than 2–3 major ones worth a full block each.

## 6. Filterable gallery section
- H2 heading.
- Category filter pill row: "All" + N category pills (client-side filter).
- Image grid below, each image tagged by category for filtering.
- A single "view full gallery" button/link at the end — since this is a one-pager, treat this as an **expand-in-place or lightbox trigger**, not a navigation to a new URL (no dedicated `/galerie` route in this template).

## 7. Two-column contact section
- H2 heading + one intro sentence.
- **Left/first column — billing & contact info**:
  - Labeled rows: Address, Phone, Email, Company registration ID(s)
  - Two CTA buttons side by side: "Call" (tel: link) and "Send email" (mailto: link)
  - Embedded map (iframe) below the info list
- **Right/second column — inquiry form**:
  - Honeypot hidden field (spam trap)
  - Full name (required) — with inline validation hint text shown under the field (e.g. "please enter a name of at least 2 characters")
  - Email (required) — inline validation hint text
  - Phone (optional)
  - Message (required, multi-line) — inline validation hint text
  - Consent checkbox (required), with a fuller explanatory sentence about data use (not just "I agree" — spells out that data is used only for contact and not shared with third parties)
  - Submit button
- **Key difference from the multi-page template's contact form**: this one shows per-field inline validation/help text permanently under each required field (not just on error), and the consent copy is longer/more explicit about data handling.

## 8. Compact footer
- Logo image (can repeat the header logo).
- Legal ID line (registration numbers) directly under the logo — no separate mission paragraph.
- "Quick links" list — mirrors the anchor nav exactly.
- "Contact" list — address / phone / email, plain text (no icons required).
- Single copyright line at the bottom — no separate credit/"built by" bar needed (optional).

---

## Cross-cutting notes

- **No numbered-index motif** in this template — unlike the multi-page craftsman template, this site doesn't use large index numbers as a design device anywhere. Keep it out when replicating this specific layout.
- **Icon-led over photo-led**: the about section's USPs and the services grid both favor small icons/typography over large photography — photography is reserved for the hero, one about-section image, and the gallery only.
- **Sections compress what would be separate pages elsewhere**: About, Services, Gallery, and Contact are each a single scrollable section rather than a dedicated page — keep each section's content tight enough to work at "one screenful or two" of scrolling, since there's no page-level real estate to spread out.
- **Inline form validation copy**: carry forward the pattern of showing help/validation text under each required field, and a fuller GDPR-style consent sentence (what the data is used for + that it isn't shared) rather than a one-line checkbox label.
- **CTA hierarchy**: exactly one primary filled-button style + one secondary/outline style, same discipline as the multi-page template.
​
references/section-templates.md
# Section-by-section template (single scrolling page)

Full composition of the page, top to bottom. Component names refer to `components.md`. Content in [brackets] is a placeholder slot — fill with the new project's own content, never the reference site's.

---

## Header (sticky, present above all sections)

- Skip-to-content link
- Logo → links to top
- Anchor nav: [About] · [Services] · [Gallery] · [Contact]
- Primary CTA button → `#kontakt` style anchor: [Free inquiry]
- Duplicate nav markup for a mobile drawer if a hamburger breakpoint is needed

## 1. Hero (`components.md #2`)

- Full-bleed photo placeholder
- H1: [Precise statement about the core offering. Since [year].]
- Subhead: [One sentence elaborating: what kind of work, what makes the service complete.]
- CTAs: [Free inquiry] (primary, → contact) · [See our work] (secondary, → gallery)
- Stat strip (2 items): [25+ years of experience] · [1999 founding year]

## 2. About (`#o-nas`)

1. H2: [About us]
2. 2–3 paragraphs: [Company history/positioning], [range of services / full-service pitch], [specializations], [materials/technique note]
3. **Value-prop grid** (`#4`), 4 items:
   - [Quality] — [one-line description]
   - [Precision] — [one-line description]
   - [On-time delivery] — [one-line description]
   - [Individual approach] — [one-line description]
4. One supporting photo

## 3. Services (`#sluzby`)

1. H2: [Services]
2. **Plain text-card grid** (`#5`), N items (5 in the reference):
   - [Service 1 title] — [one paragraph]
   - [Service 2 title] — [one paragraph]
   - [Service 3 title] — [one paragraph]
   - [Service 4 title] — [one paragraph]
   - [Service 5 title] — [one paragraph]

## 4. Gallery (`#galerie`)

1. H2: [Gallery]
2. **Filter pills**: [All] · [Category 1] · [Category 2] · [Category 3] · [Category 4]
3. Image grid (filtered by pill selection)
4. [View full gallery] button (expand-in-place or lightbox — no separate route)

## 5. Contact (`#kontakt`)

1. H2: [Contact]
2. Intro line: [Call, email, or fill out the inquiry form — we'll get back to you with a proposal.]
3. **Two-column contact block** (`#7`):
   - Column A: [Billing & contact details] heading → Address / Phone / Email / Company reg. ID rows → [Call] + [Send email] buttons → embedded map
   - Column B: [Inquiry form] heading → honeypot → Full name* (+ inline hint) → Email* (+ inline hint) → Phone (optional) → Message* (+ inline hint) → consent checkbox (full sentence about data use) → Submit

## Footer (`#8`)

- Logo
- Legal ID line
- [Quick links]: same 4 anchor items as header nav
- [Contact]: address / phone / email
- © [year] [Company name]. [Rights reserved line.]

---

## Notes on adapting this template

- If the business needs a real portfolio with individual project pages, a priced product catalog, or more than ~5–6 total sections, consider the multi-page craftsman template instead — this one-pager works best when everything fits comfortably within 5 scrollable sections.
- The 2-item hero stat strip and 4-item value-prop grid are the two "quick trust" devices this template relies on instead of a full animated stats bar or a story timeline — keep at least one of them when adapting, since together they're what makes the page feel credible without much scrolling.
- If the project needs a blog, testimonials, or a dedicated pricing table, they can be inserted as additional anchor sections following the same H2 + component pattern used here — just add the new anchor to both the header nav and the footer quick-links list to keep them in sync.
​
assets/skeleton.html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>One-page layout skeleton — replace all content, colors, and copy</title>
<style>
  /*
    STRUCTURE-ONLY SKELETON, single scrolling page with anchor nav.
    Colors below are neutral grayscale PLACEHOLDERS ONLY — replace --bg, --fg,
    --muted, --accent, --accent-fg with the real project's palette.
    Fonts are system-default placeholders — replace --font-heading / --font-body.
  */
  :root{
    --bg:#ffffff; --fg:#111111; --muted:#666666; --line:#e5e5e5;
    --accent:#111111; --accent-fg:#ffffff;
    --font-heading: system-ui, sans-serif;
    --font-body: system-ui, sans-serif;
    --container: 1100px;
    --pad: 24px;
    --space-xs: 8px; --space-sm: 16px; --space-md: 32px;
    --space-lg: 64px; --space-xl: 96px;
  }
  *{box-sizing:border-box;}
  body{margin:0; font-family:var(--font-body); color:var(--fg); background:var(--bg); line-height:1.55;}
  h1,h2,h3{font-family:var(--font-heading); margin:0 0 var(--space-sm); line-height:1.15;}
  h1{font-size:clamp(2rem,5vw,3.2rem);}
  h2{font-size:clamp(1.5rem,3vw,2rem); margin-bottom:var(--space-md);}
  h3{font-size:1.05rem;}
  p{margin:0 0 var(--space-sm); color:var(--muted);}
  a{color:inherit;}
  .container{max-width:var(--container); margin:0 auto; padding:0 var(--pad);}
  .section{padding:var(--space-xl) 0; border-top:1px solid var(--line);}
  .skip-link{position:absolute; left:-9999px; top:0; background:var(--fg); color:var(--bg); padding:8px 16px; z-index:100;}
  .skip-link:focus{left:0;}
  .btn{display:inline-block; padding:13px 26px; border-radius:4px; font-weight:600; text-decoration:none; border:1px solid var(--fg); font-size:.95rem;}
  .btn-primary{background:var(--accent); color:var(--accent-fg); border-color:var(--accent);}
  .btn-secondary{background:transparent; color:var(--fg);}
  .cta-row{display:flex; gap:var(--space-sm); flex-wrap:wrap;}

  /* ---------- HEADER ---------- */
  header.site{position:sticky; top:0; z-index:10; background:var(--bg); display:flex; align-items:center; justify-content:space-between; padding:var(--space-sm) var(--pad); border-bottom:1px solid var(--line);}
  header.site .logo img{height:36px;}
  header.site nav{display:flex; gap:var(--space-md); flex-wrap:wrap;}
  header.site nav a{text-decoration:none; font-size:.95rem;}
  header.site .nav-cta{display:flex; align-items:center; gap:var(--space-md);}

  /* ---------- HERO ---------- */
  .hero{position:relative; min-height:70vh; display:flex; align-items:center; background:#333 center/cover no-repeat; color:#fff;}
  .hero::after{content:""; position:absolute; inset:0; background:linear-gradient(0deg, rgba(0,0,0,.55), rgba(0,0,0,.25));}
  .hero .container{position:relative; z-index:1;}
  .hero h1{color:#fff; max-width:760px;}
  .hero p{color:#eee; max-width:520px;}
  .stat-strip{display:flex; gap:var(--space-lg); margin-top:var(--space-lg); flex-wrap:wrap;}
  .stat-strip .stat{display:flex; align-items:baseline; gap:8px;}
  .stat-strip .num{font-size:1.6rem; font-weight:700;}
  .stat-strip .label{font-size:.85rem; color:#ddd;}

  /* ---------- VALUE-PROP GRID ---------- */
  .value-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md); margin:var(--space-md) 0 var(--space-lg);}
  .value-grid .icon{width:40px; height:40px; border-radius:50%; background:#ddd; margin-bottom:var(--space-xs);}
  .value-grid h3{margin-bottom:4px;}

  .about-photo{aspect-ratio:16/7; background:#ddd;}

  /* ---------- SERVICES: TEXT-CARD GRID ---------- */
  .text-card-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md);}
  .text-card{padding-right:var(--space-sm);}
  .text-card h3{margin-bottom:4px;}

  /* ---------- FILTER PILLS + GALLERY GRID ---------- */
  .pills{display:flex; gap:var(--space-xs); flex-wrap:wrap; margin-bottom:var(--space-md);}
  .pill{padding:8px 16px; border:1px solid var(--line); border-radius:999px; font-size:.85rem; cursor:pointer;}
  .pill.active{background:var(--fg); color:var(--bg); border-color:var(--fg);}
  .media-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:var(--space-md);}
  .media-grid .img{aspect-ratio:1/1; background:#ddd;}

  /* ---------- CONTACT: TWO COLUMN ---------- */
  .contact-grid{display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg);}
  .contact-list{list-style:none; margin:0 0 var(--space-md); padding:0;}
  .contact-list li{padding:var(--space-xs) 0; border-bottom:1px solid var(--line);}
  .contact-list .label{font-size:.8rem; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; display:block;}
  .map-placeholder{background:#ddd; min-height:220px; display:flex; align-items:center; justify-content:center; color:var(--muted); margin-top:var(--space-sm);}

  form.pattern .honeypot{position:absolute; left:-9999px; opacity:0;}
  form.pattern label{display:block; font-size:.85rem; margin-bottom:4px; font-weight:600;}
  form.pattern .field{margin-bottom:var(--space-sm);}
  form.pattern input, form.pattern textarea{width:100%; padding:12px; border:1px solid var(--line); border-radius:4px; font-family:inherit;}
  form.pattern .hint{font-size:.78rem; color:var(--muted); margin-top:4px;}
  form.pattern .consent{display:flex; gap:8px; align-items:flex-start; font-size:.82rem; color:var(--muted); margin-bottom:var(--space-md);}

  /* ---------- FOOTER ---------- */
  footer.site{border-top:1px solid var(--line); padding:var(--space-lg) 0; font-size:.9rem;}
  .footer-top{display:flex; justify-content:space-between; flex-wrap:wrap; gap:var(--space-lg); margin-bottom:var(--space-md);}
  .footer-top img{height:32px; margin-bottom:8px;}
  .footer-top .legal{color:var(--muted); font-size:.82rem;}
  .footer-links{display:flex; gap:var(--space-xl); flex-wrap:wrap;}
  .footer-links h4{font-size:.8rem; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); margin-bottom:var(--space-sm);}
  .footer-links ul{list-style:none; margin:0; padding:0;}
  .footer-links li{margin-bottom:6px;}
  .copyright{padding-top:var(--space-md); border-top:1px solid var(--line); color:var(--muted); font-size:.8rem;}

  @media (max-width: 800px){
    .value-grid{grid-template-columns:repeat(2,1fr);}
    .text-card-grid{grid-template-columns:repeat(2,1fr);}
    .media-grid{grid-template-columns:repeat(2,1fr);}
    .contact-grid{grid-template-columns:1fr;}
  }
</style>
</head>
<body>

<a class="skip-link" href="#hlavni-obsah">[Skip to content]</a>

<!-- ============ HEADER (sticky, anchor nav) ============ -->
<header class="site">
  <a class="logo" href="#hero"><img src="" alt="[Logo]" style="background:#eee; width:120px; height:36px;"></a>
  <div class="nav-cta">
    <nav>
      <a href="#o-nas">[About]</a>
      <a href="#sluzby">[Services]</a>
      <a href="#galerie">[Gallery]</a>
      <a href="#kontakt">[Contact]</a>
    </nav>
    <a href="#kontakt" class="btn btn-primary">[Free inquiry]</a>
  </div>
</header>

<main id="hlavni-obsah">

<!-- ============ HERO ============ -->
<section class="hero" id="hero">
  <div class="container">
    <h1>[Precise statement about the core offering. Since (year).]</h1>
    <p>[One sentence elaborating on the full-service pitch.]</p>
    <div class="cta-row">
      <a href="#kontakt" class="btn" style="background:#fff;color:#111;">[Free inquiry]</a>
      <a href="#galerie" class="btn" style="border-color:#fff;color:#fff;">[See our work]</a>
    </div>
    <div class="stat-strip">
      <div class="stat"><span class="num">[25+]</span><span class="label">[years of experience]</span></div>
      <div class="stat"><span class="num">[1999]</span><span class="label">[founding year]</span></div>
    </div>
  </div>
</section>

<!-- ============ ABOUT ============ -->
<section class="section container" id="o-nas">
  <h2>[About us]</h2>
  <p>[Paragraph one: company history and positioning.]</p>
  <p>[Paragraph two: full-service pitch — from design/measurement through material selection to installation.]</p>
  <p>[Paragraph three: specializations and materials.]</p>

  <div class="value-grid">
    <div><div class="icon"></div><h3>[Quality]</h3><p>[One-line description.]</p></div>
    <div><div class="icon"></div><h3>[Precision]</h3><p>[One-line description.]</p></div>
    <div><div class="icon"></div><h3>[On-time delivery]</h3><p>[One-line description.]</p></div>
    <div><div class="icon"></div><h3>[Individual approach]</h3><p>[One-line description.]</p></div>
  </div>

  <div class="about-photo"></div>
</section>

<!-- ============ SERVICES ============ -->
<section class="section container" id="sluzby">
  <h2>[Services]</h2>
  <div class="text-card-grid">
    <div class="text-card"><h3>[Service 1 title]</h3><p>[One paragraph description.]</p></div>
    <div class="text-card"><h3>[Service 2 title]</h3><p>[One paragraph description.]</p></div>
    <div class="text-card"><h3>[Service 3 title]</h3><p>[One paragraph description.]</p></div>
    <div class="text-card"><h3>[Service 4 title]</h3><p>[One paragraph description.]</p></div>
    <div class="text-card"><h3>[Service 5 title]</h3><p>[One paragraph description.]</p></div>
  </div>
</section>

<!-- ============ GALLERY ============ -->
<section class="section container" id="galerie">
  <h2>[Gallery]</h2>
  <div class="pills">
    <span class="pill active">[All]</span>
    <span class="pill">[Category 1]</span>
    <span class="pill">[Category 2]</span>
    <span class="pill">[Category 3]</span>
    <span class="pill">[Category 4]</span>
  </div>
  <div class="media-grid">
    <div class="img"></div><div class="img"></div><div class="img"></div><div class="img"></div>
    <div class="img"></div><div class="img"></div><div class="img"></div><div class="img"></div>
  </div>
  <a href="#" class="btn btn-secondary">[View full gallery]</a>
</section>

<!-- ============ CONTACT ============ -->
<section class="section container" id="kontakt">
  <h2>[Contact]</h2>
  <p style="max-width:560px;">[Call, email, or fill out the inquiry form — we'll get back to you with a proposal.]</p>

  <div class="contact-grid">
    <div>
      <h3>[Billing &amp; contact details]</h3>
      <ul class="contact-list">
        <li><span class="label">[Address]</span>[value]</li>
        <li><span class="label">[Phone]</span>[value]</li>
        <li><span class="label">[Email]</span>[value]</li>
        <li><span class="label">[Company ID / Tax ID]</span>[value]</li>
      </ul>
      <div class="cta-row">
        <a href="#" class="btn btn-primary">[Call]</a>
        <a href="#" class="btn btn-secondary">[Send email]</a>
      </div>
      <div class="map-placeholder">[Map embed]</div>
    </div>

    <div>
      <h3>[Inquiry form]</h3>
      <form class="pattern">
        <input class="honeypot" type="text" tabindex="-1" autocomplete="off">
        <div class="field">
          <label>[Full name] *</label>
          <input type="text">
          <div class="hint">[Please enter a name of at least 2 characters.]</div>
        </div>
        <div class="field">
          <label>[Email] *</label>
          <input type="email">
          <div class="hint">[Please enter a valid email address.]</div>
        </div>
        <div class="field">
          <label>[Phone (optional)]</label>
          <input type="tel">
        </div>
        <div class="field">
          <label>[Message] *</label>
          <textarea rows="5"></textarea>
          <div class="hint">[Please describe your inquiry (at least 10 characters).]</div>
        </div>
        <div class="field consent">
          <input type="checkbox">
          <span>[I agree to the processing of my personal data for the purpose of handling my inquiry. Data is used only for contacting me back and is not shared with third parties.]</span>
        </div>
        <button class="btn btn-primary" type="submit">[Send inquiry]</button>
      </form>
    </div>
  </div>
</section>

</main>

<!-- ============ FOOTER ============ -->
<footer class="site container">
  <div class="footer-top">
    <div>
      <img src="" alt="[Logo]" style="background:#eee; width:100px; height:32px; display:block;">
      <div class="legal">[Company ID] · [Tax ID]</div>
    </div>
    <div class="footer-links">
      <div>
        <h4>[Quick links]</h4>
        <ul>
          <li><a href="#o-nas">[About]</a></li>
          <li><a href="#sluzby">[Services]</a></li>
          <li><a href="#galerie">[Gallery]</a></li>
          <li><a href="#kontakt">[Contact]</a></li>
        </ul>
      </div>
      <div>
        <h4>[Contact]</h4>
        <ul>
          <li>[Address]</li>
          <li>[Phone]</li>
          <li>[Email]</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="copyright">© [Year] [Company name]. [All rights reserved.]</div>
</footer>

</body>
</html>
