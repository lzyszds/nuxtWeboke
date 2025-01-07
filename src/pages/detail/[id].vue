<script setup lang="ts">
import { numFormat, timeAgo } from '~/utils/common.js';
import type { Directory } from '~/types/Directory';

const mainContent = ref();
const windowY: any = inject('windowY');
const { requestData } = useRequestDataStore();
const details = computed(() => requestData.detailData);

const useDirectory = useDirectoryStore();

const countInfoArr = computed(() => [
  {
    title: '发表时间',
    value: timeAgo(details.value.createDate),
    icon: 'iconoir:alarm',
  },
  {
    title: '浏览量',
    value: numFormat(details.value.accessCount),
    icon: 'iconoir:fire-flame',
  },
  {
    title: '评论数',
    value: numFormat(details.value.commentCount) || '暂无评论',
    icon: 'iconoir:chat-lines',
  },
]);

// 滚动到指定标题
const scrollToElement = (item: Directory) => {
  const article = mainContent.value?.articleMain;
  const articleChild = article.querySelectorAll('h2,h3,h4');

  useDirectory.scrollEl?.scrollTo({ top: item.top - 200, behavior: 'smooth' });

  articleChild.forEach(async (element: HTMLElement) => {
    if (element.id === item.id) {
      element.classList.add('animate__shakeX');
      await awaitTime(() => {
        element.classList.remove('animate__shakeX');
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
        style="font-size: clamp(0.7rem, 4vw, 3rem)"
      >
        {{ details.title }}
      </h1>
      <!-- 文章类型 -->
      <div
        class="flex gap-3 font-dindin p-1 px-2 bg-white dark:bg-dark-background rounded-md mx-auto w-fit mt-1"
      >
        <span
          class="flex gap-1 text-sm place-content-center place-items-center"
          v-for="(item, index) in countInfoArr"
          :key="index"
        >
          <LzyIcon :title="item.title" size="16" :name="item.icon"></LzyIcon>
          {{ item.value }}
        </span>
        <span
          class="ml-1 bg-themeColor text-white border-1 border-black text-xs py-0.5 px-1 rounded-md"
          v-for="(item, index) in details.tags ? details.tags.split(',') : ''"
          :key="index"
        >
          #{{ item }}
        </span>
      </div>
    </header>
    <!-- 文章主体 -->
    <section
      class="mt-5 grid gap-2 grid-cols-1 lg:grid-cols-[calc(100%-255px)_255px]"
    >
      <div class="flex flex-col gap-3">
        <ClientOnly>
          <DetailMaincontent
            ref="mainContent"
            :main="details.main"
            :aid="details.aid"
          />
        </ClientOnly>
        <footer
          v-transition="'animate__fadeInUp'"
          class="p-1 rounded-xl text-xs sm:text-base bg-themeColor border-4 border-black font-dindin text-white hover:underline"
        >
          <div class="text-center flex place-items-center place-content-center">
            <LzyIcon
              name="iconoir:closed-captions-tag"
              class="text-white align-text-top mr-1 pt-[18px]"
              size=".8rem"
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
  background-image: linear-gradient(0deg, #a4a4a4 1px, transparent 0),
  linear-gradient(90deg, #a4a4a4 1px, transparent 0);
  background-size: 24px 24px;
  background-repeat: repeat;
}

.dark .bgLattice {
  background-image: linear-gradient(#2a2a2a 1px, transparent 0),
  linear-gradient(90deg, #2a2a2a 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}

.detailsSection {
  grid-template-columns: calc(100% - 255px) 255px;
}
</style>
