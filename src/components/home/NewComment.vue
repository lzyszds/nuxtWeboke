<script setup lang="ts">
import type { Comment } from "~/types/Comment";
import { timeAgo } from "~/utils/common";

const runtimeConfig = useRuntimeConfig(); // 获取 nuxt 的运行时配置

const comment = ref<Comment[]>([]);
onMounted(async () => {
  const { data } = await fetch("/nuxtApi/comment/getNewComment").then((res) => res.json());

  if (data) {
    comment.value = data;
  }
});

const baseUrl = useRuntimeConfig().public.BASE_URL;
</script>

<template>
  <section class="overflow-hidden mt-3 rounded-2xl p-[5px] shadow-sm border-[1px]">
    <div class="mb-1 p-1 px-2 rounded-xl flex items-center gap-1">
        <LzyIcon
          name="iconoir:bubble-upload"
          color="var(--lzy-text-color)"
          :style="{ color: 'var(--lzy-text-color)' }"
        />
      <div class="">最新评论</div>
      <div class="h-5 w-5 rounded-full"></div>
    </div>
    <LzyEnterVisible
      class="opacity-0 p-1 px-2 text-sm rounded-xl flex gap-1 items-center justify-between"
      v-for="(item, index) in comment"
      :index="index"
      animateClass="animate__bounceInRight"
      delay="200"
      maxDelay="100"
      firstRenderNumber="5"
    >
      <img class="w-8 rounded-full" :src="baseUrl + item.headImg" alt="" />
      <div :title="item.content" class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">{{ item.content }}</div>
      <div>{{ timeAgo(item.createDate) }}</div>
    </LzyEnterVisible>
  </section>
  <!-- 最新评论 -->
</template>
