import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';

import indiciaEslintConfig from '@indicia/eslint-config';

const config = [
  ...pluginQuery.configs['flat/recommended'],
  ...indiciaEslintConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  globalIgnores(['vite.config.*']),
];

export default defineConfig(config);
