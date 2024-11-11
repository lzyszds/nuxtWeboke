<script setup lang="ts">
import { timeAgo, numFormat } from "~/utils/common.js";
import type { ArticleDetail } from "~/types/Articles";
import type { Directory } from "~/types/Directory";

const mainContent = ref();
const windowY: any = inject("windowY");
const { requestData } = useRequestDataStore();
const details = computed(() => requestData.detailData);

const useDirectory = useDirectoryStore();

const countInfoArr = [
  {
    title: "发表时间",
    value: timeAgo(details.value.createDate),
    icon: "ic:baseline-access-time",
  },
  {
    title: "浏览量",
    value: numFormat(details.value.accessCount),
    icon: "ic:baseline-remove-red-eye",
  },
  {
    title: "评论数",
    value: numFormat(details.value.commentsCount),
    icon: "iconoir:chat-lines",
  },
];

// 滚动到指定标题
const scrollToElement = (item: Directory) => {
  const article = mainContent.value?.articleMain;
  const articleChild = article.querySelectorAll("h2,h3,h4");

  useDirectory.scrollEl?.scrollTo({ top: item.top + 200, behavior: "smooth" });

  articleChild.forEach(async (element: HTMLElement) => {
    if (element.id === item.id) {
      element.classList.add("animate__shakeX");
      await awaitTime(() => {
        element.classList.remove("animate__shakeX");
      }, 1000);
    }
  });
};
</script>

<template>
  <main v-observer-load ref="main">
    <!-- 文章头部 -->
    <header>
      <h1
        class="text-white font-dindin text-center mb-5 drop-shadow-[1px_5px_1px_#000]"
        style="font-size: clamp(0.7rem, 4vw, 3.5rem)"
      >
        {{ details.title }}
      </h1>
      <!-- 文章类型 -->
      <div class="border-2 border-themeColor px-2 bg-white rounded-md mx-auto w-fit mt-1">
        <span v-for="(item, index) in countInfoArr" :key="index">
          <LzyIcon :name="item.icon"></LzyIcon> {{ item.title }} {{ item.value }}
        </span>
        <span
          class="ml-1 bg-themeColor text-white border-1 border-black text-xs py-0.5 px-1 rounded-md"
          v-for="(item, index) in details.tags.split(',')"
          :key="index"
        >
          #{{ item }}
        </span>
      </div>
    </header>
    <!-- 文章主体 -->
    <section class="mt-5 grid gap-2 detailsSection">
      <div class="detailLeft">
        <ClientOnly>
          <Maincontent ref="mainContent" :main="details.main" :aid="details.aid" />
        </ClientOnly>
        <footer
          v-transition="'animate__bounceIn'"
          class="mt-2 p-1 rounded-xl text-base bg-themeColor border-4 border-black font-dindin text-white hover:underline"
        >
          <div class="text-center">
            <LzyIcon
              name="mdi:creative-commons"
              class="text-white align-text-top mr-1 pt-[18px]"
            />
            <a
              class="text-white"
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              >知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a
            >
          </div>
        </footer>
      </div>
      <Directory :windowY="windowY" @scrollToElement="scrollToElement" />
    </section>
  </main>
</template>

<style>
.bgLattice {
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#e0e0e0 1px, transparent 0),
    linear-gradient(90deg, #e0e0e0 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}

.detailsSection {
  grid-template-columns: calc(100% - 255px) 255px;
}
</style>
