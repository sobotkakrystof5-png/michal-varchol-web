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

- **Fáze:** první implementační draft webu hotový a funkční lokálně (HTML/CSS/JS + serverless funkce + SEO soubory). Hero sekce je teď poprvé skutečně vizuálně ověřená na mobilu/tabletu/desktopu (Playwright screenshoty) a 2 nalezené bugy opravené — zbytek webu vizuálně ověřen na mobilu bez problémů. Web zatím není nasazený, formulář není end-to-end otestovaný se skutečným Resend klíčem, fotky jsou placeholdery, klientská fakta chybí.
- **Poslední session:** 2026-08-12 — první vizuální test v prohlížeči (Playwright), opraven bug s chybějící třídou `hero__title` na `<h1>` (text splýval barevně s pozadím) a bug s překryvem hero nadpisu a foto-placeholderu na úzkém mobilu (pod ~400px). Detaily viz `memory.md` záznam "První vizuální test mobilní verze + oprava 2 bugů v hero sekci".
- **Otevřené otázky čekající na klienta:** rok založení / roky praxe, logo, IČO/DIČ, reálné fotky (1 hero + 1 O mně + 9 galerie), skutečná doména (aktuálně placeholder `REPLACE-WITH-DOMAIN.cz`), odsouhlasení barevné palety/vizuálního stylu (první návrh, ne finální schválení).
- **Známé vědomé mezery:** formulář neotestovaný end-to-end (chybí `RESEND_API_KEY`), tap targety pod 40px na mobilním menu/patičce/desktop navu (a11y vylepšení, ne blokující), `node_modules` nenainstalované v projektu, mapa používá Google Maps embed místo mapy.cz, zbytek a11y (klávesnice, screen reader, scrollspy, lightbox) ještě neprošel manuálním testem.
- **Další logický krok:** založit Resend účet a `RESEND_API_KEY`, otestovat formulář end-to-end, projít zbytek a11y checklistu (klávesnice/scrollspy/lightbox), zvážit zvětšení tap targetů pod 40px, získat od klienta otevřené informace výše.

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
