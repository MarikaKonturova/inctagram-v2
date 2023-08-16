const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
module.exports = {
    stories: [
        '../../src/**/*.stories.mdx',
        '../../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-next-router'
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5'
    },
    typescript: {
        reactDocgen: 'react-docgen'
    },
    webpackFinal: (config) => {
        config.resolve.plugins = config.resolve.plugins || []
        config.resolve.plugins.push(
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../../tsconfig.json')
            })
        )
        config.resolve.alias = {
            ...config.resolve.alias,
            'next-i18next': 'react-i18next'
        }

        return config
    }
}
