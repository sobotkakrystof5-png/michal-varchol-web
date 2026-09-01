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

## 2026-08-17 — Doplnění IČO

**Fáze projektu po této session:** Beze změny (first-draft implementace), jedna z otevřených klientských mezer teď částečně vyplněná.

**Co bylo uděláno:**
- Klient dodal IČO (05850100), DIČ zatím ne. Nahrazeny oba placeholdery "doplní klient" pro IČO v `index.html` (sekce Kontakt a patička) reálnou hodnotou.

**Rozhodnutí a proč:**
- DIČ v obou místech vypuštěno (ne ponecháno jako placeholder) — uživatel explicitně řekl "na DIČ se zatím vykašli", takže dokud nebude dodáno, na stránce se nezobrazuje vůbec (menší regulatorní expozice než vystavený "doplní klient" text). Label v kontakt-listu změněn z "IČO / DIČ" na jen "IČO".

**Otevřené otázky (čeká na klienta/uživatele):**
- DIČ stále chybí (nově upřesněno — vědomě odloženo, ne zapomenuto). Ostatní beze změny (rok praxe, logo, reálné fotky, doména, finální schválení palety).

**Dotčené soubory:**
- `index.html` (upraven — IČO doplněno na 2 místech, DIČ odstraněno)

---

## 2026-08-17 — Zmínka o stříkacím zařízení Airless

**Fáze projektu po této session:** Beze změny (first-draft implementace). Nový klientský fakt (typ používaného vybavení) doplněn do textu na 5 místech.

**Co bylo uděláno:**
- Uživatel sdělil nový fakt: Michal při velkoplošných pracích (fasády, průmyslové haly) používá moderní stříkací zařízení Airless. Doplněno do `index.html` na místa, na kterých se uživatel domluvil přes upřesňující otázku:
  1. Nový prostřední odstavec v sekci "O mně" (mezi stávajícími dvěma odstavci).
  2. Věta doplněná do popisu služby "Velkoplošné stříkání hal" v sekci Služby.
  3. Věta doplněná do úvodního `section-intro` odstavce sekce Galerie.
  4. `data-caption` fotky `galerie-04.jpg` (fasáda, štítová stěna s omítkou) — doplněna druhá věta o stříkání Airless.
  5. `data-caption` fotky `galerie-08.jpg` (hala, sušící se bílé dveře) — doplněna druhá věta o stříkání Airless.

**Rozhodnutí a proč:**
- Žádná z 11 galerijních fotek nezobrazuje stříkací pistoli/stroj přímo v akci (ověřeno vizuální kontrolou souborů), takže nebylo možné poznat, na kterých fotkách se reálně stříkalo. Místo hádání byla uživateli položena upřesňující otázka (kam přesně info umístit); uživatel zvolil kombinaci obecné zmínky (O mně, Služby, úvod galerie) + doplnění do popisků dvou konkrétních fotek podle vlastního výběru kategorie (1× fasáda, 1× hala — odpovídá službám, kde se stříkání reálně nabízí).
- `alt` texty fotek zůstaly beze změny (čistě vizuální popis pro čtečky) — zmínka o Airless přidána jen do `data-caption` (zobrazuje se v lightboxu jako doprovodný text, nemusí popisovat jen to, co je doslova vidět).

**Dotčené soubory:**
- `index.html` (upraven — 5 míst, viz výše)

---

## 2026-08-17 — Výměna hero fotky (kuželna při přípravě na malování)

**Fáze projektu po této session:** Beze změny (first-draft implementace). Uživatel ve složce `Fotky/` nahradil zdrojový hero soubor (`HERO SEKCE - Varchol.png`, nový mtime 22:41 oproti zbytku složky z ~20:45–20:48) — původní fotka (tři muži na schodišti) nahrazena širokoúhlým záběrem kuželny s kuželkami v pozadí, celá zakrytá ochrannou fólií před malováním, se žebříkem u zdi. Ostatní zdrojové fotky ve `Fotky/` beze změny (galerie 1–10, `VARCHOL PŘI PRÁCI.png`), takže se netýkalo `assets/img/galerie-*.jpg` ani `o-nas.jpg`.

**Co bylo uděláno:**
- Nový zdrojový PNG (1130×912) převeden přes `sips` na `assets/img/hero.jpg` (kvalita 80, výstup 1130×912, ~216 KB) — nahrazuje starý `hero.jpg` (736×912, fotka tří mužů).
- `index.html`: aktualizován `alt` text hero obrázku (popisuje kuželnu/dráhu/kuželky/fólii/žebřík místo mužů na schodišti) a `width` atribut z `736` na `1130` (výška beze změny, `912`).
- `assets/css/style.css`: `object-position` pro hero obrázek změněn z `50% 20%` (bias nahoru, laděno na postavy ve starém snímku) na `50% 50%` (střed) — nový záběr má zajímavý obsah rozprostřený po celé výšce (stropní světla, žebřík, okna, zakrytá dráha), střed dává nejlepší kompozici. Komentář u pravidla přepsán, aby odpovídal novému obsahu fotky (starý text zmiňoval "tall group shot"/"workers' upper bodies", což už neplatí).
- Ověřeno vizuálně přes Playwright (Chromium binárka našeptaná z existující cache `~/Library/Caches/ms-playwright`, čerstvý `npm install playwright` jen pro JS balíček) na desktopu (1440×900) a mobilu (390×844) — nová fotka čitelně vyplňuje širokou hero pásku, text zůstává čitelný přes scrim.

**Rozhodnutí a proč:**
- Nový zdrojový snímek je téměř čtvercový (1130×912, poměr ~1,24), zatímco hero box je široký pás (`.hero__media` vyplňuje celou výšku `.hero` v `min-height:78vh`, efektivní poměr širokoúhlý) — `object-fit:cover` tedy ořezává hlavně svisle. Kontrolní ořez nasimulovaný přes `sips --cropToHeightWidth` na 21:9 potvrdil, že středový ořez zachytí stropní světla, žebřík, okna i zakrytou dráhu čitelně, proto zvolen `50% 50%` místo dalšího dolaďování.
- `alt` text popisuje kuželnu (kuželky viditelné v pozadí uprostřed snímku), ne obecnou "chodbu" — první návrh textu byl opraven po bližším pohledu na fotku, aby popis odpovídal skutečnému obsahu (přesnost alt textu > obecnost).

**Otevřené otázky (čeká na klienta/uživatele):**
- Beze změny oproti minulému záznamu (rok praxe, logo, DIČ, doména, finální schválení palety).

**Nové/změněné mezery (vědomě neřešeno):**
- Beze změny oproti minulým záznamům (formulář netestovaný end-to-end, tap targety, zbytek a11y průchodu, `node_modules` v projektu nenainstalované).

**Dotčené soubory:**
- `assets/img/hero.jpg` (přegenerován z nového zdroje ve `Fotky/`)
- `index.html` (upraven — `alt` a `width` atribut hero obrázku)
- `assets/css/style.css` (upraven — `object-position` a komentář u hero obrázku)

---

## 2026-08-17 — Oprava šedé mezery pod headerem + druhá výměna hero fotky

**Fáze projektu po této session:** Beze změny (first-draft implementace). Uživatel mezitím znovu obměnil obsah `Fotky/` (nový soubor `HERO SEKCE VARCHOL.png`, 678×912 — fotka kuželny z předchozí session ve složce už není). Zároveň nahlásil vizuální bug: šedá/béžová mezera mezi headerem a hero fotkou.

**Co bylo uděláno:**
- **Nalezen a opraven skutečný CSS bug** (ne jen kosmetika): pravidlo `.hero__media .photo-placeholder--hero` neslo `padding-top:calc(var(--header-height) + var(--space-2xs))` určené jen pro prázdný placeholder stav (posouvá ikonu+popisek pod header). Protože selektor mířil na `.photo-placeholder--hero` obecně, aplikoval se i na `.photo-placeholder--filled` variantu se skutečnou fotkou — vytvořil tak ~84px mezeru (`--bg-alt` pozadí placeholderu) mezi headerem a obrázkem, protože obrázek uvnitř má `height:100%` počítanou až od konce paddingu. Oprava: `padding-top`/`justify-content:flex-start` přesunuty na nový selektor `.hero__media .photo-placeholder--hero:not(.photo-placeholder--filled)`, takže vyplněná hero fotka teď sahá až k patě headeru.
- Nová zdrojová fotka `Fotky/HERO SEKCE VARCHOL.png` (678×912, portrét — Michal na lešení maluje roh strop/stěna, starorůžové stěny) převedena přes `sips` na `assets/img/hero.jpg` (kvalita 80, beze změny rozměrů, ~161 KB), nahrazuje starou kuželnu.
- `index.html`: `alt` text a `width` atribut (`1130`→`678`) aktualizovány na novou fotku.
- `assets/css/style.css`: komentář u `object-position` přepsán (zmiňoval starou "skoro čtvercovou" fotku, teď popisuje novou "vysokou portrétní" fotku).
- Ověřeno přes Playwright (desktop 1440×900, mobil 390×844): na desktopu mezera zmizela a širokoúhlý ořez (kolem 50/50 %) hezky zachytí lešení, malíře i stěnu. Vyzkoušen i posun `object-position` na `50% 62%` pro mobil, ale zrušen — na mobilu (úzký/vysoký hero box) je obrázek vždy výškově omezený (`object-fit:cover` škáluje podle výšky), takže se celá výška fotky zobrazí vždy bez ohledu na Y hodnotu; posun jen zhoršil desktopový ořez (uřízl ruku se štětcem), takže ponecháno `50% 50%`.

**Rozhodnutí a proč:**
- Grey zóna nebyla o chybějícím "roztažení" fotky přes CSS (`object-fit`/`width`/`height` byly už správně `100%`) — byla to specificita CSS selektorů, kde padding pro prázdný stav "prosakoval" do vyplněného stavu. Řešení `:not(.photo-placeholder--filled)` je přesně cílené, nemění nic jiného na chování prázdného placeholderu (zůstává použitelný, kdyby fotka zase chyběla).
- `object-position` ponechána na `50% 50%` navzdory tomu, že mobil ukazuje dost prázdného stropu nahoře — to je vlastnost samotné fotky (hodně stropu nad malířem ve snímku), ne doladitelná přes CSS crop na mobilu (viz vysvětlení výše), a posun by zhoršil desktop bez zisku na mobilu. Pokud by to vadilo, řešením by bylo oříznout přímo zdrojový soubor, ne jen `object-position`.

**Otevřené otázky (čeká na klienta/uživatele):**
- Beze změny (rok praxe, logo, DIČ, doména, finální schválení palety).

**Nové/změněné mezery (vědomě neřešeno):**
- Beze změny oproti minulým záznamům. Nově vědomě přijato: mobilní hero crop ukazuje výrazný podíl prázdného stropu nad malířem — inherentní vlastnost nové zdrojové fotky, ne bug.

**Dotčené soubory:**
- `assets/img/hero.jpg` (přegenerován z nového zdroje `Fotky/HERO SEKCE VARCHOL.png`, 678×912)
- `index.html` (upraven — `alt` a `width` atribut hero obrázku)
- `assets/css/style.css` (upraven — oprava selektoru `.hero__media .photo-placeholder--hero` pro padding, komentář u `object-position`)

---

## 2026-08-22 — Potvrzení "20+ let zkušeností", první push na GitHub a nasazení na Vercel

**Fáze projektu po této session:** Web je poprvé živý na produkční Vercel URL. Formulář stále end-to-end neotestovaný (chybí `RESEND_API_KEY` na Vercelu).

**Co bylo uděláno:**
- Na začátku session byly ve working directory dvě needitované změny (vznikly mimo tuto session, bez záznamu v memory): stat-strip placeholder `?` nahrazen textem `20+`, a titulek/meta/H1 zjednodušené z "Litoměřice po Roudnici nad Labem" na obecnější "Litoměřice a okolí" (Roudnice se v briefu nikde nezmiňuje, takže jde o neutrální zjednodušení, ne rozpor s briefem).
- Protože brief výslovně říká "roky praxe zatím nedodal klient, nevymýšlet číslo" a memory měla tento bod jako otevřenou otázku, před commitem jsem se zeptal uživatele, jestli je `20+` potvrzené číslo. **Uživatel potvrdil, že `20+ let zkušeností` je platné a má se použít.**
- Commit `e524b25` ("Confirm 20+ years experience, simplify service area copy") a push na `origin/main` (GitHub repo `sobotkakrystof5-png/michal-varchol-web`).
- Zjištěno, že projekt už byl dřív lokálně propojený s Vercel projektem `michal-varchol-web` (`.vercel/project.json`, gitignored) a Vercel CLI byl přihlášený jako `sobotkakrystof5-png`.
- Nasazeno přes `vercel --prod --yes` → produkční alias **https://michal-varchol-web.vercel.app**, ověřeno `curl` (HTTP 200, správný `<title>`).
- `vercel env ls` potvrdil, že na Vercelu **nejsou nastavené žádné env proměnné** — `RESEND_API_KEY` chybí, takže kontaktní formulář (`api/contact.js`) na produkci aktuálně nebude umět odeslat e-mail.

**Rozhodnutí a proč:**
- Nasadil jsem beze čekání na `RESEND_API_KEY`, protože uživatel výslovně požádal jen o "push na github a deploy na vercel" — nasazení statické části webu není blokované chybějícím klíčem, jen kontaktní formulář zůstane nefunkční, dokud klíč nepřibude.
- Roky praxe: rozhodnutí ponechat "20+" bylo uživatelovo přímé potvrdnutí přes AskUserQuestion, ne moje domněnka — pokud se ukáže jako nesprávné, je to na uživateli/klientovi opravit skutečné číslo.

**Otevřené otázky (čeká na klienta/uživatele):**
- Rok založení / roky praxe: **částečně vyřešeno** — "20+ let zkušeností" teď na webu, ale přesný rok založení firmy pořád není known (pro případné budoucí zpřesnění).
- Beze změny: logo, DIČ, skutečná doména (aktuálně `REPLACE-WITH-DOMAIN.cz` v canonical/OG tagách — produkční Vercel URL je zatím jediná živá adresa), finální schválení palety.

**Nové/změněné mezery (vědomě neřešeno):**
- `RESEND_API_KEY` není nastaven na Vercelu — kontaktní formulář na živé produkci (https://michal-varchol-web.vercel.app) aktuálně neodešle e-mail. Nutné před tím, než se web sdílí klientovi/veřejnosti jako plně funkční.
- Canonical/OG URL v `index.html` pořád ukazují na placeholder doménu `REPLACE-WITH-DOMAIN.cz`, ne na skutečnou Vercel/produkční adresu — nekonzistence, kterou stojí za to vyřešit až se doména ujasní.

**Dotčené soubory:**
- `assets/css/style.css`, `index.html` (commit `e524b25`, viz diff výše)
- Žádné nové soubory — nasazení proběhlo přes existující `.vercel/project.json` link.

---

## 2026-08-24 — Přebarvení palety na "luxusní dřevo" + posun hero textu vlevo

**Fáze projektu po této session:** Beze změny co do nasazení (web zůstává živý na https://michal-varchol-web.vercel.app ve staré paletě — dnešní změna je zatím jen lokální, nenasazená, nenacommitnutá).

**Co bylo uděláno:**
- Uživatel poslal referenční fotku luxusního dřevěného interiéru (trámový strop, ořechový obklad, lněná pohovka, olivově zelené doplňky, teplé denní světlo) a dal přímé zadání: zbavit se stávající tlumené petrolové/modro-zelené primární barvy (`--primary:#3F5A54`), chtít "světlejší" web, a přebarvit celou paletu do stylu teplého prémiového dřeva podle reference. Zároveň požádal o posun hero textu (nadpis/podnadpis/CTA) vlevo.
- Odvozena a implementována nová paleta v `assets/css/style.css` `:root`: `--bg:#F7F2EA→#FAF6EF`, `--bg-alt:#EFE7D8→#F1E9DB`, `--fg:#2A2521→#2E241C`, `--muted:#574E43→#6B5A48`, `--primary:#3F5A54→#6B4630`, `--primary-dark:#2E4440→#472C1D`, `--accent:#B5673F→#BF8038`, `--accent-2:#8CA173→#96906C`, `--accent-fg:#FFF8EF→#FDF9F2`, `--line:#DED2BE→#E4D7C3`, `--error-text:#8A3324→#B23B1F`. Kontrast nové palety ověřen výpočtem (text na `--primary` tlačítku ~7,9:1 WCAG, error-text vůči pozadí ~5,5:1 a barevně jasně odlišný od hnědého primary).
- 16 míst v `style.css`, kde byly staré barvy `--fg`/`--accent-fg` napsané natvrdo jako `rgba(42,37,33,…)`/`rgba(255,248,239,…)` (scrim na hero fotce, stíny, lightbox pozadí, patička, sekundární tlačítko v hero), přepsáno na `rgba(46,36,28,…)`/`rgba(253,249,242,…)`, aby odpovídaly novým `--fg`/`--accent-fg`.
- Hero text přestal být centrovaný jako vlastní 640px box (nesl duplicitně třídy `.hero__content` i `.container`, čímž `margin-inline:auto` z `.container` box centrovalo) — `.container` třída odstraněna z `<div class="hero__content">` v `index.html` a `.hero__content` teď má vlastní `margin-left:max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter)))`, čímž se levá hrana textu zarovná přesně s levou hranou obsahu ostatních sekcí (asymetrický, ne mechanicky centrovaný layout, v duchu pravidla 0).
- Práce byla zadaná dvěma paralelním subagentům (jeden na CSS/HTML implementaci, druhý na aktualizaci memory systému) na žádost uživatele o maximální paralelní výkon. Oba opakovaně padaly na tranzientní síťové/API chyby (ECONNRESET, DNS, certifikát) uprostřed práce — CSS agent stihl jen `:root` blok a část rgba náhrad, memory agent nestihl nic. Zbytek (dokončení rgba náhrad, hero CSS/HTML, i celý zápis do memory systému) dokončila orchestrující session přímo.

**Rozhodnutí a proč:**
- `--accent-2` posunuto z `#8CA173` (sytější zelená) na `#96906C` (olivově-taupe) i když nebylo explicitně zmíněné — vzhledem k tomu, že klient výslovně odmítl "modro zelenou", šlo o preventivní opatření, aby žádná zbývající barva v paletě nečetla jako "ta zelená, co nechtěl", ne jako změna nad rámec zadání.
- `--error-text` zesvětlen z `#8A3324` na `#B23B1F` čistě proto, aby zůstal barevně jasně odlišný od nového hnědého `--primary` (oba jsou v hnědo-červeném spektru) — funkční requirement (chybové hlášení formuláře musí být rozeznatelné od brand barvy), ne estetická volba.
- Stat-strip karta pod hero (`.hero__stats`) záměrně ponechána centrovaná/vlastní karta — uživatel žádal posun jen "hero textu", ne celé hero sekce.

**Otevřené otázky (čeká na klienta/uživatele):**
- Beze změny (rok založení/praxe, logo, DIČ, doména) plus nově: klient tuto konkrétní paletu a posun hero textu ještě neviděl naživo/nasazenou — dnešní změna je založená na jeho slovním zadání + referenční fotce, ne na schválení hotového výsledku.

**Nové/změněné mezery (vědomě neřešeno):**
- Změna zatím jen lokální — necommitnutá, nenasazená na Vercel. Živá produkce (https://michal-varchol-web.vercel.app) pořád běží se starou petrolovou paletou.
- Vizuální QA (screenshoty přes více breakpointů, kontrola, že se nikde nezalamuje/nepřekrývá kvůli novému `margin-left` na hero textu) ještě neproběhla v této session — plánovaná jako další krok.

**Dotčené soubory:**
- `assets/css/style.css` (nová paleta v `:root` + 16× hardcoded rgba + `.hero__content` layout)
- `index.html` (odebrána třída `container` z `.hero__content`)
- `.claude/memory/pravidla.md` (sekce 3 a bod 2 sekce 4 aktualizovány na novou paletu/layout)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")

---

## 2026-08-24 — Nová sekce Reference (mezi Službami a Galerií)

**Fáze projektu po této session:** Přebarvená verze z předchozí session dnes zůstává necommitnutá/nenasazená (viz předchozí záznam). Navíc přibyla nová sekce Reference — také zatím jen lokálně, necommitnuto.

**Co bylo uděláno:**
- Zadání znělo přidat sekci "Reference" po sekci Služby, se 3–4 referencemi "na základě Firmy.cz" a přímým odkazem na Firmy.cz — tedy explicitně nevymýšlet recenze, ale vycházet ze skutečného profilu.
- Dohledán skutečný profil klienta na Firmy.cz: `https://www.firmy.cz/detail/13509932-michal-varchol-litomerice-predmesti.html` (adresa Werichova 2007/2, Litoměřice, Předměstí sedí). Profil má hodnocení "Fantastické" a 27 recenzí.
- Nejdřív načteno přes WebFetch (shrnutí menším modelem) — to ale vymyslelo neexistující recenzentku "Lida Dablik" s recenzí "Mohu vřele doporučit" a datem v budoucnosti (20.8.2026). Ověřeno stažením syrového HTML přes `curl` + regex extrakcí — skuteční recenzenti viditelní na stránce jsou **Roman Brázda, Martin Mlynek a Pavel Klouček** (všichni 5/5 hvězdiček), Lida Dablik na stránce vůbec není. Do webu šly jen tyto tři ověřené, doslovné citace (u Brázdy a Mlynka jde o zkrácený náhled končící "…", protože i samotné Firmy.cz recenzi na stránce zkracuje za tlačítkem "Více" a plný text není v HTML dostupný bez přihlášení/JS dotažení).
- Přidána sekce `#reference` v `index.html` mezi `#sluzby` a `#galerie`: section-marker (paint-swatch motiv) + H2 + úvodní věta (bez klišé, 1. osoba) + `reference-grid` se 3 kartami (hvězdičky, citace, jméno, datum) + `btn--secondary` odkaz "Zobrazit všechny reference na Firmy.cz" (`target="_blank" rel="noopener noreferrer"`) přímo na profil výše.
- Asymetrie zachována podle pravidla 0 (žádné 3 identické karty): první karta (Roman Brázda, nejnovější a nejdelší citace) je `--featured` — širší (`grid-column:span 2` na desktopu/tabletu) a s citací v `--font-heading` větším písmem, zbylé dvě jsou menší standardní karty. Na mobilu (`<800px`) grid kolabuje na 1 sloupec, featured karta si podrží jen typografický rozdíl.
- Přidán nový anchor `#reference` do header nav i footer "Rychlé odkazy" (pravidlo v `pravidla.md` sekce 2 — nový anchor musí být synchronně v obou místech).
- CSS přidáno do `assets/css/style.css` jako nová sekce "10b. Reference" + odpovídající mobile/tablet breakpointy (`.reference-grid` 1 sloupec pod 800px, 3 sloupce s `--featured` span 2 od 800px).
- Vizuálně ověřeno přes headless Chrome + Playwright (goto `localhost:8791`, screenshot `#reference` elementu) na desktopu (1400px) i mobilu (390px) — layout, barvy, aktivní nav odkaz "Reference" a asymetrie karet vypadají podle očekávání, žádné console chyby v konzoli.

**Rozhodnutí a proč:**
- Recenze se necitují/needitují nad rámec doslovného přepisu (ani drobná oprava velkého písmene/zkratky "p. Varchola" u Pavla Kloučka) — jde o citaci reálné třetí osoby, ne o marketingový text klienta, takže se na ni vztahuje stejné pravidlo "nic nevymýšlet/nezkreslovat" jako na fakta v sekci 1 `pravidla.md`, jen přísněji (nešlo o styl, šlo o přesnost citace).
- Zkrácené citace (končící "…") jsou ponechány zkrácené přesně jak je zobrazuje samotné Firmy.cz, místo aby se domýšlel/generoval konec věty — plný text není bez přihlášení dostupný.
- Odkaz na Firmy.cz veden jako `target="_blank"` (opouští web), na rozdíl od interních kotev.

**Vedlejší zjištění (nesouvisí přímo se zadáním, ale relevantní pro otevřené otázky v `index.md`):** Firmy.cz profil uvádí u klienta oficiální web `https://malirske-prace-litomerice.cz/` — to by mohla být ta "skutečná doména", která v `index.html` `<head>` chybí (canonical/OG pořád ukazují na `REPLACE-WITH-DOMAIN.cz`). Nebylo ověřeno, jestli doména reálně žije/patří klientovi ani použito bez potvrzení — jen zaznamenáno jako vodítko pro příště.

**Otevřené otázky (čeká na klienta/uživatele):** beze změny oproti předchozímu záznamu, plus nově: potvrdit, jestli `malirske-prace-litomerice.cz` je klientova skutečná doména (viz vedlejší zjištění výše), než se použije v canonical/OG tagech.

**Nové/změněné mezery (vědomě neřešeno):**
- Sekce Reference zatím neprošla schválením klientem (stejně jako přebarvení z předchozí session).
- Recenze na Firmy.cz se mohou v čase měnit/přibývat — tento výběr 3 recenzí je snímek stavu k 24.8.2026, nejde o živě synchronizovaný feed.

**Dotčené soubory:**
- `index.html` (nová sekce `#reference` + nav odkaz v headeru a footeru)
- `assets/css/style.css` (nová sekce "10b. Reference" + breakpointy)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")

---

## 2026-08-26 — Galerie přepracována na kategorie s "peeking" fotkami

**Fáze projektu po této session:** Galerie už nezobrazuje 11 fotek v jednom filtrovaném gridu — na žádost uživatele je teď rozdělená do 5 klikatelných kategorií podle typu práce, každá s hlavní fotkou a náhledem několika dalších fotek vykukujících zpoza ní. Web pořád není nasazený na produkci (viz otevřené body níže, beze změny).

**Co bylo uděláno:**
- Uživatel dodal reálné fotky do `fotky/` (mimo git, lokální složka), rozdělené do 5 podsložek podle kategorie, každá s `MAIN`/`MAIN FOTO` (1 hlavní fotka) a `OTHERS`/`OSTATN9` (zbytek zakázky). Kategorie a počty (main + others): Dřevěné fasády 1+23, Malby interiérů 1+22, Okna a dveře 1+22, Sekce renovace dřevěných pergol a trámu v interiéru 1+22, Stříkání 1+16 — celkem 110 fotek.
- Všechny fotky zpracovány přes `sips` (macOS) do `assets/img/galerie/<slug>/`: `main.jpg` (dlouhá hrana 1000 px, kvalita 60), `others/01.jpg…NN.jpg` (dlouhá hrana 1000 px, kvalita 50, číslováno podle abecedního pořadí zdrojových souborů), `peek/01–03.jpg` (dlouhá hrana 380 px, kvalita 45, jen první 3 "others" fotky, pro dekorativní náhled na zavřené kartě). Staré `assets/img/galerie-01…11.jpg` (plochý grid) smazány, nic na ně už needkazuje.
- `index.html`: sekce Galerie přepsána — `.gallery-categories` (5 karet `.gallery-card`, jedna `--featured`) nahrazuje starý `.gallery-grid` + filtrovací pilulky. Každá karta: `.gallery-card__photo` (positioning wrapper) obsahující `.gallery-card__stack` (2–3 `.gallery-card__peek` dekorativní náhledy, `aria-hidden`) + `.gallery-card__main` (hlavní fotka, masking-tape rohy), plus `.gallery-card__label` (titulek, 1řádkový popis, počet fotek) mimo photo wrapper. Klik na kartu otevírá `#categoryModal` (grid všech fotek kategorie, generovaný v JS), klik na fotku v modalu otevírá `#lightbox` (teď s prev/next šipkami a čítačem "X / Y", dřív jen single-image bez navigace).
- `assets/js/main.js`: `initGalleryFilters` + starý `initLightbox` (vázaný na `#galleryGrid`) nahrazeny jednou funkcí `initGallery()` — staví pole obrázků z `GALLERY_CATEGORIES` (slug → počet "others" fotek, musí sedět s počtem souborů na disku), spravuje modal kategorie i lightbox jako dvě vrstvy nad sebou (focus trap na tu vrstvu, která je zrovna otevřená; Escape zavírá nejdřív lightbox, pak modal; šipky ←/→ v lightboxu; focus se po zavření vrací na prvek, který vrstvu otevřel).
- `assets/css/style.css`: sekce "11. Galerie" kompletně přepsána (karty se stackem/peek efektem, hover/focus rozevírá peeking fotky dál — `translate`, `rotate` — modal kategorie, rozšířený lightbox s `.lightbox__nav`). Responsive: mobil 1 sloupec, ≥800px 2 sloupce (featured přes celou šířku, širší 16:9 crop), ≥1025px 3 sloupce (featured přes 2 z 3, zbylé 4 karty doplní řádek automatickým grid flow — žádné `grid-template-areas` nebylo potřeba pro přesně 5 položek).
- Vizuálně ověřeno přes headless Chrome/Playwright (nainstalováno lokálně do scratchpadu, ne do projektu) na 360–1400px šířkách + hover/klik/klávesnicové interakce: žádné console chyby, focus trap a návrat fokusu fungují, Escape zavírá vrstvy ve správném pořadí, šipky mění fotku a čítač.

**Rozhodnutí a proč:**
- Peeking fotky (`.gallery-card__peek`) jsou dekorativní (`aria-hidden="true"`, žádný `alt`) — skutečný obsah kategorie je dostupný přes `.gallery-card__main` (má popisný `alt`) a přes modal/lightbox po kliknutí. Necháno takhle, aby čtečka nečetla 15 nepopsaných miniatur navíc.
- Alt text u "others" fotek v modalu/lightboxu je generický vzorec `"{titul kategorie} — fotografie N z realizace"`, ne bespoke popis každé z 90 fotek — bylo by nepřiměřeně časově náročné ručně prohlížet a popisovat každou; hlavní fotky (5×) a peek náhledy z první fotky každé kategorie byly vizuálně zkontrolované a mají popisný alt. Zvážit v budoucnu, pokud na tom klientovi/SEO záleží víc.
- První karta (Dřevěné fasády) je `--featured` (větší, jiný crop) — stejné pravidlo jako u `.reference-grid__item--featured`, aby 5 karet nepůsobilo jako identická šablona (pravidlo 0 v `pravidla.md`).
- Šířka peeking fotek/hover posunů zmenšena a `.gallery-categories` dostal `overflow-x:hidden` + malý `padding-inline` — první verze s většími zápornými offsety (`right:-4%` apod.) natáčené o 7–9° přetékala přes okraj viewportu na úzkých mobilech (~360px) a způsobovala horizontální scroll stránky. Opraveno zmenšením offsetů na kladné/malé hodnoty a přidáním bezpečnostního ořezu na úrovni gridu.
- Číslování "others" fotek (`01.jpg…`) odpovídá abecednímu pořazení původních souborů `WhatsApp Image … (N).jpeg` ve zdrojové složce `fotky/`, ne chronologickému pořadí pořízení — pořadí uvnitř kategorie nemá zadáním určený význam.

**Chyba během session (pro příště):** Při úpravě `index.html` (přidání `.gallery-card__photo` wrapperu) došlo omylem k přepsání celého souboru nástrojem Write s placeholder obsahem místo cíleného Edit. Opraveno okamžitě rekonstrukcí souboru z plného obsahu přečteného na začátku session (před úpravou) + opětovnou aplikací zamýšlené změny, ověřeno přes `git diff HEAD` že žádná dřívější necommitnutá práce (přebarvení, sekce Reference) nezmizela. Poučení: pro cílenou strukturální změnu uvnitř existujícího souboru vždy použít Edit, ne Write, i pod tlakem "je to jen malá oprava".

**Nové/změněné mezery (vědomě neřešeno):**
- Ověřeno: `fotky/` (zdrojová složka, 23 MB nezpracovaných originálů) je v gitu ignorovaná přes existující `.gitignore` záznam `Fotky/` (case-insensitive shoda na macOS) — nehrozí, že se dostane do repozitáře. Web reálně používá jen zpracované verze v `assets/img/galerie/`.
- Alt texty "others" fotek jsou generické (viz výše) — case pro budoucí vylepšení, ne blokující chyba.
- Předchozí flat/filtrovaná galerie (Interiéry/Fasády/Průmyslové haly) byla nahrazena kategoriemi podle typu práce — pokud klient bude chtít oboje (filtr i kategorie), bude to vyžadovat další rozhodnutí o UX, zatím neřešeno.
- Beze změny z předchozích session: `RESEND_API_KEY` není nastaven na Vercelu (formulář na produkci neodešle e-mail), dnešní i předchozí změny ještě neprošly nasazením ani schválením klientem, canonical/OG URL pořád `REPLACE-WITH-DOMAIN.cz`, zbytek a11y checklistu (screen reader) neprošel manuálním testem mimo automatizované Playwright kontroly výše.
- Zjištěno (nesouvisí s galerií, needitováno): `.reference-cta` tlačítko a `.services-grid__item--lead` mírně přetékají přes viewport na velmi úzkých mobilech (~360px, cca 7–14px) — preexistující z minulé session, mimo scope dnešního zadání, zaznamenáno pro budoucí opravu.

**Dotčené soubory:**
- `index.html` (sekce `#galerie` přepsána — kategorie, modal, rozšířený lightbox)
- `assets/css/style.css` (sekce "11. Galerie" přepsána)
- `assets/js/main.js` (`initGallery()` nahrazuje `initGalleryFilters` + starý `initLightbox`)
- `assets/img/galerie/` (nová struktura `<slug>/main.jpg`, `<slug>/others/NN.jpg`, `<slug>/peek/0N.jpg`; staré `galerie-01…11.jpg` smazány)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")
- `.claude/memory/pravidla.md` (aktualizován bod 4.6 "Galerie" a sekce 5 "Foto-placeholdery a reálné fotky")

---

## 2026-08-26 — Nová hero fotka (detail rohu dřevěné fasády)

**Fáze projektu po této session:** beze změny fáze, jen výměna hero fotky za novou reálnou fotku dodanou klientem.

**Co bylo uděláno:**
- Uživatel dodal novou fotku do `fotky/HERO SEKCE /` (detail rohu dřevěné fasády s kovovou lešeňovou tyčí v popředí) a požádal o její nasazení do hero sekce místo dosavadní fotky (malíř na lešení natírající roh stropu).
- Zdrojová fotka měla nahoře a dole černé pruhy (letterboxing, pravděpodobně screenshot z videa) — ořezáno přes `sips -c` na 739×940 (odstranění pruhů), zmenšeno na dlouhou hranu 920 px, kvalita 82 (odpovídá konvenci `pravidla.md` sekce 5). Výsledek 723×920, ~200 KB, nahrazen do `assets/img/hero.jpg`.
- `index.html`: `alt` textu u hero `<img>` přepsán na popis nové fotky, `width`/`height` atributy aktualizovány na 723×920.
- `assets/css/style.css`: komentář u `.hero__media .photo-placeholder--filled img{object-position:50% 50%}` přepsán — dřív popisoval starou fotku (lešení, malíř, strop), teď vysvětluje, proč střed sedí i na novou fotku (rovnoměrná textura dřeva po celé výšce).
- Vizuálně ověřeno na 390/820/1400px — text čitelný přes scrim, kompozice (diagonální lamely + kovová tyč) funguje dobře jak na úzkém mobilním (téměř portrétním) tak širokém desktopovém (21:9) ořezu beze změny `object-position`.

**Rozhodnutí a proč:**
- Nová fotka nemá v záběru osobu (na rozdíl od brief-doporučení "malíř při práci / štětec na stěně" v `Varchol-malir-prompt.md` sekce Hero) — jde ale o explicitní, jednoznačný pokyn uživatele s konkrétní reálnou fotkou, ne o obecný placeholder rozhodovaný Claude, takže respektováno bez zpochybňování. Barevně navíc fotka silně ladí s `--primary`/`--accent` paletou webu (dřevěná hnědá/karamelová), takže funguje vizuálně možná i lépe než původní.
- Ořez černých pruhů řešen centrovaným `sips -c` (ne ruční offset) — pruhy byly vizuálně symetrické (~300 px nahoře/dole z 1600 px), centrovaný ořez je nejjednodušší spolehlivé řešení.

**Dotčené soubory:**
- `assets/img/hero.jpg` (nahrazena fotka)
- `index.html` (alt text + width/height u hero img)
- `assets/css/style.css` (aktualizován komentář u object-position)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")

---

## 2026-08-26 — Commit + push + nasazení na produkci

**Fáze projektu po této session:** **Produkce (https://michal-varchol-web.vercel.app) teď odpovídá dnešnímu stavu** — přebarvení, sekce Reference, nová galerie s kategoriemi i nová hero fotka jsou živé. Na žádost uživatele ("push na github a deploy na vercel").

**Co bylo uděláno:**
- Veškerá dosud necommitnutá práce (od 2026-08-24 přebarvení/Reference sekce + dnešní galerie a hero fotka) staged přes `git add -A` s explicitní výjimkou `fotky/`/`Fotky/` (zdrojové fotky, gitignored, nepatří do repa) a commitnuta jedním commitem (143 souborů, 907+/237- řádků + 143 image souborů).
- Push na `origin main` (GitHub `sobotkakrystof5-png/michal-varchol-web`) proběhl bez konfliktů (fast-forward `e524b25..723e1d1`).
- Nasazení na Vercel přes `vercel --prod --yes` (projekt už byl lokálně linknutý přes `.vercel/project.json`, přihlášení `sobotkakrystof5-png` ověřeno). Deployment proběhl a byl automaticky aliasován na produkční doménu `michal-varchol-web.vercel.app` (Vercel CLI vypsalo `▲ Aliased`).
- Ověřeno curlem, že produkce reálně servíruje nový obsah (`gallery-categories`, "Dřevěné fasády", nová hero fotka) a že klíčové assety (`hero.jpg`, `assets/img/galerie/drevene-fasady/main.jpg`, `style.css`, `main.js`) vrací 200.

**Rozhodnutí a proč:**
- Deploy proveden bez čekání na vizuální schválení klientem, protože o to uživatel (ne koncový klient Michal) explicitně požádal přímým příkazem — ale connect kontaktního formuláře zůstává nefunkční (viz mezera níže), takže než se web ukáže klientovi/sdílí dál, je potřeba to vyřešit.
- Nasazení proběhlo přes `vercel --prod` (CLI), ne čekáním na případnou GitHub-integraci auto-deploy — z předchozích session bylo zjevné, že samotný `git push` produkci sám neaktualizuje (projekt byl 4 dny neaktualizovaný i přes mezitímní commity), takže explicitní deploy krok je nutný pokaždé.

**Nové/změněné mezery (vědomě neřešeno):**
- **Kontaktní formulář na nově nasazené produkci pořád neodešle e-mail** — `RESEND_API_KEY` stále není nastaven v Environment Variables na Vercelu (nekontrolováno/nezměněno v této session, jen znovu potvrzeno jako existující mezera). Nejvyšší priorita, než se web ukáže klientovi jako hotový.
- Klient (Michal Varchol) dosud neviděl a neschválil nic z toho, co je teď na produkci (přebarvení, Reference, nová galerie, nová hero fotka) — nasazení proběhlo na žádost uživatele (vývojář/agentura), ne jako signál, že je to hotové ke schválení klientem.

**Dotčené soubory:**
- Commit `723e1d1` na `main` (viz `git log`) — obsahuje všechny soubory zmíněné ve dvou předchozích záznamech.
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")

---

## 2026-08-27 — Přebarvení: hnědá → antracitová + teakové dřevo

**Fáze projektu po této session:** Kód změněn a vizuálně ověřen lokálně, **necommitnuto, nepushnuto, nenasazeno**. Produkce (`michal-varchol-web.vercel.app`) stále servíruje starou hnědou paletu.

**Co bylo uděláno:**
- Uživatel požádal o změnu barevného motivu z "hnědá + bílá" na "antracitová (podklad) + teakové dřevo". Vzhledem k nejednoznačnosti (plně tmavý web vs. antracit jen jako primární barva vs. kombinace) položena `AskUserQuestion` se třemi konkrétními variantami (hex náhledy) — uživatel zvolil **"antracit jako primární, světlé pozadí zůstává"** (nejbližší 1:1 náhrada dřívějšího hnědého schématu).
- Upraveny design tokeny v `assets/css/style.css` `:root`: `--fg` (`#2E241C`→`#24272B`), `--muted` (`#6B5A48`→`#5C5F63`), `--primary` (`#6B4630`→`#2E3237`), `--primary-dark` (`#472C1D`→`#17191C`), `--accent` (`#BF8038`→`#8B5E3C`, teak), `--accent-2` (`#96906C`→`#C39A66`, světlejší teak). `--bg`, `--bg-alt`, `--line`, `--accent-fg`, `--error-text` beze změny.
- Dohledány a přepočítány i natvrdo zapsané `rgba(46,36,28,…)` hodnoty (odvozené z dřívějšího `--fg`) v hero scrim, tape stínech, modal/lightbox backdropu → nahrazeny `rgba(36,39,43,…)` (nová `--fg` v RGB). Ověřeno grepem, že v CSS ani `index.html`/`main.js` nezůstal žádný starý hex hnědé/zlaté palety natvrdo zapsaný mimo proměnné.
- Vizuálně ověřeno přes headless Playwright (`npx playwright`, port 51837 — pozor, port 8934 byl už obsazený úplně jiným, nesouvisejícím projektem "Masáže Tomáš Kestner" běžícím lokálně na stejném stroji, takže první pokus omylem screenshotoval cizí web; opraveno použitím volného portu a ověřením obsahu přes `grep "Varchol"` před screenshotováním). Screenshoty hero/o mně/služby/galerie/reference/kontakt/patičky — vše čitelné, bez console chyb (`console --errors` prázdné).

**Rozhodnutí a proč:**
- Zvolena "light-kept" varianta (ne plně tmavý web), protože uživatel ji přímo vybral z nabídnutých náhledů — nejnižší riziko, nejbližší dosavadnímu vzhledu, zachovává čitelnost dlouhého textu na světlém pozadí.
- **Důležitá kolize zjištěna, nahlášena uživateli, ale ne blokující:** dřívější hnědá paleta byla 2026-08-24 klientem (Michal Varchol) explicitně "zamčená" na základě jím dodané referenční fotky dřevěného interiéru (viz `pravidla.md` do této session). Antracit+teak tuto fotoreferenci nerespektuje. Uživatel (vývojář/agentura) o změnu požádal přímo, takže provedeno, ale klient tuto novou verzi **neviděl ani neschválil** — stejně jako zbytek toho, co už je na produkci živé.
- `pravidla.md` sekce 3 (Design systém) přepsána tak, aby odrážela novou paletu a zaznamenala historii obou zamčení (hnědá 08-24 → antracit+teak 08-27), včetně poznámky, že dřívější zamítnutí petrolové/modro-zelené barvy klientem se týkalo jiného odstínu, ale stojí za připomenutí při příští komunikaci s klientem.

**Otevřené otázky (čeká na klienta/uživatele):**
- Odsouhlasí klient Michal Varchol novou antracit+teak paletu, nebo trvá na dřívější hnědé podle jím dodané fotoreference? Zatím neprezentováno.
- Zbytek otevřených otázek (rok založení, logo, DIČ, doména, RESEND_API_KEY) beze změny — viz `index.md`.

**Dotčené soubory:**
- `assets/css/style.css` (design tokeny + natvrdo zapsané rgba stíny/overlaye)
- `.claude/memory/pravidla.md` (sekce 3 — Design systém, přepsána)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (přepsán blok "Aktuální stav")

---

## 2026-08-28 — Odstranění vysvětlující věty ze sekce Reference

**Fáze projektu po této session:** Beze změny (viz předchozí záznam) — jen drobná textová úprava navrch necommitnutých lokálních změn (antracit+teak paleta, hero foto).

**Co bylo uděláno:**
- Na žádost uživatele odstraněna úvodní věta sekce Reference: „Recenze nepíšu já, nechávám je zákazníkům přímo na Firmy.cz. Profil tam má aktuálně hodnocení „Fantastické" a 27 recenzí. Pár z nich je i tady, zbytek najdete na odkazu níže." Tlačítko „Zobrazit všechny reference na Firmy.cz" pod recenzemi zůstalo beze změny.

**Dotčené soubory:**
- `index.html` (odstraněn `<p class="section-intro">` v sekci `#reference`)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (aktualizován popis lokálních necommitnutých změn)

---

## 2026-08-28 — Push antracit+teak palety na produkci

**Fáze projektu po této session:** Produkce (**https://michal-varchol-web.vercel.app**) teď běží s NOVOU antracit+teak paletou, novým hero fotem a upravenou sekcí Reference — commit `9ad7da5`, deploy `READY` (auto-deploy z GitHub push).

**Co bylo uděláno:**
- Uživatel požádal "push celý projekt na github a deploy na vercel". Před provedením upozorněno, že necommitnutá antracit+teak paleta (viz session 2026-08-27) nebyla klientem schválena a přepisuje dřívější klientem explicitně zamčenou hnědou paletu — uživatel přes `AskUserQuestion` zvolil zahrnout a nasadit i tuto paletu.
- Commitnuty všechny necommitnuté změny (`style.css` paleta, `assets/img/hero.jpg`, odstranění věty v sekci Reference, memory soubory) jako `9ad7da5`, pushnuto na `origin/main`.
- Vercel projekt `michal-varchol-web` je napojený na GitHub repo (git integrace) — push na `main` automaticky spustil produkční deploy, ověřeno přes Vercel MCP (`list_deployments`) jako `state: READY`, `target: production`.

**Rozhodnutí a proč:**
- Paleta nasazena bez klientova schválení, protože uživatel (vývojář/agentura) to po upozornění explicitně zvolil jako preferovanou variantu.

**Otevřené otázky (čeká na klienta/uživatele):**
- Michal Varchol dosud neviděl a neschválil ani novou antracit+teak paletu, ani cokoliv jiného na produkci — nutno ukázat a získat zpětnou vazbu, riziko že bude chtít vrátit k původní hnědé.
- Ostatní dříve otevřené otázky (rok založení, logo, DIČ, skutečná doména, `RESEND_API_KEY`) trvají beze změny.

**Dotčené soubory:**
- Push zahrnul: `index.html`, `assets/css/style.css`, `assets/img/hero.jpg`, `.claude/memory/index.md`, `.claude/memory/memory.md`, `.claude/memory/pravidla.md`
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (aktualizován blok "Aktuální stav")

---

## 2026-08-30 — Zesvětlení hero fota (zpětná vazba od klienta)

**Fáze projektu po této session:** Produkce (**https://michal-varchol-web.vercel.app**, commit `bb23b25`, Vercel deploy `dpl_GfVCZ58jPx5nXsW38EW4eJjqseFR` READY) běží se zesvětleným hero scrim overlayem a rozšířeným hero podnadpisem, navrch dřívější antracit+teak palety/hero foto/Reference sekce z 2026-08-28.

**Co bylo uděláno:**
- Uživatel tlumočil zpětnou vazbu **od klienta Michala Varchola**, že hero fotka na produkci působí "vybledlá"/moc tmavá. To je nová informace: **klient tedy již viděl živou produkci** (dřív otevřená otázka — zda ji vůbec viděl).
- Zdrojem tmavosti nebyl filtr na obrázku (žádný `filter`/`brightness` na `<img>`), ale `.hero__scrim` gradient overlay v `assets/css/style.css` (`~L409`): `linear-gradient(180deg, rgba(36,39,43,.15), rgba(36,39,43,.72))`.
- Sníženo na `rgba(36,39,43,.05)` nahoře / `rgba(36,39,43,.5)` dole — nechal jsem větší tmavost dole zachovanou (byť nižší), protože `.hero__title`/`.hero__subtitle`/`.hero__actions` (bílý text/tlačítka) na spodní části scrimu závisí na kontrastu.
- Ověřeno vizuálně (headless Playwright screenshot hero sekce, port 8099, `console --errors` prázdné) — foto výrazně světlejší a teplejší, nadpis/podnadpis/tlačítka čitelné i přes světlejší levou (dřevěnou) stranu fota.

**Rozhodnutí a proč:**
- Neupraveny žádné jiné vlastnosti obrázku (jas/kontrast/filter) — jediný zdroj tmavosti byl scrim, takže stačila úprava jeho alfa hodnot.
- Ponechána nenulová tmavost dole (`.5`, ne úplně pryč), aby zůstal dostatečný kontrast pro bílý text/CTA — čistě vizuální odhad z brief požadavku na "zesvětlit, ať není tak tmavý", ne přesný WCAG výpočet (finální fotka je zatím reálná, ne placeholder, ale klient stále nic oficiálně neschválil).

**Nasazení:** uživatel následně požádal "pushni na githu a deploy na vercel". Před pushem nalezen v `index.html` ještě jeden necommitnutý, touto session neprovedený edit — rozšířený text `.hero__subtitle` (přidána zmínka o lakýrnických pracích, renovaci dveří/zárubní/oken). Pravděpodobně ruční úprava uživatele přímo v IDE mezi sezeními. Obsahově neodporuje briefu, zahrnuto do commitu beze změny. Commitnuto jako `bb23b25`, pushnuto na `origin/main`, Vercel git-integrace spustila auto-deploy, ověřeno přes Vercel MCP (`list_deployments`) jako `dpl_GfVCZ58jPx5nXsW38EW4eJjqseFR`, `state: READY`, `target: production`.

**Otevřené otázky (čeká na klienta/uživatele):**
- Potvrdí klient, že zesvětlené hero foto teď odpovídá tomu, co chtěl?
- Zbytek dřív otevřených otázek (schválení antracit+teak palety, rok založení, logo, DIČ, doména, `RESEND_API_KEY` na Vercelu) trvá beze změny — ale nově víme, že klient produkci aktivně sleduje a dává zpětnou vazbu, takže je vhodná chvíle vyžádat si od něj i zbytek chybějících faktů a schválení palety najednou.

**Dotčené soubory:**
- `assets/css/style.css` (`.hero__scrim` alfa hodnoty)
- `index.html` (rozšířený `.hero__subtitle` text, edit mimo tuto session)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (aktualizován blok "Aktuální stav")

---

## 2026-09-01 — Hero: "více zlata a prémiového dojmu" (zpětná vazba od klienta)

**Fáze projektu po této session:** Produkce (**https://michal-varchol-web.vercel.app**, poslední nasazený commit `bb23b25`) zatím NEODPOVÍDÁ pracovnímu stromu — tato session udělala kód, ale needeployla ho (uživatel o deploy nepožádal). Změny jsou jen lokální, needitované, needeploynuté.

**Co bylo uděláno:**
- Uživatel tlumočil zpětnou vazbu od klienta Michala Varchola: hero fotka má působit "více zlatě" a "prémiověji". Zadání bylo záměrně vágní, proto přes `AskUserQuestion` upřesněno na: (a) mechanismus = **oboje** (prohřátí scrim overlaye + přidání zlatých UI detailů), (b) rozsah = **jen hero sekce**, klientova zpětná vazba.
- `.hero__scrim` (`assets/css/style.css` ~L409) přebarven z neutrální antracitové (`rgba(36,39,43,...)`) na teplou bronzově-zlatou (`rgba(58,38,14,.10)` nahoře / `rgba(32,20,8,.62)` dole) — stejný mechanismus jako zesvětlení z 2026-08-30, jen posunutý odstín místo jasu.
- Přidán nový `.hero__glow` element (radiální zlatý "bloom" v levém horním rohu fotky, `mix-blend-mode:soft-light`) — zesiluje existující teplé bodové osvětlení na dřevěné stěně na fotce, místo plochého tónování celého snímku.
- Přidán `.hero__marker` — hero-specifická varianta existujícího motivu `.section-marker` (paint-swatch chipy použité jinde na stránce, např. `#o-nas`), ale ve zlatých odstínech (`#8A6A2A`/`#D9B45B`/`#F0D48A`) nad H1. Vědomě navázáno na existující vizuální motiv webu místo vymýšlení nového "luxusního" prvku, který by kolidoval s pravidlem 0 (no AI-template look).
- `.hero__stats .stat-strip__num` (čísla "20+"/"30 km" ve stat-strip kartě pod hero fotem) přebarvena na zlatou (`#A9812F`), scoped jen na hero variantu — `.stat-strip__num` mimo hero (pokud by se v budoucnu použil jinde) zůstává beze změny na `--primary-dark`.
- `.hero__actions .btn--primary` (tlačítko "Poptat práci") dostalo tenký zlatý prstenec (`box-shadow` ring, zesílený na hover) — scoped selektorem jen na hero, globální `.btn--primary` použité jinde na stránce beze změny.
- Ověřeno vizuálně přes headless Chrome (desktop ~1316px i mobil ~500px šířky): žádné console chyby, žádný horizontální overflow (`scrollWidth - innerWidth === 0` při 500px), hover stav tlačítka funguje, kontrast bílého textu na scrimu vypadá zachovaný i po prohřátí odstínu.

**Rozhodnutí a proč:**
- Zlatý akcent NENÍ zaveden jako nový globální design token (`--accent`/`--accent-2` beze změny) — zůstává lokální jen v hero-scoped selektorech (`.hero__marker-chip--N`, `.hero__stats .stat-strip__num`, `.hero__actions .btn--primary`), protože uživatel explicitně zvolil "jen hero" a protože minulá neschválená změna globální palety (antracit+teak, 2026-08-27) už jednou způsobila komplikaci s klientovým formálním schválením — nechci stejnou chybu zopakovat na další barvě.
- Zvolen přístup "prohřát scrim + zesílit existující světla v snímku" místo CSS filtru (`sepia`/`saturate`) na `<img>` — filtr by posunul i barvy nábytku/zdi rovnoměrně a mohl by vypadat jako "instagramový" filtr; cílený radiální `soft-light` bloom nad existujícím bodovým osvětlením působí jako vlastnost fotky, ne jako vrstva navrch.
- Zlatý paint-swatch marker nad H1 zvolen namísto generické zlaté linky/rámečku, protože rhymuje s už zavedeným motivem webu (`.section-marker` chipy) — splňuje pravidlo 0 ("nevymýšlet nový vizuální jazyk, opakovat 1-2 existující motivy konzistentně").

**Otevřené otázky (čeká na klienta/uživatele):**
- Potvrdí klient Michal, že tato "zlatější/prémiovější" verze hero sekce odpovídá tomu, co chtěl, než se nasadí na produkci?
- Zbytek dříve otevřených otázek beze změny (schválení antracit+teak palety, rok založení, logo, DIČ, doména, `RESEND_API_KEY` na Vercelu) — tato session je přidává, neřeší.
- Uživatel zatím nepožádal o commit/push/deploy této změny — čeká se, jestli/kdy to bude chtít.

**Nové/změněné mezery (vědomě neřešeno):**
- Změna zatím jen lokálně v pracovním stromu, needeployná na produkci — `index.md` "Aktuální stav" teď musí rozlišovat "co běží na produkci" (`bb23b25`) od "co je rozpracované lokálně" (tato session).

**Dotčené soubory:**
- `assets/css/style.css` (`.hero__scrim`, nový `.hero__glow`, nový `.hero__marker`/`.hero__marker-chip`, `.hero__actions .btn--primary` box-shadow, `.hero__stats .stat-strip__num`)
- `index.html` (nový `<div class="hero__glow">` a `.hero__marker` se třemi chipy uvnitř `.hero__content`)
- `.claude/memory/memory.md` (tento záznam)
- `.claude/memory/index.md` (aktualizován blok "Aktuální stav")

---
