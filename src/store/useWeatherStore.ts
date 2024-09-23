import { defineStore } from "pinia";
import type { WeatherData } from "~/types/Weather";
import handleWeatherUrl from "~/uitls/weather";

// 导出一个名为useWeatherStore的状态管理器，用于处理和存储与天气相关的信息
export const useWeatherStore = defineStore(
  "weather", // 状态管理器的唯一标识符
  () => {
    // 定义一个响应式变量，用于存储天气数据
    const weatherData = ref<WeatherData>()
    // 定义一个响应式变量，用于存储天气图片的路径
    const weather_image_path = ref<string>('')

    /**
     * 设置天气信息
     * @param data - 要设置的天气数据
     */
    const setWeather = (data: WeatherData) => {
      weatherData.value = data
    }

    /**
     * 异步获取天气信息
     * 通过调用API获取最新的天气数据，并更新内部状态
     */
    const getWeather = async () => {
      const { data, error } = await useFetch<WeatherData>('/api/toolkit/getWeather')
      if (error.value) {
        console.error(error)
        return
      }
      setWeather(data.value ?? {} as WeatherData)
    }

    /**
     * 根据天气信息获取天气图片的路径
     * 该方法首先尝试获取最新的天气信息，然后根据天气状况和时间决定显示哪张图片
     * @returns 天气图片的路径字符串，如果未能获取天气信息则返回空字符串
     */
    const getWeatherImage = async () => {
      await getWeather()
      if (!weatherData.value) return ''

      const formatted: any = useDateFormat(weatherData.value.reporttime, 'HH');
      const isdark = formatted >= 19 || formatted <= 6;
      let result = handleWeatherUrl({ ...weatherData.value }, isdark)
      return result;
    }

    // 返回状态管理器的公共接口，包括天气数据、图片路径以及操作这些数据的方法
    return { weatherData, image_path: weather_image_path, getWeather, setWeather, getWeatherImage };
  },
  {
    // 配置状态管理器的数据持久化，默认存储为cookie
    persist: true,
  }
);
