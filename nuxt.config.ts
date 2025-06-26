import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      '/sitemap.xml': {
        headers: {
          'Content-Type': 'application/xml'
        }
      }
    }
  },
  app: {
    head: {
      link: [
        // Стандартный фавикон
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Для iOS
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Для Android
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        // Манифест для PWA
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/myicon.png' },
      ],
      meta: [
        // Цвет темы для мобильных браузеров
        { name: 'theme-color', content: '#ffffff' },
        // Мета-теги для iOS
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'apple-mobile-web-app-title', content: 'Название вашего сайта' }
      ],
      script: [
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(102292224, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `,
          type: 'text/javascript'
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/102292224" style="position:absolute; left:-9999px;" alt="" /></div>'
        }
      ]
    }
  },
  css: [
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@pinia/nuxt', 'nuxt-swiper'],
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },
});
