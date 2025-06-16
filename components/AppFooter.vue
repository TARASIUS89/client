<template>
    <!--компонент нижнего колонтитула-->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
                <!-- Основная информация -->
                <div class="mb-6 md:mb-0">
                    <NuxtLink to="/" class="flex items-center">
                        <img src="~/public/favicon.ico" class="h-8 me-3" alt="LEBO Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LEBO</span>
                    </NuxtLink>
                    <p class="mt-4 max-w-xs text-gray-600 dark:text-gray-400">
                        Ваш надежный партнер 
                    </p>
                    <!-- Социальные сети -->
                    <div class="flex mt-4 space-x-4">
                        <a href="https://wa.me/79282947307" target="_blank" rel="noopener noreferrer" class="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </a>
                        <a href="https://t.me/@infoLebo" target="_blank" rel="noopener noreferrer" @click.prevent="handleTelegramClickAndRedirect" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Навигация -->
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <!-- Каталог -->
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Каталог</h2>
                        <ul class="text-gray-600 dark:text-gray-400 space-y-4">
                            <li>
                                <NuxtLink to="/shop" class="hover:underline">Все товары</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Информация -->
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Информация</h2>
                        <ul class="text-gray-600 dark:text-gray-400 space-y-4">
                            <li>
                                <NuxtLink to="/about" class="hover:underline">О компании</NuxtLink>
                            </li>
                            
                            
                            
                        </ul>
                    </div>

                    <!-- Контакты -->
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Контакты</h2>
                        <ul class="text-gray-600 dark:text-gray-400 space-y-4">
                            <li class="flex items-center space-x-2">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>г. Сочи, ул. Донская 3/9</span>
                            </li>
                            <li class="flex items-center space-x-2">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <a href="tel:+79282947307" class="hover:underline">+7 (928) 294-73-07</a>
                            </li>
                            <li class="flex items-center space-x-2">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <a href="mailto:info@lebo-sochi.ru" class="hover:underline">info@lebo-sochi.ru</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Нижняя часть футера -->
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © {{ new Date().getFullYear() }} LEBO. Все права защищены.
                </span>
                <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="/privacy" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">Политика конфиденциальности</a>
                    <a href="/terms" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">Условия использования</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const token = '7605231803:AAHesk57rNvu8VcHGugwZbWqv_RzttfbQqI';
const chatId = "160236196";

const sendTelegramMessage = async (message) => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
        });
        
        if (!response.ok) throw new Error('Ошибка отправки сообщения');
        return await response.json();
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
        throw error;
    }
};

const handleTelegramClickAndRedirect = async () => {
    try {
        // Отправляем уведомление
        await sendTelegramMessage('Новый посетитель на сайте!');
        // После отправки уведомления открываем ссылку
        window.open('https://t.me/@infoLebo', '_blank');
    } catch (error) {
        console.error('Не удалось отправить уведомление:', error);
        // Даже если уведомление не отправилось, все равно открываем ссылку
        window.open('https://t.me/@infoLebo', '_blank');
    }
};
</script>