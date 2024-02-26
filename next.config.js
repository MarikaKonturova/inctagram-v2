/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  env: {
    API_URL: 'https://twin.cygan.lol/',
    RECAPTCHA_SITE_KEY: '6LcQ0LIlAAAAAIrqzrSIRNmk9Fnexi2g4bNPtZpX',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n,
  images: {
    remotePatterns: [
      {
        hostname: 'twin-bee.s3.eu-central-1.amazonaws.com',
        pathname: '/users/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      {
        ...fileLoaderRule,
        resourceQuery: /url/, // *.svg?url
        test: /\.svg$/i,
        type: 'asset',
      },
      // Convert all other *.svg imports to React components
      {
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
