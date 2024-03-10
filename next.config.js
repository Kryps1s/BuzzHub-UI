const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
      output: 'standalone',
      locales: ['en', 'fr'],
}


module.exports = withNextIntl(nextConfig);
