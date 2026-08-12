# Pravidla projektu — Varchol, malířské práce Litoměřice

Tento soubor je závazný seznam pravidel pro každou práci na tomto webu. Je destilovaný z `Varchol-malir-prompt.md` (klientský brief), `CLAUDE.md` a tří referenčních dokumentů v `.claude/` (`rules-skills.md`, `Antos-simple-site-skill.md`, `not-AI-website-rules.md`). Při konfliktu mezi tímto souborem a briefem platí brief — tento soubor ho pouze zhušťuje do akční podoby. Pokud se pravidlo změní, uprav ho tady i v [`memory.md`](memory.md) (zapiš proč se změnilo).

---

## 0. Nejvyšší priorita — web nesmí vypadat jako "AI šablona"

Toto pravidlo převažuje nad vším ostatním v tomto dokumentu. Před dokončením každé sekce si polož otázku: *"Vypadá to jako promyšlená práce pro tohoto konkrétního klienta, nebo jako generická šablona?"* Pokud druhé, přepracuj.

**Konkrétně se vyhýbat:**
- generický hero: velký centrovaný nadpis + podnadpis + 2 tlačítka vedle sebe + ilustrace/gradient vpravo (pokud se použije, dej mu asymetrii a nekonvenční CTA umístění)
- přehnaná symetrie a centrování všeho — pracovat s asymetrickým gridem
- opakující se "feature card" grid (ikona nahoře + titulek + text) 3-4× identicky
- přebité gradienty (fialovo-modré, duhové), glassmorphism bez účelu, generické 3D ilustrace, needitované stock ikony
- plošná "fade-in + slide-up při scrollu" animace na všem
- lorem-ipsum/generické marketingové fráze ("Jsme tým profesionálů", "Kvalita je naší prioritou")
- identický spacing a zarovnání v každé sekci — sekce mají mít vlastní rytmus a hustotu
- fontové párování vypadající jako nenastavený Tailwind/shadcn default

**Místo toho:** 1–2 vlastní vizuální motivy navázané na malířské řemeslo (kandidáti: diagonální brush-stroke divider mezi sekcemi; tenký paint-swatch pruh jako sekční značka, max 2-3 tlumené odstíny; masking-tape detail na rámečku fotek). Vybrat 1-2, ne všechny tři, a opakovat konzistentně jako signaturu.

## 1. Fakta a obsah — nikdy nevymýšlet

- Nikdy nevymýšlet: rok založení firmy, IČO/DIČ, počty klientů/let praxe, ceny — pokud klient neuvedl, nechat jasně označený placeholder nebo se zeptat.
- Zdrojový text o firmě (brief sekce 1) se smí stylisticky přeformulovat, ale fakta se nesmí zkreslit ani doplnit.
- Známé mezery (vědomě, neopravovat jako bug, dokud klient nedodá): žádné reálné fotky, žádné logo (jen textový wordmark), žádný rok založení, žádné IČO/DIČ.

## 2. Tech stack a architektura (neměnná rozhodnutí)

- Vanilla HTML/CSS/JS — žádný frontend framework, žádný build krok pro hlavní web.
- Jedna scrollovací stránka (landing page), žádné samostatné routy. Header nav odkazuje na anchory: `#o-nas`, `#sluzby`, `#galerie`, `#kontakt`.
- Smooth scroll + scrollspy (aktivní nav odkaz = viditelná sekce).
- Kontaktní formulář odesílá e-mail přes Resend přes **tenkou serverless funkci** (Vercel/Netlify) — API klíč nikdy v client-side JS. Vždy ověřit end-to-end, nikdy tiše nepředpokládat, že to funguje bez backendu.
- Mapa: Mapy.cz iframe nebo Google Maps embed — jednoduchý embed, žádné těžké JS SDK.
- Obrázky: `loading="lazy"`, mobile-first plná responzivita.
- Pokud se má měnit landing page → multi-page nebo tech stack, jde o nevratné rozhodnutí — nikdy neodhadovat, vždy se zeptat nebo to explicitně vlajkovat uživateli.
- Nový anchor přidaný do stránky (např. blog, ceník) musí být synchronně doplněn do header nav i footer "rychlé odkazy".

## 3. Design systém

- **Primární barva:** tlumená zemitá (teplá šedá/greige nebo tlumený petrol) — ne korporátní modrá.
- **Pozadí:** teplá bílá/krémová, ne čistě bílá.
- **Text:** tmavá odstínová verze primární barvy, ne čistě černá.
- **Accent:** max 1 tlumená doplňková barva, max 2-3 odstíny celkem, žádná duha. Poměr cca 80-85 % neutrální plocha / zbytek accent. Accent nesmí zabírat velké plochy.
- Kontrast text/pozadí min. WCAG AA pro každou kombinaci.
- **Nadpisy:** výrazné písmo s charakterem (např. Fraunces, Sora, Inter s doladěným trackingem), ne systémový default.
- **Text:** čitelné sans-serif s dobrým řádkováním.
- CSS proměnné jako otevřené placeholdery (`--bg, --fg, --muted, --accent, --accent-fg, --font-heading, --font-body`), dokud není finální paleta potvrzená.
- Logo: klient zatím nedodal — jednoduchý textový wordmark ("Malířské práce Litoměřice" nebo "M. Varchol"), bez ikon-klišé (žádný váleček s kapkou barvy). Nechat prostor pro budoucí náhradu skutečným logem.

## 4. Struktura stránky (pořadí a komponenty)

Reference: `.claude/Antos-simple-site-skill.md` (jednostránková řemeslnická šablona).

1. **Header** (sticky) — skip-to-content link jako první DOM element (viditelný jen na focus) → wordmark vlevo (link na hero) → anchor nav (O mně / Služby / Galerie / Kontakt) → 1 primární CTA vpravo ("Nezávazná poptávka" → kontakt). Mobil: hamburger/off-canvas se stejnými odkazy.
2. **Hero** — full-bleed foto-placeholder, konkrétní H1 (ne generický claim), 1řádkový podnadpis, 2 CTA asymetricky rozmístěná (primární "Poptat práci" → kontakt, sekundární "Prohlédnout práce" → galerie), 2položkový stat strip ("[X] let zkušeností" placeholder · "Litoměřice a okolí do 30 km").
3. **O mně** (`#o-nas`) — H2 + víceodstavcový text → 4položkový value-prop grid (ikona + titulek + 1 řádek popisu, vlastní kompoziční logika, ne 4 identické karty; na mobilu 2×2) → 1 doprovodná fotka.
4. **Služby** (`#sluzby`) — H2 + grid textových karet bez obrázků a bez CTA na kartě: Malířské práce (interiéry) · Lakýrnické práce · Fasádní nátěry · Velkoplošné stříkání hal.
5. **Galerie** (`#galerie`) — H2 + filtrovací pilulky (Interiéry / Fasády / Průmyslové haly) → grid fotek-placeholderů → "Zobrazit celou galerii" řešit jako lightbox/expand in-page, ne samostatná route.
6. **Kontakt** (`#kontakt`) — H2 + úvodní řádek → dvousloupcový layout: (a) kontaktní údaje (adresa, telefon, e-mail) + tlačítka volat/e-mail + mapa; (b) formulář (jméno, e-mail, telefon, zpráva) s inline validací (hint text trvale pod povinnými poli, ne jen při chybě) a honeypot polem (skryté, `tabindex="-1"`, `autocomplete="off"`).
7. **Footer** — wordmark → řádek IČO/DIČ (placeholder) → "Rychlé odkazy" zrcadlící header nav → kontaktní seznam → copyright.

**Konvence:** přesně jeden primární (filled) a jeden sekundární (outline) CTA styl v celé stránce, žádná další variace. Žádné dropdowny/utility bar/search v navigaci. Žádný číslovaný "index" motiv.

## 5. Foto-placeholdery

- Dokud klient nedodá fotky: žádné stock/externí fotky jako výplň.
- Každý placeholder = jasně vizuálně odlišený rámeček (přerušovaný okraj, neutrální pozadí, ikona fotoaparátu, popisek co tam patří), s finálním `aspect-ratio` nastaveným předem (aby se layout neposunul po vložení reálných fotek).
- Počty: 1× hero, 1× O mně, min. 6× galerie (rozděleno mezi 3 kategorie filtru).
- `alt` texty i na placeholderech, popisné, připravené na budoucí náhradu.

## 6. Kontaktní formulář — funkční požadavky

1. Validace vstupů (povinná pole, formát e-mailu) na klientovi i serveru.
2. Bezpečné odeslání — API klíč nikdy v client-side kódu.
3. Honeypot nebo jiná základní ochrana proti spamu.
4. Loading/success/error stavy, reset formuláře po úspěchu.
5. Jasně uvedený cílový e-mail (mvarchy@gmail.com).
6. GDPR souhlas jako plná věta (účel zpracování + nesdílení třetím stranám), ne jen "souhlasím" checkbox.

## 7. Přístupnost a výkon

- Kontrast min. WCAG AA.
- Sémantické HTML5, jeden H1 na stránku, správná hierarchie nadpisů.
- Formulář plně ovladatelný klávesnicí.
- Optimalizace obrázků, žádné zbytečné render-blocking skripty, minimalizace layout shiftu (proto fixní `aspect-ratio`).

## 8. Právní náležitosti

- GDPR souhlas (checkbox, plná věta) u formuláře.
- Zvážit samostatnou sekci "Zásady ochrany osobních údajů" — pokud ano, jen jako placeholder k doplnění klientem/právníkem. Negenerovat právní text sám.
- Cookie lišta, pokud web použije analytiku/cookies nad rámec striktně nutných.

## 9. Copywriting — checklist "humanizace" textu

Reference: `.claude/not-AI-website-rules.md`. Aplikovat na jakýkoli text mířený na klienta/návštěvníka před finalizací.

**Zakázané fráze a vzorce:**
- klišé slovník: „nicméně", „nadto/navíc", „v neposlední řadě", „je důležité poznamenat, že...", „nejde jen o X, ale také o Y", nadužívané „klíčový"/„zásadní", „ponořme se do toho"
- pomlčka (–/—) uprostřed věty místo čárky/tečky/spojky
- nadužívaná dvojtečka uvádějící výčet tam, kde stačí obyčejná věta
- odrážkové seznamy tam, kde by fungovala plynulá próza
- tučný text uprostřed věty pro zdůraznění
- umělé nadpisy „Závěr"/„Shrnutí" u krátkého textu
- trojkolonka — tři vlastnosti vyjmenované za sebou („rychlé, efektivní a spolehlivé")
- věty stejné délky za sebou (chybějící přirozená nepravidelnost)
- přehnaně vyvážený/opatrný tón, chybějící jasné stanovisko
- zakončení nevyžádanou nabídkou pomoci

**Finální checklist před publikováním textu:**
- [ ] odstraněny/nahrazeny pomlčky uprostřed věty
- [ ] omezeny zbytečné odrážky
- [ ] odstraněno tučné zvýraznění uprostřed věty
- [ ] vyškrtnuty klišé fráze
- [ ] rozbité trojkolonky
- [ ] věty se liší délkou a rytmem
- [ ] text má aspoň náznak osobního tónu/názoru (pokud to sedí k účelu)
- [ ] fakta, čísla a význam beze změny

## 10. Pracovní proces (každá session)

1. Parafrázuj zadání jedním souvětím před tím, než začneš měnit kód.
2. Zkontroluj, jestli požadavek nekoliduje s briefem, s tím, co už funguje (formulář, nav, responzivita, SEO), s pravidlem "no AI look" (sekce 0), nebo jestli tiše nemění tech stack/strukturu (sekce 2) — konflikt nahlas, neplň mlčky.
3. Nikdy nevymýšlej fakta (sekce 1) — placeholder nebo dotaz.
4. Před označením čehokoliv za hotové ověř: žádné console chyby, formulář reálně odesílá (otestováno, ne předpokládáno), responzivita mobil/tablet/desktop, přístupnost (kontrast, klávesnice).
5. Na konci session zapiš záznam do [`memory.md`](memory.md) (fáze, co se udělalo, rozhodnutí a proč, otevřené otázky, nové mezery) — je to jediná kontinuita, kterou má příští session k dispozici. Postup viz [`index.md`](index.md).

## 11. Údržba tohoto memory systému

- `pravidla.md` (tento soubor) se mění jen když se změní samotné pravidlo hry (např. klient dodá logo → smaž "žádné logo" mezeru, uprav sekci 3) — každou takovou změnu zaznamenej i jako záznam v `memory.md`.
- `memory.md` je procesní / chronologický log — nikdy se nemaže, jen se přidávají nové záznamy.
- `index.md` je jediný soubor, který se přepisuje celý při každé aktualizaci (shrnuje aktuální stav) — je to vstupní bod pro každou novou session.
