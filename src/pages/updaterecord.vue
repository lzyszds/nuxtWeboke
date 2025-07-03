<script lang="ts" setup>
const { requestData } = useRequestDataStore();
const data = requestData.aboutInfo;
</script>

<template>
  <div v-observer-load>更新记录页面</div>
</template>

<style></style>
