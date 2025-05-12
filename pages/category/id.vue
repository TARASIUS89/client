<template>
    <!-- Контейнер для содержимого статьи с максимальной шириной и центрированием -->
    <div class="max-w-4xl mx-auto px-4 text-black dark:text-white">
      <!-- Индикатор загрузки -->
      <div v-if="isLoading" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
      
      <!-- Сообщение об ошибке -->
      <div v-else-if="error" class="py-10 text-center">
        <h2 class="text-2xl font-bold text-red-500 mb-2">Ошибка загрузки статьи</h2>
        <p>{{ error }}</p>
        <button @click="fetch" class="mt-4 px-5 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition">
          Повторить попытку
        </button>
      </div>
      
      <!-- Контент статьи -->
      <div v-else-if="post && post.title">
        <!-- Хлебные крошки -->
        <div class="flex text-sm text-gray-500 dark:text-gray-400 my-4">
          <NuxtLink to="/" class="hover:text-cyan-500 transition">Главная</NuxtLink>
          <span class="mx-2">›</span>
          <NuxtLink :to="`/${category}`" class="hover:text-cyan-500 transition">{{ categoryName }}</NuxtLink>
          <span class="mx-2">›</span>
          <span class="truncate">{{ post.title }}</span>
        </div>
        
        <!-- Заголовок статьи -->
        <h1 class="text-4xl font-medium my-4">{{ post.title }}</h1>
        
        <!-- Информация о статье: время чтения, просмотры, дата публикации -->
        <div class="flex flex-wrap items-center opacity-60 mb-6 text-sm">
          <span class="mr-4 flex items-center">
            <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ post.body ? calculateReadingTime(post.body) : 0 }}
          </span>
          <span class="mr-4 flex items-center">
            <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ post.views || 0 }} прочитано
          </span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ convertDatetime(post.publishedAt) }}
          </span>
        </div>
        
        <!-- Кнопки "Поделиться" -->
        <div class="flex gap-2 mb-6">
          <button @click="shareOnSocial('telegram')" class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition">
              <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.14753 11.8099C7.3949 9.52374 10.894 8.01654 12.6447 7.28833C17.6435 5.20916 18.6822 4.84799 19.3592 4.83606C19.5081 4.83344 19.8411 4.87034 20.0567 5.04534C20.2388 5.1931 20.2889 5.39271 20.3129 5.5328C20.3369 5.6729 20.3667 5.99204 20.343 6.2414C20.0721 9.08763 18.9 15.9947 18.3037 19.1825C18.0514 20.5314 17.5546 20.9836 17.0736 21.0279C16.0283 21.1241 15.2345 20.3371 14.2221 19.6735C12.6379 18.635 11.7429 17.9885 10.2051 16.9751C8.42795 15.804 9.58001 15.1603 10.5928 14.1084C10.8579 13.8331 15.4635 9.64397 15.5526 9.26395C15.5637 9.21642 15.5741 9.03926 15.4688 8.94571C15.3636 8.85216 15.2083 8.88415 15.0962 8.9096C14.9373 8.94566 12.4064 10.6184 7.50365 13.928C6.78528 14.4212 6.13461 14.6616 5.55163 14.649C4.90893 14.6351 3.67265 14.2856 2.7536 13.9869C1.62635 13.6204 0.730432 13.4267 0.808447 12.8044C0.849081 12.4803 1.29544 12.1488 2.14753 11.8099Z"></path></svg>
          </button>
          <button @click="shareOnSocial('vk')" class="cursor-pointer bg-[#4C75A3] hover:bg-[#3B5998] text-white p-2 rounded transition">
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.26 4.26C3 5.532 3 7.566 3 11.64V12.36C3 16.428 3 18.462 4.26 19.74C5.532 21 7.566 21 11.64 21H12.36C16.428 21 18.462 21 19.74 19.74C21 18.468 21 16.434 21 12.36V11.64C21 7.572 21 5.538 19.74 4.26C18.468 3 16.434 3 12.36 3H11.64C7.572 3 5.538 3 4.26 4.26ZM6.03613 8.47817H8.10013C8.16613 11.9102 9.67813 13.3622 10.8781 13.6622V8.47817H12.8161V11.4362C13.9981 11.3102 15.2461 9.96017 15.6661 8.47217H17.5981C17.4406 9.24243 17.1259 9.97193 16.6737 10.6151C16.2216 11.2582 15.6416 11.8012 14.9701 12.2102C15.7195 12.5831 16.3813 13.1107 16.9118 13.7582C17.4424 14.4056 17.8297 15.1581 18.0481 15.9662H15.9181C15.4621 14.5442 14.3221 13.4402 12.8161 13.2902V15.9662H12.5821H12.5761C8.47213 15.9662 6.13213 13.1582 6.03613 8.47817Z"></path></svg>
          </button>
          <button @click="copyCurrentUrl" class="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white p-2 rounded transition relative" :class="{ 'bg-green-500': copied }">
            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
            <span v-if="copied" class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs">
              Скопировано!
            </span>
          </button>
        </div>
        
        <!-- Содержимое статьи в формате Markdown, преобразованное в HTML -->
        <div v-if="body" class="markdown prose prose-cyan dark:prose-invert max-w-none my-6" v-html="body" ref="markdownContainer"></div>
        
        <!-- Теги статьи, если есть -->
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 my-6">
          <span 
            v-for="tag in post.tags" 
            :key="tag.id" 
            class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
          >
            #{{ tag.name }}
          </span>
        </div>
      </div>
      
      <!-- Пустое состояние -->
      <div v-else-if="!isLoading" class="text-center py-10">
        <p>Статья не найдена</p>
        <NuxtLink to="/" class="inline-block mt-4 px-5 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition">
          Вернуться на главную
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  /**
   * Преобразует дату в формате ISO в читаемый формат "день месяц год"
   * @param {string} isoDatetime - Дата в формате ISO
   * @returns {string} - Дата в формате "день месяц год" или пустая строка
   */
  function convertDatetime(isoDatetime) {
    if (!isoDatetime) return '';
    const date = new Date(isoDatetime);
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }
  
  // Получение информации о текущем маршруте
  const route = useRoute()
  const { category, id } = route.params
  
  // Состояние компонента
  const post = ref({});
  const isLoading = ref(true);
  const error = ref(null);
  const copied = ref(false);
  const categoryName = computed(() => {
    const categories = {
      'dlya-detej': 'Для детей',
      'dlya-vzroslyh': 'Для взрослых',
      // Добавьте больше категорий по необходимости
    };
    return categories[category] || category;
  });
  
  // Получаем доступ к хранилищу состояния
  const index = useIndexStore();
  
  // Импортируем библиотеку для преобразования Markdown в HTML
  import markdownit from 'markdown-it';
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      // Здесь можно добавить подсветку синтаксиса при необходимости
      return str;
    }
  });
  
  // Создаем реактивную переменную для хранения HTML-содержимого
  const body = ref('');
  
  // Создаем реактивную переменную для хранения SEO-данных
  const seo = ref({});
  
  /**
   * Загружает данные статьи с сервера
   * Запрашивает статью по slug, обновляет счетчик просмотров и устанавливает SEO-метаданные
   */
  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
        // Запрашиваем данные статьи с сервера
        const res = await $fetch(`https://lebo-sochi.ru/admin/api/posts?filters[slug][$eqi]=${id}&filters[categories][slug][$eqi]=${category}&populate=*`);
        
        // Проверяем, есть ли данные в ответе
        if (res.data && res.data.length > 0) {
            const postData = res.data[0];
            
            // Проверяем, есть ли вложенные attributes
            if (postData.attributes) {
                post.value = postData.attributes;
                // Сохраняем ID для дальнейшего использования
                post.value.id = postData.id;
                // Сохраняем documentId отдельно для API запросов
                if (postData.attributes.documentId) {
                    post.value.documentId = postData.attributes.documentId;
                }
            } else {
                post.value = postData;
            }
            
            if (post.value) {
                // Обновляем счетчик просмотров локально в любом случае
                post.value.views = (post.value.views || 0) + 1;
                
                // Пробуем обновить на сервере, но в фоновом режиме
                setTimeout(() => {
                    try {
                        // Используем documentId для обновления, так как это работает
                        const idToUpdate = post.value.documentId || postData.id || post.value.id;
                        if (idToUpdate) {
                            updateViews(idToUpdate);
                        }
                    } catch (e) {
                        // Ошибки игнорируем, так как просмотры уже обновлены локально
                    }
                }, 100);
                
                // Сохраняем SEO-данные
                seo.value = post.value.seo || {};
                // Устанавливаем SEO-метаданные для страницы
                useSeoMeta({
                    title: `${seo.value.metaTitle || post.value.title} | PlusPixel`,
                    description: seo.value.metaDescription || '',
                    ogTitle: seo.value.metaTitle || post.value.title,
                    ogDescription: seo.value.metaDescription || '',
                });
            }
        } else {
            error.value = 'Статья не найдена';
        }
    } catch (error) {
        error.value = 'Ошибка при загрузке статьи. Пожалуйста, попробуйте позже.';
    } finally {
        isLoading.value = false;
    }
  };
  
  // Следим за изменениями в объекте post и преобразуем Markdown в HTML
  watch(() => post.value, (newPost) => {
      if (newPost && newPost.body) {
          body.value = md.render(newPost.body);
      } else if (newPost !== undefined && Object.keys(newPost).length === 0) {
          // Пустой объект - ничего не делаем, ждем загрузки данных
          body.value = '';
      } else {
          console.warn('Неверная структура данных поста:', newPost);
          body.value = '';
      }
  }, { immediate: true });
  
  /**
   * Обновляет счетчик просмотров статьи на сервере
   * @param {string} documentId - Идентификатор документа
   */
  const updateViews = async (documentId) => {
    if (!documentId) return;
    
    try {
      // Сначала пробуем обновить через documentId, так как это работает
      if (post.value.documentId) {
        const apiPath = `https://lebo-sochi.ru/admin/api/posts/${post.value.documentId}`;
        await $fetch(apiPath, {
          method: 'PUT',
          body: {
            data: {
              views: (post.value.views || 0) + 1,
            },
          },
        });
        return;
      }
      
      // Если documentId нет, пробуем через переданный id
      const apiPath = `https://lebo-sochi.ru/admin/api/posts/${documentId}`;
      await $fetch(apiPath, {
        method: 'PUT',
        body: {
          data: {
            views: (post.value.views || 0) + 1,
          },
        },
      });
    } catch (error) {
      // При ошибке просто обновляем локально и не показываем ошибку в консоли
      post.value.views = (post.value.views || 0) + 1;
    }
  };
  
  /**
   * Рассчитывает примерное время чтения статьи
   * @param {string} text - Текст статьи
   * @param {number} wordsPerMinute - Средняя скорость чтения (слов в минуту)
   * @returns {string} - Время чтения с правильным окончанием
   */
  function calculateReadingTime(text, wordsPerMinute = 200) {
    if (!text) return '0 минут';
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    if (readingTime === 1) {
        return `${readingTime} минута`;
    } else if (readingTime > 1 && readingTime < 5) {
        return `${readingTime} минуты`;
    } else {
        return `${readingTime} минут`;
    }
  }
  
  /**
   * Поделиться статьей в социальных сетях
   * @param {string} platform - Платформа (telegram, vk)
   */
  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = post.value.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'vk':
        shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  
  /**
   * Копировать текущий URL в буфер обмена
   */
  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (error) {
      console.error('Ошибка при копировании URL:', error);
    }
  };
  
  /**
   * Копирует текст в буфер обмена
   * @param {string} text - Текст для копирования
   * @param {Event} event - Событие клика
   */
  const copyToClipboard = async (text, event) => {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
          console.error('Clipboard API не поддерживается в текущей среде');
          return;
      }
  
      try {
          await navigator.clipboard.writeText(text);
          showCopiedNotification(event);
      } catch (error) {
          console.error('Не удалось скопировать текст:', error);
      }
  };
  
  /**
   * Показывает уведомление "Скопировано" рядом с элементом
   * @param {Event} event - Событие клика
   */
  const showCopiedNotification = (event) => {
    const notification = document.createElement('span');
    notification.textContent = 'Скопировано';
    notification.className =
        'absolute bg-cyan-500 text-white text-xs px-2 py-1 rounded-md shadow-md pointer-events-none';
  
    const rect = event.target.getBoundingClientRect();
    notification.style.top = `${rect.top + window.scrollY}px`;
    notification.style.left = `${rect.right + window.scrollX + 8}px`;
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
        notification.remove();
    }, 1000);
  };
  
  /**
   * Обработчик кликов на уровне документа
   * Копирует содержимое тегов code и pre в буфер обмена
   * @param {Event} event - Событие клика
   */
  const handleDocumentClick = (event) => {
    if (event.target.tagName === 'CODE' || event.target.tagName === 'PRE') {
        const codeText = event.target.textContent;
        copyToClipboard(codeText, event);
    }
  };
  
  // Создаем переменную для хранения наблюдателя
  let observer;
  // При монтировании компонента
  onMounted(() => {
    // Запускаем загрузку данных
    fetch();
    
    // Добавляем обработчик кликов
    document.addEventListener('click', handleDocumentClick);
  
    // Создаем наблюдатель за изменениями в DOM
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && (node.querySelector('code') || node.querySelector('pre'))) {
                    // Ничего не делаем, просто обнаруживаем
                }
            });
        });
    });
  
    // Начинаем наблюдение за изменениями в содержимом статьи
    if (body.value) {
        observer.observe(body.value, {
            childList: true,
            subtree: true,
        });
    }
  });
  
  // При размонтировании компонента
  onUnmounted(async ()  => {
    // Удаляем обработчик кликов
    document.removeEventListener('click', handleDocumentClick);
    // Отключаем наблюдатель
    if (observer) {
        observer.disconnect();
    }
  });
  </script>
  
  <style>
  .markdown pre,
  .markdown code {
    position: relative;
    cursor: pointer;
  }
  
  .markdown pre:hover::after,
  .markdown code:hover::after {
    content: "Click to copy";
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 0 0 0 4px;
  }
  
  /* Обеспечиваем адаптивность для таблиц */
  .markdown table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }
  
  /* Стили для ссылок */
  .markdown a {
    color: #0ea5e9;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .markdown a:hover {
    text-decoration: underline;
  }
  
  /* Стили для блоков кода */
  .markdown pre {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .dark .markdown pre {
    background-color: #0f172a;
  }
  
  /* Стили для изображений */
  .markdown img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
  </style>