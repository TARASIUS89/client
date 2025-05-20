<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Заголовок и навигация -->
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold dark:text-white">Корзина</h1>
            <NuxtLink to="/shop" class="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 transition-colors">
                <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Вернуться в магазин
            </NuxtLink>
        </div>

        <!-- Пустая корзина -->
        <div v-if="!cart.length" class="text-center py-16">
            <div class="mb-6">
                <svg class="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">Корзина пуста</h2>
            <p class="text-gray-500 dark:text-gray-500 mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
            <NuxtLink to="/shop" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Перейти в каталог
                <svg class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </NuxtLink>
        </div>

        <!-- Товары в корзине -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Список товаров -->
            <div class="lg:col-span-2 space-y-4">
                <div v-for="item in cart" :key="item.id" 
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center">
                        <img :src="`https://lebo-sochi.ru/admin${item.cover.url}`" 
                            :alt="item.name"
                            class="w-24 h-24 object-contain rounded-lg bg-gray-50 dark:bg-gray-700"
                        />
                        <div class="ml-6 flex-1">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ item.name }}</h3>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <span class="text-xl font-bold text-gray-900 dark:text-white">
                                        {{ formatPrice(item.price) }} ₽
                                    </span>
                                    <span class="text-gray-500 dark:text-gray-400">
                                        × {{ item.quantity }}
                                    </span>
                                </div>
                                <button
                                    @click="removeFromCart(item.id)"
                                    class="text-red-500 hover:text-red-600 transition-colors p-2"
                                >
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Форма заказа -->
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Оформление заказа</h2>
                    
                    <!-- Итого -->
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600 dark:text-gray-400">Товары ({{ cart.length }})</span>
                            <span class="text-gray-900 dark:text-white">{{ formatPrice(total) }} ₽</span>
                        </div>
                        <div class="flex justify-between items-center font-semibold">
                            <span class="text-gray-900 dark:text-white">Итого</span>
                            <span class="text-2xl text-blue-600 dark:text-blue-400">{{ formatPrice(total) }} ₽</span>
                        </div>
                    </div>

                    <!-- Контактные данные -->
                    <div class="space-y-4">
                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Номер телефона
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                v-model="contactData.phone"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                                placeholder="+7 (___) ___-__-__"
                                required
                            />
                        </div>
                        <div>
                            <label for="telegram" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Названия организации
                            </label>
                            <input
                                type="text"
                                id="telegram"
                                v-model="contactData.telegram"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                                placeholder="@username"
                                required
                            />
                        </div>
                    </div>

                    <!-- Кнопка оформления -->
                    <button
                        @click="checkout"
                        class="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="!isFormValid || isLoading"
                    >
                        <span v-if="isLoading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Обработка...
                        </span>
                        <span v-else>Оформить заказ</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Модальное окно успешного заказа -->
        <UiSuccessModal v-model="showSuccessModal" />
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const contactData = ref({
    phone: '',
    telegram: ''
})
const showSuccessModal = ref(false)
const isLoading = ref(false)

// Получаем товары из store
const cart = computed(() => cartStore.items)

// Форматирование цены
const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
}

// Подсчет общей суммы
const total = computed(() => cartStore.totalPrice)

// Проверка валидности формы
const isFormValid = computed(() => {
    return contactData.value.phone && contactData.value.telegram
})

const removeFromCart = (id) => {
    cartStore.removeFromCart(id)
}

const checkout = async () => {
    try {
        if (!isFormValid.value) {
            alert('Пожалуйста, заполните все поля')
            return
        }

        isLoading.value = true

        // Формируем сообщение
        const message = `
🛒 Новый заказ:

${cart.value.map((item) => `
📦 ${item.name}
💰 Цена: ${formatPrice(item.price)}₽
📊 Количество: ${item.quantity}
`).join('\n')}

💵 Итого: ${formatPrice(total.value)}₽

👤 Контактные данные:
📱 Телефон: ${contactData.value.phone}
📲 Telegram: ${contactData.value.telegram}
        `.trim()

        // Отправляем в Telegram
        const token = '7605231803:AAHesk57rNvu8VcHGugwZbWqv_RzttfbQqI';
        const chatId = "160236196";
        
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        })

        if (!response.ok) {
            throw new Error('Ошибка отправки сообщения')
        }

        // Очищаем корзину после успешной отправки
        cartStore.clearCart()
        
        // Очищаем форму
        contactData.value = {
            phone: '',
            telegram: ''
        }
        
        // Показываем модальное окно успеха
        showSuccessModal.value = true

    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error)
        alert('Произошла ошибка при оформлении заказа. Попробуйте позже.')
    } finally {
        isLoading.value = false
    }
}

// Инициализируем корзину при монтировании компонента
onMounted(() => {
    cartStore.initCart()
})

// Слушаем обновления корзины через store
watch(() => cartStore.items, () => {
    // Обновление произойдет автоматически благодаря computed свойству
}, { deep: true })
</script>