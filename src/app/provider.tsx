import type { ReactNode } from 'react';

import APIProvider from './providers/api/provider';
import './providers/i18n/provider';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return <APIProvider>{children}</APIProvider>;
};

export default AppProvider;
