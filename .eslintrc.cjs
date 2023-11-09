module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@conarti/feature-sliced/recommended',

        // last
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
    },
    plugins: [
        'react-refresh',
        'prettier',
        "@conarti/feature-sliced",
    ],
    rules: {
        'react-refresh/only-export-components': [
            'off',
            {allowConstantExport: true},
        ],
        'import/extensions': 'off',
        'no-param-reassign': 'off',
        'no-nested-ternary': 'off',
        'no-underscore-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/naming-convention': 'off',

        'react/jsx-props-no-spreading': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        "@conarti/feature-sliced/layers-slices": "warn",

        'react-hooks/rules-of-hooks': 'error',
    },
};
