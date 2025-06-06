import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {},
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'plugin:jsx-a11y/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'next'
    ),
    {
        ignores: [
            '**/node_modules/*',
            '**/.next/*',
            '.next/*',
            '.eslintrc.js',
            'next.config.mjs',
            'postcss.config.mjs',
            'eslint.config.mjs',
            'next-sitemap.config.js',
        ],
        rules: {
            'no-unused-vars': 'off',
            'react/react-in-jsx-scope': 'off',
            'no-console': 'error',
            'no-use-before-define': 'off',
            'no-unused-expressions': 'off',
            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': ['off'],
            '@typescript-eslint/no-unused-expressions': ['warn'],
            '@typescript-eslint/no-use-before-define': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/indent': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/no-loop-func': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
            'react/prop-types': 0,
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: 'variable',
                    types: ['function'],
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: 'variable',
                    types: ['boolean'],
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
        plugins: {
            react: eslintPluginReact,
            prettier: eslintPluginPrettier,
            'jsx-a11y': eslintPluginJSXA11y,
            '@typescript-eslint': typescriptEslintPlugin,
        },
    },
];

export default eslintConfig;
