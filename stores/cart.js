import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isLoading: false,
        lastAddedItem: null
    }),

    getters: {
        totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
        isInCart: (state) => (productId) => state.items.some(item => item.id === productId),
        getItemQuantity: (state) => (productId) => {
            const item = state.items.find(item => item.id === productId)
            return item ? item.quantity : 0
        }
    },

    actions: {
        // Инициализация корзины из localStorage
        initCart() {
            if (process.client) {
                const savedCart = localStorage.getItem('cart')
                if (savedCart) {
                    this.items = JSON.parse(savedCart)
                }
            }
        },

        // Добавление товара в корзину
        addToCart(product, quantity = 1) {
            const existingItem = this.items.find(item => item.id === product.id)
            
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    cover: product.cover,
                    quantity: quantity
                })
            }

            this.lastAddedItem = product
            this.saveCart()
            this.showNotification('Товар добавлен в корзину')
        },

        // Удаление товара из корзины
        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId)
            this.saveCart()
            this.showNotification('Товар удален из корзины')
        },

        // Обновление количества товара
        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(productId)
                } else {
                    item.quantity = quantity
                    this.saveCart()
                }
            }
        },

        // Очистка корзины
        clearCart() {
            this.items = []
            this.saveCart()
            this.showNotification('Корзина очищена')
        },

        // Сохранение корзины в localStorage
        saveCart() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.items))
                // Вызываем событие для обновления счетчика в других компонентах
                window.dispatchEvent(new Event('cartUpdated'))
            }
        },

        // Показ уведомления
        showNotification(message) {
            if (process.client) {
                // Здесь можно добавить интеграцию с системой уведомлений
                console.log(message)
            }
        }
    }
}) 