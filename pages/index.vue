<template>
   <div class="flex flex-col gap-6">
    <section class="relative">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          class="w-full h-120"
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
      <button @click="handlePrev" class="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-600 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
      </button>
      <!-- Go forward one slide -->
      <button @click="handleNext" class="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl hover:text-yellow-600 transition-colors rounded-full p-2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
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
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80"
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
        url: 'https://avatars.mds.yandex.net/i?id=9871bb490e49701860b34a4f5834bd2e_l-8176266-images-thumbs&n=13',
        alt: 'Slide 1'
    },
    {
        id: 2,
        url: 'https://cs13.pikabu.ru/post_img/2023/02/11/8/og_og_167612238721281779.jpg',
        alt: 'Slide 2'
    },
    {
        id: 3,
        url: 'https://i.pinimg.com/originals/c5/2f/b0/c52fb0e9de148e812c542414ee46206e.jpg',
        alt: 'Slide 3'
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