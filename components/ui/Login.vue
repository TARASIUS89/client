<template>
    <!-- компонент авторизации -->
    <section class="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] flex items-center">
    <div class="flex flex-col items-center justify-center px-4 py-8 mx-auto w-full max-w-md">
        <div class="w-full p-4 sm:p-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <h2 class="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Авторизация
            </h2>
            <form @submit.prevent="handleSubmit" class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш email</label>
                    <input 
                        v-model="userForma.email" 
                        type="email" 
                        name="email" 
                        id="email" 
                        :class="[
                            'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500',
                            errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        ]"
                        placeholder="name@company.com" 
                        required
                        @input="validateEmail"
                        autocomplete="email"
                    >
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.email }}</p>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                    <div class="relative">
                        <input 
                            v-model="userForma.password" 
                            :type="showPassword ? 'text' : 'password'" 
                            name="password" 
                            id="password" 
                            :class="[
                                'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500',
                                errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                            ]"
                            placeholder="••••••••" 
                            required
                            @input="validatePassword"
                            autocomplete="current-password"
                        >
                        <button 
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>
                    <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.password }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input 
                                id="remember" 
                                v-model="rememberMe"
                                type="checkbox" 
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Запомнить меня</label>
                        </div>
                    </div>
                    <a href="#" class="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">Забыли пароль?</a>
                </div>
                <button 
                    type="submit" 
                    :disabled="isLoading || !isFormValid"
                    class="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isLoading ? 'Вход...' : 'Войти' }}
                </button>
                <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500 text-center">{{ error }}</p>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                    Нет аккаунта? 
                    <NuxtLink 
                        to="/profile" 
                        @click="index.authToggle = true"
                        class="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                        Зарегистрироваться
                    </NuxtLink>
                </p>
            </form>
        </div>
    </div>
    </section>
</template>


<script setup>
    const index = useIndexStore();
    const userForma = ref({
        email: '',
        password: ''
    })
    const rememberMe = ref(false)
    const showPassword = ref(false)
    const isLoading = ref(false)
    const error = ref('')
    const errors = ref({
        email: '',
        password: ''
    })

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!userForma.value.email) {
            errors.value.email = 'Email обязателен'
        } else if (!emailRegex.test(userForma.value.email)) {
            errors.value.email = 'Введите корректный email'
        } else {
            errors.value.email = ''
        }
    }

    const validatePassword = () => {
        if (!userForma.value.password) {
            errors.value.password = 'Пароль обязателен'
        } else {
            errors.value.password = ''
        }
    }

    const isFormValid = computed(() => {
        return !Object.values(errors.value).some(error => error) && 
               userForma.value.email && 
               userForma.value.password
    })

    const handleSubmit = async () => {
        if (!isFormValid.value) return
        
        isLoading.value = true
        error.value = ''
        
        try {
            await index.login(userForma.value)
            
            // Если выбрано "Запомнить меня", сохраняем email
            if (rememberMe.value) {
                localStorage.setItem('rememberedEmail', userForma.value.email)
            } else {
                localStorage.removeItem('rememberedEmail')
            }
            
            // Показываем уведомление об успешном входе
            const toast = useToast()
            toast.success('Вход выполнен успешно!')
            
        } catch (err) {
            error.value = err.message || 'Ошибка при входе'
        } finally {
            isLoading.value = false
        }
    }

    // При монтировании компонента проверяем, есть ли сохраненный email
    onMounted(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail')
        if (rememberedEmail) {
            userForma.value.email = rememberedEmail
            rememberMe.value = true
        }
    })
</script>