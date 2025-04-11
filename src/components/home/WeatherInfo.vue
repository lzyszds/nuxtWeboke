<script setup lang="ts">
import dayjs from "dayjs";

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
  return date.format("HH:mm");
};
</script>

<template>
  <section class="rounded-2xl p-4 shadow-sm border-[1px] grid grid-cols-2 text-center">
      <p class="text-sm select-none" :title="ip">{{ province }} {{ city }}</p>
      <span class="underline underline-offset-1 ml-2 select-all text-xs">
        {{ ip }}
      </span>
      <div class="text-center"> 
        <img
          class="drop-shadow-[1px_2px_4px_#333] w-24 h-24 m-auto"
          style="object-fit: contain"
          :src="image_path"
        />

        <p class="text-3xl font-semibold text-center  font-mono">
          {{ temperature }}°C
        </p>
      </div>
      <div class="grid grid-rows-5 ml-6">
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
  </section>
</template>

<style scoped></style>
