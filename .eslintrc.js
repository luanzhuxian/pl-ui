module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    globals: {
        ga: true,
        chrome: true,
        __DEV__: true,
    },
    extends: [
        'plugin:json/recommended',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    // '@vue/prettier',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    // required to lint *.vue files
    plugins: ['vue'],
    rules: {
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/html-indent': ['error', 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'prettier/prettier': 'error'
    },
}
