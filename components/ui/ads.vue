<template>
    <div  class="w-full h-0">
        <NuxtLink to="#">
            <!-- <img src="~C:\Users\User\Documents\www\client\public\all-08_2-2000x931.jpg" alt="Craftum"> -->
            
        </NuxtLink>
        
    </div>
</template>


<script setup>
const view = ref(true)

onMounted(() => {
    setInterval(() => {
        view.value = !view.value
    }, 150000) // 2,5 минуты в миллисекундах
})
</script>