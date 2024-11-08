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
    icon: "iconoir:alarm",
  },
  {
    title: "浏览量",
    value: numFormat(details.value.accessCount),
    icon: "iconoir:fire-flame",
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
        class="text-themeColor font-semibold font-dindin text-center mb-5 drop-shadow-[1px_5px_1px_#000]"
        style="font-size: clamp(0.7rem, 4vw, 3.5rem)"
      >
        {{ details.title }}
      </h1>
      <!-- 文章类型 -->
      <div
        class="flex gap-2 font-dindin p-1 px-2 bg-white dark:bg-dark-background rounded-md mx-auto w-fit mt-1"
      >
        <span
          class="flex text-sm place-content-center place-items-center"
          v-for="(item, index) in countInfoArr"
          :key="index"
        >
          <LzyIcon :title="item.title" size="16" :name="item.icon"></LzyIcon>
          {{ item.value }}
        </span>
        <span
          class="bg-themeColor text-white border-1 border-black text-xs p-1 rounded-md"
          v-for="(item, index) in details.tags"
          :key="index"
        >
          #{{ item }}
        </span>
      </div>
    </header>
    <!-- 文章主体 -->
    <section class="mt-5 grid gap-2 grid-cols-1 lg:grid-cols-[calc(100%-255px)_255px]">
      <div class="flex flex-col gap-3">
        <ClientOnly>
          <DetailMaincontent ref="mainContent" :main="details.main" :aid="details.aid" />
        </ClientOnly>
        <footer
          v-transition="'animate__fadeInUp'"
          class="p-1 rounded-xl text-base bg-themeColor border-4 border-black font-dindin text-white hover:underline"
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
        <DetailPostComment />
      </div>
      <DetailDirectory :windowY="windowY" @scrollToElement="scrollToElement" />
    </section>
  </main>
</template>

<style>
.bgLattice {
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#e0e0e0 1px, transparent 0),
    linear-gradient(87deg, #e0e0e0 1px, transparent 0),
    linear-gradient(96deg, #8077ff 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}

.dark .bgLattice {
  background: var(--darkBgcolor);
}

.detailsSection {
  grid-template-columns: calc(100% - 255px) 255px;
}
</style>
