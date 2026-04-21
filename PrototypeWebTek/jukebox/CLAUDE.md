# JAJO — PrototypeWebTek

## Project Overview

Group project by Andreas, Jakob, Jonathan, and Jonas. A cryptocurrency blockchain explorer web app that lets users query blockchain data (blocks, transactions, wallets, addresses, currencies) through a simple browser UI.

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript   |
| Backend  | Node.js + Express (existing)      |
| Database | PostgreSQL (existing)             |

## Project Structure

```
PrototypeWebTek/
├── jukebox/
│   ├── frontend/          ← all new frontend work goes here
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── endpoint-user.js
│   │   └── jsonview.js    (third-party library — do not modify)
│   ├── backend/           ← existing, do not modify
│   │   └── server.js
│   └── db/                ← existing, do not modify
├── Gangsta/
│   └── Gangsta.html
└── CLAUDE.md
```

## Running the Project

```bash
cd jukebox
npm install
npm run dev     # starts Express server with nodemon
```

Then open `http://localhost:<port>` in a browser (port is logged on startup).

## Constraints

These constraints apply to all new code in this project. Do not work around them.

### Languages
- **HTML + CSS + JavaScript only.** No TypeScript, no SASS/LESS, no other languages.
- No build tools (no Webpack, Vite, Parcel, Babel, etc.).
- No frontend frameworks (no React, Vue, Angular, Svelte, etc.).

### Libraries
- No new external libraries on the frontend.
- Only use what is already present in the repo (`jsonview.js`).
- No new `npm install` for frontend dependencies.

### Data Models & Data Structures
- Use only basic structures: plain objects `{}`, arrays `[]`, strings, numbers, booleans.
- Do not use: `Map`, `Set`, `WeakRef`, `Proxy`, `Symbol`, generators, iterators, or custom class hierarchies.
- Keep data flat and simple — avoid deeply nested objects.

### Complexity
- Logic must stay at beginner/mid level. Prefer clarity over cleverness.
- Functions should do one thing and stay under ~20 lines.
- No complex algorithms or design patterns (no factories, observers, decorators, etc.).
- Recursion depth must not exceed 2 levels.
- Async: use `fetch` with `.then()` or simple `async/await`. No complex promise chaining.

### DOM
- Use standard DOM APIs: `getElementById`, `querySelector`, `querySelectorAll`, `addEventListener`, `createElement`, `appendChild`, `innerHTML`, `textContent`.
- No Shadow DOM, Web Components, or custom elements.

### Scope
- New features go in `frontend/` only.
- Do not add new backend endpoints, modify `server.js`, add database tables, or change SQL queries unless explicitly asked.

## Code Style

- Descriptive variable and function names (`getUserWallet`, not `guw`).
- 2-space indentation (match existing files).
- Add a short comment only when the logic is non-obvious.
- No commented-out dead code.
- No `console.log` left in production code.

## Verification

After making changes:
1. Start the server (`npm run dev` inside `jukebox/`).
2. Open the app in a browser.
3. Click each UI button and confirm data loads correctly.
4. Check the browser console — zero errors expected.
