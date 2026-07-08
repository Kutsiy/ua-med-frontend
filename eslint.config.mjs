import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginQuery from '@tanstack/eslint-plugin-query';
import prettierConfig from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...pluginQuery.configs['flat/recommended-strict'],
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: "Please import from '@/src/shared' instead.",
          importNames: ['default'],
        },
        {
          name: 'next/navigation',
          message: "Please import from '@/src/shared' instead.",
          importNames: ['default', 'permanentRedirect', 'userRouter'],
        },
      ],
    },
  },
]);

export default eslintConfig;
