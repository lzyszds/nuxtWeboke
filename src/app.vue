<template>
  <LzyLoading />
  <KeepAlive>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </KeepAlive>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
onMounted(() => {
  /* 请求拿到所有数据 */
})
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
