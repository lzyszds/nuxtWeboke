<script setup lang="ts" name="lzyIcon">
interface Props {
  name: string;
  size?: string;
  style?: string | Object;
  animation?: string;
  title?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <Icon
    class="lzyIcon"
    :class="props.animation"
    :name="name"
    :size="props.size"
    :style="props.style"
    :title="props.title"
  ></Icon>
</template>

<style scoped>
.lzyIcon {
  cursor: pointer;
}

.animate__pulse {
  animation: pulse 3s infinite;
}

.animate__rubberBand {
  animation: rubberBand 3s infinite;
}

.animate__heartBeat {
  animation: heartBeat 1s infinite;
}
</style>
