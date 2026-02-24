# Birth Reflection Website

## Project Overview
A simple static React website with two pages:
1. **Landing page** — titled "Birth Reflection"
2. **Survey page** — a shareable birth reflection survey that logs responses for free

## Tech Stack
- **Frontend**: React (via Vite)
- **Routing**: React Router 7 (HashRouter for GitHub Pages compatibility)
- **Form backend**: [Formspree](https://formspree.io) — free tier, 50 submissions/month, dashboard + optional email notifications
- **Hosting**: GitHub Pages (deploy from `gh-pages` branch via `gh-pages` npm package)

## Project Structure
```
/
├── public/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          # "Birth Reflection" landing page
│   │   ├── Landing.module.css
│   │   ├── Survey.jsx           # Survey form page
│   │   ├── Survey.module.css
│   │   ├── ThankYou.jsx         # Post-submission confirmation
│   │   └── ThankYou.module.css
│   ├── App.jsx                  # HashRouter + Routes
│   ├── index.css                # Global pastel styles + CSS variables
│   └── main.jsx
├── index.html
├── vite.config.js               # base: '/birth-reflection/'
└── package.json                 # deploy script: gh-pages -d dist
```

## Key Conventions
- Functional components and React hooks
- CSS Modules for scoped per-page styles; global variables in `index.css`
- `HashRouter` (not `BrowserRouter`) for GitHub Pages compatibility
- Survey submits via `fetch` POST to Formspree (JSON body)

## Design Style
- Soft, pastel color palette — blush pinks, sage greens, lavender, warm cream
- CSS variables defined in `index.css`: `--cream`, `--blush`, `--sage`, `--lavender`, `--text`, `--text-muted`
- Georgia serif font, generous whitespace, no harsh borders or shadows
- Pill-shaped buttons, rounded inputs, subtle hover transitions

## Formspree
- Endpoint in `Survey.jsx`: `https://formspree.io/f/mkovkojd`
- Responses dashboard: https://formspree.io/forms/mkovkojd/integration
- Free tier: 50 submissions/month; enable email notifications in the Formspree dashboard

## Deployment
```bash
npm run deploy   # runs: vite build && gh-pages -d dist
```
1. Update `base` in `vite.config.js` to match your GitHub repo name
2. Update `homepage` in `package.json` with your GitHub username
3. Push to GitHub, then run `npm run deploy`

## User Preferences
- Getting familiar with React — keep examples clear and idiomatic
- Minimal dependencies, simple and focused
- Soft pastel aesthetic throughout
