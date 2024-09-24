<script setup lang="ts">
import { gsap } from "gsap";
const { getWeatherImage } = useWeatherStore();
const image_path = await getWeatherImage();

const { loading } = useLoadingStore();
const loadImage = ref();
onMounted(() => {
  // 设置初始阴影
  gsap.set(loadImage.value, {
    boxShadow: "inset -20px 20px 167px 100px rgba(0,0,0,0.5)",
  });

  // 创建闪烁动画
  gsap.to(loadImage.value, {
    boxShadow: "inset -20px -10px 80px 100px rgba(0,0,0,1)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});
</script>

<template>
  <div
    v-show="!loading"
    class="loaderbody after:bg-light-background after:dark:bg-dark-background overflow-hidden z-[99999] fixed top-0 left-0 w-screen h-screen"
  >
    <div
      class="mask mask-squircle overflow-hidden absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <img
        ref="loadImage"
        class="h-96 bg-white text-white scale-105"
        :src="image_path"
        alt=""
      />
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
  box-shadow: inset -20px 20px 167px 100px #000;
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
