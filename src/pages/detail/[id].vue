<script setup lang="ts">
import { timeAgo, numFormat } from '~/utils/common.js';
import type { Article } from '~/types/Articles';
import type { RequestResult } from '~/types/Result';

const route = useRoute()
console.log(route.params.id);
const { data, error } = await useFetch<RequestResult<Article>>("/api/article/getArticleDetails?id=" + route.params.id)
const details = ref<Article>(data.value!.data)

const countInfoArr = [
  { title: "发表时间", value: details.value.createDate, icon: "ic:baseline-access-time" },
  { title: "浏览量", value: details.value.accessCount, icon: "ic:baseline-remove-red-eye" },
  { title: "评论数", value: details.value.commentsCount, icon: "iconoir:chat-lines" },
]
onMounted(() => {
})  

</script>

<template>
  <main v-observer-load>
    <section>
      <h1 class="text-white font-dindin text-center mb-5 drop-shadow-[1px_5px_1px_#000]"
        style="font-size: clamp(0.7rem, 4vw, 3.5rem);">{{ details.title }}</h1>
      <p style="font-size: 15px;">
        <span v-for="(item, index) in countInfoArr" :key="index">
          <LzyIcon :name="item.icon"></LzyIcon> {{ item.title }} {{ timeAgo(item.value) }}
        </span>
      </p>
      <!-- 文章类型 -->
      <div class="tags">
        文章分类：
        <span class="mr-1 taglzy" v-for="(item, index) in details.tags " :key="index">
          {{ item }}
        </span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.bgLattice {
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#e0e0e0 1px, transparent 0), linear-gradient(90deg, #e0e0e0 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}
</style>
