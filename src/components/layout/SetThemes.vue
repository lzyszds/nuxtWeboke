<script setup lang="ts">
const colorMode = useColorMode();
const isDark = ref(useColorMode().preference === "dark");
</script>

<template>
  <div class="setThemes w-32 justify-center mt-1">
    <div class="toggleWrapper"></div>
  </div>
</template>

<style scoped>
.setThemes {
  width: 5rem;
}

.setThemes:hover .toggle:after {
  content: "";
  position: absolute;
  left: 50px;
  top: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  transform: rotate(90deg);
}

 
</style>
