<script setup lang="ts">

const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");
const pageCount = ref(1);
const isLoading = ref(false);
const articleCard = templateRef<HTMLElement[]>("articleCard");
const limit = 4;
const { requestData } = useRequestDataStore();
const cardHeight = ref(0);

/**
 * 获取文章card的高度
 */
onMounted(() => {
  if (articleCard.value) {
    cardHeight.value = articleCard.value[0]!.clientHeight;
  }
});

/** 文章列表数据
 *    分割数组
 *    @param {Array} arr
 *    @param {Number} size
 */
const listData = computed(() => {
  return splitArray(requestData.homeArticleList.data, limit)[pageCount.value - 1];
});

/**
 * 计算总页数 = 总长度 / 每页长度
 * @returns {Number[]}
 */
const totalLength = computed(() => {
  return Math.ceil(requestData.homeArticleList.data.length / limit);
});

/**
 * 切换页码
 * @param index 当前页码
 */
const onCurrentChange = async (index: number) => {
  isLoading.value = true;
  pageCount.value = index;
  await nextTick();
  isLoading.value = false;
};

const baseUrl = useRuntimeConfig().public.VITE_BASE_URL
</script>

<template>
  <div class="z-10 w-full" v-observer-load>
    <HomeMyCard>
      <span class="text-sm" v-for="item in mytext">{{ item }}</span>
    </HomeMyCard>

    <HomeDoubleCard aspect="square" class="mt-2">
      <template #first>
        <div class="pt-20 pl-8 relative md:pt-14 w-full">
          <LzyEnterVisible animate-class="animate__zoomInLeft">
            <p class="text-5xl font-semibold leading-tight">
              过去无法挽留<br />
              <span>未来仍可改变</span>
            </p>
            <p class="small pt-4 pl-2 text-[12px]">
              <span>编程</span>、 <span>逻辑</span>、 <span>创新</span>、
              <span>灵魂</span>
            </p>
          </LzyEnterVisible>
          <HomeSkillSwiper></HomeSkillSwiper>
        </div>
      </template>
      <template #second>
        <img
          class="w-full h-full object-cover rounded-lg max-h-72"
          :src="baseUrl + '/static/img/homeItem.png'"
          alt=""
        />
      </template>
    </HomeDoubleCard>

    <div
      class="mx-auto mt-1 max-w-[calc(var(--maxWidth)+20px)] grid grid-cols-1 lg:grid-cols-[auto,305px] gap-5"
    >
      <!-- 文章内容 -->
      <div class="w-full">
        <div
          class="grid gap-2.5 mt-5 relative overflow-hidden"
          :style="{ minHeight: (cardHeight + 10) * limit + 'px' }"
          v-if="!isLoading"
        >
          <div
            ref="articleCard"
            :id="'list' + item.aid"
            v-for="(item, index) in listData"
            :key="index"
          >
            <LzyEnterVisible
              :index="index"
              animateClass="animate__fadeInUp"
              delay="200"
              maxDelay="100"
              firstRenderNumber="4"
            >
              <NuxtLink :to="'/detail/' + item.aid" @click="">
                <HomeMainItem :data="item" :index="index"></HomeMainItem>
              </NuxtLink>
            </LzyEnterVisible>
          </div>
        </div>
        <!-- 文章分页 -->
        <LzyPagination
          @currentChange="onCurrentChange"
          :newPage="pageCount"
          :totalLength="totalLength"
        />
      </div>
      <div class="systemInfo relative mt-5 hidden lg:block">
        <LzyEnterVisible animateClass="animate__bounceInUp" class="sticky top-16">
          <ClientOnly>
            <HomeWeatherInfo />
          </ClientOnly>
          <HomeNewComment />
        </LzyEnterVisible>
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<style scoped></style>
