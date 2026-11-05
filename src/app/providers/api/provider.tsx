import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { isDevMode } from '../../../config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes.
    },
  },
});

type APIProviderProps = {
  children: ReactNode;
};

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevMode && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default APIProvider;
