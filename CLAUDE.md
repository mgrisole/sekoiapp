# CLAUDE.md

## Project Overview

**Sekoiapp** is a Security Operations Center (SOC) alert management and investigation dashboard built with Angular 21.

## Tech Stack

- **Framework**: Angular 21.2.0 (standalone components, signals)
- **Build**: Angular CLI / Vite + esbuild
- **Styling**: Tailwind CSS 4.x
- **Charts**: Chart.js 4.x
- **Testing**: Vitest + jsdom
- **Language**: TypeScript 5.9 (strict mode)

## Commands

```bash
npm start          # Dev server at localhost:4200
npm run build      # Production build
npm run watch      # Incremental dev build (watch mode)
npm test           # Run tests with Vitest
npm run ng         # Direct Angular CLI access
```

> `prettier` is installed but has no npm script. Run `npx prettier --write .` to format code.

## Project Structure

```
src/app/
├── components/        # Reusable UI components
│   ├── charts/        # Chart.js wrapper (base-chart)
│   ├── severity-badge/
│   ├── status-chip/
│   ├── metric-card/
│   ├── filter-bar/
│   ├── investigation-node-card/
│   ├── timeline-item/
│   ├── empty-state/
│   └── loading-state/
├── pages/             # Route-level components
│   ├── alerts-list/           # Main alerts dashboard
│   ├── investigation-details/ # Alert investigation view
│   ├── metrics-dashboard/     # Analytics & charts
│   └── component-library/     # UI component showcase
├── services/
│   └── alert.service.ts   # Alert data & state (signals-based)
├── models/
│   └── alert.model.ts     # Type definitions
├── app.ts             # Root component
├── app.routes.ts      # Route definitions
└── app.config.ts      # App configuration
```

## Key Models

- `Alert` — Security alert (`id`, `title`, `severity`, `status`, `source`, `creationDate`, `description`, `assignedAnalyst?`)
- `Entity` — Investigation entity (`id`, `type: IP|Domain|User|Process`, `name`, `metadata?`)
- `TimelineItem` — Event timeline entry (`id`, `timestamp`, `type`, `message`, `entityId?`)
- `Metric` — KPI metric (`label`, `value`, `change?`)
- `Severity` — `Critical | High | Medium | Low | Info`
- `Status` — `New | In Progress | Closed | False Positive`

## Architecture Conventions

- **Standalone components** — no NgModules
- **Signals** — use Angular signals for reactive state (not RxJS subjects)
- **OnPush change detection** — all components use `ChangeDetectionStrategy.OnPush`
- **Inline templates** — prefer inline templates for components; page-level components may use separate `.html` files when the template is large
- **Mock data** — `alert.service.ts` provides mock data; no backend API currently
- **Tailwind utility classes** — use Tailwind for all styling; avoid custom CSS unless necessary
- **Dark theme** — UI uses a professional dark mode (gray/slate palette)
