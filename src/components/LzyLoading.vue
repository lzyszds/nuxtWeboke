<script setup lang="ts">
import { dayjs } from "element-plus";
import { gsap } from "gsap";
const { getWeatherImage } = useWeatherStore();
const image_path = await getWeatherImage();

const loadStore = useLoadingStore();

const loadImage = ref();


const getNowTime = () => {
  const time = dayjs().format("HH:mm")
  const hour = parseInt(time.split(":")[0]!);
  //06点到18点之间为白天，18点到8点之间为黑夜 
  //06点到12点的时候为 0.1-1
  if (hour >= 6 && hour < 12) {
    return 0.1 + (hour - 6) / 12;
  } else if (hour >= 12 && hour <= 18) {
    return (hour - 12) / 12;
  } else if (hour > 18) {
    return 1.5 - Math.abs((hour - 8) / 10)
  } else {
    return 0
  }

}
</script>

<template>
  <div v-show="!loadStore.getLoading"
    class="loaderbody after:bg-light-background after:dark:bg-dark-background overflow-hidden z-[99999] fixed top-0 left-0 w-screen h-screen">
    <div class="mask mask-squircle overflow-hidden absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <img class="h-96 bg-white text-white scale-105" :style="{ filter: `sepia(${getNowTime()})  ` }"
        :data-hour="getNowTime()" :src="image_path" alt="" />
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

.mask {
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.mask-squircle {
  -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==);
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==);
}
</style>
