# Emmanuel — Personal Twitch Services Portfolio

A personal, responsive React portfolio for Emmanuel's Twitch branding, graphics, and channel-support services. Built with Vite, Tailwind CSS, Framer Motion, and Lucide. The public hosting path remains `/creatorpulse-agency/` so the existing GitHub Pages link continues to work; the visible site is personal, not an agency.

## Develop and preview

Use Node.js 22 or 24 and npm:

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

Tests start a production preview on port 5174. If using a system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its path. This cloud environment uses `/usr/bin/chromium` and may require execution outside the restricted process sandbox for local server/browser operations.

## Personal details

`src/config.js` holds the public name, contact email, Fiverr URL, and social links. The email and Instagram link are reused from Emmanuel's public reference portfolio. The portrait is the original image from that repository and is served as a local optimized WebP. No account credentials are required.

The contact form validates the brief and opens an email draft. The visitor must review and send the email themselves. No backend receives or stores a submission. A copyable brief is also provided. If the contact email is removed, the UI clearly switches to draft-only behavior. Empty Fiverr and social URLs are omitted.

`src/data.js` contains editable services, concept projects, workflow steps, and FAQs. All work is fictional concept work; no client outcomes or experience claims are implied. Update disclosures accurately when adding genuine commissioned work.

`DESIGN-RESEARCH.md` records the inspected sources, browsing limitations, and reasoning behind the redesign.

## Deploy

`npm run build` produces `dist/`. Deploy its contents to GitHub Pages, Netlify, or any static host. Vite uses relative asset paths to support a repository subpath. GitHub Pages is configured to publish the `gh-pages` branch from `/ (root)`.

The public URL is https://emmanueloluwafemi456-boop.github.io/creatorpulse-agency/ . When moving domains, update the canonical and Open Graph URLs in `index.html`. The included SVG social card can be exported to PNG for social crawlers that require it. Fonts and graphics are self-hosted.
