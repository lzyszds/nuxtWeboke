<script setup lang="ts">
const { aspect } = defineProps<{
  aspect?: "auto" | "square" | [number, number];
}>();

const aspectRatio = computed(() => {
  if (aspect === "auto") return ["", ""];
  else if (aspect === "square") return ["flex-1", "flex-1"];
  else if (Array.isArray(aspect)) return [`basis-${aspect[0]}/4`, `basis-${aspect[1]}/4`];
  else return ["", ""];
});
</script>

<template>
  <section <section
    class="flex flex-col lg:flex-row gap-4 border-4 border-black bg-themeColor dark:border-white dark:bg-black rounded-2xl p-2">
    <div class=" border-[3px] hidden lg:flex min-h-80 border-black rounded-xl bg-white dark:bg-black overflow-hidden"
      :class="aspectRatio[0]">
      <slot name="first"></slot>
    </div>
    <div class="border-[3px] border-black rounded-xl bg-white dark:bg-black overflow-hidden" :class="aspectRatio[1]">
      <slot name="second"></slot>
    </div>
  </section>
</template>
