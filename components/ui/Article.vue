<template>
    <article class="max-w-sm bg-white border border-gray-200 hover:border-blue-500 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <NuxtLink v-if="post?.documentId" :to="`/${post.documentId}`">
            <img class="rounded-t-lg h-44 w-full object-cover" 
                 :src="post?.cover?.url ? 'https://lebo-sochi.ru/admin'+post.cover.url : 'https://via.placeholder.com/300x200'" 
                 :alt="post?.cover?.alternativeText || post?.title" 
                 :title="post?.cover?.caption || post?.title" />
        </NuxtLink>
        <div class="inline-flex flex-col gap-3.5 p-5">
            <NuxtLink v-if="post?.documentId" :to="`/${post.documentId}`">
                <h5 class="min-h-20 md:min-h-24 text-lg md:text-2xl font-bold tracking-tight text-gray-900
                    line-clamp-3 overflow-hidden text-ellipsis whitespace-normal
                    dark:text-white">{{ post?.title || 'Без названия' }}</h5>
            </NuxtLink>
            <NuxtLink v-if="post?.documentId" :to="`/${post.documentId}`" class="inline-flex items-center px-3 py-2 w-max text-sm font-medium text-center text-white bg-[brown]/80 rounded-lg hover:bg-[brown] focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                Подробнее
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </NuxtLink>
        </div>
    </article>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
    post: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

// Добавляем проверку documentId
watch(() => props.post, (newPost) => {
    if (!newPost?.documentId) {
        console.error('Post documentId is undefined:', newPost)
    }
}, { immediate: true })
</script>