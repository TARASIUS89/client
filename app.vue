<template>
  <AppLoader v-if="loader.loader" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const loader = useIndexStore();

useHead({
  title: 'LEBO',
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900'
  },
})

useSeoMeta({
  title: 'LEBO',
  ogTitle: 'LEBO',
  description: ' Кофе лебо,соки Djemka',
  keywords: 'Кофе лебо,соки Dgemka,кофе Lebo,Lebo,Lebo sochi,лебо сочи,купить лебо сочи,соки концентраты сочи,соки Djemka,Djemka сочи',
  ogDescription: 'Кофе лебо,соки Djemka',
  ogImage: '~/public/prew.jpg',
})
</script>