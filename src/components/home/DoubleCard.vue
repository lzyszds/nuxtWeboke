<script setup lang="ts">
interface Props {
  aspect?: "auto" | "square" | [number, number];
}
const { aspect } = defineProps<Props>();

const aspectRatio = computed(() => {
  if (aspect === "auto") return ["", ""];
  else if (aspect === "square") return ["flex-1", "flex-1"];
  else if (Array.isArray(aspect)) return [`basis-${aspect[0]}/4`, `basis-${aspect[1]}/4`];
  else return ["", ""];
});
</script>

<template>
  <section class="flex flex-col lg:flex-row gap-2 max-h-80 rounded-2xl p-2">
    <div class="hidden lg:flex rounded-xl overflow-hidden shadow-sm border-[1px]"  :class="aspectRatio[0]">
      <slot name="first"></slot>
    </div>
    <div class="rounded-xl overflow-hidden shadow-lg border-[1px]" :class="aspectRatio[1]">
      <slot name="second"></slot>
    </div>
  </section>
</template>
