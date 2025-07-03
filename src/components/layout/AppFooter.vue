<script setup lang="ts">
const { data } = await useFetch("/api/system/getFooterInfo");
const footData = data.value.data.filter((item: any) => item != null);

const footerTools = [
  {
    name: "关于本站",
    link: "/about",
    hasOpener: false,
  },
  {
    name: "更新记录",
    link: "/updaterecord",
    hasOpener: false,
  },
  {
    name: "举报与反馈",
    link: "https://wj.qq.com/s2/23050642/a8d7",
    hasOpener: true,
  },
];
</script>

<template>
  <div class="w-full m-auto overflow-hidden pt-20 bg-transparent">
    <div class="flex lg:gap-20 gap-5 justify-center mt-5">
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
      class="text-gray-600 dark:text-gray-300 p-4 lg:mt-10 border-t-2 border-gray-200 dark:border-[#3F3F4B]"
    >
      <div class="mx-auto md:w-[1280px] grid grid-cols-2">
        <section class="">
          <p>© 2024-2025 by</p>
          <p class="text-sm">
            <span class="flex items-center gap-1 text-[#796c48]">
              <img
                src="https://lzyszds.cn/pictureBedImage/OD_GgmVaH3m9_vJW_BIQ7J1AGKkos0uNFJWxWGN3EkE_gAA"
                alt=""
                width="14"
              />
              桂公网安备45010002450949号 桂ICP备2024048390号
            </span>
          </p>
        </section>

        <section class="flex justify-end items-center gap-2">
          <div v-for="item in footerTools" :key="item.name">
            <RouterLink :to="item.link" v-if="!item.hasOpener">
              <span
                class="text-[#363636] dark:text-white text-sm hover:bg-themeColor hover:text-white px-2 py-1 rounded-xl transition-all duration-300"
              >
                {{ item.name }}
              </span>
            </RouterLink>

            <a
              href="https://wj.qq.com/s2/23050642/a8d7/"
              target="_blank"
              class="text-[#363636] dark:text-white text-sm hover:bg-themeColor hover:text-white px-2 py-1 rounded-xl transition-all duration-300"
              v-else
            >
              {{ item.name }}
            </a>
          </div>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
            target="_blank"
            class="text-[#363636] dark:text-white text-sm hover:bg-themeColor hover:text-white px-2 py-1 rounded-xl transition-[background] duration-300"
          >
            <LzyIcon name="ri:creative-commons-line" preset="lg" />
            <LzyIcon name="ri:creative-commons-by-line" preset="lg" />
            <LzyIcon name="ri:creative-commons-nc-line" preset="lg" />
            <LzyIcon name="ri:creative-commons-sa-line" preset="lg" />
          </a>
        </section>
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
