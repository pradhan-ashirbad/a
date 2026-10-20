# Geo Mysore — website redesign

A responsive website concept for Geo Mysore's exploration, mining, and gold processing business. Built with React, TypeScript, Vite, Lucide icons, and locally hosted DM Sans and Instrument Serif fonts.

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

- Split photographic hero with three manually selectable operation highlights
- Gold and charcoal visual identity, editorial serif typography, and larger project cards
- Keyboard-accessible operations navigation with desktop popover and mobile disclosure
- Mining, processing, and exploration portfolio filters
- Project quick-view dialogs and dedicated mining, gold processing, and exploration pages
- Four-stage interactive journeys on each operation page, with related operation links
- Interactive processing overview with keyboard-accessible tabs
- Responsive mobile navigation, expandable FAQs, and accessible modal focus handling
- Inquiry preparation, review, editing, email draft, and text-file download
- Published reception email and office address, with a clearly labelled demo contact person
- Source-attributed company facts, actual company photographs, and community activities
- Page-specific titles and descriptions, breadcrumbs, keyboard shortcuts, and unknown-page recovery
- Local images and fonts; no third-party requests needed to render the site

## Original content and launch review

The redesigned website now uses information, the logo, photographs, and the processing flowsheet from the original geomysore.com website. See [content sources](docs/content-sources.md) for exact source pages, asset provenance, and discrepancies that need company confirmation. Published design and capacity figures are labelled and are not claims of current measured production. Current commissioning status and the conflicting pilot throughput values need confirmation.

Homepage content is in `src/main.tsx`. Full operation content is in `src/operations.ts`, rendered by `src/components/OperationPage.tsx`. The inquiry flow is in `src/components/ContactInquiry.tsx`. Published company contacts and the user-requested demo person's name are centralised in `src/company.ts`. Component styling is in `src/styles.css` and `src/pages.css`; the shared visual system, editorial typography, responsive layouts, and colour palette are in `src/theme.css`. The operations navigation disclosure is in `src/components/OperationsMenu.tsx`.

The form prepares an email draft to the published reception email or downloads a copy. The visitor reviews and sends through their email app. The application does not send email automatically or store submissions on a server. Browser tests never send inquiries. Review company information, approved branding, and applicable privacy information before live publication. The live geomysore.com website has not been changed.

## Routes and hosting

- `/` — homepage
- `/operations/mining` — Swarnagiri project and mining overview
- `/operations/gold-processing` — processing plant and process overview
- `/operations/exploration` — geological exploration overview

The app uses browser-based client routing. When hosting the `dist/` output, configure the server to serve `index.html` for application routes that do not match static files, so that refreshing or directly opening an operation page works. Vite development and preview servers already provide this fallback.

The reception email and office address come from the company’s contact page. The named contact person is a demo placeholder; replace it with an approved person before launch. No phone number is invented.
