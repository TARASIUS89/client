<template>
  <!-- компонент регистрации -->
  <section class="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] flex items-center">
    <div class="flex flex-col items-center justify-center px-4 py-8 mx-auto w-full max-w-xl">
      <div class="w-full p-6 sm:p-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Регистрация
          </h2>
          <NuxtLink 
            to="/profile" 
            @click="index.authToggle = false"
            class="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Уже есть аккаунт? Войти
          </NuxtLink>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
          <!-- Имя пользователя -->
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Имя пользователя
            </label>
            <input 
              v-model="userForma.username" 
              type="text" 
              name="username" 
              id="username" 
              :class="[
                'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500',
                errors.username ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Введите имя пользователя" 
              required
              @input="validateUsername"
              autocomplete="username"
            >
            <p v-if="errors.username" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.username }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
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

          <!-- Пароль -->
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Пароль
            </label>
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
                autocomplete="new-password"
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                :title="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
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
            <div class="mt-2">
              <div class="flex items-center space-x-2">
                <div 
                  v-for="(requirement, index) in passwordRequirements" 
                  :key="index"
                  class="flex items-center text-sm"
                  :class="requirement.met ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'"
                >
                  <svg v-if="requirement.met" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {{ requirement.text }}
                </div>
              </div>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.password }}</p>
          </div>

          <!-- Подтверждение пароля -->
          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Подтверждение пароля
            </label>
            <div class="relative">
              <input 
                v-model="confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                name="confirm-password" 
                id="confirm-password" 
                :class="[
                  'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500',
                  errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                ]"
                placeholder="••••••••" 
                required
                @input="validateConfirmPassword"
                autocomplete="new-password"
              >
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                :title="showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'"
              >
                <svg v-if="showConfirmPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Чекбокс с правилами -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                v-model="termsAccepted"
                type="checkbox" 
                :class="[
                  'w-4 h-4 border rounded focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800',
                  errors.terms ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                ]"
                required
                @change="validateTerms"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                Я принимаю 
                <NuxtLink to="/terms" class="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  правила и условия
                </NuxtLink>
                и даю согласие на обработку персональных данных
              </label>
              <p v-if="errors.terms" class="mt-1 text-sm text-red-600 dark:text-red-500">{{ errors.terms }}</p>
            </div>
          </div>

          <!-- Кнопка регистрации -->
          <button 
            type="submit" 
            :disabled="isLoading || !isFormValid"
            class="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Регистрация...' : 'Создать аккаунт' }}
          </button>

          <!-- Сообщение об ошибке -->
          <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500 text-center">{{ error }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const index = useIndexStore();
const userForma = ref({
  username: '',
  email: '',
  password: ''
})
const confirmPassword = ref('')
const termsAccepted = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

// Требования к паролю
const passwordRequirements = computed(() => [
  {
    text: 'Минимум 8 символов',
    met: userForma.value.password.length >= 8
  },
  {
    text: 'Минимум 1 цифра',
    met: /\d/.test(userForma.value.password)
  },
  {
    text: 'Минимум 1 буква',
    met: /[a-zA-Z]/.test(userForma.value.password)
  },
  {
    text: 'Минимум 1 спецсимвол',
    met: /[!@#$%^&*(),.?":{}|<>]/.test(userForma.value.password)
  }
])

const validateUsername = () => {
  if (!userForma.value.username) {
    errors.value.username = 'Имя пользователя обязательно'
  } else if (userForma.value.username.length < 3) {
    errors.value.username = 'Имя пользователя должно быть не менее 3 символов'
  } else if (!/^[a-zA-Z0-9_]+$/.test(userForma.value.username)) {
    errors.value.username = 'Имя пользователя может содержать только буквы, цифры и знак подчеркивания'
  } else {
    errors.value.username = ''
  }
}

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
  } else if (userForma.value.password.length < 8) {
    errors.value.password = 'Пароль должен быть не менее 8 символов'
  } else if (!/\d/.test(userForma.value.password)) {
    errors.value.password = 'Пароль должен содержать хотя бы одну цифру'
  } else if (!/[a-zA-Z]/.test(userForma.value.password)) {
    errors.value.password = 'Пароль должен содержать хотя бы одну букву'
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userForma.value.password)) {
    errors.value.password = 'Пароль должен содержать хотя бы один спецсимвол'
  } else {
    errors.value.password = ''
  }
  if (confirmPassword.value) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Подтверждение пароля обязательно'
  } else if (confirmPassword.value !== userForma.value.password) {
    errors.value.confirmPassword = 'Пароли не совпадают'
  } else {
    errors.value.confirmPassword = ''
  }
}

const validateTerms = () => {
  errors.value.terms = termsAccepted.value ? '' : 'Необходимо принять правила и условия'
}

const isFormValid = computed(() => {
  return !Object.values(errors.value).some(error => error) && 
         userForma.value.username &&
         userForma.value.email && 
         userForma.value.password && 
         confirmPassword.value && 
         termsAccepted.value &&
         passwordRequirements.value.every(req => req.met)
})

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    await registr()
  } catch (err) {
    error.value = err.message || 'Произошла ошибка при регистрации'
  } finally {
    isLoading.value = false
  }
}

const registr = async () => {
  try {
    const response = await $fetch(`https://lebo-sochi.ru/admin/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: userForma.value.username,
        email: userForma.value.email,
        password: userForma.value.password
      },
    });

    const data = await response;
    localStorage.setItem('jwt', data.jwt);
    index.authToggle = false;
    
    // Показываем уведомление об успешной регистрации
    const toast = useToast()
    toast.success('Регистрация успешно завершена!')
    
  } catch (err) {
    if (err.data?.error?.message) {
      throw new Error(err.data.error.message)
    }
    throw new Error('Ошибка при регистрации')
  }
}

// Автоматическая валидация при изменении полей
watch(() => userForma.value.username, validateUsername)
watch(() => userForma.value.email, validateEmail)
watch(() => userForma.value.password, validatePassword)
watch(() => confirmPassword.value, validateConfirmPassword)
watch(() => termsAccepted.value, validateTerms)
</script>

<style scoped>
/* Улучшаем отзывчивость кнопок */
button:not(:disabled) {
  transition: all 0.2s ease-in-out;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Улучшаем доступность для клавиатуры */
button:focus-visible,
input:focus-visible {
  outline: 2px solid rgb(6 182 212);
  outline-offset: 2px;
}

/* Улучшаем отображение длинных текстов */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Улучшаем доступность для скринридеров */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>