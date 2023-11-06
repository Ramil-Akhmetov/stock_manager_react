module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        // last
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist'],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
    },
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        'import/prefer-default-export': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/require-default-props': 'warn',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'no-nested-ternary': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
    },
}
