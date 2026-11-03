# CreatorPulse Agency

A responsive single-page Twitch creative agency website built with React, Vite, Tailwind CSS, Framer Motion, and Lucide. Original portfolio artwork is rendered with CSS; every project is explicitly a fictional concept.

## Local development

Use Node.js 22 or 24 and npm. From this checkout:

```sh
npm ci
npm run dev
```

Vite prints its local development address. For a production check:

```sh
npm test
npm run build
npm run preview
```

## Configure before launch

Edit `src/config.js` with your public contact email, Fiverr URL, and social URLs. Empty links are omitted. Until email is configured, the contact form validates input and prepares a copyable inquiry; it does not send or store submissions. With an email configured it opens the visitor's email app with a draft that they must send themselves. No backend, credentials, or Twitch API is required.

The channel assessment uses questionnaire answers only. It does not scan a Twitch account. Replace sample project records in `src/data.js` when you have real work and permission to display it. Update the concept labels and disclosures accurately when replacing a project.

## Deploy

Run `npm run build` and deploy `dist/` to any static host. For Vercel or Netlify, choose Vite, use `npm run build`, and set the output directory to `dist`. For GitHub Pages, publish the contents of `dist` using a Pages deployment workflow. The relative Vite base supports a repository subpath. No server rewrite is required because navigation uses section anchors.

After choosing the production URL, set an absolute `og:image` URL and add `og:url` and a canonical URL in `index.html`; some social crawlers require absolute image URLs. The included SVG social artwork can be exported to PNG for broader sharing compatibility. Fonts are self-hosted in the build.

## Structure

- `src/main.jsx`: page, reusable presentation components, accessible dialogs, forms and interactions
- `src/styles.css`: responsive visual system and original concept mockups
- `src/data.js`: editable services, projects, blueprint stages, and FAQs
- `src/audit.js`: questionnaire recommendation rules
- `src/config.js`: public contact configuration
- `tests/audit.test.js`: audit branching and content completeness checks

No production deployment or Git commit is performed by setup.
