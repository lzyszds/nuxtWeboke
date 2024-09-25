<script setup lang='ts'>
import type { Comment } from '~/types/Comment'
import { timeAgo } from '~/uitls/common'
const comment = ref<Comment[]>([])
const { data, error } = await useFetch('/api/comment/getNewComment')

if (data.value) {
  comment.value = data.value.data
}
if (error.value) {
  console.log(error.value)
}

</script>

<template>
  <section
    class="sticky top-[310px] overflow-hidden mt-3 border-4 border-black bg-themeColor dark:border-white dark:bg-black rounded-2xl p-[5px]">
    <div
      class="border-[3px] h-11 mb-1 border-black p-1 px-2 rounded-xl bg-white dark:bg-black flex items-center justify-between">
      <div class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"></div>
      <div class="comment-title">最新评论</div>
      <div class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"></div>
    </div>
    <div
      class="border-[3px] opacity-0 h-11 mb-1 border-black p-1 px-2 rounded-xl  bg-white dark:bg-black flex gap-2 items-center justify-between "
      v-for="(item, index) in comment" :key="index" v-transition="['animate__backInRight', 'comment', index]">
      <img class="w-8 rounded-full" :src="'http://localhost:2024/static' + item.head_img" alt="" />
      <div class="flex-1">{{ item.content }}</div>
      <div>{{ timeAgo(item.create_date) }}</div>
    </div>
  </section>
  <!-- 最新评论 -->

</template>
