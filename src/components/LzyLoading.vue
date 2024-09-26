<script setup lang="ts">
import { dayjs } from "element-plus";
import { gsap } from "gsap";
const { getWeatherImage } = useWeatherStore();
const image_path = await getWeatherImage();

const loadStore = useLoadingStore();

const loadImage = ref();

function calculateSunBrightness() {
  const now = dayjs();
  const hour = now.hour();
  const minute = now.minute();

  // 将当前时间转换为小数形式（例如：6:30 => 6.5）
  const currentTime = hour + minute / 60;

  if (currentTime >= 6 && currentTime <= 18) {
    // 白天时间：6:00 (0.1) 到 18:00 (1.0)
    return 0.1 + (currentTime - 6) * (0.9 / 12);
  } else if (currentTime > 18) {
    // 晚上时间：18:00 到午夜
    return 0.1 - (currentTime - 18) * (0.1 / 12);
  } else {
    // 午夜到早上 6:00
    return (currentTime + 6) * (0.1 / 12);
  }
}
</script>

<template>
  <div v-show="!loadStore.getLoading"
    class="loaderbody after:bg-light-background after:dark:bg-dark-background overflow-hidden z-[99999] fixed top-0 left-0 w-screen h-screen">
    <div class="mask mask-squircle z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <img class="h-96 bg-white text-white scale-105" :style="{ filter: `sepia(${calculateSunBrightness()})  ` }"
        :data-hour="calculateSunBrightness()" :src="image_path" alt="" />
    </div>
  </div>
</template>

<style scoped>
.loaderbody::after {
  top: 50%;
  left: 50%;
  content: "";
  width: 100vmax;
  height: 100vmax;
  position: fixed;
  transition: transform 0.5s cubic-bezier(0, 0, 0.5, 1.25);
  transform: translate(-50%, -50%) scale(1);
}

.loaderbody img {
  box-shadow: inset -20px 20px 207px 40px #000;
  transition: opacity 0.3s, transform 0.5s cubic-bezier(0.5, 0, 0.5, 1.5), visibility 0.3s;
}

.dark .loaderbody img {
  box-shadow: inset -20px 20px 167px 100px #999;
}
</style>
