# Memory — chronologický log projektu Varchol

Tento soubor je append-only historie všech prací na projektu. Nikdy nepřepisuj ani nemaž starší záznamy — pouze přidávej nové na konec. Slouží jako "paměť", kterou jinak mezi jednotlivými session nemáme: každá nová Claude Code session tento soubor čte (přes [`index.md`](index.md)), aby věděla, co se kdy stalo a proč.

## Šablona nového záznamu

Zkopíruj a vyplň na konci každé pracovní session, kde se v projektu něco změnilo (kód, rozhodnutí, obsah, struktura):

```
## RRRR-MM-DD — Krátký název session

**Fáze projektu po této session:** …

**Co bylo uděláno:**
- …

**Rozhodnutí a proč:**
- …

**Otevřené otázky (čeká na klienta/uživatele):**
- …

**Nové/změněné mezery (vědomě neřešeno):**
- …

**Dotčené soubory:**
- …
```

Nevyplněné sekce (např. žádná nová rozhodnutí) klidně vynech, ale nepiš do nich "N/A" natvrdo — jen sekci vypusť.

---

## 2026-08-12 — Založení projektu + vznik memory systému

**Fáze projektu po této session:** Brief hotový, implementace webu ještě nezačala. Žádný kód webu (HTML/CSS/JS) v repozitáři zatím neexistuje.

**Co bylo uděláno:**
- Zdokumentován výchozí stav projektu, jak byl nalezen: `Varchol-malir-prompt.md` (kompletní klientský brief) a `CLAUDE.md` (projektová pravidla + status) v rootu; tři referenční soubory v `.claude/` (`rules-skills.md`, `Antos-simple-site-skill.md`, `not-AI-website-rules.md`).
- Vytvořen memory systém v `.claude/memory/` (`pravidla.md`, `memory.md`, `index.md`) — konsoliduje pravidla z briefu, CLAUDE.md a všech tří referenčních souborů do jednoho akčního dokumentu (`pravidla.md`) a zavádí protokol průběžného zaznamenávání změn (tento soubor + index).
- `CLAUDE.md` upraven tak, aby na memory systém odkazoval jako na zdroj pravdy pro aktuální stav a historii (sekce "Project status" nahrazena odkazem, aby nevznikaly dva nesynchronizované zdroje pravdy).

**Rozhodnutí a proč:**
- Memory systém umístěn do `.claude/memory/` (ne do rootu projektu) — `.claude/` už je v CLAUDE.md popsané jako místo pro meta/referenční materiály, root zůstává čistý (jen brief + CLAUDE.md).
- `pravidla.md` je destilát, ne náhrada briefu — při konfliktu platí `Varchol-malir-prompt.md`, `pravidla.md` je jen jeho akční zhuštěná verze pro rychlou orientaci a kontrolu při implementaci.
- Zodpovědnost za průběžné zaznamenávání stavu (dřív jen "Project status" sekce v CLAUDE.md) přesunuta sem, protože chronologický log s "proč" je užitečnější kontext pro budoucí session než jediný přepisovaný odstavec.

**Otevřené otázky (čeká na klienta/uživatele):**
- Rok založení / roky praxe (pro hero stat strip).
- Logo (zatím nedodáno — použije se textový wordmark).
- IČO/DIČ (pro footer).
- Reálné fotky (min. 6 pro galerii ve 3 kategoriích, 1 hero, 1 O mně).

**Nové/změněné mezery (vědomě neřešeno):**
- Web nemá žádný kód — vše od sekce 1 výše je otevřené k implementaci podle `Varchol-malir-prompt.md` a `pravidla.md`.

**Dotčené soubory:**
- `.claude/memory/pravidla.md` (nový)
- `.claude/memory/memory.md` (nový, tento soubor)
- `.claude/memory/index.md` (nový)
- `CLAUDE.md` (upraven)

---

## 2026-08-12 — Implementace landing page (HTML/CSS/JS/backend)

**Fáze projektu po této session:** Kompletní first-draft implementace jednostránkového webu hotová (HTML/CSS/JS + serverless funkce + SEO soubory). Web zatím neběží nasazený, formulář není end-to-end otestovaný se skutečným Resend klíčem, fotky jsou pořád jen placeholdery, klientská fakta (rok praxe, IČO/DIČ, doména) čekají na doplnění.

**Co bylo uděláno:**
- Vytvořena kompletní struktura projektu: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `api/contact.js`, `package.json`, `.env.example`, `robots.txt`, `sitemap.xml`, `.gitignore`.
- Implementace proběhla paralelně přes 4 subagenty (HTML+copy, CSS, JS, backend/SEO) podle jednotného kontraktu (přesná ID/třídy/tokeny/texty), který byl sestaven z briefu a `pravidla.md`; následně proběhla integrační kontrola a oprava chyb vzniklých na rozhraní mezi agenty (viz níže).
- Design tokeny: primární barva tlumený petrol (`#3F5A54`), teplá krémová bílá (`#F7F2EA`), tmavý text (`#2A2521`, ne černá), accent tlumená terakota (`#B5673F`) + ochre (`#C9A227`) použité jen dekorativně/na velký text (jejich kontrast na pozadí je jen 3.78:1, nesmí jít na běžný text). Kontrast hlavních kombinací ověřen výpočtem (fg/bg 13.6:1, muted/bg 7.3:1, bílý text/primary 7.1:1) — splňuje WCAG AA.
- Vizuální motivy (signatura dle pravidla 0): paint-swatch pruh (`.section-marker`, 3 čtverečky) před každým H2, masking-tape rohy (`.photo-placeholder__tape`) na foto-placeholderech — přesně 2 motivy, žádný třetí.
- Asymetrické kompozice dle sekce 0 briefu: hero content vlevo + stat-strip karta přetažená přes spodní hranu hero fotky (samostatný blok hned za `.hero`, ne centrovaně), O mně grid 1.3fr/1fr s jednou zvýrazněnou value-prop položkou (větší typografie místo 4 identických karet), Služby grid s "lead" kartou přes 2 sloupce, Kontakt grid 0.9fr/1.1fr.
- Veškeré texty (hero, O mně, služby, kontakt, formulářové hinty, GDPR souhlas, chybové hlášky) prošly `.claude/not-AI-website-rules.md` checklistem — žádné klišé fráze, žádné trojkolonky; jedna pomlčka uprostřed věty nalezená v chybové hlášce formuláře byla opravena.
- Formulář: honeypot (`tabindex="-1"` na poli + `aria-hidden` na wrapperu — ověřeno, že nejde o ARIA-hidden-focusable anti-pattern), klientská i serverová validace, loading/success/error stavy, GDPR souhlas jako plná věta.
- `api/contact.js`: Vercel serverless funkce, Resend SDK (`^6.19.0`), API klíč jen z `process.env.RESEND_API_KEY`, `from: onboarding@resend.dev` (dočasná neověřená Resend adresa, než bude mít klient vlastní doménu ověřenou v Resendu).
- SEO: meta/OG tagy, JSON-LD `PaintingContractor` (jen ověřená fakta, bez founder date/priceRange), `robots.txt` + `sitemap.xml` s placeholder doménou `https://REPLACE-WITH-DOMAIN.cz/`.

**Rozhodnutí a proč:**
- Implementace rozdělena mezi 4 paralelní subagenty na explicitní žádost uživatele — rozdělení podle souborů (HTML, CSS, JS, backend/SEO), ne podle sekcí stránky, protože soubory jsou bezpečná jednotka pro paralelní zápis bez konfliktů. Sdílený kontrakt (přesná ID/třídy/tokeny/copy) byl napsán předem, aby agenti nemuseli hádat vzájemnou strukturu.
- Po dokončení agentů proběhl samostatný integrační průchod (čtení všech 4 výstupů, lokální server, `node --check`, kontrola balance HTML tagů, duplicitních ID, shody tříd napříč soubory) — odhaleny a opraveny 2 chyby vzniklé přesně na rozhraní mezi agenty: (1) JS používal třídu `.is-filtered-out` pro filtr galerie, ale odpovídající CSS pravidlo chybělo — CSS agent tuto mezeru sám nahlásil ve svém shrnutí, ale nedoplnil ji, proto byla doplněna dodatečně; (2) `.hero__stats` byl v HTML vnořený jako flex-item uvnitř `.hero` bez `flex-direction:column`, takže by se vykreslil vedle hero obsahu místo pod ním jako "vyjíždějící" karta — opraveno přesunem `.hero__stats` na sourozence hned za `</section class="hero">` (CSS pro `.hero__stats` byla od začátku napsaná správně pro tento layout, chybné bylo jen umístění v HTML).
- Poučení pro příště: i při jasně definovaném kontraktu je nutný samostatný integrační/QA průchod po paralelních subagentech — kontrakt psaný slovně (ne kódem, který se dá spustit společně) nechává prostor pro přesně tento typ mezery na švu mezi soubory.
- Mapa: použit Google Maps `output=embed` iframe (bez nutnosti API klíče) místo hádaného mapy.cz share odkazu, protože nebyl k dispozici způsob, jak vygenerovat reálný mapy.cz krátký odkaz. Funkční, ale lze zvážit nahrazení mapy.cz embedem později, pokud je to preferovaná varianta.
- Mobilní nav breakpoint zvolen na 900px (ne 1024px) — v rozsahu 800–1024px by byla hlavička s wordmarkem + 4 odkazy + CTA tlačítkem příliš natěsnaná.

**Otevřené otázky (čeká na klienta/uživatele):**
- Rok založení / roky praxe (hero stat strip zůstává `?` placeholder).
- Logo (zatím jen textový wordmark).
- IČO/DIČ (placeholder v kontaktu i patičce).
- Reálné fotky (11 placeholderů čeká na nahrazení — 1 hero, 1 O mně, 9 galerie).
- Skutečná doména webu (robots.txt/sitemap.xml/canonical/OG url mají placeholder `REPLACE-WITH-DOMAIN.cz`).
- Barevná paleta a vizuální styl jsou první návrh podle pravidel briefu, ne klientem odsouhlasený finální výběr.

**Nové/změněné mezery (vědomě neřešeno):**
- Formulář NENÍ end-to-end otestovaný se skutečným odesláním e-mailu — chybí `RESEND_API_KEY` (v této session nebyl k dispozici žádný Resend účet/klíč). Před nasazením je nutné: založit Resend účet, nastavit `RESEND_API_KEY` v prostředí nasazení (Vercel env var) a ručně odeslat testovací poptávku přes formulář, ověřit doručení na mvarchy@gmail.com. Podle `pravidla.md` bodu 10.4 se toto nesmí tiše předpokládat jako hotové.
- Web nebyl vizuálně otestovaný v reálném prohlížeči (v této session není k dispozici nástroj na screenshot/prohlížeč) — ověřeno jen staticky: HTTP 200 na všech souborech přes lokální server, JS syntax (`node --check`), balance HTML tagů, žádná duplicitní ID, shoda tříd mezi CSS/JS/HTML, a WCAG kontrast dopočítaný matematicky pro tokeny. Vizuální a interaktivní chování (scrollspy, lightbox, mobilní menu, skutečná responzivita) je potřeba ještě ručně proklikat v prohlížeči/na zařízení.
- `node_modules` nejsou nainstalované (žádný `npm install` v této session) — nutné před nasazením/lokálním testem serverless funkce.
- Mapa používá Google Maps embed, ne mapy.cz.

**Dotčené soubory:**
- `index.html` (nový)
- `assets/css/style.css` (nový)
- `assets/js/main.js` (nový)
- `api/contact.js` (nový)
- `package.json`, `.env.example`, `robots.txt`, `sitemap.xml`, `.gitignore` (nové)

---

## 2026-08-12 — První vizuální test mobilní verze + oprava 2 bugů v hero sekci

**Fáze projektu po této session:** Stejná jako po předchozí session (first-draft implementace), ale hero sekce je teď poprvé skutečně vizuálně ověřená (ne jen staticky) a dva reálné bugy v ní jsou opravené. Zbytek webu (O mně, Služby, Galerie, Kontakt) vizuálně zkontrolován na mobilu a je bez problémů.

**Co bylo uděláno:**
- Spuštěn lokální server (`python3 -m http.server`) a Playwright (Chromium) nainstalovaný ad hoc do `/tmp/pw-check` — první skutečný vizuální test webu v prohlížeči od založení projektu (dřív jen staticky ověřováno, viz mezera zapsaná v předchozím záznamu).
- Testováno: screenshoty na mobilu (iPhone 13 emulace + explicitní šířky 320–799px), tabletu (900px) a desktopu (1400px); kontrola horizontálního přetečení, velikosti tap targetů, console chyb, otevření/zavření mobilního menu, průchod všemi sekcemi.
- **Nalezen a opraven bug #1:** `<h1>` v hero sekci neměl třídu `hero__title` navzdory tomu, že CSS pravidlo `.hero__title` (světlá barva `--accent-fg`, správný font-size clamp) na něj mířilo — bez třídy dědil h1 tmavou barvu `--fg`, skoro identickou s barvou tmavého gradientu scrimu za ním, takže by nadpis na reálné fotografii splynul s pozadím. Oprava: přidána třída do `index.html`.
- **Nalezen a opraven bug #2:** na mobilu (nejhůř pod ~400px šířky) se nadpis/podtitulek hero sekce vizuálně překrýval s ikonou a popiskem foto-placeholderu — placeholder je vertikálně centrovaný přes celou výšku hero boxu, zatímco reálný text je ukotvený dolů (`align-items:flex-end`); na úzkém mobilu je text tak vysoký, že sahá až doprostřed, kde seděl placeholder. Původní mobilní override `.photo-placeholder--hero{aspect-ratio:4/5}` byl mrtvý kód (přebíjen specifičtějším pravidlem `.hero__media .photo-placeholder--hero{height:100%}`, které mu bránilo mít efekt). Oprava (3 změny v `assets/css/style.css`): (a) zmenšen padding `.hero__content` na mobilu ze `--space-2xl` na `--space-lg`, aby nadpis nezačínal tak vysoko; (b) placeholder ikona+popisek přesunuty nahoru (`justify-content:flex-start` + `padding-top`) místo centrování; (c) zmenšena samotná ikona+popisek na mobilu (32px ikona, menší font popisku). Ověřeno skriptem, který měří bounding boxy a hlásí kolize — po opravě `overlaps=none` na všech testovaných šířkách 320–799px.
- Menší nálezy, vědomě neopravovány (viz mezery níže): tap targety `< 40px` u odkazů v patičce a v desktop navigaci.

**Rozhodnutí a proč:**
- Zvolena cílená oprava (posunout/zmenšit placeholder marker + zmenšit padding), ne přepsání hero na "obrázek nahoře, text dole" layout bez překryvu — protože full-bleed overlay s tmavým scrimem je záměrný design z briefu (asymetrická, ne šablonovitá kompozice) a jakmile klient dodá reálnou fotku, popisek placeholderu (jediný zdroj kolize) zmizí úplně; cílem opravy bylo hlavně to, aby web nevypadal rozbitý *během* placeholder fáze.
- Číselné ladění (kolik `padding-top`/velikost ikony) ověřováno automatizovaným skriptem měřícím skutečné `getBoundingClientRect()` kolize napříč 7 šířkami (320–799px), ne pouze vizuální kontrolou screenshotů — kvůli přesnosti na okrajových hodnotách (320px šířka měla jen 4px překryv, který by okem šel snadno přehlédnout).

**Otevřené otázky (čeká na klienta/uživatele):**
- Beze změny oproti minulému záznamu (rok praxe, logo, IČO/DIČ, reálné fotky, doména, finální schválení palety).

**Nové/změněné mezery (vědomě neřešeno):**
- Tap targety pod 40px na mobilu: hlavní nav odkazy v mobilním off-canvas menu jsou 33px vysoké, patičkové odkazy 18–20px, desktop nav odkazy 18px — pod doporučovaným 44px (WCAG 2.5.5 je AAA, ne AA, takže to není blokující, ale stojí za zvážení při dalším a11y průchodu).
- Formulář stále NENÍ end-to-end otestovaný se skutečným Resend klíčem (beze změny).
- `node_modules` stále nenainstalované v projektu samotném (Playwright test běžel z dočasného `/tmp/pw-check`, ne z projektové složky).
- Zbytek a11y kontroly (klávesnice, screen reader, scrollspy, lightbox chování) ještě neprošel manuálním testem podle bodu 4 ve "Working process" v `CLAUDE.md`.

**Dotčené soubory:**
- `index.html` (upraven — přidána třída `hero__title` na `<h1>`)
- `assets/css/style.css` (upraven — 3 cílené změny v hero/responsive sekci, viz výše)

---
