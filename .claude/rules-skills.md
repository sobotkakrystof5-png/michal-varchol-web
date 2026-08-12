web-project-brief-skill
Skill: web-project-brief
Exported as a single Markdown file for reference/editing. To reinstall as a Claude skill, split this back into SKILL.md + assets/project-brief-template.md + assets/claude-md-template.md, or use the packaged .skill file.
FILE: SKILL.md
name: web-project-brief
description: Generates a pair of documents for briefing a client website into Claude Code — a detailed PROJECT-BRIEF prompt (design, tech stack, structure, content, functional requirements) and a CLAUDE.md (persistent behavior and context across sessions). Use this skill whenever the user wants to prepare a brief/prompt for Claude Code to build a client website, a custom marketing site, a landing page, or a multi-page site — even if phrased differently, like "put together a brief", "write up a spec for Claude Code", "make me a CLAUDE.md", or when the user describes a new client and their company with the intent of building them a website. Also trigger when the user just says something like "new client, same process as last time" — this is meant to be a repeatable process, not something rewritten from scratch each time.
Web Project Brief — Claude Code brief generator
This skill was distilled from two real projects (a craftsperson with a personal story, built on Next.js as a multi-page site; an established LLC-type company, built on vanilla HTML/CSS/JS as a landing page) and generalizes what worked in both into a repeatable process. Goal: turn a conversation with the user about a new client into two artifacts — PROJECT-BRIEF.md (a detailed prompt for Claude Code) and CLAUDE.md (persistent behavior rules + context for that repo).
The core principle this skill protects above all else: the resulting website must not look like an "AI template". That is the heart of section 0 in both templates and must never be weakened or dropped when generating a new brief — it is the single most valuable thing carried over from the earlier projects.
When and how to trigger
This skill is for starting a new client website project. If the user just wants to edit an already-existing PROJECT-BRIEF.md/CLAUDE.md, edit those files directly (see "Editing an existing brief" below) — don't start over from the templates.
Process
1. Gather the missing information (a conversation, not a checklist to tick off)
If the conversation already contains enough information (the user uploaded a logo, pasted company copy, stated a tech stack), don't re-ask — just fill in the gaps. Ask concisely about what actually shapes the document's structure:
Client and content: company name, industry, how long they've been in business, contact details, any source text about the company (never invent facts — if the client didn't state a number of projects/clients, don't make one up).
Logo/visuals: does the client have a logo? What colors does it suggest? Does it need background removal or reformatting?
Tone: does the company have a personal story (a founder, a craftsperson), or is it an established business with no need for storytelling? This directly determines whether sections 1 and 4 of the template include a timeline/storytelling section — don't force a personal narrative where there's no material for it.
Structure: landing page (scroll + anchors), or multi-page site (routing, separate URLs)? If this isn't clear from context, ask.
Tech stack: Next.js/React, or plain HTML/CSS/Vanilla JS, or something else? If a service requiring an API key (Resend, Stripe, anything) comes up alongside a vanilla/static stack — flag this immediately: it needs at least one thin serverless function, since the key can't live in client-side code. Don't let this surface only during implementation.
Photos: available now, or is this still a design draft with placeholders? Roughly how many (portfolio, gallery)?
Skills/tools: does the user want to use a specific design skill (e.g. frontend-design) or a custom skill they have locally in Claude Code? If so, mention it in the brief as a note for Claude Code, but don't duplicate another skill's content — just reference it.
If the answer to "landing page vs. multi-page" or "tech stack" is unclear and would fundamentally change the document's structure, ask via ask_user_input_v0 (2–3 short questions), the same way as in the two prior projects — don't guess on the user's behalf; this is an irreversible decision that would otherwise mean rewriting the whole document later.
2. Fill in the templates
Use assets/project-brief-template.md and assets/claude-md-template.md as the base skeleton. Replace the placeholders ({{...}}) with real content. Rules for filling them in:
Never shorten or weaken section 0 (anti-AI-template) in the project-brief template — it's the single most important part and must stay concrete (what to avoid + what to do instead + a custom visual motif tied to the client's industry, not something generic).
{{DOMAIN_VISUAL_INSPIRATION}} — come up with a concrete visual motif idea based on the client's industry (for metalwork/locksmithing, e.g. a weld seam, a technical drawing, dimension lines — but for a different industry, find a different, industry-specific inspiration, not a recycled one).
Structure (sections 3–4 of the brief): fill in either the multi-page variant (route list) or the landing-page variant (anchor list) — never leave both, never leave conflicting instructions in place at once.
CLAUDE.md section 5 (Project status) should be filled in with sensible defaults even on first creation (e.g. "Current phase: design draft, awaiting client approval") — this section is new relative to both prior projects and functions as a log that must be updated in every subsequent session, not just once at setup. Tell the user this explicitly so they know to keep coming back to this file.
Never invent facts about the client (client counts, years of experience, specific prices) if the user didn't provide them — leave a placeholder or ask.
3. Create both files and save them under clear, project-specific names
{client-slug}-claude-code-prompt.md (or PROJECT-BRIEF.md, if the user prefers a generic name for the project root)
CLAUDE.md — if the user already has a CLAUDE.md from another project in the current outputs directory, don't silently overwrite it — name the new file differently (e.g. CLAUDE-{client-slug}.md) and note that it should be renamed to CLAUDE.md once placed in that project's own repo root, since that's the filename Claude Code loads automatically.
Present both files to the user (present_files), and briefly summarize what's inside and which key choices (structure, stack, tone) you made based on the conversation — not as a long report, just a few sentences.
Editing an existing brief
If the user wants to modify an already-created PROJECT-BRIEF.md/CLAUDE.md (not start a new project), don't route it back through the templates — find the specific file, edit it targeted (str_replace), and above all check whether the change conflicts with another part of the document (a classic case: changing the structure from landing page to multi-page must also be reflected in sections 3, 4, and CLAUDE.md section 4 — not just the part the user was looking at). This is a real mistake to avoid — in the prior projects, a structure change had to be propagated to multiple places across both documents at once.
When unsure
Same rule that lives inside the generated documents themselves: if you're unsure about the client's industry, the tone to use, or whether a visual idea is too generic — ask, don't guess. This skill exists primarily to protect the quality and originality of the output, not speed.
FILE: assets/project-brief-template.md
CLAUDE CODE PROMPT — {{PROJECT_NAME}} Website
Copy this entire document as the first task into Claude Code (in a new project/repo).
0. CRITICAL — THIS WEBSITE MUST NOT LOOK LIKE AN "AI TEMPLATE"
This is the single most important instruction in this brief and it must inform every decision below. The vast majority of AI-generated websites look the same — recognizable, uniform, soulless. This website must be the exact opposite: it must look like it was designed and hand-tuned by an experienced designer specifically for this client, with attention to every detail.
Specifically AVOID these typical "AI website" patterns:
The generic hero layout of "big centered headline + subheadline + two buttons side by side + illustration/gradient on the right" — if you do use this layout, give it asymmetry, unusual proportions, elements that break the grid, an unconventional CTA placement.
Excessive symmetry and centering of everything — work with an asymmetric grid, let elements spill over, create visual tension.
Generic "feature card" grids with the same icon-on-top, heading, text pattern repeated 3–4 times identically — treat every section with its own composition, not a repeated card pattern.
Overused gradients (purple-blue, rainbow), glassmorphism without purpose, generic 3D illustrations, and unmodified stock icon sets.
Predictable "fade-in + slide-up on everything on scroll" animations — use animation deliberately, with its own rhythm, not as a blanket effect across the whole page.
Lorem-ipsum-style placeholder text or generic marketing phrases ("We are a team of professionals", "Quality is our priority") — every piece of text must be concrete, on-point, and reflect the client's actual content and voice.
Identical spacing and alignment in every section (same padding, same container width throughout) — let sections breathe differently, vary density and rhythm.
A font pairing where both heading and body look like an out-of-the-box Tailwind/shadcn default with no typographic personality — micro-tuning (tracking, line-height, size contrast) must be deliberate, not default.
Instead:
Design one or two custom visual motifs/elements rooted in the client's industry ({{DOMAIN_VISUAL_INSPIRATION}}) that recur throughout the site and make it memorable. Keep this motif consistent, but use it as a signature, not decoration on every corner.
Give every section/page its own compositional logic — a different text/image ratio, different alignment, different rhythm, so browsing the site feels like flipping through a thoughtfully designed portfolio, not repeating one component.
Details that make the difference: subtle hover micro-interactions tailored to the content (not a generic scale-105), deliberate transitions between sections/pages, authentic, specific copy in the client's voice — not generic phrases.
Write CSS/components as if a person tuned them pixel by pixel ten times over — consistent, but not machine-uniform.
If Claude Code is unsure whether a given element looks templated, it should ask or propose a more original alternative rather than reaching for the most common solution.
1. PROJECT CONTEXT AND CLIENT CONTENT
Company/client: {{CLIENT_NAME}}
Industry: {{INDUSTRY}}
Established / in business since: {{FOUNDING_YEAR}}
Address: {{ADDRESS}}
Company IDs (if relevant): {{ICO_DIC}}
Phone: {{PHONE}}
Email: {{EMAIL}}
Source content about the company (client-provided material — rephrase stylistically, but keep all facts and content, do not invent additional facts, do not guess at numbers the client did not provide):
{{RAW_CLIENT_CONTENT}}
Website goal: {{WEBSITE_GOAL}} — it must feel immediately trustworthy and must generate new customer inquiries (form, phone).
Tone: {{BRAND_TONE}} — (e.g. "human, personal story" for a craftsperson with a real personal story, or "matter-of-fact, solid, no forced familiarity" for an established company with no personal brand — choose based on the client's actual character, don't force storytelling where there's no material for it).
2. LOGO AND DESIGN SYSTEM
Logo
{{LOGO_INSTRUCTIONS}}
(If the client supplied a logo with an unsuitable background: note that the background must be removed / processed into a transparent PNG/SVG, keeping the logo itself/its colors unchanged.)
Colors
Primary color: {{COLOR_PRIMARY}} — use as an accent (CTAs, icons, hover states, dividers), not as a flat background.
White/off-white: as the dominant background.
Dark for text: near-black/a dark shade of the primary color, not pure black.
Secondary/accent color (if any): {{COLOR_SECONDARY}} — use sparingly, not as a flat area.
Recommended ratio: roughly 80–85% neutral (white/dark), the rest accent color(s). The accent color must not dominate large areas — it should draw attention, not fill space.
Check contrast (WCAG AA minimum) for every text/background combination, especially accent color on white and white text on the accent color.
Typography
Headings: a bold, confident font with personality (not an unstyled system default) — e.g. Space Grotesk, Sora, or Inter with deliberately tuned tracking.
Body text: a readable sans-serif with good line-height.
Hierarchy: clearly distinct heading levels, a strong hero headline.
Visual language
{{VISUAL_STYLE_NOTES}} (industrial / organic / minimalist / premium — depending on the client's industry and character).
Photo placeholders: always a clearly labeled frame (gray background, camera icon, caption describing what belongs there, aspect-ratio matching the final layout) — never stock photos as filler.
3. TECHNICAL STACK
Chosen stack: {{TECH_STACK}}
If the stack is Next.js / React-based:
Next.js (App Router) + TypeScript, Tailwind CSS, Framer Motion for animation, React Hook Form + Zod for form validation.
If the stack is plain HTML/CSS/Vanilla JS:
No frontend framework, no build step for the main site.
If the site uses Resend (or any other service requiring an API key) for the contact form, the API key must never live in client-side JS. Handle this with a single thin serverless function (Vercel/Netlify function) alongside the static files — not a whole extra framework. This must be explicitly verified for every project combining Resend (or similar) with a vanilla/static stack — never silently assume it will work without a backend.
Site structure: {{STRUCTURE_TYPE}}
If multi-page website:
True routing — every navbar item is its own URL/route. The homepage is a short overview/hub linking further, not a compilation of all content. No anchors (#section) between the main navigation items.
Route list: {{ROUTES_LIST}}
Shared layout with Header/Footer, current page visually highlighted in navigation.
Benefit: dedicated SEO metadata per page.
If single-page website (landing page):
One scrollable page, header navigation links to anchors: {{ANCHORS_LIST}}.
Smooth scroll, scrollspy (active nav link matches the section currently in the viewport).
Map (if relevant): Mapy.cz iframe or Google Maps embed — a simple embed, no heavy JS SDK.
Images: lazy loading (next/image or loading="lazy" for vanilla).
Responsiveness: mobile-first, fully responsive at every breakpoint.
SEO: meta tags, OpenGraph, sitemap.xml, robots.txt, semantic HTML5.
4. CONTENT STRUCTURE (SECTIONS/PAGES IN ORDER)
{{CONTENT_STRUCTURE}}
(Break down each section/page individually: what it contains, what layout, where the photo placeholders are, what CTAs it has and where they lead. For companies with a personal story, include a timeline/storytelling section. For product/portfolio-driven companies, include a projects/portfolio section with placeholders. The contact section/page always includes: contact details, a map (if relevant), a form.)
5. FUNCTIONAL REQUIREMENTS — CONTACT FORM
{{CONTACT_FORM_SPEC}}
Always include, regardless of implementation:
Input validation (required fields, email format) — both client-side and server-side.
Secure submission (API key never in client-side code).
A honeypot or other basic spam protection.
Loading/success/error states on the frontend, form reset after success.
A clear statement of exactly where the inquiry email is sent.
6. RULES FOR PHOTO PLACEHOLDERS
If the client hasn't supplied photos yet (typical for a first draft): no stock/external images used as filler.
Every placeholder = a clearly, visually distinct frame (dashed/thin border, neutral background, camera icon, caption describing what belongs there).
Placeholders must have the final aspect-ratio set so the layout/CSS doesn't need to change once real photos are dropped in.
State exact counts and locations: {{PHOTO_PLACEHOLDER_COUNTS}}
7. ACCESSIBILITY AND PERFORMANCE
Text-to-background contrast at least WCAG AA.
Semantic HTML, alt text on all images (including a descriptive alt for placeholders, ready for future replacement), correct heading hierarchy (one H1 per page).
Form fully keyboard-operable, clear validation error messages.
Image optimization (formats, sizes) — structure the project so optimized final photos can be dropped in easily.
Basic Core Web Vitals awareness: no unnecessary render-blocking scripts, minimize layout shift (hence the fixed aspect-ratio on placeholders/images).
8. LEGAL REQUIREMENTS (IF RELEVANT)
A GDPR consent checkbox on the form — {{GDPR_TEXT_NOTE}}.
Consider whether the site needs a dedicated "Privacy Policy" and "Terms of Service" page/section — if so, include it as a placeholder page/section to be filled in later by the client/a lawyer; do not generate legal text yourself.
A cookie banner, if the site uses analytics/cookies beyond strictly necessary ones.
9. STEP-BY-STEP IMPLEMENTATION PLAN
{{IMPLEMENTATION_STEPS}}
(Base skeleton, adapt to the chosen stack and structure:)
Initialize the project per the chosen stack.
Set up design tokens (colors, fonts, spacing).
Build the base layout (Header, Footer / navigation matching the structure type).
Implement each section/page in a logical order.
Add animations/micro-interactions deliberately, not blanket-applied.
Implement the photo placeholder system.
Implement the contact form + secure submission.
Embed the map (if relevant).
Verify full responsiveness at every breakpoint.
Run an SEO and accessibility check.
Test the build/deployment, verify the form works end to end.
10. THE FINAL IMPRESSION THE SITE SHOULD LEAVE
The site must, at first glance, feel like {{DESIRED_IMPRESSION}} — and must not be recognizable as "a website built by an AI tool". It must be clear, fast, flawless on mobile, and must clearly guide the visitor toward one action — an inquiry. A visitor should feel like the site was designed by someone who knew this client and their industry in detail — not like they went through a generator.
Note for Claude Code: Write clean, well-commented code, keep a consistent structure and naming convention, and set up the project so real photos and copy can be dropped in easily without touching the code structure. Before finishing each section/page, ask yourself: "Does this look like deliberate work designed for this specific client, or like a generic template?" — if the latter, rework it per section 0.
FILE: assets/claude-md-template.md
CLAUDE.md — {{PROJECT_NAME}} Project
This document is binding for every Claude Code session in this repository. Read it at the start of every session, not just once. If it conflicts with an individual user prompt, this document takes precedence unless the user explicitly says otherwise.
1. WHO THE USER IS AND HOW TO TALK TO THEM
The user is the project's owner/requester, not a junior developer who needs to be walked through everything. Act like an experienced, honest technical/PR consultant, not an assistant trying to be liked.
No fluff, no unnecessary enthusiasm. Be matter-of-fact.
If a request is good, say so in one sentence and move on.
If a request is bad, unnecessary, risky, or conflicts with what's already been built — say so plainly, at the start of your response, not buried at the end or wrapped in compliments.
Never sugarcoat or apologize for stating an inconvenient truth.
Be concise. An answer that could be 3 sentences shouldn't be 15.
Nothing outside this project matters to you.
2. MANDATORY PROCESS BEFORE EVERY STEP
Before making any code change or starting on a new prompt:
What the user is asking for — paraphrase it in one sentence.
Impact on the project — check whether the request:
conflicts with the existing structure, design, or content described in {{PROJECT_BRIEF_FILENAME}},
breaks something that already works (the form, navigation, responsiveness, SEO),
contradicts the "no templated AI look" principle,
silently changes the tech stack or site structure (see section 4) — if a future request effectively requires a different technology or a different structure (e.g. switching from a landing page to a multi-page site or vice versa), flag it and leave the decision to the user — don't just do it silently.
If something is a problem — state it clearly before implementing anything. Don't implement a bad request just because the user asked for it.
If everything checks out — go straight to implementation.
3. GROUND RULES
Never bullshit. If you don't know something, if it doesn't work, or if you're unsure about something, say so directly.
Be consistent. The same standards apply at the start of the project as at the end.
Don't make silent decisions for the user. If there's a choice between approaches with different tradeoffs, state it briefly and say what you recommend and why.
Before any deployment, always verify that the site runs with no console errors, that the form actually sends a message (test it), that responsiveness works on mobile/tablet/desktop, and that nothing breaks accessibility (contrast, keyboard operability).
If you're unsure about something — ask immediately. Don't guess, don't fill in missing information with your own assumption. This applies to photo placeholders, copy, and technical or design decisions alike.
4. PROJECT CONTEXT (SUMMARY)
Client: {{CLIENT_NAME}} — {{CLIENT_SHORT_DESCRIPTION}}
Industry/offering: {{INDUSTRY_SUMMARY}}
Tech stack: {{TECH_STACK_SUMMARY}}
Site structure: {{STRUCTURE_SUMMARY}} — this is a deliberate, binding decision, not a suggestion open to silent reconsideration.
Design: {{DESIGN_SUMMARY}}
Photos: {{PHOTO_STATUS}} (e.g. "project is still in the design-draft phase — every photo slot is an empty, clearly labeled placeholder; photos will be added once the client approves the design, don't replace them without source material").
Top priority: originality, no templated AI look (see {{PROJECT_BRIEF_FILENAME}} section 0), a matter-of-fact, trustworthy presentation.
The full brief is in {{PROJECT_BRIEF_FILENAME}} in the project root — when anything is unclear, treat it as the source of truth.
5. PROJECT STATUS AND DECISIONS (UPDATE CONTINUOUSLY)
Update this section at the end of every session — it's the only way the next session (which has no memory of this one) stays in continuity. Keep entries short, facts only, not process narration:
Current phase: {{PROJECT_PHASE}} (e.g. design draft / content implementation / adding real photos / testing / launch)
Latest major decisions: {{LAST_DECISIONS}} (e.g. "2024-XX-XX: chose mailto instead of Resend because the client doesn't have a domain to verify a sender yet")
Open questions waiting on the client/user: {{OPEN_QUESTIONS}}
What is deliberately NOT done yet, and why (so the next session doesn't "fix" it as a bug): {{KNOWN_GAPS}}
6. WHAT TO DO WHEN A USER PROMPT CONFLICTS WITH THIS DOCUMENT
Flag the conflict, explain it in one or two sentences, and ask for confirmation before making an irreversible change (e.g. changing the tech stack, changing the site structure, altering the design system, or replacing a placeholder with real content without source material). For reversible/minor things, a heads-up is enough — then proceed per the user's request.