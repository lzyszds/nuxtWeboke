import { defineStore } from "pinia";
import type { WeatherData } from "~/types/Weather";
import handleWeatherUrl from "~/uitls/weather";

export const useWeatherStore = defineStore(
  "weather",
  () => {
    const weatherData = ref<WeatherData>()
    const weather_image_path = ref<string>('')

    // 设置天气信息
    const setWeather = (data: WeatherData) => {
      weatherData.value = data
    }

    // 获取天气信息
    const getWeather = async () => {
      const { data, error } = await useFetch<WeatherData>('/api/toolkit/getWeather')
      if (error.value) {
        console.error(error)
        return
      }
      setWeather(data.value ?? {} as WeatherData)
    }

    // 根据天气信息 获取天气图片
    const getWeatherImage = async () => {
      await getWeather()
      if (!weatherData.value) return ''

      const formatted: any = useDateFormat(weatherData.value.reporttime, 'HH');
      const isdark = formatted >= 19 || formatted <= 6;
      let result = handleWeatherUrl({ ...weatherData.value }, isdark)
      return result;
    }

    return { weatherData, image_path: weather_image_path, getWeather, setWeather, getWeatherImage };
  },
  {
    // pinia数据持久化默认存储为cookie
    persist: true,
  }
);
