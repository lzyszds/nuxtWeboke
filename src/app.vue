<template>
  <LzyLoading />
  <KeepAlive>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </KeepAlive>
</template>

<script setup lang="ts">
const { initData } = useRequestDataStore();

initData(); // 初始化数据
const colorMode = useColorMode();

onBeforeMount(() => {
  watchEffect(() => {
    if (colorMode.preference === "dark") {
      document.documentElement.setAttribute("theme-mode", "dark");
    } else {
      document.documentElement.removeAttribute("theme-mode");
    }
  });
});
</script>
