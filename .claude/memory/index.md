# Index — memory systém projektu Varchol

**Toto je první soubor, který si přečti na začátku každé session na tomto projektu.** Dává rychlou orientaci bez nutnosti procházet celou historii, a odkazuje dál na to, co potřebuješ podle typu úkolu.

## Jak je systém složený

| Soubor | Účel | Kdy ho číst | Kdy ho upravovat |
|---|---|---|---|
| [`index.md`](index.md) (tento) | Rychlý snapshot stavu + navigace | Vždy, na začátku session | Na konci každé session, kdy se něco změnilo — přepiš celý blok "Aktuální stav" níže |
| [`pravidla.md`](pravidla.md) | Destilovaná, akční pravidla projektu (design, tech stack, struktura, copywriting, proces) | Před jakoukoli implementační/textovou prací | Jen když se změní samotné pravidlo (klient dodá logo, změní se rozhodnutí o stacku apod.) |
| [`memory.md`](memory.md) | Chronologický, append-only log všech session a rozhodnutí s "proč" | Když potřebuješ pochopit historii/kontext konkrétního rozhodnutí | Na konci každé session, kdy se v projektu něco změnilo — přidej nový záznam, nic nemaž |

Zdroj pravdy pro **obsah/zadání** zůstává `Varchol-malir-prompt.md` v rootu projektu — `pravidla.md` ho jen zhušťuje, nenahrazuje.

## Aktuální stav (přepisuje se při každé aktualizaci)

- **Fáze:** Produkce (**https://michal-varchol-web.vercel.app**, deploy 2026-08-26, commit `723e1d1`) běží se STAROU hnědou paletou. Lokálně v pracovním stromu jsou od 2026-08-27/28 necommitnuté změny (nepushnuté, nenasazené): nová paleta **antracitová + teakové dřevo**, nové hero foto, a odstranění úvodní věty o Firmy.cz ze sekce Reference — viz níže. Kontaktní formulář na produkci STÁLE NEfunguje (chybí `RESEND_API_KEY` na Vercelu), některá klientská fakta pořád chybí (rok založení, logo, DIČ, skutečná doména), a **klient Michal Varchol dosud nic z nasazeného webu neviděl/neschválil**.
- **Poslední session:** 2026-08-28 — na žádost uživatele odstraněna z sekce Reference úvodní věta vysvětlující, že recenze pocházejí z Firmy.cz ("Recenze nepíšu já, nechávám je zákazníkům přímo na Firmy.cz…"). Tlačítko „Zobrazit všechny reference na Firmy.cz" pod recenzemi zůstalo. Viz `memory.md` záznam "Odstranění vysvětlující věty ze sekce Reference".
- **Předchozí session (2026-08-27):** přebarvení. Uživatel (vývojář/agentura, ne klient) požádal o změnu motivu "hnědá + bílá" na "antracitová (podklad) + teakové dřevo"; po `AskUserQuestion` s náhledy zvolena varianta "antracit jako primární, světlé krémové pozadí zůstává". Design tokeny v `assets/css/style.css` `:root` přepsány (`--fg`, `--muted`, `--primary`, `--primary-dark`, `--accent`, `--accent-2`; `--bg`/`--bg-alt`/`--line` beze změny) + přepočítány natvrdo zapsané `rgba(46,36,28,…)` overlaye/stíny na novou `--fg`. Ověřeno vizuálně přes headless Playwright (hero/o mně/služby/galerie/reference/kontakt/patička, bez console chyb). **Důležité:** dřívější hnědá paleta byla 2026-08-24 klientem explicitně zamčená podle jím dodané fotoreference dřevěného interiéru — nová antracit+teak paleta tuto referenci nerespektuje a klient ji neviděl. Detaily viz `memory.md` záznam "Přebarvení: hnědá → antracitová + teakové dřevo".
- **Zjištěno, needitováno (mimo scope):** `.reference-cta` tlačítko a `.services-grid__item--lead` mírně přetékají přes viewport na ~360px mobilech (7–14px horizontální scroll) — preexistuje z 2026-08-24 session.
- **Otevřené otázky čekající na klienta:** odsouhlasí Michal Varchol novou antracit+teak paletu, nebo trvá na dřívější hnědé podle své fotoreference? Přesný rok založení firmy (roky praxe teď "20+"), logo, DIČ, skutečná doména (canonical/OG tagy pořád `REPLACE-WITH-DOMAIN.cz`, možný kandidát `malirske-prace-litomerice.cz`, nepotvrzeno), **klient ještě neviděl nic z toho, co je živé na produkci** (natož novou lokální paletu).
- **Známé vědomé mezery:** **`RESEND_API_KEY` není nastaven na Vercelu — kontaktní formulář na živé produkci aktuálně neodešle e-mail** (nejvyšší priorita), canonical/OG URL neodpovídá skutečné nasazené adrese, drobný horizontální overflow na ~360px u `.reference-cta`/`.services-grid__item--lead`, alt texty "others" fotek v galerii jsou generické vzorce, tap targety pod 40px na mobilním menu/patičce/desktop navu, `node_modules` nenainstalované, mapa používá Google Maps embed místo mapy.cz, zbytek a11y (screen reader) ještě neprošel manuálním testem.
- **Další logický krok:** rozhodnout s uživatelem/klientem, jestli se nová antracit+teak paleta commitne/pushne/nasadí (zatím jen lokální pracovní strom), založit Resend účet a nastavit `RESEND_API_KEY` na Vercelu, ukázat klientovi živou produkci (a případně novou paletu) ke schválení, opravit drobný mobilní overflow, potvrdit canonical/OG URL vs. skutečnou doménu, získat od klienta zbývající otevřené informace výše.

Plná historie a odůvodnění každého bodu výše: [`memory.md`](memory.md).

## Protokol pro tuto a každou budoucí session

1. **Na začátku:** přečti tento soubor celý, pak podle potřeby `pravidla.md` (před implementací/textem) a relevantní část `memory.md` (pokud potřebuješ kontext konkrétního minulého rozhodnutí, ne celou historii).
2. **Během práce:** dodržuj `pravidla.md`. Pokud narazíš na rozpor mezi `pravidla.md` a `Varchol-malir-prompt.md`, platí brief — nahlas rozpor a oprav `pravidla.md`.
3. **Na konci session, pokud se cokoliv změnilo** (kód, rozhodnutí, obsah, nově zjištěný fakt od klienta, nová otevřená otázka):
   - přidej nový záznam do `memory.md` podle šablony na začátku toho souboru,
   - přepiš blok "Aktuální stav" výše v tomto souboru tak, aby odpovídal novému stavu,
   - pokud se změnilo samotné pravidlo (ne jen stav) — uprav odpovídající místo v `pravidla.md`.
4. **Pokud se nic nezměnilo** (čistě informativní dotaz, nic se needitovalo) — memory systém se nemusí aktualizovat.

Tento protokol je také zapsaný v `CLAUDE.md` v rootu projektu (sekce "Working process") — pokud se dostanou z synchronizace, tento soubor je podrobnější a je zdroj pravdy pro postup práce s pamětí.
