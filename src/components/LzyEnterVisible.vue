<script setup lang="ts">
// 定义组件的属性
const props = defineProps({
  // 指定动画的索引，用于控制动画的顺序
  index: {
    type: Number,
    default: 0,
  },
  // 动画的CSS类名，控制动画效果
  animateClass: {
    type: String,
    default: "animate__fadeInUp", // 默认动画效果为淡入并向上移动
  },
  // 动画的延迟时间，单位为毫秒
  delay: {
    type: String,
    default: "50", // 默认延迟50毫秒
  },
  // 动画的最大延迟时间，确保动画在指定时间内开始
  maxDelay: {
    type: String,
    default: "10", // 默认最大延迟为10毫秒
  },
  // 首次渲染时显示的dom数量
  firstRenderNumber: {
    type: String,
    default: "3", // 默认首次渲染显示3个
  },
  target: {
    type: String,
    default: "div",
  },
});
</script>

<template>
  <component :is="props.target" class="opacity-0" v-transition="props">
    <slot></slot>
  </component>
</template>
