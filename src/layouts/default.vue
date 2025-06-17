<script setup lang="ts">
import { gsap } from "gsap";

const el = templateRef("el");
const appHeader = ref<any>(null);
const setRightButton = ref<any>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  behavior: "smooth",
});
const route = useRoute(); // 获取路由

const useDirectory = useDirectoryStore(); // 获取目录

// 使用let来声明tl变量 纯粹是因为在vite热更新之后无法拾取到tl的值 会导致浮动工具栏不出现
let tl: gsap.core.Timeline | null = null;
onMounted(async () => {
  tl = gsap.timeline({ paused: true });
  tl
    /* 背景颜色 */
    .to(
      appHeader.value!.navbar,
      {
        backgroundColor: "#5161ce",
        ease: "power2.inOut",
      },
      0
    )
    /* logo */
    .to(
      appHeader.value.navbar.querySelector("a[href='/'] span"),
      {
        color: "#fff",
        ease: "expo.out",
      },
      0
    )
    /* 导航栏 上滑 */
    .to(
      appHeader.value!.navContainer,
      {
        delay: 0,
        transform: "translateY(-48px)",
        ease: "expo.out",
      },
      0
    )
    /*  导航栏内容 上滑 */
    .to(
      appHeader.value!.navContainer.lastChild,
      {
        transform: "translateY(0px)",
        ease: "expo.out",
      },
      0
    )
    /* 右下角工具栏 */
    .to(
      setRightButton.value.toolbar,
      {
        opacity: 1,
        transform: "translateX(0px)",
        ease: "expo.out",
      },
      0
    );
  watchEffect(() => {
    if (y.value > 10) {
      tl!.play();
    } else {
      tl!.reverse();
    }
  });

  await nextTick();

  if (el.value) {
    useDirectory.scrollEl = el.value;
  }
});

provide("windowY", y);
</script>

<template>
  <div
    ref="el"
    class="w-screen h-screen bg-white overflow-x-hidden dark:bg-dark-background dark:text-white font-sans"
    :class="{ bgLattice: route.name == 'detail-id' }"
  >
    <LayoutAppHeader ref="appHeader" />
    <main class="container w-full md:max-w-7xl mx-auto pt-20">
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutSetRightButton ref="setRightButton" />
  </div>
</template>
