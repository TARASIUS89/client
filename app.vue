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
  description: 'Предлагаем простые и вкусные рецепты, советы по выбору ингредиентов и идеи для сервировки',
  ogDescription: 'Предлагаем простые и вкусные рецепты, советы по выбору ингредиентов и идеи для сервировки',
  ogImage: '~/public/prew.jpg',
})
</script>