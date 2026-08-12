# CLAUDE CODE PROMPT — Malířské práce Litoměřice (Michal Varchol) Website

Copy this entire document as the first task into Claude Code (in a new project/repo).

---

## 0. CRITICAL — THIS WEBSITE MUST NOT LOOK LIKE AN "AI TEMPLATE"

This is the single most important instruction in this brief and it must inform every decision below. The vast majority of AI-generated websites look the same — recognizable, uniform, soulless. This website must be the exact opposite: it must look like it was designed and hand-tuned by an experienced designer specifically for this client, with attention to every detail.

**Specifically AVOID these typical "AI website" patterns:**
- The generic hero layout of "big centered headline + subheadline + two buttons side by side + illustration/gradient on the right" — if you do use this layout, give it asymmetry, unusual proportions, elements that break the grid, an unconventional CTA placement.
- Excessive symmetry and centering of everything — work with an asymmetric grid, let elements spill over, create visual tension.
- Generic "feature card" grids with the same icon-on-top, heading, text pattern repeated 3–4 times identically — treat every section with its own composition, not a repeated card pattern.
- Overused gradients (purple-blue, rainbow), glassmorphism without purpose, generic 3D illustrations, and unmodified stock icon sets.
- Predictable "fade-in + slide-up on everything on scroll" animations — use animation deliberately, with its own rhythm, not as a blanket effect across the whole page.
- Lorem-ipsum-style placeholder text or generic marketing phrases ("Jsme tým profesionálů", "Kvalita je naší prioritou") — every piece of text must be concrete, on-point, and reflect the client's actual content and voice.
- Identical spacing and alignment in every section (same padding, same container width throughout) — let sections breathe differently, vary density and rhythm.
- A font pairing where both heading and body look like an out-of-the-box Tailwind/shadcn default with no typographic personality — micro-tuning (tracking, line-height, size contrast) must be deliberate, not default.

**Instead:**
- Design **one or two custom visual motifs/elements** rooted in the client's trade — painting and coating work. Good candidates: a soft diagonal **brush-stroke divider** used between sections instead of a straight line; a thin **paint-swatch/color-chip strip** used sparingly as a section marker (not a rainbow, 2–3 muted tones max); a subtle **masking-tape-edge** detail on framed photo placeholders. Pick one or two of these, not all three, and repeat them consistently as a signature — not decoration on every corner.
- Give every section its **own compositional logic** — a different text/image ratio, different alignment, different rhythm, so browsing the site feels like flipping through a thoughtfully designed portfolio, not repeating one component.
- Details that make the difference: subtle hover micro-interactions tailored to the content (not a generic `scale-105`), deliberate transitions between sections, authentic, specific copy in the client's voice — not generic phrases.
- Write CSS/components as if a person tuned them pixel by pixel ten times over — consistent, but not machine-uniform.

If Claude Code is unsure whether a given element looks templated, it should ask or propose a more original alternative rather than reaching for the most common solution.

---

## 1. PROJECT CONTEXT AND CLIENT CONTENT

**Company/client:** Michal Varchol — Malířské práce Litoměřice
**Industry:** Malířské a lakýrnické práce, fasádní nátěry, velkoplošné stříkání hal
**Established / in business since:** {{FOUNDING_YEAR}} — not provided by client yet. Do not invent a number. Show a placeholder in the hero stat strip (e.g. "[X] let zkušeností") clearly marked for the client to fill in later.
**Address:** Werichova 2007/2, 412 01 Litoměřice
**Company IDs (IČO/DIČ):** not provided — leave as a placeholder in the footer, do not invent.
**Phone:** +420 734 212 595
**Email:** mvarchy@gmail.com

**Source content about the company (client-provided material — rephrase stylistically, but keep all facts and content, do not invent additional facts, do not guess at numbers the client did not provide):**

Michal Varchol provádí malířství, lakýrnictví, fasádní nátěry a velkoplošné stříkání hal. Cílem je překonávat očekávání zákazníků a poskytovat vysoce kvalitní malířské služby. Využívá moderní techniky a aktuální trendy v oblasti malby pokojů a pracuje pouze s kvalitními, ověřenými materiály, které zajišťují spolehlivost a dlouhou životnost provedených úprav. Firma se zaměřuje na provádění komplexních malířských a lakýrnických prací s důrazem na profesionální přístup, preciznost a efektivní komunikaci s klienty. Dodržování stanovených termínů a spolehlivost patří mezi hodnoty, na kterých staví svou pozici na trhu v oblasti renovací a revitalizací interiérů i vnějších částí budov.

Sídlí v Litoměřicích, za zákazníkem dojíždí do vzdálenosti až 30 km.

**Website goal:** Prezentační jednostránkový web, který působí okamžitě důvěryhodně a generuje nové poptávky (formulář, telefon).

**Tone:** Klidný, střízlivý, řemeslný, důvěryhodný — žádná umělá familiárnost, žádné nadužívané marketingové fráze. Michal je řemeslník, ne korporace — text má znít jako od člověka, který svou práci skutečně dělá, ne jako generická reklama.

---

## 2. LOGO AND DESIGN SYSTEM

### Logo
Klient zatím logo nedodal. Vytvoř jednoduchý textový wordmark ("Malířské práce Litoměřice" nebo zkráceně "M. Varchol"), střízlivý, bez ikon-klišé (žádný váleček s kapkou barvy jako generická ikonka). Nech prostor pro budoucí nahrazení skutečným logem.

### Colors
- **Primary color:** tlumená, zemitá barva blízká teplé šedé/greige nebo tlumené modrozelené (petrol) — vyhni se čistě "korporátní" modré. Konkrétní odstín navrhni sám, ale drž se jemné, nekřiklavé palety.
- **White/off-white:** dominantní pozadí (ne čistě bílá, spíš jemně teplá bílá/krémová).
- **Dark for text:** tmavá odstínová verze primární barvy, ne čistá černá.
- **Secondary/accent color (volitelně):** jedna tlumená doplňková barva pro drobné detaily (např. paint-swatch pruh) — max. 2–3 odstíny celkem, žádná duha.
- Doporučený poměr: cca 80–85 % neutrální plochy (bílá/tmavá), zbytek accent barva. Accent barva nesmí zabírat velké plochy — má upoutat pozornost, ne vyplňovat prostor.
- **Zkontroluj kontrast** (min. WCAG AA) pro každou kombinaci text/pozadí.

### Typography
- Nadpisy: výrazné, sebevědomé písmo s charakterem (ne nestylovaný systémový default) — např. něco v duchu Fraunces, Sora nebo Inter s cíleně doladěným trackingem.
- Text: čitelné sans-serif písmo s dobrým řádkováním.
- Hierarchie: jasně odlišené úrovně nadpisů, silný hero nadpis.

### Visual language
- Střízlivý, profesionální, řemeslný — ne "startupový" vzhled. Jemné, klidné, jednoduché layouty s vyváženou hierarchií (viz sekce 0 pro konkrétní motiv).
- Fotky-placeholdery: vždy jasně označený rámeček (šedé pozadí, ikona fotoaparátu, popisek co tam bude, `aspect-ratio` odpovídající finálnímu layoutu) — **nikdy stock fotky jako výplň.**

---

## 3. TECHNICAL STACK

**Chosen stack:** Vanilla HTML/CSS/JS — žádný frontend framework, žádný build krok pro hlavní web.

**Formulář a e-mail (Resend):** Klient chce, aby formulář skutečně odesílal e-mail. API klíč nesmí nikdy být v client-side JS. Řeš to jednou tenkou serverless funkcí (Vercel/Netlify function) vedle statických souborů — ne celý framework navíc. Toto musí být explicitně ověřeno a otestováno end-to-end, nikdy tiše nepředpokládej, že to půjde bez backendu.

**Site structure:** Single-page (landing page) s anchor navigací — viz níže.

- Jedna scrollovací stránka, header navigace odkazuje na anchory: `#o-nas`, `#sluzby`, `#galerie`, `#kontakt`.
- Smooth scroll, scrollspy (aktivní nav odkaz odpovídá sekci právě viditelné ve viewportu).
- Mapa: Mapy.cz iframe nebo Google Maps embed — jednoduchý embed, žádné těžké JS SDK.
- Obrázky: lazy loading (`loading="lazy"`).
- Responzivita: mobile-first, plně responzivní na každém breakpointu.
- SEO: meta tagy, OpenGraph, sitemap.xml, robots.txt, sémantické HTML5.

---

## 4. CONTENT STRUCTURE (SECTIONS, IN SCROLL ORDER)

**Header (sticky přes celou stránku)**
- Wordmark vlevo, odkazuje na hero
- Anchor nav: O mně → Služby → Galerie → Kontakt
- Jedno výrazné CTA tlačítko vpravo: "Nezávazná poptávka" → kotva na kontakt
- Mobilní verze: hamburger/off-canvas menu se stejnými odkazy

**1. Hero**
- Full-bleed fotka-placeholder (malíř při práci / štětec na stěně)
- H1: konkrétní, ne generický claim o kvalitě a spolehlivosti malířských a lakýrnických prací
- Jednořádkový podnadpis: malování, fasádní nátěry a velkoplošné stříkání hal v Litoměřicích a okolí
- 2 CTA: primární "Poptat práci" → kontakt, sekundární "Prohlédnout práce" → galerie (dej jim asymetrické, ne mechanicky vystředěné rozmístění)
- Lehký 2-položkový stat strip pod/přes hero: "[X] let zkušeností" (placeholder na číslo) · "Litoměřice a okolí do 30 km"

**2. O mně** (`#o-nas`)
- H2 + víceodstavcový text: kdo je Michal Varchol, přístup k práci, moderní techniky, kvalitní materiály (viz zdrojový obsah výše — přeformuluj stylisticky, fakta nezkresluj)
- 4-položkový value-prop grid (ikona + krátký titulek + jednořádkový popis), ale ne jako 4 identické karty — dej gridu vlastní kompoziční logiku (např. nerovnoměrné sloupce, jeden prvek zvýrazněný). Náměty: Kvalitní materiály · Moderní techniky · Dodržování termínů · Individuální přístup
- 1 doprovodná fotka-placeholder

**3. Služby** (`#sluzby`)
- H2 + grid textových karet (titulek + odstavec, bez obrázků, bez CTA na kartě):
  1. Malířské práce (interiéry)
  2. Lakýrnické práce
  3. Fasádní nátěry
  4. Velkoplošné stříkání hal (průmyslové objekty)

**4. Galerie** (`#galerie`)
- H2 + filtrovací pilulky kategorií: Interiéry / Fasády / Průmyslové haly
- Grid fotek-placeholderů (klient zatím nemá fotky — čistě prázdné, jasně označené rámečky)
- Tlačítko "Zobrazit celou galerii" (v rámci stránky, žádná samostatná route)

**5. Kontakt** (`#kontakt`)
- H2 + úvodní řádek
- Dvousloupcový layout:
  - (a) kontaktní údaje (adresa, telefon, e-mail) + tlačítka pro volání/e-mail + vložená mapa
  - (b) poptávkový formulář: jméno, e-mail, telefon, zpráva — s inline validací a honeypot polem proti spamu

**Footer**
- Wordmark
- Řádek s IČO/DIČ (placeholder, klient zatím nedodal)
- "Rychlé odkazy" zrcadlící header nav
- Kontaktní seznam (adresa/telefon/e-mail)
- Copyright řádek

---

## 5. FUNKČNÍ POŽADAVKY — KONTAKTNÍ FORMULÁŘ

Formulář odesílá e-mail přes Resend (nebo obdobnou službu) skrze tenkou serverless funkci — API klíč nikdy v client-side kódu.

Vždy zahrň:
1. Validaci vstupů (povinná pole, formát e-mailu) — na straně klienta i serveru.
2. Bezpečné odeslání (API klíč nikdy v client-side kódu).
3. Honeypot nebo jinou základní ochranu proti spamu.
4. Loading/success/error stavy na frontendu, reset formuláře po úspěšném odeslání.
5. Jasně uvedené, na jaký e-mail poptávka chodí (mvarchy@gmail.com).

---

## 6. PRAVIDLA PRO FOTO-PLACEHOLDERY

- Klient zatím fotky nedodal: **žádné stock/externí fotky jako výplň.**
- Každý placeholder = jasně vizuálně odlišený rámeček (přerušovaný/tenký okraj, neutrální pozadí, ikona fotoaparátu, popisek co tam patří).
- Placeholdery musí mít nastavený finální `aspect-ratio`, aby se layout/CSS nemusel měnit po vložení skutečných fotek.
- Počty a umístění: 1× hero fotka, 1× fotka v sekci O mně, min. 6× fotky v galerii (rozděleno mezi 3 kategorie filtru).

---

## 7. PŘÍSTUPNOST A VÝKON

- Kontrast textu na pozadí minimálně WCAG AA.
- Sémantické HTML, `alt` texty na všech obrázcích (včetně popisného alt textu pro placeholdery, připraveného na budoucí nahrazení), správná hierarchie nadpisů (jeden H1 na stránku).
- Formulář plně ovladatelný klávesnicí, jasné chybové validace.
- Optimalizace obrázků (formáty, velikosti) — projekt strukturuj tak, aby šlo finální optimalizované fotky snadno vložit.
- Základní povědomí o Core Web Vitals: žádné zbytečné render-blocking skripty, minimalizace layout shiftu (proto fixní `aspect-ratio` na placeholderech/obrázcích).

---

## 8. PRÁVNÍ NÁLEŽITOSTI

- GDPR souhlas (checkbox) u formuláře — obecný text souhlasu se zpracováním osobních údajů pro účely vyřízení poptávky.
- Zvaž, zda web potřebuje samostatnou sekci/stránku "Zásady ochrany osobních údajů" — pokud ano, zahrň jako placeholder sekci k budoucímu doplnění klientem/právníkem; negeneruj právní text sám.
- Cookie lišta, pokud web používá analytiku/cookies nad rámec striktně nutných.

---

## 9. KROK ZA KROKEM — IMPLEMENTAČNÍ PLÁN

1. Inicializuj projekt jako statický vanilla HTML/CSS/JS web.
2. Nastav design tokeny (barvy, fonty, spacing) podle sekce 2.
3. Postav základní layout (Header, Footer, anchor navigace).
4. Implementuj jednotlivé sekce v logickém pořadí (Hero → O mně → Služby → Galerie → Kontakt).
5. Přidej animace/mikro-interakce cíleně, ne plošně.
6. Implementuj systém foto-placeholderů.
7. Implementuj kontaktní formulář + serverless funkci pro bezpečné odeslání přes Resend.
8. Vlož mapu (Mapy.cz nebo Google Maps embed).
9. Ověř plnou responzivitu na každém breakpointu.
10. Proveď SEO a accessibility kontrolu.
11. Otestuj build/deploy, ověř formulář end-to-end.

---

## 10. VÝSLEDNÝ DOJEM, KTERÝ MÁ WEB ZANECHAT

Web musí na první pohled působit jako **řemeslo, kterému lze věřit** — klidný, jemný, přehledný, bez zbytečných efektů, s jasnou hierarchií a bez pocitu, že jde o generický šablonový web. Musí být rychlý, bezchybný na mobilu a jasně vést návštěvníka k jedné akci — poptávce. Návštěvník má mít pocit, že web navrhl někdo, kdo Michala a jeho řemeslo osobně zná — ne že prošel generátorem.

---

**Poznámka pro Claude Code:** Piš čistý, dobře komentovaný kód, drž konzistentní strukturu a pojmenování, a projekt nastav tak, aby šlo snadno vložit skutečné fotky a texty bez zásahu do struktury kódu. Před dokončením každé sekce se zeptej sám sebe: "Vypadá to jako promyšlená práce navržená pro tohoto konkrétního klienta, nebo jako generická šablona?" — pokud druhé, přepracuj podle sekce 0.