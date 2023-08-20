/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
      },
      output: 'standalone',
      i18n: {
        locales: ['en-CA'],
        defaultLocale: 'en-CA',
      },
}

module.exports = nextConfig
