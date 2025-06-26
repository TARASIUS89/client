<template>
<AppHeader />
    <UiAds />
    
    <main class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <slot />
    </main>
    <AppFooter />
</template>

<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>