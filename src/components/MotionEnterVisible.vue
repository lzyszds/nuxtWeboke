<!-- 视察dom 动画  （视野里有的元素 才执行动画） visibleOnce只执行一次-->

<script setup lang="ts">
const { delay, firstRenderNumber } = defineProps({
  delay: {
    type: Number,
    default: 50,
  },
  firstRenderNumber: {
    type: Number,
    default: 3,
  },
});
</script>
<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      y: 50,
    }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
    }"
    :delay="Math.min(delay, 250)"
    ref="animatedElement"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
