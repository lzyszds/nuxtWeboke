import { defineStore } from 'pinia';
import type { ArticleDetail } from '~/types/Articles';

type RequestData = {
  [key: string]: any;
};

// 定义一个store，用于存储所有的请求数据
export const useRequestDataStore = defineStore('requestData', () => {
  const route = useRoute();

  // 需要请求的接口路径
  const urls = [
    {
      url: `/api/article/getArticleList?pages=1&limit=99999`,
      name: 'homeArticleList',
      notes: '首页文章列表',
    },
  ];

  // 定义数据结构
  const requestData = ref<RequestData>({
    homeArticleList: [],
    homeCommentList: [],
    detailData: {} as ArticleDetail,
  });

  // 统一请求接口，并进行错误处理
  const usefetchData = async (url: string) => {
    try {
      const { data, error } = await useFetch(url);
      if (error.value) throw new Error(`请求失败: ${url}`);
      //@ts-ignore
      return data.value?.data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // 初始化数据
  const initData = async () => {
    const result = await Promise.all(
      urls.map((item) => usefetchData(item.url)),
    );

    // 将结果赋值给 requestData
    urls.forEach((item, index) => {
      requestData.value[item.name] = result[index];
    });
  };

  // 详情页数据的 computed
  watchEffect(() => {
    if (!route.params.id) return;
    const id = Number(route.params.id);
    const { data } = requestData.value.homeArticleList;
    requestData.value.detailData = data
      ? data.find((item: ArticleDetail) => item.aid == id)
      : {};
  });

  return { requestData, initData };
});
