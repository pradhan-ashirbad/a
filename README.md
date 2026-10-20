# Geo Mysore — website redesign

A responsive website concept for Geo Mysore's exploration, mining, and gold processing business. Built with React, TypeScript, Vite, Lucide icons, and locally hosted DM Sans fonts.

## Develop

Requires Node.js 22 or newer and npm.

```sh
cd /workspace/a
npm ci
npm run dev -- --port 5173
```

## Validate

```sh
npm run build
npm test
```

The browser tests use Chromium at `/usr/bin/chromium`, already available in this cloud environment. On another machine, install Playwright's Chromium and adjust `executablePath` in `playwright.config.ts` accordingly. Tests cover direct operation routes, project filters, inquiry review and editing, validation, downloadable inquiry contents, processing tabs, mobile navigation, keyboard focus, responsibility details, image loading, and browser errors.

## Features

- Three manually selectable hero highlights
- Mining, processing, and exploration portfolio filters
- Project quick-view dialogs and dedicated mining, gold processing, and exploration pages
- Four-stage interactive journeys on each operation page, with related operation links
- Interactive processing overview with keyboard-accessible tabs
- Responsive mobile navigation, expandable FAQs, and accessible modal focus handling
- Inquiry preparation, review, editing, and text-file download
- Clearly labelled demo contact details and a configurable contact person
- Page-specific titles and descriptions, breadcrumbs, keyboard shortcuts, and unknown-page recovery
- Local images and fonts; no third-party requests needed to render the site

## Before publishing

This is a new website concept, not a deployment to geomysore.com. The existing website was inaccessible from the environment, so its source, legal text, branding, and current company information were not imported. Processing is included based on the owner's confirmation.

Review all copy and project references with Geo Mysore. The mining and processing photographs are generated illustrations, not documentary photos of Geo Mysore facilities. Replace them with approved company photographs in `public/images/` before a public launch. Homepage content is in `src/main.tsx`. Full operation content is in `src/operations.ts`, rendered by `src/components/OperationPage.tsx`. The inquiry flow is in `src/components/ContactInquiry.tsx`. Demo contact information is centralised in `src/company.ts`. Visual styling is in `src/styles.css` and `src/pages.css`.

The inquiry form validates locally and generates a downloadable file. It does not send email or store submissions on a server. Connect an approved submission service, provide verified contact details, and add the applicable privacy information before accepting live inquiries. No credentials are included.

## Routes and hosting

- `/` — homepage
- `/operations/mining` — Jonnagiri project and mining overview
- `/operations/gold-processing` — processing plant and process overview
- `/operations/exploration` — geological exploration overview

The app uses browser-based client routing. When hosting the `dist/` output, configure the server to serve `index.html` for application routes that do not match static files, so that refreshing or directly opening an operation page works. Vite development and preview servers already provide this fallback.

Demo contact information uses the reserved `.example` domain and an invalid placeholder telephone number intentionally. No messages are sent to those details. Replace the values in `src/company.ts` with company-approved contacts before launch.
