<script setup lang='ts'>
import LzyIcon from './LzyIcon.vue';
const { data } = await useFetch("/api/system/getFooterInfo")
const footData = data.value.data.filter((item: any) => item != null)

const userInfo = [{
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}]
// console.log(`lzy  userInfo:`, userInfo)

</script>

<template>
  <div class="w-full m-auto overflow-hidden pt-5 bg-transparent">
    <div class="flex justify-center gap-12">
      <div class="w-6 h-6 flex place-content-center place-items-center bg-zinc-800 rounded-full"
        v-for="(item, index) in userInfo" :key="index">
        <LzyIcon :name="item.icon" height="25px" style="color: #fff;"></LzyIcon>
      </div>
    </div>
    <div class="flex gap-20 justify-center mt-5">
      <div class="column grid gap-2 grid-rows-[40px_1fr_1fr_1fr_1fr_1fr_1fr] text-xl " v-for="(items, index) in footData"
        :key="index">
        <div class="text-sm font-semibold mb-5 text-[#363636]">{{ items.footer_content }}</div>
        <div v-for="(item, index) in items.children" :key="index">
          <!-- 打开新窗口 -->
          <a class="text-[#363636] text-sm " :href="item.footer_url" target="_blank">{{ item.footer_content }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
