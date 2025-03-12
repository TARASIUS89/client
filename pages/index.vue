<template>
  <h1 class="my-4 text-2xl text-blue-700 darl:blue-500 font-medium">Главная страница</h1>

<!-- второй блок -->
<section class="text-black dark:text-white">
    <h2 class="my-1.5 text-3xl font-medium uppercase">Популярные статьи</h2>
    <nav class="my-3">
      <ul class="flex gap-4">
        <li v-for="item in 10">
          <NuxtLink to="/">Дома и быт</NuxtLink>
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
const index = useIndexStore();

useHead({
  title: 'Главная | Секреты Шефа',
})
</script>