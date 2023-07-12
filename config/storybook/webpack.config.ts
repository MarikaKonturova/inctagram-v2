
// @ts-ignore
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RuleSetRule, Configuration } = require('webpack')

module.exports = async ({ config }: { config: typeof Configuration }) => {
    const paths = {
        src: path.resolve(__dirname, '..', '..', 'src')
    }
    // @ts-ignore
    config.resolve.modules = [paths.src, 'node_modules']
    config.resolve?.extensions?.push('.tsx', '.ts')
    // @ts-ignore

    config.module?.rules = config.module?.rules?.map((rule: typeof RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
        }
        return rule
    })
    config.module?.rules?.push({
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/
    })
    config.module?.rules?.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack']
    })
    // @ts-ignore
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }
            },
            'sass-loader'
        ]
    })

    return config
}
