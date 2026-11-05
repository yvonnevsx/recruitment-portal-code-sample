# Recruitment Portal – Front-end Code Sample

Deze repository bevat een opgeschoonde code sample uit mijn afstudeerproject bij Indicia.

Tijdens dit project werkte ik aan het onderzoeken, ontwerpen en ontwikkelen van de front-end van een intern recruitmentportaal.

## Wat deze sample laat zien

De geselecteerde code richt zich voornamelijk op kandidaatbeheer:

- kandidaten ophalen via een REST API
- zoeken en filteren
- lijst- en kanbanweergave
- kandidaatdetails
- statusbeheer
- notities
- loading states
- mock API's voor lokale ontwikkeling

## Mijn bijdrage

Ik werkte onder andere aan:

- front-endarchitectuur
- React en TypeScript
- herbruikbare componenten
- API-integratie
- state en server-state management
- responsive interfaces
- toegankelijkheid

## Technologie

- React
- TypeScript
- TanStack Query
- Axios
- SCSS Modules
- React Router
- i18next
- MSW

## Architectuur

De applicatie is feature-based opgebouwd.

```text
UI (React components)
  → React Query hooks      (*.queries.ts)
  → Service layer          (*.service.ts, erven van BaseService)
  → Axios HTTP client      (src/utils/axios/http.ts)
  → REST API
```

MSW werd gebruikt om tijdens development API-calls lokaal te mocken. De services en hooks weten niet of ze met de echte API of met de mock praten: MSW onderschept de requests op netwerkniveau.

## Waar te beginnen

| Onderdeel | Bestand(en) |
|---|---|
| Kandidatenoverzicht (zoeken, filteren, lijst/kanban) | `src/components/ui/datagrid/recruitment-grid.tsx` |
| Filter- en zoekcontrols | `src/components/ui/datagrid/controls/` |
| Kanbanweergave (drag & drop) | `src/features/kandidaten/components/kandidaten/kanban/kanban.tsx` |
| Kandidaatdetails en statuswijziging | `src/features/kandidaten/components/kandidaat-detail/kandidaat-detail.tsx` |
| Notities | `src/features/kandidaten/components/kandidaat-detail/kandidaat-notes.tsx` |
| React Query hooks en query keys | `src/features/kandidaten/api/applications.queries.ts` |
| Service layer | `src/lib/api/base.service.ts`, `src/features/kandidaten/api/*.service.ts` |
| Types | `src/features/kandidaten/api/*.types.ts`, `src/lib/api/types.ts` |
| HTTP client en foutafhandeling | `src/utils/axios/http.ts` |
| Mock API (MSW) | `src/mocks/` (zie ook `src/mocks/README.md`) |

## Projectstructuur

```text
src/
├── app/                  # Entry point, providers (React Query, i18n) en router
├── components/           # Gedeelde componenten (layout, sidebar, UI)
│   └── ui/               # Herbruikbare UI: buttons, card, datagrid + controls
├── features/
│   ├── auth/             # Login-flow en route guard
│   └── kandidaten/       # Feature: api, components, pages en routes
├── lib/                  # BaseService, API-types en helpers
├── mocks/                # MSW handlers, fictieve mockdata en in-memory store
├── styles/               # Globale SCSS, variabelen en utilities
└── utils/axios/          # Axios-instantie met response-interceptor
translations/             # nl-NL en en-US vertalingen
```

## Opmerking

Dit is een opgeschoonde code sample uit de oorspronkelijke applicatie.

- interne packages (`@indicia/*`) zijn niet meegeleverd;
- commerciële licenties, secrets en bedrijfsconfiguratie zijn verwijderd;
- interne authenticatieconfiguratie is verwijderd;
- alle mockdata is fictief.

De sample is bedoeld om inzicht te geven in mijn programmeerstijl, componentstructuur, TypeScript-gebruik en aanpak van API-integratie.
