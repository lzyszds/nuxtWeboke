import { useWeatherStore } from '~/store/useWeatherStore.js'

export default defineNuxtPlugin(async (nuxtApp) => {
  const weatherStore = useWeatherStore()

  // 在应用启动之前加载天气数据
  await weatherStore.getWeatherImage()
})
