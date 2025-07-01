<script setup lang="ts">
const windowY = inject<Ref<number>>("windowY");
// const isOpenSet = ref(false); // 为了解决 禁用 SSR 水合检查（临时调试）
const colorMode = useColorMode(); // 使用 Nuxt Color Mode 来处理主题颜色
const themeValue = computed(() => colorMode.preference); // 获取当前主题值

// 浮动操作按钮
const quickToolsMethods = computed(() => {
  return [
    {
      name: "跟随系统",
      value: "system",
      icon: "iconoir:modern-tv",
      callback: () => {
        setTheme("system");
      },
    },
    {
      name: "浅色",
      value: "light",
      icon: "iconoir:sun-light",
      callback: () => {
        setTheme("light");
      },
    },
    {
      name: "深色",
      value: "dark",
      icon: "iconoir:half-moon",
      callback: () => {
        setTheme("dark");
      },
    },
    // {
    //   name: "设置",
    //   icon: "iconoir:settings",
    //   callback: () => {
    //     isOpenSet.value = !isOpenSet.value;
    //   },
    // },
    {
      name: "返回顶部",
      icon: "iconoir:rocket",
      callback: () => (windowY!.value = 0),
    },
  ];
});
function setTheme(value: string) {
  colorMode.preference = value;
  // 强制同步客户端状态
  if (import.meta.client) {
    document.documentElement.classList.toggle("dark", value === "dark");
  }
}

const toolbar = ref();

onMounted(() => {
  // isOpenSet.value = true; //  禁用 SSR 水合检查（临时调试）
});

defineExpose({ toolbar });
</script>

<template>
  <section
    ref="toolbar"
    class="fixed right-6 bottom-6 opacity-0 translate-x-10 z-50 p-2 grid gap-2"
  >
    <!-- <div v-for="(item, index) in quickToolsMethods">
      <LzyIcon :name="item.icon" size="20" :title="item.name" />
    </div> -->

    <Tooltip
      v-for="(item, index) in quickToolsMethods"
      :class="[
        'p-2 rounded-lg text-white bg-themeColor',
        item.value && themeValue === item.value
          ? 'bg-[var(--delColor)]'
          : 'bg-themeColor',
      ]"
      @click="item.callback"
      tooltipPosition="left"
      :tooltipText="item.name"
    >
      <LzyIcon :name="item.icon" size="20" :title="item.name" />
    </Tooltip>
  </section>
</template>

<style scoped></style>
