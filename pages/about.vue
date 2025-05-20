<template>
    <h1 class="my-4 text-2xl text-cyan-700 darl:cyan-500 font-medium">О нас</h1>
    <div class="text-black dark:text-white">
        <section>
            <p class="mb-4">
                История бренда началась в 1997 году, когда LEBO Coffee стал первым молотым кофе для турки, произведенным в России. Более 26 лет мы производим кофе на собственном заводе, используя новейшее оборудование, чтобы вы могли каждый день открывать богатство общения за чашкой LEBO Coffee.
            </p>
            <!-- <p class="mb-4">
                В нашем блоге вы найдете разнообразные рецепты, советы по приготовлению, а также истории о том, как еда может объединять людей. Мы верим, что готовка - это не только процесс, но и искусство, которое требует любви и терпения.
            </p> -->
            <!-- <p class="mb-4">
                Присоединяйтесь к нам в этом увлекательном путешествии по миру кулинарии! Мы рады делиться с вами нашими знаниями и опытом, а также узнавать о ваших кулинарных приключениях.
            </p> -->
        </section>

        <section class="mt-10">
            <h2 class="text-3xl font-semibold mb-4">Наша команда</h2>
            <div class="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 class="text-xl font-bold">Доставка</h3>
                    <p>Каждый день у нас маршруты по всему большому сочи. Мы доставляем кофе в любой район города.</p>
                </div>
                <div class="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 class="text-xl font-bold">Заявки</h3>
                    <p>Мы оперативно обработаем вашу заявку и уже завтра она будет у вас.</p>
                </div>
                <div class="bg-gray-200 p-4 rounded-lg shadow">
                    <h3 class="text-xl font-bold">Оплата</h3>
                    <p>Предоставляем отсрочку платежа.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const route = useRoute()
useHead({
    title: 'О нас | Lebo'
})
</script>