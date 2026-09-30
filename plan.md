# WasteLoop Prototype Plan

## Product outcome
Create a demo-ready industrial waste reuse operations tool that helps a user model a waste stream, inspect compatible reuse pathways and destinations, compare economics and emissions against disposal, and allocate material across candidate destinations.

## Design direction
Use the confirmed dark industrial visual direction from the reference: near-black green canvas, cream text, mint/acid-green accents, compact cards, subtle grid texture, restrained borders, and dense operations-tool information hierarchy. The UI should feel credible for plant, logistics, and sustainability teams rather than a marketing site.

## Architecture and serving
This is a front-end-only single-page application with local mock data and browser state. Use static SPA delivery: the browser renders the dashboard, intake flow, results, comparison, methodology, and detail drawer from a single route. No server, database, authentication, or external APIs are needed for the prototype. Static output will be served from the build directory with SPA fallback; versioned assets can be immutable while the HTML remains revalidated.

## Main user journeys
1. Dashboard: review portfolio KPIs, active waste streams, recent analyses, and start a new model.
2. Intake: choose a material scenario and edit quantity, composition, source, baseline disposal, and constraints.
3. Matches: filter/sort candidate pathways and destinations; inspect fit, capacity, distance, route cost, processing cost, and value.
4. Allocation: adjust allocation sliders/inputs across candidates and track remaining tonnes and blended outcomes.
5. Detail: open a drawer with operational requirements, acceptance criteria, route breakdown, assumptions, and rationale.
6. Compare: see diversion, net cost, transport/processing contributions, emissions change, and allocation totals versus normal disposal.
7. Methodology: explain matching logic, units, cost/emissions assumptions, and prototype limitations.

## Project structure
- `src/main.jsx`: React entry point and app state.
- `src/data.js`: local scenarios, candidates, and derived metrics.
- `src/styles.css`: visual system, responsive layout, components, and motion.
- `public/manus-routes.json`: route manifest for `/`.
- `public/logo.svg`, `public/favicon.svg`: WasteLoop brand mark.
- `app.config.ts`: platform logo metadata.
- `index.html`: document shell and favicon.

## Verification
Run the local build/type syntax check, start the development server on the configured Preview port, request `/` and `/manus-routes.json`, and inspect the served output. Confirm that intake, filters, drawer, allocation, tabs, and scenario comparison are implemented in source and that the static app builds successfully.
