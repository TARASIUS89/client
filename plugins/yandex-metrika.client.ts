export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Функция для инициализации Яндекс.Метрики
  const initYandexMetrika = () => {
    const counterId = '102689887'
    
    // Создаем скрипт для загрузки Яндекс.Метрики
    const script = document.createElement('script')
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${counterId}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `
    document.head.appendChild(script)

    // Добавляем noscript тег для случаев, когда JavaScript отключен
    const noscript = document.createElement('noscript')
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = `https://mc.yandex.ru/watch/${counterId}`
    img.style.position = 'absolute'
    img.style.left = '-9999px'
    img.alt = ''
    div.appendChild(img)
    noscript.appendChild(div)
    document.body.appendChild(noscript)
  }

  // Инициализируем счетчик после загрузки приложения
  nuxtApp.hook('app:mounted', () => {
    initYandexMetrika()
  })
}) 