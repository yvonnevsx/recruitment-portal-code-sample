import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';

import '@indicia/component-library/style.css';

import '@progress/kendo-theme-default/dist/all.css';

import { isMockMode } from '../config';
import AppProvider from './provider';
import AppRouter from './router';

import '@styles/globals.scss';
import '@styles/typography.scss';
import '@styles/variables.scss';

async function prepare() {
  if (isMockMode) {
    const { worker } = await import('../mocks/browser');
    return worker.start({ onUnhandledRequest: 'warn' });
  }

  return Promise.resolve();
}

prepare()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.warn('[MSW] Failed to start mock service worker:', err);
  })
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </StrictMode>
    );
  });
