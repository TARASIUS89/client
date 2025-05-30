<template>
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <nav class="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
            <!-- Левая часть: Логотип -->
            <!-- логотип -->
            <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="~/public/favicon.ico" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Coffee Lebo</span>
            </NuxtLink>

            <!-- Правая часть: Кнопки и меню -->
            <div class="flex items-center space-x-2">
                <!-- Кнопка переключения тёмной темы -->
                <div class="relative">
                    <button @click="toggleDarkMode" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    </button>
                    <div v-if="showDarkTooltip"
                        class="absolute right-0 mt-2 w-32 bg-gray-900 text-white text-sm rounded-md px-2 py-1">
                        Toggle dark mode
                    </div>
                </div>

                <!-- Кнопка статистики/аналитики -->
                <div class="relative">
                    <button @click="toggleStatsTooltip" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        :aria-label="showStatsTooltip ? 'Close analytics' : 'Open analytics'">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </button>
                    <div v-if="showStatsTooltip"
                        class="absolute right-0 mt-2 w-32 bg-gray-900 text-white text-sm rounded-md px-2 py-1">
                        View analytics
                    </div>
                </div>

                <!-- Кнопка открытия мобильного меню -->
                <button @click="toggleMobileMenu" type="button"
                    class="inline-flex items-center p-2 text-sm rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                    :aria-expanded="mobileMenuOpen">
                    <span class="sr-only">Open main menu</span>
                    <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Мобильное меню -->
        <div v-if="mobileMenuOpen"
            class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="mobile-menu-2">
            <ul class="flex flex-col p-4 space-y-2 text-gray-700 dark:text-gray-200">
                <li>
                    <NuxtLink to="/" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-cyan-600 dark:text-cyan-500">
                        Главная
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/shop" class="flex items-center px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        Магазин
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        О компании
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/delivery" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Доставка
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/payment" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Оплата
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contacts" class="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Контакты
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Состояния
 */
const isDarkMode = ref(false)
const showDarkTooltip = ref(false)
const showStatsTooltip = ref(false)
const mobileMenuOpen = ref(false)

/**
 * Методы
 */
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

function toggleStatsTooltip() {
    showStatsTooltip.value = !showStatsTooltip.value
}

</script>

<style scoped>
/* Дополнительные стили при желании */
</style>