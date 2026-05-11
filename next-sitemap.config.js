/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://ooty-mistwings.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 50000,
  generateIndexSitemap: true,
  exclude: ['/admin', '/404', '/500'],
  outDir: './public',
};

module.exports = config;
