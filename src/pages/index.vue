<script setup lang="ts">
import type { ArticleListItem } from '~/types/Articles';
import type { ListData } from '~/types/ListData';
import type { RequestResult } from '~/types/Result';


const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");
const isload = ref(false);
const limit = 7;
const pageCount = ref(5);
const total = ref(0);
const posts = ref<ArticleListItem[]>(); // 文章列表数据

const getPosts = async () => {
  isload.value = false;
  // 获取文章列表
  const { data: posts, error } = await useFetch(
    `/api/article/getArticleList?page=${pageCount.value}&limit=${limit}`,
    {
      lazy: false, // 立即获取数据，而不是等待组件挂载
      transform: (response: RequestResult<ListData<ArticleListItem[]>>) => {
        // 可以在这里对响应数据进行转换
        return response.data;
      },
    }
  );
  // 关闭加载动画
  isload.value = true;
  // 获取文章总数
  total.value = posts.value!.total;
  // 报错提醒
  if (error.value) {
    console.error("Failed to fetch posts:", error.value);
  }
  return posts.value!.data
};
posts.value = await getPosts();

const onCurrentChange = async (index: number) => {
  pageCount.value = index;
  posts.value = await getPosts();
};



</script>

<template>
  <div class="z-10 w-full">
    <MyCard>
      <span class="text-sm" v-for="item in mytext">{{ item }}</span>
    </MyCard>

    <DoubleCard aspect="square" class="mt-2">
      <template #first>
        <div class="pt-20 pl-8 relative md:pt-14 w-full">
          <p class="text-5xl font-semibold leading-tight">
            过去无法挽留<br />
            <span>未来仍可改变</span>
          </p>
          <p class="small pt-4 pl-2 text-[12px]">
            <span>编程</span>、 <span>逻辑</span>、 <span>创新</span>、
            <span>灵魂</span>
          </p>
          <SkillSwiper></SkillSwiper>
        </div>
      </template>
      <template #second>
        <img class="w-full h-full object-cover rounded-lg" src="http://localhost:2024/static/img/homeItem.png" alt="" />
      </template>
    </DoubleCard>

    <div class="mx-auto mt-1  max-w-[calc(var(--maxWidth)+20px)] grid grid-cols-[auto,305px] gap-5">
      <!-- 文章内容 -->
      <div class=" w-full">
        <div class=" grid gap-2.5 mt-5 relative">
          <div :id="'list' + item.aid" v-for="(item, index) in posts" :key="index" v-if="isload"
            v-transition="'animate__fadeInUp'">
            <!-- <RouterLink :to="'/home/detail/' + item.aid">
                  <ContentDiv :data="item" :index="index"></ContentDiv>
                </RouterLink> -->
            <NuxtLink :to="'/detail/' + item.aid">
              <MainItem :data="item" :index="index"></MainItem>
            </NuxtLink>
          </div>
        </div>
        <!-- 文章分页 -->
        <div class="example-pagination-block lzy-center" id="example">
          <ElPagination :page-size="limit" layout="prev, pager, next" :total="total"
            @current-change="onCurrentChange" />
        </div>
      </div>
      <div class="systemInfo">
        <!-- <DeskInfo></DeskInfo>
            <NewComment></NewComment> -->
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<style scoped></style>
