import pkg from './package.json'

// TODO: 为什么打包出来的组件库是 vue3 形式的 ？？？
import vuePlugin from 'rollup-plugin-vue'
// const vuePlugin = require("./lib/rollup-plugin-vue/index")

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
// import eslint from 'rollup-plugin-eslint'

const name = 'PenglaiUI'

const createBanner = () => {
    return `
       /*!
        * ${pkg.name} v${pkg.version}
        * (c) ${new Date().getFullYear()} kkb
        * @license MIT
        */
    `
}

const createBaseConfig = () => {
    return {
        input: 'src/index.js',
        // 指出应将哪些模块视为外部模块，不打入包内
        external: ['vue'],
        plugins: [
            peerDepsExternal(),
            // TODO:
            // babel(),
            babel({
                exclude: '**/node_modules/**',
                // runtimeHelpers: true,       // 使 plugin-transform-runtime 生效
            }),
            // vuePlugin 必须放在 commonjs 前，否则会报错
            vuePlugin({
                css: true
                // TODO:
                // compileTemplate: true
            }),
            resolve({
                extensions: ['.vue', '.jsx'],
            }),
            commonjs(),
            json(),
            scss(),
        ],
        output: {
            sourcemap: false,
            banner: createBanner(),
            externalLiveBindings: false,
            globals: {
                vue: 'Vue',
            },
        },
    }
}

function mergeConfig(baseConfig, configB) {
    const config = Object.assign({}, baseConfig)
  
    // plugin
    if (configB.plugins) {
        config.plugins.push(...configB.plugins)
    }

    // output
    config.output = Object.assign({}, baseConfig.output, configB.output)

    return config
}

function createFileName(formatName) {
    return `dist/pl-ui.${formatName}.js`
}

// es-bundle
const esBundleConfig = {
    plugins: [
    // replace({
    //   __DEV__: `(process.env.NODE_ENV !== 'production')`,
    // }),
    ],
    output: {
        file: createFileName('esm-bundler'),
        format: 'es',
    },
}

// es-browser
const esBrowserConfig = {
    plugins: [
    // replace({
    //   __DEV__: true,
    // }),
    ],
    output: {
        file: createFileName('esm-browser'),
        format: 'es',
    },
}

// es-browser.prod
const esBrowserProdConfig = {
    plugins: [
        terser(),
    // replace({
    //   __DEV__: false,
    // }),
    ],
    output: {
        file: createFileName('esm-browser.prod'),
        format: 'es',
    },
}

// cjs
const cjsConfig = {
    plugins: [
    // replace({
    //   __DEV__: true,
    // }),
    ],
    output: {
        file: createFileName('cjs'),
        format: 'cjs',
    },
}

// cjs.prod
const cjsProdConfig = {
    plugins: [
        terser(),
    // replace({
    //   __DEV__: false,
    // }),
    ],
    output: {
        file: createFileName('cjs.prod'),
        format: 'cjs',
    },
}

// global
const globalConfig = {
    plugins: [
    // replace({
    //   __DEV__: true,
    //   "process.env.NODE_ENV": true,
    // }),
    ],
    output: {
        file: createFileName('global'),
        format: 'iife',
        name,
    },
}

// global.prod
const globalProdConfig = {
    plugins: [
        terser(),
    // replace({
    //   __DEV__: false,
    // }),
    ],
    output: {
        file: createFileName('global.prod'),
        format: 'iife',
        name,
    },
}

const formatConfigs = [
    esBundleConfig,
    esBrowserProdConfig,
    esBrowserConfig,
    cjsConfig,
    cjsProdConfig,
    globalConfig,
    globalProdConfig,
]

function createPackageConfigs() {
    return formatConfigs.map((formatConfig) => {
        return mergeConfig(createBaseConfig(), formatConfig)
    })
}

export default createPackageConfigs()