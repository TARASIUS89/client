<template>
    <div class="max-w-3xl mx-auto text-black dark:text-white">
            <div v-if="post.cover"
                :style="'background-image: url(http://localhost:1337' + post.cover.url + ')'"
                class="h-80 bg-auto bg-top bg-fixed bg-no-repeat rounded-4xl"
            >
            </div>
        <h1 class="text-4xl font-medium my-2">{{ post.title }}</h1>
        <p v-if="post" class="opacity-50 my-1.5">
            <span>{{ post.body ? calculateReadingTime(post.body) : 0 }}</span> •
            <span v-html="post.view || 0"></span>
            прочитано • {{ convertDatetime(post.publishedAt) }}</p>
        <div class="markdown my-1.5" v-html="body"></div>
    </div>
</template>

<script setup>

function convertDatetime(isoDatetime) {
    // Создаем объект Date из строки
    const date = new Date(isoDatetime);

    // Определяем массив с русскими названиями месяцев
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ];

    // Получаем компоненты даты
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Форматируем строку
    return `${day} ${month} ${year}`;
}

const { id } = useRoute().params;

const post = ref({})
const index = useIndexStore();

import markdownit from 'markdown-it'
const md = markdownit()
const body = ref()
watch(post, (newPost) => {
    body.value = md.render(newPost.body);
})

const seo = ref({})

const fetch = async () => {
    try {
        index.loader = true;
        const res = await $fetch(`http://localhost:1337/api/posts?filters[slug][$eqi]=${id}&populate=*`);
        post.value = res.data[0];
        if (post.value) {
            updateViews(post.value.documentId);
            seo.value = res.data[0].seo;
            useSeoMeta({
              title: seo.value.metaTitle,
              description: seo.value.metaDescription,
              ogTitle: seo.value.metaTitle,
              ogDescription: seo.value.metaDescription,
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        index.loader = false;
    }
};

const updateViews = async (id) => {
    await $fetch(`http://localhost:1337/api/posts/${id}`, {
        method: 'PUT',
        body: {
            data: {
                view: (post.value.view || 0) + 1,
            },
        },
    });
};

function calculateReadingTime(text, wordsPerMinute = 200) {
    // Удаляем лишние пробелы и разбиваем текст на слова
    const words = text.trim().split(/\s+/).length;
    
    // Рассчитываем время чтения в минутах
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Возвращаем строку с указанием времени чтения
    if (readingTime === 1) {
        return `${readingTime} минута`;
    } else if (readingTime > 1 && readingTime < 5) {
        return `${readingTime} минуты`;
    } else {
        return `${readingTime} минут`;
    }
}


onMounted(() => fetch())
</script>