import { defineStore } from "pinia";

// 使用Pinia创建一个名为"loading"的store
// 该store用于管理加载状态
export const useLoadingStore = defineStore("loading", () => {
  // 定义一个响应式变量loading，用于存储当前的加载状态
  const loading = ref<boolean>(false)

  // 创建一个计算属性getLoading，返回loading的当前值
  // 计算属性用于在需要时获取loading的值，提高性能
  const getLoading = computed(() => loading.value)

  // 定义方法setLoading，用于更新loading的状态
  // @param status - 新的加载状态，true表示加载中，false表示加载结束
  const setLoading = (status: boolean) => {
    loading.value = status
  }

  // 定义方法toggleLoading，用于切换loading的状态
  // 该方法通过取反loading的当前值来切换状态
  const toggleLoading = () => {
    loading.value = !loading.value
  }

  // 返回loading相关的状态和方法
  // 这些状态和方法可以在其他组件中使用，以管理和获取加载状态
  return { loading, getLoading, setLoading, toggleLoading }
})
