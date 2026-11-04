# Emmanuel — Personal Twitch Channel Services

A responsive single-page React portfolio for Channel Audit, Survey, Creator Landing Page, Twitch Creator Club application preparation, Channel Management, and Google Ads. Services appear in a three-column, two-row desktop grid and open detailed on-page dialogs. Service exploration stays on the same page. External navigation is limited to the owner’s WhatsApp and Gmail contact choices.

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
- `src/config.js`: public contact destinations and the configured FormSubmit recipient. `src/Contact.jsx` contains shared platform choices and the validated email form.
- `SERVICE-SCOPE-RESEARCH.md`: service reasoning, actual source-access limitations, and claim boundaries. Older design-direction documents describe superseded proposals.

The contact form submits every required brief field to FormSubmit for email delivery to `emmanueldigital839@gmail.com`. WhatsApp and Gmail links are present in the contact section, FAQ, and footer. The recipient must activate FormSubmit through its confirmation email before delivery can be verified. See `CONTACT-DELIVERY.md` for the activation and live-delivery check. Browser tests mock the email provider and do not send test messages.

The website does not run live Twitch scans, collect audience survey responses, submit official club applications, or launch ad campaigns. Those are separate client services with agreed scope and prerequisites.

## Deployment

Publish the contents of `dist/` to the existing `gh-pages` branch, configured in GitHub Pages as `/ (root)`. Relative asset paths support the current repository subpath. Preserve the previous Pages commit as the new deployment's parent. Confirm the GitHub Pages workflow completes successfully after pushing; a branch push alone does not establish a live deployment.

## Reading and motion

The page uses solid purple accents, brighter dark surfaces, 16px main paragraphs and form inputs, and larger labels and supporting text. The process section describes four stages and their deliverables; ten FAQs include fuller, grouped answers.

`src/ServicesTicker.jsx` automatically lists all six current services in a seamless, slow leftward loop. It runs continuously by default, has an optional pause/resume control, and becomes a static wrapping list when the visitor prefers reduced motion. The duplicate list is hidden from assistive technology. Readability browser checks cover representative text contrast (at least 4.5:1), body type size, responsive layouts, solid backgrounds, and motion behavior.

## About-section service guide

`src/NextStepGuide.jsx` uses the space beneath the portrait on desktop to help visitors explore a service that matches their stated priority. It is a local selector, not a live channel scan or an assessment of eligibility. It opens the existing service dialogs and carries the chosen service into the on-page contact form. On tablet and mobile, the visual and DOM order is portrait, introduction, then guide.

## Service card imagery

The six service cards use a local, optimized WebP contact sheet at `public/services/service-scenes.webp`. Each card shows its matching portion with CSS cropping, followed by a service heading, description, three deliverables, and a full-width details button. The generated laptop/interface scenes are illustrative service imagery, not client screenshots, real campaign results, or official application portals. The original generated PNG remains outside the checkout in `/workspace/generated_images/`.
