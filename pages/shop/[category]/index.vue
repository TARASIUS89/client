<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Заголовок и навигация -->
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold dark:text-white">Магазин</h1>
            <div class="flex items-center space-x-4">
                <!-- Корзина -->
                <NuxtLink to="/shop/cart" class="relative inline-flex items-center p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {{ cartCount }}
                    </span>
                </NuxtLink>
            </div>
        </div>

        <!-- Сетка товаров -->
        <div class="flex-1">
            <!-- Загрузка -->
            <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="n in 8" :key="n" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                    <div class="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <div class="space-y-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Товары -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <UiProduct
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>

            <!-- Нет товаров -->
            <div v-if="!loading && filteredProducts.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Товары не найдены</h3>
                <p class="text-gray-500 dark:text-gray-400">Попробуйте изменить параметры поиска</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const { category } = useRoute().params;

const products = ref([])
const loading = ref(true)
const cartStore = useCartStore()

// Используем computed для получения количества товаров
const cartCount = computed(() => cartStore.totalItems)

// Фильтрация товаров
const filteredProducts = computed(() => {
    return [...products.value]
})

const fetchProducts = async () => {
    try {
        loading.value = true
        const response = await fetch(`https://lebo-sochi.ru/admin/api/shops?populate=cover&filters[category][$eq]=${category}`)
        const data = await response.json()
        products.value = data.data
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchProducts()
    cartStore.initCart()
})

// Слушаем обновления корзины через store
watch(() => cartStore.items, () => {
    // Обновление произойдет автоматически благодаря computed свойству
}, { deep: true })
</script>