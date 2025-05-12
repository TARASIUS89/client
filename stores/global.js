import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    block1: false,
    block2: false,
    seo: {
      metaTitle: '',
      metaDescription: '',
    },
    settings: {},
  }),

  actions: {
    async fetchGlobalSettings() {
      try {
        const { data } = await useFetch('http://localhost:1337/api/global?populate=*', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt') || ''}`
          }
        })

        if (data.value?.data) {
          this.settings = data.value.data
          this.block1 = data.value.data.block1 || false
          this.block2 = data.value.data.block2 || false
          this.seo = data.value.data.seo || {}
        }
      } catch (error) {
        console.error('Ошибка при загрузке глобальных настроек:', error)
      }
    },

    async updateBlockVisibility(blockName, value) {
      try {
        const token = localStorage.getItem('jwt')
        if (!token) {
          throw new Error('Токен авторизации не найден')
        }

        await useFetch('http://localhost:1337/api/global', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: {
            data: {
              [blockName]: value
            }
          }
        })

        // Обновляем локальное состояние
        this[blockName] = value
      } catch (error) {
        console.error('Ошибка при обновлении видимости блока:', error)
        throw error
      }
    }
  }
}) 