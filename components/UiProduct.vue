<template>
    <div class="group relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-gray-200/10 dark:border-gray-700/10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
        <!-- Изображение товара -->
        <div class="relative flex items-center justify-center bg-gray-50/10 dark:bg-gray-700/10 h-36 sm:h-40 md:h-44 w-full overflow-hidden">
            <img
                class="object-contain max-h-32 sm:max-h-36 md:max-h-40 w-auto mx-auto transition-transform duration-500 group-hover:scale-110"
                :src="`https://lebo-sochi.ru/admin${product.cover.url}`"
                :alt="product.name"
            />
            <!-- Бейдж "В корзине" -->
            <div v-if="isInCart" 
                class="absolute top-2 right-2 bg-blue-600/30 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105 backdrop-blur-xl">
                В корзине
            </div>
            <!-- Затемнение при наведении -->
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        <!-- Информация о товаре -->
        <div class="flex flex-col flex-1 p-3 sm:p-4">
            <!-- Название -->
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-grow group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {{ product.name }}
            </h3>

            <!-- Цена и кнопка -->
            <div class="flex flex-col items-end justify-between mt-auto pt-2 sm:pt-3 gap-2">
                <span class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {{ formatPrice(product.price) }} ₽
                </span>
                
                <!-- Выбор количества -->
                <div class="flex items-center w-full justify-end mb-1">
                    <span class="text-xs text-gray-600 dark:text-gray-400 mr-2">Кол-во:</span>
                    <div class="flex items-center border border-gray-300/10 dark:border-gray-600/10 rounded-lg overflow-hidden bg-white/10 dark:bg-gray-700/10 backdrop-blur-xl">
                        <button 
                            @click="decrementQuantity" 
                            class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100/10 dark:hover:bg-gray-700/10 transition-colors duration-200"
                            :disabled="quantity <= 1"
                            :class="{'opacity-50 cursor-not-allowed': quantity <= 1}"
                        >
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <span class="w-8 text-center py-1 text-gray-900 dark:text-white font-medium text-sm">{{ quantity }}</span>
                        <button 
                            @click="incrementQuantity" 
                            class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100/10 dark:hover:bg-gray-700/10 transition-colors duration-200"
                        >
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="flex gap-2 w-full">
                    <button
                        v-if="isInCart"
                        @click="removeFromCart"
                        class="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 bg-red-600/30 hover:bg-red-700/30 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xl"
                    >
                        <svg class="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Убрать</span>
                    </button>
                    <button
                        v-else
                        @click="addToCart"
                        class="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 bg-blue-600/30 hover:bg-blue-700/30 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xl"
                    >
                        <svg class="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Добавить</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ product: Object })
const isInCart = ref(false)
const quantity = ref(1)

// Увеличить количество
const incrementQuantity = () => {
    quantity.value++
}

// Уменьшить количество
const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

// Форматирование цены
const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
}

// Проверка наличия товара в корзине
const checkCart = () => {
    if (process.client) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        isInCart.value = cart.some(item => item.id === props.product.id)
    }
}

// Добавление товара в корзину
const addToCart = () => {
    if (import.meta.client) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingProduct = cart.find(item => item.id === props.product.id)
        
        if (existingProduct) {
            existingProduct.quantity += quantity.value
        } else {
            cart.push({
                id: props.product.id,
                name: props.product.name,
                price: props.product.price,
                cover: props.product.cover,
                quantity: quantity.value
            })
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))
        isInCart.value = true
        // Сбросить количество после добавления
        quantity.value = 1
    }
}

// Удаление товара из корзины
const removeFromCart = () => {
    if (import.meta.client) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const updatedCart = cart.filter(item => item.id !== props.product.id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        isInCart.value = false
    }
}

onMounted(() => {
    checkCart()
})

// Слушаем изменения в корзине
if (import.meta.client) {
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            checkCart()
        }
    })
}
</script>