<script setup lang="ts">

const { getWeatherImage } = useWeatherStore()
const image_path = await getWeatherImage()
</script>

<template>
  <div class="loaderbody overflow-hidden z-[99999] fixed top-0 left-0 w-screen h-screen  ">
    <img class="h-96 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white " :src="image_path" alt="">
  </div>
</template>

<style scoped>
body.loading .loaderbody::before {
  transform: translate(-50%, -50%) scale(1.5);
}

.loaderbody::after  {
  top: 50%;
  left: 50%;
  content: "12341234";
  width: 2000px;
  height: 2000px;
  position: fixed;
  border-radius: 50%;
  background: var(--themeColor);
  transition: transform .5s cubic-bezier(0, 0, .5, 1.25);
  transform: translate(-50%, -50%) scale(0);
}

.loaderbody img {
  transition: opacity .3s, transform .5s cubic-bezier(.5, 0, .5, 1.5), visibility .3s;
}
</style>
