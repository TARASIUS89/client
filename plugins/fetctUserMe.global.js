import { useIndexStore } from '@/stores/index' // Убедитесь, что путь к вашему store правильный

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.client) return; // Проверяем, что код выполняется на клиенте

  const indexStore = useIndexStore();

  // Вызываем fetchUser Me при инициализации приложения
  await indexStore.fetchUserMe();
});