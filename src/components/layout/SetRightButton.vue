<script setup lang="ts">
const windowY = inject<Ref<number>>("windowY");
const isOpenSet = ref(false); // 是否开启多种背景颜色设置
const funcOption = [
  {
    name: "设置",
    icon: "iconoir:settings",
    callback: () => {
      isOpenSet.value = !isOpenSet.value;
    },
  },
  {
    name: "返回顶部",
    icon: "iconoir:rocket",
    callback: () => (windowY!.value = 0),
  },
];

const bgThemeOption = [
  {
    name: "方格纸",
    colorClass: "bg-gridThemeColor",
    icon: "iconoir:cell-2x2",
    color: "#fff",
  },
  {
    name: "纯色",
    colorClass: "bg-solidThemeColor",
    icon: "iconoir:web-window",
    color: "#fff",
  },
  {
    name: "牛皮纸",
    colorClass: "bg-paperThemeColor",
    icon: "iconoir:notes",
    color: "#ffe6cccc",
  },
];

function setTheme(colorClass: string) {
  /* 先检查 当前的classname是什么，就删除 */
  document
    .querySelector(".bgLattice")
    ?.classList.remove(...bgThemeOption.map((item) => item.colorClass));
  document.querySelector(".bgLattice")?.classList.add(colorClass);
}

const toolbar = templateRef("toolbar");
const barTheme = templateRef("barTheme");
defineExpose({ toolbar, barTheme, isOpenSet });
</script>

<template>
  <section
    ref="toolbar"
    class="fixed right-6 bottom-6 opacity-0 translate-x-8 z-50 p-2 grid gap-2"
  >
    <button
      v-for="(item, index) in bgThemeOption"
      class="p-2 pb-0 bg-themeColor rounded-lg opacity-0 translate-x-8"
      :title="item.name"
      :style="{ color: item.color }"
      ref="barTheme"
      @click="setTheme(item.colorClass)"
    >
      <LzyIcon :name="item.icon" size="20" :title="item.name" />
    </button>

    <button
      v-for="item in funcOption"
      class="p-2 pb-0 bg-themeColor text-white rounded-lg"
      @click="item.callback"
    >
      <LzyIcon :name="item.icon" size="20" :title="item.name" />
    </button>
  </section>
</template>

<style scoped></style>
