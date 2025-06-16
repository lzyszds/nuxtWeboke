<script setup lang="ts">
const navbar = ref(null);
const navContainer = ref(null);
const route = useRoute();
const isMouseover = ref(false);
const windowY = inject<Ref<number>>("windowY");

const data = ref({
  activeIndex: route.name == "index" ? "" : (route.name as string),
  items: [
    { name: "首页", path: "/" },
    { name: "关于", path: "/about" },
    // { name: "相册", path: "/photo" },
    // { name: "疫情", path: "/episit" },
  ],
  //选择器位置
  selectorpos: {
    left: "0px",
    top: "0px",
  },
  //是否打开
  hasopen: false,
  //获取网页标题
  webHeadTitle: "Jz 恰沐春风共同游，终只叹，木已舟",
});

const { isOutside } = useMouseInElement(navbar);
onMounted(() => {
  watchEffect(() => {
    isMouseover.value = isOutside.value;
  });
});
const scrollToTop = () => {
  windowY!.value = 0;
};

defineExpose({ navbar, navContainer });
</script>

<template>
  <nav id="header" ref="navbar" class="fixed w-full h-[60px] z-10 top-0 overflow-hidden">
    <div
      id="progress"
      class="h-1 z-20 top-0"
      style="background: linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)"
    ></div>

    <div
      class="w-full md:max-w-7xl mx-auto flex flex-wrap items-center justify-between mt-1"
    >
      <!-- logo -->
      <a
        class="no-underline cursor-pointer select-none text-white hover:no-underline flex place-items-center"
        href="/"
      >
        <span
          class="font-extrabold block drop-shadow-[1px_2px_1px_#000  dark:text-white w-full text-3xl font-[logo]"
          style="text-shadow: 1px 2px 2px #000, 0 0 2px #000000"
        >
          Jz
        </span>
      </a>

      <!-- 汉堡按钮 -->
      <section class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </section>

      <!-- 导航栏 -->
      <section
        class="w-full h-10 flex-grow flex-col lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-1 bg-gray-100 md:bg-transparent z-20"
        id="nav-content"
        ref="navContainer"
      >
        <ul class="list-reset h-10 lg:flex justify-center flex-1 items-center">
          <li class="mr-3" v-for="(item, index) in data.items" :key="index">
            <NuxtLink
              class="inline-block text-white no-underline hover:text-underline font-dindin py-2 px-4 drop-shadow-[1px_2px_1px_#000]  transition-all duration-300"
              :to="item.path"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
        <div>
          <div
            :class="
              isMouseover
                ? 'h-12 mt-4 font-dindin text-white font-semibold'
                : 'h-7 mt-3.5 px-6 leading-[1.75rem] cursor-pointer select-none font-dindin bg-white text-black rounded-2xl font-semibold animate-jackInTheBox'
            "
            @click="scrollToTop"
          >
            {{ isMouseover ? data.webHeadTitle : "返回顶部" }}
          </div>
        </div>
      </section>

      <!-- 切换主题 -->
      <LayoutSetThemes class="hidden lg:flex" />
    </div>
  </nav>
</template>

<style scoped></style>
