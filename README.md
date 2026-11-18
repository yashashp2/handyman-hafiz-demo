# Handyman HAFIZ — independent website concept

A complete, responsive Next.js App Router demonstration for a handyman and home improvement business in Goodmayes, Ilford. Built with React, TypeScript, Tailwind CSS v4 and Lucide icons. All ten requested homepage sections are implemented.

**This is a speculative design, not the official business website.** The notice is visible at the top and in the footer. The site intentionally uses `noindex, nofollow` and a disallow-all robots file. No invented reviews, credentials, insurance, prices, team size or guarantees are included.

## Run locally

Use Node.js 22 or 24 LTS and npm. From this folder:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C.

For a production build:

```sh
npm run build
npm run start
```

No API keys, database, account or environment variables are needed for root-based local development. Fonts are downloaded by `next/font` at build time and served locally afterwards, so the first build needs internet access. Compressed photographs are included in `public/images`; visitors do not fetch them from Unsplash. The hero is preloaded and other photographs are lazy-loaded.

## GitHub Pages deployment

Repository: https://github.com/yashashp2/handyman-hafiz-demo

Website: https://yashashp2.github.io/handyman-hafiz-demo/

The project now exports static files to `out/` using Next.js `output: "export"`. The included `.github/workflows/deploy-pages.yml` builds and deploys every push to `main`. Pages uses **GitHub Actions** as its publishing source. No Vercel deployment is used.

The workflow reads the domain and repository prefix from `actions/configure-pages`, setting `SITE_URL` and `NEXT_PUBLIC_BASE_PATH` at build time. Images, JavaScript, fonts and metadata support the repository path. These are public settings, not secrets. `public/.nojekyll` is included.

To preview the Pages build locally in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/handyman-hafiz-demo'
$env:SITE_URL = 'https://yashashp2.github.io'
npm run build
npm run start
```

Open http://localhost:3000/handyman-hafiz-demo/. The included static server serves `out/` under the same prefix as Pages. In a fresh shell, `npm run dev` uses the normal root URL.

The photo files are compressed and bundled locally. GitHub Pages cannot run Next.js server-side image optimisation, so it is disabled. The hero retains preloading and secondary photographs retain lazy loading. The form remains local-only.

For another repository, select **Settings → Pages → Source: GitHub Actions** and push the workflow. It automatically obtains the new Pages path. See [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath) and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Demo form behaviour

- Required: name, UK phone number, UK postcode, service and project description. Email and photos are optional.
- Errors appear beside fields; the first invalid field receives focus. Postcode validation checks format, not the existence of an address. Phone validation checks plausible UK format, not number ownership.
- Service and gallery links preselect the service and scroll to the form. Hash parameters contain a public service ID only, never personal information.
- Up to three JPEG, PNG or WebP photos, each at most 5 MB. Previews use browser-local object URLs, revoked when removed or unmounted.
- The preview button only validates local state. It displays **nothing has been sent** and provides the real phone link. No fetch, server action, API route, email service, database or upload endpoint exists.
- This website does not write form contents to cookies, localStorage, sessionStorage or other persistence. Reloading resets state. Browser-managed autofill behaviour is controlled by the visitor's browser.
- A clear button removes all entries and photos. Fields are disabled before JavaScript starts and remain disabled if JavaScript is unavailable, preventing native form submission.
- The phone links dial the real publicly advertised number. Map and Nextdoor links open external services in a new tab; they are not embedded trackers.
- “Request a Free Quote” is retained as the requested **proposal only**, with adjacent owner-approval wording. Actual quotation and visit charges are not asserted. The three-step journey is explicitly suggested.

## Editing the project

| File | Purpose |
| --- | --- |
| `src/lib/business.ts` | Phone, public profile, map, services and FAQs |
| `src/app/page.tsx` | Homepage sections and gallery entries |
| `src/components/header.tsx` | Sticky header and responsive navigation |
| `src/components/quote-form.tsx` | Local-only form, validation and photo previews |
| `src/components/ui.tsx` | Shared logo, buttons and section labels |
| `src/app/globals.css` | Tailwind import, design tokens and responsive styling |
| `src/app/layout.tsx` | Fonts, metadata, noindex and social sharing |
| `src/app/robots.ts` | Crawling restriction for the demo |
| `public/images/` | Locally included licensed illustrative photos |
| `ASSETS.md` | Photo provenance and permissions |
| `OWNER-HANDOVER.md` | Decisions required before an official launch |
| `tests/site.spec.ts` | Browser, accessibility and form privacy checks |

The logo is original text and a Lucide hammer icon, not copied business branding. The coverage illustration is decorative and explicitly labelled; it does not assert a radius or service boundary.

## Checks

```sh
npm run build
npm run typecheck
npm run test:e2e
```

The browser suite starts and stops the static preview server on port 3000. Build first and set `NEXT_PUBLIC_BASE_PATH` to the same value used during the build. To test a deployed site without a local server, set `TEST_BASE_URL` to its full URL ending in `/`. Google Chrome must be installed because the configuration uses the `chrome` channel. Alternatively, run `npx playwright install chromium`, remove `channel: "chrome"` from `playwright.config.ts`, and use Playwright's bundled Chromium. Keep port 3000 free to ensure tests exercise this project.

Tests cover content, image loading, phone links, FAQ expansion, keyboard and mobile navigation, service preselection, 320–1440px overflow, automated WCAG A/AA checks on desktop/mobile, form errors, file previews, rejected files, local-only submission, empty storage/cookies, reset/reload and disabled-JavaScript behaviour. Screenshots are written to `artifacts/`. Automated accessibility checks do not replace a full human accessibility audit.

## Facts and boundaries

The [public Nextdoor profile](https://nextdoor.co.uk/pages/handyman-hafiz/) was checked on 18 November 2026 for the name, phone, Ilford/Goodmayes location, advertised services and nonspecific experience statement. Copy is paraphrased. No Nextdoor reviews, logo, profile photographs or rating counts are reused. Larger works and electrical/CCTV enquiries are presented without implying certification, permission or authorisation. Goodmayes and Ilford are the requested focus; other nearby areas need confirmation.

Sources for implementation: [Next.js App Router](https://nextjs.org/docs/app/getting-started), [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Unsplash licence](https://unsplash.com/license).
