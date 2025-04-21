<template>
   <div class="flex flex-col gap-6">
    <section class="relative">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          class="w-full h-130"
          :autoplay="{
            delay: 3000, // Задержка в миллисекундах
            disableOnInteraction: false // Не отключать автопрокрутку при взаимодействии
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

      <!-- Go back one slide -->
      <button @click="handlePrev" class="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-950 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0  33" width="64" height="40" fill="rgba(205,228,16,1)"><path d="M8.3685 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.3685 12Z"></path></svg>
      </button>
      <!-- Go forward one slide -->
      <button @click="handleNext" class="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-950 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 33" width="64" height="35" fill="rgba(241,175,18,1)"><path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path></svg>
      </button>
    </section>
  </div>

  <!-- первый блок -->
  <section class="flex flex-col lg:flex-row items-center gap-24">
    <!-- левая сторона -->
    <div class="flex flex-col gap-4 text-black dark:text-white">
      <h1 class="text-5xl font-medium uppercase">LEBO <span class="text-yellow-900 text-6xl font-bold ">GOLD </span>
        ARABICA</h1>
      <p class="text-2xl">Открой для себя истинную роскош LEBO GOLD.Аромат зёрен Арабики,пикантные нотки черной
        смородины и молочного шоколада!</p>
    </div>
    <!-- правая сторона -->
    <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
      <article v-for="(post, index) in posts" :key="post.id" :class="index === 0 ? 'row-span-2 *:*:h-80 *:*:w-3xs' : ''"
        class="hover:scale-105 transition-transform">
        <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
          <img class="object-cover rounded-3xl" :src="'http://localhost:1337' + post.cover.url"
            :alt="post.cover.alternativeText">
        </NuxtLink>
      </article>
    </div>
  </section>

  <!-- второй блок -->
  <section class="text-black dark:text-white">
    <h2 class="my-1.5 text-3xl font-medium uppercase">Каталог LEBO</h2>
    <nav class="my-3">
      <ul class="flex gap-4">
        <li v-for="item in 24">
          <NuxtLink to="/">LEBO</NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- список популярные статей -->
    <div class="flex justify-between">
      <article v-for="item in 4">
        <NuxtLink to="/">
          <img class="w-60 h-80 object-cover rounded-xl"
            src="C:\Users\User\Documents\www\client\public\1233.webp"
            alt="">
        </NuxtLink>
        <NuxtLink to="/">
          <h3>Название статьи</h3>
        </NuxtLink>
        <NuxtLink to="/">Название категории</NuxtLink>
      </article>
    </div>
  </section>
</template>

<style>
.swiper-button-next {
  color: brown;
}
</style>

<script setup>
import { useSwiper } from '#imports'

const containerRef = ref(null)
const swiper = ref(null)
const slides = ref([
    {
        id: 1,
        url: 'https://lebo.ru/wp-content/uploads/2021/05/all-07-2-2000x931.jpg',
        alt: 'Slide 1'
    },
    {
        id: 2,
        url: 'https://lebo.ru/wp-content/uploads/2021/05/all-02.jpg',
        alt: 'Slide 2'
    },
    {
        id: 3,
        url: 'https://lebo.ru/wp-content/uploads/2023/02/photo_2023-02-15_18-13-39.jpg',
        alt: 'Slide 3'
    },
    {
        id: 4,
        url: 'https://lebo.ru/wp-content/uploads/2022/10/espresso_dg_montazhnaya-oblast-1-2000x938.jpg',
        alt: 'Slide 4'
    },
    {
        id: 5,
        url: 'https://lebo.ru/wp-content/uploads/2021/05/all-08_2-2000x931.jpg',
        alt: 'Slide 5'
    }
])

onMounted(() => {
  swiper.value = useSwiper(containerRef, {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: false,
    navigation: false,
  })
})

onBeforeUnmount(() => {
  if (swiper.value?.destroy) {
    swiper.value.destroy()
  }
})

const handlePrev = () => {
  swiper.value?.prev()
}

const handleNext = () => {
  swiper.value?.next()
}

const posts = ref([])
const index = useIndexStore();

const fetch = async () => {
  try {
    // включаем loader
    index.loader = true;

    const res = await $fetch('http://localhost:1337/api/posts?populate=*')

    return posts.value = res.data
  } catch (error) {
    console.log(error);
  } finally {
    // выключаем loader
    index.loader = false;
  }
}

const seo = ref({})
const fetchSeo = async () => {
  try {
    index.loader = true;
    const res = await $fetch(`http://localhost:1337/api/global?populate=*`);

    if (res.data.seo) {
      seo.value = res.data.seo;
    }

    useHead({
      title: `${seo.value.metaTitle} | Секреты Шефа`,
      meta: [
        { name: 'description', content: seo.value.metaDescription }
      ],
    })

  } catch (error) {
    console.log(error);
  } finally {
    index.loader = false;
  }
};

onMounted(() => {
  fetch()
  fetchSeo()
})
</script>