# FAB
Publik webbplats och admingrännsnitt för "FAB" som är en fiktiv lunchrestaurang och konferensrestaurang.

Projektet utvecklas som ett projektarbete inom backend-baserad webbutveckling på MIUN VT2026.

## Live
**Publik webbplats:** https://fabrestaurant.netlify.app/ </br>
**Adminsida:** https://fabrestaurant.netlify.app/login </br>
**API (backend):** https://fab-backend-l9o4.onrender.com </br>
**Repo (backend):** https://github.com/Punttt/fab-backend.git </br>

## Inloggning för admin
Användarnamn: admin
Lösenord: adminpw

## Teknik 
  - Vanilla JS - inget ramverk
  - VITE - automatiserad utvecklingsmiljö
  - SCSS - för CSS-preprocessorer med variabler och nesstling
  - date-fns - för datumhantering via backend.

## Sidor
Multipage setup med vida rollupoptions i Vite.
  - index.html - startsidan för restaurangen.
  - booking.html - bokningssida, inte kopplad till någon backend. endast statisk
  - login.html - inloggningssida för admin
  - admin.html - dashboard och administrationsgrännsnitt som är skyddad.

## Funktionalitet
### Publik hemsida
  - Visar den aktuella veckans veckomeny dynamiskt från API et
  - Veckonumret beräknas automatiskt enligt ISO 8601
  - Responsivitet och design för mobil, surfplatta och desktop.

### ADmin
  - inloggning med JWT - sparas i session storage.
  - Frontend guard med omdirigering till /login
  - Skapa veckomeny för specifik vecka/år
  - Förflyttning av befintliga rätter vid redigering
  - Smart save men PUT för för uppdatering och POST för nya dagar.
  - Utloggning som rensar token.

 ## Arkitektur
 fab/ </br>
├── public/             # statiska resurser (bilder, ikoner) </br>
├── src/ </br>
│   ├── js/             # JavaScript per sida </br>
│   │   ├── main.js     # publik startsida </br>
│   │   ├── login.js </br>
│   │   ├── admin.js </br>
│   │   └── api.js      # delade hjälpfunktioner (API_URL, showMessage) </br>
│   └── styles/         # SCSS </br>
├── index.html </br>
├── booking.html </br>
├── login.html </br>
├── admin.html </br>
└── vite.config.js      # multi-page setup </br>

## Säkerhet
  - Två lager med skydd för adminsidan, frontend med redirect vid saknad token + middleware i backend.
  - JWT lagras i session storage försvinner vid stängd flik och raderas efter en timme.
  - Url för Apiet hanter i filen api.js

## Lokal utveckling
1. Klona repot
2. Installera beroenden:
```bash
   npm install
```
3. Sätt API-URL i `src/js/api.js` (för lokal: `http://localhost:3000/api`)
4. Starta utvecklingsservern:
```bash
   npm run dev
```
### Build
Build command: npm run build
publicerings directory : dist

## Författare
Pontus Johansson - MIUN 2026
