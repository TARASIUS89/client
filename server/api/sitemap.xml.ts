import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Установите здесь базовый URL вашего сайта
  const baseUrl = 'https://ваш-сайт.ru'
  
  // Получаем все страницы вашего сайта
  const pages = [
    {
      url: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: '/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/blog',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/search',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.7'
    },
    {
      url: '/contact',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    // Динамические страницы
    {
      url: '/category',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/shop',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.9'
    }
  ]

  // Формируем XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`

  // Устанавливаем правильные заголовки
  event.node.res.setHeader('content-type', 'text/xml')
  
  return sitemap
}) 