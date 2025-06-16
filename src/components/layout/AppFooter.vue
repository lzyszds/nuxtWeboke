<script setup lang="ts">
const { data } = await useFetch("/api/system/getFooterInfo");
const footData = data.value.data.filter((item: any) => item != null);
</script>

<template>
  <div class="w-full m-auto overflow-hidden pt-20 bg-transparent">
    <div class="flex gap-20 justify-center mt-5">
      <div
        class="grid gap-2 grid-rows-[40px_1fr_1fr_1fr_1fr_1fr_1fr] text-xl"
        v-for="(items, index) in footData"
        :key="index"
      >
        <div class="flex place-content-center place-items-center">
          {{ items.name }}
        </div>
        <div v-for="(item, index) in items.children" :key="index">
          <!-- 打开新窗口 -->
          <a
            class="text-[#363636] dark:text-white text-sm"
            :href="item.url"
            target="_blank"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
    <div
      class="text-gray-600 dark:text-gray-300 p-4 mt-10 border-t-2 border-gray-200 dark:border-[#3F3F4B]"
    >
      <div class="mx-auto md:w-[1280px]">
        <p>© 2024-2025 by</p>
        <p class="text-sm">桂ICP备2024048390号</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
.container {
  width: 100%;
}
</style>
