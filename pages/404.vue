<template>
    <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">404</p>
            <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Страница не найдена</h1>
            <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Извините, мы не смогли найти страницу, которую вы ищете.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <NuxtLink to="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Вернуться на главную</NuxtLink>
                <a href="https://t.me/lebo_sochi" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-gray-900">Связаться с поддержкой <span aria-hidden="true">&rarr;</span></a>
            </div>
        </div>
    </div>
</template>