<template>
    <div class="max-w-3xl mx-auto text-black dark:text-white">
        <h1 class="text-4xl font-medium my-2">{{ post?.title || 'Загрузка...' }}</h1>
        <p v-if="post" class="opacity-50 my-1.5">
            <span>{{ post.body ? calculateReadingTime(post.body) : 0 }}</span> •
            <span v-html="post.views || 0"></span>
            прочитано • {{ convertDatetime(post.publishedAt) }}</p>
        <div v-if="body" class="markdown my-1.5" v-html="body" ref="markdownContainer"></div>
        <div v-else class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import markdownit from 'markdown-it'
import { useRoute, useFetch, navigateTo } from '#imports'

const route = useRoute()
const { id } = route.params
const post = ref({})
const body = ref(null)
const seo = ref({})
const index = useIndexStore()
const md = markdownit()

// Проверка ID
if (!id) {
    console.error('ID не определен')
    navigateTo('/404')
}

const fetchPost = async () => {
    if (!id) return

    try {
        index.loader = true
        const { data, error } = await useFetch(`https://lebo-sochi.ru/admin/api/posts?filters[documentId][$eqi]=${id}&populate=*`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt') || ''}`
            }
        })

        if (error.value) {
            console.error('Ошибка при загрузке поста:', error.value)
            navigateTo('/404')
            return
        }

        if (data.value?.data?.length > 0) {
            post.value = data.value.data[0]
            if (post.value?.body) {
                body.value = md.render(post.value.body)
            }
            updateViews(post.value.id)
            seo.value = post.value.seo || {}
            
            useSeoMeta({
                title: `${seo.value.metaTitle || post.value.title || 'Пост'} | PlusPixel`,
                description: seo.value.metaDescription || post.value.desc || 'Читайте интересную статью на PlusPixel',
                ogTitle: seo.value.metaTitle || post.value.title || 'Пост',
                ogDescription: seo.value.metaDescription || post.value.desc || 'Читайте интересную статью на PlusPixel',
            })
        } else {
            console.error('Пост не найден')
            navigateTo('/404')
        }
    } catch (error) {
        console.error('Ошибка при загрузке поста:', error)
        navigateTo('/404')
    } finally {
        index.loader = false
    }
}

const updateViews = async (postId) => {
    if (!postId) return

    try {
        await useFetch(`https://lebo-sochi.ru/admin/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt') || ''}`
            },
            body: {
                data: {
                    views: (post.value.views || 0) + 1,
                },
            },
        })
    } catch (error) {
        console.error('Ошибка при обновлении просмотров:', error)
    }
}

function convertDatetime(isoDatetime) {
    if (!isoDatetime) return ''
    const date = new Date(isoDatetime)
    const months = [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
    ]
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()
    return `${day} ${month} ${year}`
}

function calculateReadingTime(text, wordsPerMinute = 200) {
    if (!text) return '0 минут'
    const words = text.trim().split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    if (readingTime === 1) {
        return `${readingTime} минута`
    } else if (readingTime > 1 && readingTime < 5) {
        return `${readingTime} минуты`
    } else {
        return `${readingTime} минут`
    }
}

// Функция для копирования текста в буфер обмена
const copyToClipboard = async (text, event) => {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        console.error('Clipboard API не поддерживается в текущей среде')
        return
    }

    try {
        await navigator.clipboard.writeText(text)
        showCopiedNotification(event)
    } catch (error) {
        console.error('Не удалось скопировать текст:', error)
    }
}

// Функция для показа уведомления "Скопировано"
const showCopiedNotification = (event) => {
    const notification = document.createElement('span')
    notification.textContent = 'Скопировано'
    notification.className =
        'absolute bg-cyan-500 text-white text-xs px-2 py-1 rounded-md shadow-md pointer-events-none'

    const rect = event.target.getBoundingClientRect()
    notification.style.top = `${rect.top + window.scrollY}px`
    notification.style.left = `${rect.right + window.scrollX + 8}px`

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 1000)
}

// Обработчик кликов на уровне документа
const handleDocumentClick = (event) => {
    if (event.target.tagName === 'CODE' || event.target.tagName === 'PRE') {
        const codeText = event.target.textContent
        copyToClipboard(codeText, event)
    }
}

let observer

onMounted(() => {
    fetchPost()
    document.addEventListener('click', handleDocumentClick)

    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && (node.querySelector('code') || node.querySelector('pre'))) {
                    console.log('Новый тег <code> или <pre> обнаружен')
                }
            })
        })
    })

    if (body.value) {
        observer.observe(body.value, {
            childList: true,
            subtree: true,
        })
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick)
    if (observer) {
        observer.disconnect()
    }
})
</script>