# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This document is binding for every Claude Code session in this repository. Read it at the start of every session, not just once. If it conflicts with an individual user prompt, this document takes precedence unless the user explicitly says otherwise.

## Project status

**Source of truth for current status and full history is [`.claude/memory/index.md`](.claude/memory/index.md).** Read that file (and the memory system it indexes — `pravidla.md`, `memory.md`) at the start of every session, before this static section, since it is kept current while this paragraph is only a snapshot.

**First implementation draft exists.** `index.html`, `assets/css/style.css`, `assets/js/main.js`, and `api/contact.js` (plus `package.json`, `.env.example`, `robots.txt`, `sitemap.xml`) implement the full single-page site per the brief. It has not been deployed, the contact form has not been tested end-to-end with a real Resend key, all photos are placeholders, and several client facts (founding year, IČO/DIČ, domain) are still open — see `.claude/memory/index.md` for the current punch list. The brief (`Varchol-malir-prompt.md`) remains the source of truth for what to build — treat it as binding, not a suggestion open to silent reconsideration.

## Project context

- **Client:** Michal Varchol — Malířské práce Litoměřice (painting/coating contractor)
- **Industry:** interior painting, lacquering, facade coatings, large-scale industrial hall spraying
- **Contact:** Werichova 2007/2, 412 01 Litoměřice · +420 734 212 595 · mvarchy@gmail.com
- **Tone:** calm, sober, trustworthy craftsman — explicitly *not* corporate/marketing language. Michal is a tradesperson, not a company; copy should read like it comes from someone who actually does the work.
- **Tech stack:** no framework, no build step. If/when the Resend contact form is implemented, the API key must never live in client-side JS — use one thin serverless function (Vercel/Netlify) alongside the static files, and verify the send end-to-end rather than assuming it works.
- **Site structure:** single scrolling page, header nav links to same-page anchors — `#o-nas`, `#sluzby`, `#galerie`, `#kontakt`. No separate routes.
- **Design direction:** muted, earthy primary color (warm grey/greige or muted petrol — not corporate blue), warm off-white background, dark (not pure black) text. One or two recurring visual motifs tied to the painting trade — e.g. a brush-stroke section divider, a muted paint-swatch strip, or a masking-tape photo-frame edge. Pick one or two, not all, and repeat consistently.
- **Photo placeholders:** every empty photo slot must be a visibly distinct placeholder (dashed border, camera icon, caption, correct final aspect-ratio) — never stock photography as filler.

The full brief is in [`Varchol-malir-prompt.md`](Varchol-malir-prompt.md) in the project root. Section 0 of that file ("must not look like an AI template") is the single most important constraint on any implementation work here — re-check new sections against it before considering them done.

## Reference material in `.claude/`

These are flat skill/reference exports the user dropped in this repo, not live discoverable Claude Code skills (no `.claude/skills/<name>/SKILL.md` structure):

- `rules-skills.md` — the `web-project-brief` skill itself, which is what generated `Varchol-malir-prompt.md` and this file's structure. Use it as the template if the brief or this file need restructuring later (e.g. landing page → multi-page).
- `Antos-simple-site-skill.md` — a one-page craftsman site layout (header/hero/about/services/gallery/contact structure, component-level detail) usable as a structural starting point for this build.
- `not-AI-website-rules.md` — a Czech-language "humanize this text" pass (removes AI-sounding phrasing/tics). Apply to any client-facing copy before finalizing it.

## Memory system (`.claude/memory/`)

This project maintains a running memory system, separate from the reference material above:

- **`index.md`** — read this first, every session. Quick current-state snapshot plus navigation to the other two files.
- **`pravidla.md`** — distilled, actionable rules consolidated from the brief, this file, and the three reference docs above (design system, tech stack, page structure, copywriting checklist, working process). Check it before implementation or copy work.
- **`memory.md`** — append-only chronological log of every session: what changed, what was decided and why, open questions, newly known gaps. Never edit or delete past entries, only append.

Update `memory.md` and `index.md` at the end of any session where something actually changed (code, decisions, content, newly learned facts) — see the protocol in `index.md` for the exact steps. Update `pravidla.md` only when a rule itself changes, not just the project state.

## Working process

1. Paraphrase what's being asked in one sentence before making changes.
2. Check whether the request conflicts with the brief, breaks something already built, contradicts the "no templated AI look" principle, or silently changes tech stack/structure (vanilla stack, single-page anchor nav) — flag conflicts before implementing, don't silently comply with a bad request.
3. Never invent facts not in the brief (client counts, years of experience, prices, IČO/DIČ) — leave a placeholder or ask.
4. Before considering any deployment done: verify no console errors, the contact form actually sends (tested, not assumed), responsiveness across mobile/tablet/desktop, and accessibility basics (contrast, keyboard operability).
5. At the end of a working session where anything changed, update the memory system (`.claude/memory/memory.md` + `.claude/memory/index.md`) following the protocol in `index.md` — this is the only continuity the next session has. Keep the "Project status" section above accurate but treat the memory system as the authoritative, detailed record.
