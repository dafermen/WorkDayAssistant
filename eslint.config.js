import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'android', 'public/docs/**', 'documentation-web/vendor/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['documentation-web/*.js'],
    languageOptions: {
      globals: Object.fromEntries(
        [
          'window',
          'document',
          'navigator',
          'localStorage',
          'location',
          'history',
          'HTMLElement',
          'HTMLImageElement',
          'KeyboardEvent',
          'URL',
          'setTimeout',
          'clearTimeout',
          'console',
        ].map((name) => [name, 'readonly']),
      ),
    },
  },
  {
    files: ['documentation-web/*.mjs'],
    languageOptions: { globals: { Buffer: 'readonly', console: 'readonly' } },
  },
  prettierConfig,
);
