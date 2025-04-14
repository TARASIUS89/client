<template>
   
   <section>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>C:\Users\User\Documents\www\client\public\all-08_2-2000x931.jpg</swiper-slide>
        <swiper-slide>C:\Users\User\Documents\www\client\public\all-08_2-2000x931.jpg</swiper-slide>
        <swiper-slide>C:\Users\User\Documents\www\client\public\all-08_2-2000x931.jpg</swiper-slide>
        ...
      </swiper>
    </section><section>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>C:\Users\User\Documents\www\client\public\all-08_2-2000x931.jpg</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        ...
      </swiper>
    </section>
    
  <!-- первый блок -->
  <section class="flex flex-col lg:flex-row items-center gap-24">
    <!-- левая сторона -->
    <div class="flex flex-col gap-4 text-black dark:text-white">
      <h1 class="text-5xl font-medium uppercase">LEBO <span class="text-yellow-900 text-6xl font-bold ">GOLD  </span> ARABICA</h1>
      <p class="text-2xl">Открой для себя истинную роскош LEBO GOLD.Аромат зёрен Арабики,пикантные нотки черной смородины и молочного шоколада!</p>
    </div>
    <!-- правая сторона -->
    <div class="grid grid-cols-2 grid-rows-2 items-center gap-8">
      <article v-for="(post, index) in posts" :key="post.id" :class="index === 0 ? 'row-span-2 *:*:h-80 *:*:w-3xs' : ''"
        class="hover:scale-105 transition-transform">
        <NuxtLink :to="`/${post.category?.slug}/${post.slug}`">
          <img class="object-cover rounded-3xl" :src="'http://localhost:1337'+post.cover.url" :alt="post.cover.alternativeText">
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
          <img class="w-60 h-80 object-cover rounded-xl" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=80" alt="">
        </NuxtLink>
        <NuxtLink to="/">
          <h3>Название статьи</h3>
        </NuxtLink>
        <NuxtLink to="/">Название категории</NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup>
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