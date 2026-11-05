# Mock Data Service

De mock service onderschept API-verzoeken op netwerkniveau via [MSW (Mock Service Worker)](https://mswjs.io/). De bestaande services en React Query hooks blijven ongewijzigd — alleen de responses worden onderschept.

## Activeren

Zet `VITE_MOCK_MODE=true` in je `.env` bestand (zie `.env.example`). De mock service worker wordt dan gestart in `src/app/index.tsx`, vóórdat de app rendert.

```env
VITE_MOCK_MODE=true
```

In de browser zie je in de console:
```text
[MSW] Mocking enabled.
```

## Structuur

```text
src/mocks/
├── browser.ts              # MSW worker setup
├── config.ts               # API base URL (window.location.origin + /api)
├── store.ts                # Gedeelde in-memory state (met sessionStorage)
├── utils.ts                # Hulpfuncties (bijv. paginatie)
├── data/                   # Statische, fictieve mock data per entiteit
│   ├── applicants.data.ts
│   ├── applications.data.ts
│   ├── application-statuses.data.ts
│   ├── auth.data.ts
│   └── talent-pools.data.ts
└── handlers/               # MSW request handlers per resource
    ├── index.ts            # Combineert alle handlers
    ├── applicants.handlers.ts
    ├── applications.handlers.ts
    ├── auth.handlers.ts
    └── talent-pools.handlers.ts
```

> In de volledige applicatie waren er ook handlers voor dashboard, vacatures, mails en templates.
> Die zijn buiten de scope van deze code sample gehouden.

## Nieuw endpoint toevoegen

### 1. Voeg mock data toe

Maak een nieuw bestand aan in `src/mocks/data/` of voeg toe aan een bestaand bestand:

```ts
// src/mocks/data/voorbeeld.data.ts
import type { Voorbeeld } from '@features/voorbeeld/api/voorbeeld.types';

export const voorbeeldData: Voorbeeld[] = [
  { id: 'vb-01', name: 'Voorbeeld 1', created_at: '2026-01-01T00:00:00Z' },
];
```

### 2. Schrijf een handler

```ts
// src/mocks/handlers/voorbeeld.handlers.ts
import { http, HttpResponse } from 'msw';
import { API_URL } from '../config';
import { voorbeeldData } from '../data/voorbeeld.data';

export const voorbeeldHandlers = [
  http.get(`${API_URL}/voorbeelden`, () => {
    return HttpResponse.json(voorbeeldData);
  }),

  http.get(`${API_URL}/voorbeelden/:id`, ({ params }) => {
    const item = voorbeeldData.find((v) => v.id === params.id);
    if (!item) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(item);
  }),
];
```

### 3. Registreer de handler

Voeg de handlers toe aan `src/mocks/handlers/index.ts`:

```ts
import { voorbeeldHandlers } from './voorbeeld.handlers';

export const handlers = [
  // ...bestaande handlers
  ...voorbeeldHandlers,
];
```

## Specifieke scenario's

Alle personen in de mock data zijn fictief. Sommige records zijn bewust ingesteld om specifieke situaties te simuleren:

| Kandidaat | Scenario |
|---|---|
| Ruben Dekker (`app-08`) | `retention_until` = vandaag → AVG-bewaartermijn verlopen |
| Bram Hoekstra (`app-06`) | `retention_until` = binnenkort → AVG-waarschuwing |
| Iris van Leeuwen (`app-09`) | `deleted_at` ingesteld → gearchiveerd |
| Sophie de Vries (`app-01`) | `consent_talent_pool = true` → in talentpool |

## Mutaties

De handlers voor schrijfoperaties (status bijwerken, notitie toevoegen/bewerken/verwijderen, talentpool-leden beheren) werken met de gedeelde state uit `store.ts`. Na elke mutatie wordt die state naar `sessionStorage` geschreven, zodat wijzigingen een page refresh overleven **binnen hetzelfde browsertabblad**. In een nieuw tabblad start de mock weer vanaf de standaard data.
