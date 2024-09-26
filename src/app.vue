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
const { y } = useWindowScroll()
onMounted(() => {
  watchEffect(() => {
    console.log(y.value);
  })
})
onBeforeMount(() => {
  watchEffect(() => {
    console.log(y.value);
    if (colorMode.preference === "dark") {
      document.documentElement.setAttribute("theme-mode", "dark");
    } else {
      document.documentElement.removeAttribute("theme-mode");
    }
  });
});
</script>
