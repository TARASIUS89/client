<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Заголовок и навигация -->
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold dark:text-white">Магазин</h1>
        </div>

        <!-- Сетка товаров -->
        <div class="flex-1">
            <!-- Загрузка -->
            <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                <div v-for="n in 8" :key="n" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                    <div class="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <div class="space-y-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Товары -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
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

const products = ref([])
const loading = ref(true)
const cartStore = useCartStore()

// Фильтрация товаров
const filteredProducts = computed(() => {
    return [...products.value]
})

const fetchProducts = async () => {
    try {
        loading.value = true
        const response = await fetch('https://lebo-sochi.ru/admin/api/shops?populate=cover')
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