<template>
  <div class="flex flex-col gap-6">
    <!-- Слайдер -->
    <section class="relative">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          class="w-full h-130"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
        >
          <swiper-slide
            v-for="slide in slides"
            :key="slide.id"
            class="w-full h-full flex justify-center items-center"
          >
            <img :src="slide.url" class="w-full h-full object-cover" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <!-- Кнопки навигации -->
      <button @click="handlePrev"
        class="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-950 transition-colors rounded-full p-2 cursor-pointer z-10">
        <!-- SVG стрелка назад -->
      </button>
      <button @click="handleNext"
        class="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-950 transition-colors rounded-full p-2 cursor-pointer z-10">
        <!-- SVG стрелка вперёд -->
      </button>
    </section>

    <!-- Блок текста и картинок -->
    <section class="flex flex-col lg:flex-row items-center gap-24">
      <!-- Текст -->
      <div class="flex flex-col gap-4 text-black dark:text-white">
        <h1 class="text-5xl font-medium uppercase">LEBO <span class="text-yellow-900 text-6xl font-bold">GOLD </span> ARABICA</h1>
        <p class="text-2xl">Открой для себя истинную роскош LEBO GOLD. Аромат зёрен Арабики, пикантные нотки черной смородины и молочного шоколада!</p>
      </div>

      <!-- Галерея -->
      <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
        <article v-for="(post, index) in posts"
                 :key="post.id"
                 :class="index === 0 ? 'row-span-2 h-80 w-3xs' : ''"
                 class="hover:scale-105 transition-transform">
          <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
            <img class="object-cover rounded-3xl" :src="'http://localhost:1337' + post.cover.url" :alt="post.cover.alternativeText">
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- Каталог LEBO -->
    <section class="text-black dark:text-white">
      <h2 class="my-1.5 text-3xl font-medium uppercase">Каталог LEBO</h2>

      <!-- Меню категорий -->
      <nav class="my-3">
        <ul class="flex gap-4">
          <li v-for="index in 24" :key="index">
            <NuxtLink to="/">LEBO</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Список статей -->
      <div class="flex justify-between">
        <article v-for="item in 4" :key="item" class="group">
          <NuxtLink to="/" class="block mb-4">
            <img
              class="w-60 h-80 object-cover rounded-xl transition-transform group-hover:scale-105"
              src="/1233.webp"
              alt="Описание изображения товара или статьи"
            />
          </NuxtLink>
          <NuxtLink to="/" class="block mb-2 text-lg font-medium hover:text-yellow-900 transition-colors">
            Название статьи
          </NuxtLink>
          <NuxtLink to="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-900 transition-colors">
            Название категории
          </NuxtLink>
        </article>
      </div>
    </section>
  </div>
</template>