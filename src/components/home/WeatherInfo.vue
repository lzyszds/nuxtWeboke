<script setup lang="ts">
import dayjs from 'dayjs';

const { weatherData, image_path } = useWeatherStore();
const {
  province,
  city,
  ip,
  weather,
  temperature,
  winddirection,
  windpower,
  humidity,
  reporttime,
} = weatherData!;
const formatTime = (time: string) => {
  const date = dayjs(time);
  return date.format('HH:mm');
};
</script>

<template>
  <section
    class="border-4 border-black bg-themeColor dark:border-white dark:bg-dark-background rounded-2xl p-[5px]"
  >
    <div
      class="border-[3px] h-11 mb-1 text-center border-black p-1 px-2 rounded-xl bg-white dark:bg-[#333] flex items-center justify-between"
    >
      <div
        class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"
      ></div>

      <p class="text-sm select-none" :title="ip">
        {{ province }} {{ city }}
      </p>
      <span class="underline underline-offset-1 ml-2 select-all text-xs">
        {{ ip }}
      </span>
      <div
        class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"
      ></div>
    </div>
    <div
      class="border-[3px] border-black p-2 select-none rounded-xl bg-white dark:bg-dark-background grid grid-cols-2"
    >
      <div>
        <img
          class="drop-shadow-[1px_2px_4px_#333] w-24 h-24"
          style="object-fit: contain"
          :src="image_path"
        />

        <p
          class="text-themeColor dark:text-white text-3xl font-semibold text-center pr-8 font-mono"
        >
          {{ temperature }}°C
        </p>
      </div>
      <div class="grid grid-rows-5">
        <span class="flex place-items-center text-sm border-b-[1px]">
          💡 天气：{{ weather }}
        </span>
        <span class="flex place-items-center text-sm border-b-[1px]">
          🏳️ 风向：{{ winddirection }}
        </span>
        <span class="flex place-items-center text-sm border-b-[1px]">
          💨 风力：{{ windpower }}级
        </span>
        <span class="flex place-items-center text-sm border-b-[1px]">
          💧 湿度：{{ humidity }}%
        </span>
        <span class="flex place-items-center text-sm border-b-[1px]">
          ⏰ 更新：{{ formatTime(reporttime) }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
