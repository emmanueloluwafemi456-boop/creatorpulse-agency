# Emmanuel — Personal Twitch Channel Services

A responsive single-page React portfolio for Channel Audit, Survey, Creator Landing Page, Twitch Creator Club application preparation, Channel Management, and Google Ads. Services appear in a three-column, two-row desktop grid and open detailed on-page dialogs. No alternate preview page or external service redirects are required.

## Development

Use Node.js 22 or 24:

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` generates `dist/` and a static-site `.nojekyll` marker. Fonts and the owner's portrait are self-hosted. The public GitHub Pages URL remains https://emmanueloluwafemi456-boop.github.io/creatorpulse-agency/ . The services section is `#services`; `#work` is a local anchor alias for older links.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

For a system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. This cloud environment uses `/usr/bin/chromium`. Server and browser operations may require execution outside the restricted process sandbox. The tests run the production preview on port 5174 and check all six services, the desktop grid, same-page dialogs, keyboard focus, inquiry selection, contact validation, FAQs, mobile navigation, and responsive overflow.

## Content and contact

- `src/data.js`: all six service scopes, deliverables, suitability, boundaries, and FAQs.
- `src/ChannelServices.jsx`: service-specific deliverable illustrations and on-page details.
- `src/config.js`: public name, email, Fiverr URL, and social links. Contact values are intentionally empty until the owner adds them.
- `SERVICE-SCOPE-RESEARCH.md`: service reasoning, actual source-access limitations, and claim boundaries. Older design-direction documents describe superseded proposals.

Without an email configured, the contact form prepares a copyable project brief and sends nothing. With an email configured, it also offers an explicit email-draft link; the visitor reviews and sends it. The website does not run live Twitch scans, collect survey responses, submit official club applications, or launch ad campaigns. Those are separate client services with agreed scope and prerequisites.

## Deployment

Publish the contents of `dist/` to the existing `gh-pages` branch, configured in GitHub Pages as `/ (root)`. Relative asset paths support the current repository subpath. Preserve the previous Pages commit as the new deployment's parent. Confirm the GitHub Pages workflow completes successfully after pushing; a branch push alone does not establish a live deployment.
