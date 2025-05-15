<template>
    <Teleport to="body">
        <transition name="modal-fade">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Затемнение фона -->
                <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
                
                <!-- Модальное окно -->
                <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden transform transition-all">
                    <!-- Содержимое модального окна -->
                    <div class="p-6 text-center">
                        <!-- Иконка успеха -->
                        <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-5">
                            <svg class="w-10 h-10 text-green-500 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <!-- Заголовок и текст -->
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Заказ успешно оформлен!
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-6">
                            Спасибо за ваш заказ! Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.
                        </p>
                        
                        <!-- Кнопка возврата в магазин -->
                        <NuxtLink to="/shop" class="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            Вернуться в магазин
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
    emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    opacity: 1;
}
</style> 