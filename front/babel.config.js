module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'styled-components',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-export-default-from',
        [
            'import',
            {
                libraryName: '@material-ui/core',
                libraryDirectory: '', // default: lib
                camel2DashComponentName: false // default: true
            },
            'material-ui-core'
        ],
        [
            'import',
            {
                libraryName: '@material-ui/icons',
                libraryDirectory: '', // or '' if your bundler does not support ES modules
                camel2DashComponentName: false
            },
            'material-ui-icons'
        ]
    ],
    env: {
        production: {
            only: ['app'],
            plugins: [
                'lodash',
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements'
            ]
        },
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node']
        }
    }
};
