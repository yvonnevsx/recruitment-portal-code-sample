import KandidatenPage from '../pages/kandidaten-page';

export const kandidatenRoutes = [
  {
    path: '/kandidaten',
    Component: KandidatenPage,
  },
  {
    path: '/kandidaten/:id',
    Component: KandidatenPage,
  },
];
