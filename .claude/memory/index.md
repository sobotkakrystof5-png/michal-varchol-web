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

- **Fáze:** web je živý na produkci — **https://michal-varchol-web.vercel.app** — ale ve staré paletě, bez sekce Reference, bez dnešní přepracované galerie a se starou hero fotkou. **Lokálně (necommitnuto, nenasazeno) je hotová přebarvená verze + sekce Reference + kompletně nová galerie + nová hero fotka**, viz níže. Kontaktní formulář na produkci NEfunguje (chybí `RESEND_API_KEY` na Vercelu), některá klientská fakta pořád chybí (rok založení, logo, DIČ, skutečná doména).
- **Poslední session:** 2026-08-26 (dvě části). (1) Galerie přepracována z plochého filtrovaného gridu (11 fotek) na 5 klikatelných kategorií podle typu práce (Dřevěné fasády, Malby interiérů, Okna a dveře, Renovace dřevěných pergol, Stříkání), 110 reálných fotek celkem dodaných klientem do `fotky/` (mimo git). Každá kategorie: hlavní fotka + 2–3 dekorativně vykukující náhledy na kartě → klik otevře modal se všemi fotkami kategorie → klik na fotku otevře lightbox s prev/next navigací. Detaily struktury, rozhodnutí a jedna chyba-a-oprava (omylem přepsaný `index.html` přes Write, opraveno rekonstrukcí ze čteného obsahu + ověřeno `git diff`) viz `memory.md` záznam "Galerie přepracována na kategorie s peeking fotkami". (2) Hero fotka vyměněna za novou klientskou fotku (detail rohu dřevěné fasády s lešeňovou tyčí) — zdroj měl černé letterbox pruhy, ořezáno přes `sips`, viz `memory.md` záznam "Nová hero fotka". Obojí vizuálně i klávesnicově ověřeno přes headless Playwright (360–1400px) — bez console chyb.
- **Zjištěno, needitováno (mimo scope dnešní session):** `.reference-cta` tlačítko a `.services-grid__item--lead` mírně přetékají přes viewport na ~360px mobilech (7–14px horizontální scroll) — preexistuje z 2026-08-24 session, nesouvisí s galerií.
- **Otevřené otázky čekající na klienta:** přesný rok založení firmy (roky praxe teď "20+"), logo, DIČ, skutečná doména (canonical/OG tagy pořád `REPLACE-WITH-DOMAIN.cz`, možný kandidát `malirske-prace-litomerice.cz` z Firmy.cz profilu, nepotvrzeno), **klient ještě neviděl dnešní galerii ani předchozí přebarvení/Reference sekci naživo ani nasazené**.
- **Známé vědomé mezery:** **`RESEND_API_KEY` není nastaven na Vercelu — kontaktní formulář na živé produkci aktuálně neodešle e-mail** (nejvyšší priorita před sdílením webu klientovi), veškerá práce od 2026-08-24 (přebarvení, Reference, dnešní galerie) zatím **neprošla nasazením ani schválením klientem**, canonical/OG URL neodpovídá skutečné nasazené adrese, drobný horizontální overflow na ~360px (viz bod výše), alt texty "others" fotek v galerii jsou generické vzorce, ne bespoke popisy (90 fotek, viz `memory.md`), tap targety pod 40px na mobilním menu/patičce/desktop navu, `node_modules` nenainstalované v projektu, mapa používá Google Maps embed místo mapy.cz, zbytek a11y (screen reader) ještě neprošel manuálním testem mimo automatizované Playwright kontroly.
- **Další logický krok:** vizuálně ukázat klientovi celý dnešní i předchozí necommitnutý stav (přebarvení, Reference, nová galerie), pak commit + nasazení na Vercel. Nezávisle na tom: založit Resend účet, nastavit `RESEND_API_KEY` na Vercelu a otestovat formulář end-to-end, opravit drobný mobilní overflow u `.reference-cta`/`.services-grid__item--lead`, potvrdit/vyřešit canonical/OG URL vs. skutečnou doménu, získat od klienta zbývající otevřené informace výše.

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
