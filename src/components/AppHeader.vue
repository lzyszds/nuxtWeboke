<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const data = ref({
  activeIndex: route.name == "index" ? "" : (route.name as string),
  items: [
    { name: "首页", path: "/" },
    { name: "关于", path: "/about" },
    { name: "相册", path: "/photo" },
    { name: "疫情", path: "/episit" },
  ],
  //选择器位置
  selectorpos: {
    left: "0px",
    top: "0px",
  },
  //是否打开
  hasopen: false,
  //获取网页标题
  webHeadTitle: "Jingzy",
});

//获取网页标题

// const bgBoxfun = () => {
//   const navitem = document.querySelector(".nav-item.active") as HTMLElement;
//   data.value.selectorpos = {
//     left: navitem.offsetLeft + "px",
//     top: navitem.offsetTop + "px",
//   };
// };

// const menuMethod = (index = 0) => {
//   data.value.activeIndex = index;
//   nextTick(() => {
//     bgBoxfun();
//     router.push(data.value.items[index]!.path);
//   });
// };
const openfun = () => {
  data.value.hasopen = !data.value.hasopen;
  const line = document.querySelectorAll(".lines") as NodeListOf<HTMLElement>;
  //按钮动画
  if (data.value.hasopen && line) {
    line[0]!.style.transform = "rotate(45deg) translate3d(0,0,0)";
    line[1]!.style.transform = "scaleX(0)";
    line[2]!.style.transform = "rotate(-45deg) translate3d(0,0,0)";
  } else {
    line[0]!.style.transform = "rotate(0) translate3d(0, -8px, 0)";
    line[1]!.style.transform = "scaleX(1)";
    line[2]!.style.transform = "rotate(0) translate3d(0, 8px, 0)";
  }
};

onMounted(() => {
  // bgBoxfun();
  // window.addEventListener("resize", bgBoxfun);
  useEventListener(window, "scroll", () => {
    if (window.scrollY >= 10) {
      document.querySelector(".navbarContent")?.classList.add("navbarContent100");
    } else {
      document.querySelector(".navbarContent")?.classList.remove("navbarContent100");
    }
  });
});

//鼠标进入顶部中心标题 事件返回顶部
const tipBackfn = (val: number) => {
  if (val == 0) {
    data.value.webHeadTitle = "Jingzy";
  } else {
    data.value.webHeadTitle = "返回顶部";
  }
};

const scrollTo = (x: number, y: number) => {
  window.scrollTo(x, y);
};
</script>

<template>
  <nav id="header" class="fixed w-full z-10 top-0">
    <div
      id="progress"
      class="h-1 z-20 top-0"
      style="background: linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)"
    ></div>

    <div
      class="w-full md:max-w-7xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3"
    >
      <!-- logo -->
      <div class="pl-4">
        <a class="no-underline hover:no-underline flex place-items-center" href="/">
          <img class="w-8" src="/assets/image/logo.png" />
          <span
            class="font-extrabold text-3xl ml-2"
            style="text-shadow: 1px 2px 1px #000, 0 0 1px #000000"
          >
            {{ data.webHeadTitle }}
          </span>
        </a>
      </div>

      <!-- 汉堡按钮 -->
      <div class="block lg:hidden pr-4">
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
      </div>

      <!-- 导航栏 -->
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-center flex-1 items-center">
          <li class="mr-3" v-for="(item, index) in data.items" :key="index">
            <NuxtLink
              :class="
                item.path != '/' + data.activeIndex
                  ? 'inline-block text-gray-600 no-underline hover:text-underline font-dindin py-2 px-4'
                  : 'inline-block py-2 px-4 font-bold no-underline font-dindin'
              "
              :to="item.path"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 切换主题 -->
      <SetThemes class="hidden lg:flex" />
    </div>
  </nav>
</template>
