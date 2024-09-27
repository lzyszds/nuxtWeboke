<script setup lang="ts">
import { timeAgo, numFormat } from '~/utils/common.js';
import type { ArticleDetail } from '~/types/Articles';
import type { RequestResult } from '~/types/Result';

const route = useRoute()
console.log(route.params.id);
const { data, error } = await useFetch<RequestResult<ArticleDetail>>("/api/article/getArticleDetails?id=" + route.params.id)
const details = ref<ArticleDetail>(data.value!.data)

const countInfoArr = [
  { title: "发表时间", value: timeAgo(details.value.createDate), icon: "ic:baseline-access-time" },
  { title: "浏览量", value: numFormat(details.value.accessCount), icon: "ic:baseline-remove-red-eye" },
  { title: "评论数", value: numFormat(details.value.commentsCount), icon: "iconoir:chat-lines" },
]
onMounted(() => {
})

</script>

<template>
  <main v-observer-load>
    <header>
      <h1 class="text-white font-dindin text-center mb-5 drop-shadow-[1px_5px_1px_#000]"
        style="font-size: clamp(0.7rem, 4vw, 3.5rem);">
        {{ details.title }}
      </h1>
      <!-- 文章类型 -->
      <div class="border-2 border-themeColor px-2 bg-white rounded-md mx-auto w-fit mt-1">
        <span v-for="(item, index) in countInfoArr" :key="index">
          <LzyIcon :name="item.icon"></LzyIcon> {{ item.title }} {{ item.value }}
        </span>
        <span class="ml-1 bg-themeColor text-white border-1 border-black text-xs py-0.5 px-1 rounded-md"
          v-for="(item, index) in details.tags " :key="index">
          #{{ item }}
        </span>
      </div>
    </header>

    <section class="mt-5 grid gap-2 detailsSection">
      <ClientOnly>
        <Maincontent :main="details.main" :aid="details.aid" />
      </ClientOnly>
    </section>
  </main>
</template>

<style>
.bgLattice {
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#e0e0e0 1px, transparent 0), linear-gradient(90deg, #e0e0e0 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}

.detailsSection {
  grid-template-columns: calc(100% - 275px) 275px;
}
</style>
