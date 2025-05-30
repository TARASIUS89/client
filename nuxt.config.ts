import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
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
