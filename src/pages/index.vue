<script setup lang="ts">
import type { ArticleListItem } from "~/types/Articles";
import type { ListData } from "~/types/ListData";
import type { RequestResult } from "~/types/Result";

type RequestResultData = RequestResult<ListData<ArticleListItem[]>>;

const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");
const isload = ref(true);
const limit = 7;
const pageCount = ref(1);
const total = ref(0);
const listData = ref<ArticleListItem[]>(); // 文章列表数据
const loadingStore = useLoadingStore();

const getPosts = async () => {
  try {
    // 获取文章列表
    const { data: posts, error } = await useFetch(
      `/api/article/getArticleList?pages=${pageCount.value}&limit=${limit}`
    );

    // 处理错误
    if (error.value) {
      console.error("Failed to fetch posts:", error.value);
      return []; // 发生错误时返回空数组，防止渲染时出现问题
    }

    // 确保 posts 存在
    if (posts.value) {
      // 获取文章总数
      total.value = posts.value.data.total;
      return posts.value.data.data;
    } else {
      return [];
    }
  } catch (err) {
    // 捕获任何异步错误
    console.error("Unexpected error:", err);

    return []; // 发生错误时返回空数组
  } finally {
    // 无论如何，确保加载动画关闭
    loadingStore.setLoading(true);
    // 开启全局加载动画
    isload.value = false;
  }
};

listData.value = await getPosts();

const onCurrentChange = async (index: number) => {
  pageCount.value = index;
  listData.value = await getPosts();
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
        <img
          class="w-full h-full object-cover rounded-lg max-h-72"
          src="http://localhost:2024/static/img/homeItem.png"
          alt=""
        />
      </template>
    </DoubleCard>

    <div
      class="mx-auto mt-1 max-w-[calc(var(--maxWidth)+20px)] grid grid-cols-[auto,305px] gap-5"
    >
      <!-- 文章内容 -->
      <div class="w-full">
        <div class="grid gap-2.5 mt-5 relative">
          <div
            :id="'list' + item.aid"
            v-for="(item, index) in listData"
            :key="index"
            v-if="loadingStore.loading"
            v-transition="'animate__fadeInUp'"
          >
            <NuxtLink :to="'/detail/' + item.aid">
              <MainItem :data="item" :index="index"></MainItem>
            </NuxtLink>
          </div>
        </div>
        <!-- 文章分页 -->
        <div class="example-pagination-block lzy-center" id="example">
          <ElPagination
            :page-size="limit"
            layout="prev, pager, next"
            :total="total"
            @current-change="onCurrentChange"
          />
        </div>
      </div>
      <div class="systemInfo">
        <WeatherInfo />
        <!-- <NewComment></NewComment> -->
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<style scoped></style>
