<script setup lang="ts">
import type { Comment } from "~/types/Comment";
import { timeAgo } from "~/utils/common";
const comment = ref<Comment[]>([]);
const { data, error } = await useFetch("/api/comment/getNewComment");

if (data.value) {
  comment.value = data.value.data;
}
if (error.value) {
  console.log(error.value);
}
console.log();

const baseUrl = useRuntimeConfig().public.VITE_BASE_URL
</script>

<template>
  <section
    class="overflow-hidden mt-3 border-4 border-black bg-themeColor dark:border-white dark:bg-black rounded-2xl p-[5px]"
  >
    <div
      class="border-[3px] h-11 mb-1 border-black p-1 px-2 rounded-xl bg-white dark:bg-black flex items-center justify-between"
    >
      <div class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"></div>
      <div class="comment-title">最新评论</div>
      <div class="h-5 w-5 bg-themeColor border-black border-[3px] rounded-full"></div>
    </div>
    <LzyEnterVisible
      class="border-[3px] opacity-0 h-11 mb-1 border-black p-1 px-2 rounded-xl bg-white dark:bg-black flex gap-2 items-center justify-between"
      v-for="(item, index) in comment"
      :index="index"
      animateClass="animate__bounceInRight"
      delay="200"
      maxDelay="100"
      firstRenderNumber="5"
    >
      <img class="w-8 rounded-full" :src="baseUrl + item.headImg" alt="" />
      <div class="flex-1">{{ item.content }}</div>
      <div>{{ timeAgo(item.createDate) }}</div>
    </LzyEnterVisible>
  </section>
  <!-- 最新评论 -->
</template>
