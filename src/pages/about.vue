<script setup lang="ts">

const { data: posts, error } = await useFetch("/api/article/getArticleList", {
  lazy: true, // 立即获取数据，而不是等待组件挂载
  headers: {
    // 自定义请求头
  },
  key: `postsabout`, // 使用路由作为缓存键
  cache: "no-cache", // 或根据需要设置缓存时间
  server: true, // 确保在服务器端也执行此请求
  transform: (response) => {
    // 可以在这里对响应数据进行转换
    return response.data;
  },
});
</script>

<template>
  <div>about</div>
</template>

<style lang="scss" scoped></style>
