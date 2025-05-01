<script lang="ts" setup>
const { requestData } = defineProps<{
  requestData: any;
}>();
const searchText = ref("");

const findResult = computed(() => {
  if (!searchText.value) {
    return [];
  }
  const data = requestData.homeArticleList.data;
  let stringIndex = 0;
  const stringCount: any = {};
  const result = data.filter((item: any) => {
    if (item.main.includes(searchText.value)) {
      stringIndex = item.main.indexOf(searchText.value);
      /* 取这段的前后10个字符 */
      const start = stringIndex - 10 < 0 ? 0 : stringIndex - 10;
      const end =
        stringIndex + searchText.value.length + 10 > item.main.length
          ? item.main.length
          : stringIndex + searchText.value.length + 10;
      stringCount[item.aid] = item.main.substring(start, end);
      return true;
    }
  });
  /* 进一步处理 */
  return result.map((res: any) => {
    return {
      title: res.title,
      aid: res.aid,
      content: stringCount[res.aid],
    };
  });
});

</script>


<template>
  <div>
    <input
      type="text "
      class="rounded-xl w-full p-4 py-1 shadow-sm text-sm grid grid-cols-2"
      placeholder="全站搜索..."
      v-model="searchText"
    />
    <LzyIcon
      name="iconoir:search"
      class="absolute top-[5px] right-2 text-gray-400 hover:text-gray-500"
      size="20"
    />
    <div class="search-card overflow-auto">
      <img
        v-if="!findResult.length"
        src="https://www.api.lzyszds.cn/static/img/ezgif-3e9353c5b801c0.gif"
        alt=""
      />
      <div
        v-for="(item, index) in findResult"
        :key="index"
        class="text-sm text-gray-500 p-2 z-30"
      >
        <NuxtLink :to="'/detail/' + item.aid">
          <span class="text-themeColor font-semibold">{{ item.title }}</span>
          <span class="text-gray-400">...</span>
        </NuxtLink>

        <div class="h-[1px] bg-gray-200 my-2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-card {
  width: 100%;
  height: 185px;
  position: absolute;
  z-index: 0;
  opacity: 0;
  transition: all 0.3s ease;
  background-color: #fff;
  border-radius: 16px;
  margin-top: 12px;
  border: 1px solid;
  border-color: rgba(var(--themeColorRgb), 0.4);
  z-index: -1;

  &:hover {
    opacity: 1;
    z-index: 10;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    object-fit: cover;
  }
}
input {
  color: rgba(var(--themeColorRgb), 0.4);
  border: 1px solid #999;
  &:focus {
    border-color: rgba(var(--themeColorRgb), 0.4);
    outline: none;
    box-shadow: 0 0 1px rgba(var(--themeColorRgb), 0.4);

    & ~ div {
      opacity: 1;
      z-index: 10;
    }
  }
}
</style>
