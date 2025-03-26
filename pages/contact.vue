<template>
    <h1 class="my-4 text-2xl text-blue-700 darl:blue-500 font-medium">Контакты</h1>
    <p class="my-4 text-black dark:text-white">История бренда началась в 1997 году, когда LEBO Coffee стал первым молотым кофе для турки, произведенным в России. Более 26 лет мы производим кофе на собственном заводе, используя новейшее оборудование, чтобы вы могли каждый день открывать богатство общения за чашкой LEBO Coffee.</p>
    <h2 class="my-4 text-black text-xl font-medium dark:text-white">Контакты:</h2>
    <ul class="my-4 text-black dark:text-white">
        <li>Номер: <a class="underline hover:text-blue-500" href="tel:79282947307">+7 (928) 294-73-07</a></li>
        <li>Почта: <a class="underline hover:text-blue-500" href="mailto:pulse_sport@mail.ru">pulse_sport@mail.ru</a></li>
    </ul>
    <h2 class="my-4 text-black text-xl font-medium dark:text-white">Форма обратной связи:</h2>
    <AppFeedback />
</template>


<script setup>
const route = useRoute()
useHead({
    title: 'Контакты | Академия ТОП'
})
</script>