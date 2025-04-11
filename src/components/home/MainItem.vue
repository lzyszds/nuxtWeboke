<!-- 文章列表中的长方形组件 -->
<script setup lang="ts">
//@ts-ignore
import dayjs from "dayjs";
//@ts-ignore
import _ from "lodash";
//@ts-ignore
import { gsap } from "gsap";

import type { Article } from "~/types/Articles";
const list = [
  { name: "iconoir:alarm" },
  { name: "iconoir:stackoverflow" },
  { name: "iconoir:fire-flame" },
  { name: "iconoir:chat-lines" },
];

interface Props {
  data: Article;
  index: number;
}

const props = defineProps<Props>();
const tags = props.data.tags;
const data = ref<Article>(props.data);
const selectHandle = (index: number) => {
  let result = "" as string | number;
  const { createDate, commentCount, accessCount } = data.value;
  if (index == 0) {
    result = dayjs(createDate).format("YYYY-MM-DD HH:mm:ss");
  } else if (index == 1) {
    if (tags) result = tags;
  } else if (index == 2) {
    result = accessCount;
  } else if (index == 3) {
    result = commentCount || 0;
  }
  return result;
};

// 鼠标划入事件
const mouseenter = _.debounce(
  function (event) {
    const mask = event.target.querySelector(".maskContent");

    // 如果鼠标划入的是 .maskContent 本身，直接返回
    if (event.target.classList.contains("maskContent")) {
      return;
    }

    // 获取所有的 .maskContent 元素并重置它们的样式
    const allMasks = document.querySelectorAll(".maskContent");
    allMasks.forEach((maskElement) => {
      gsap.killTweensOf(maskElement); // 停止正在进行的动画
      gsap.set(maskElement, { clearProps: "all" }); // 清除所有动画的状态和内联样式
    });
    // 创建一个创新的动画效果
    const tl = gsap.timeline();
    // 设置初始状态
    tl.set(mask, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "center center",
    })
      .to(mask, {
        opacity: 1,
        scale: 1.1,
        zIndex: 1,
        rotation: 0,
        duration: 0.1,
        ease: "back.out(1.7)",
      })
      .to(mask, {
        scale: 1,
        duration: 0.1,
        ease: "power1.inOut",
      })
      .to(mask, {
        y: -5,
        repeat: 1,
        yoyo: true,
        duration: 0.1,
        ease: "power1.inOut",
      })
      .to(mask, {
        boxShadow: "0 10px 33px rgba(0,0,0,0.1)",
        duration: 0.1,
      });

    // 添加颜色变化效果
    tl.to(
      mask,
      {
        duration: 0.2,
        backgroundColor: "rgba(81, 97, 206, .1)", // 半透明的亮粉色
        color: "#ffffff",
        ease: "none",
      },
      "-=0.7"
    );
  },
  100,
  { leading: true, trailing: false }
);

const mouseleave = _.debounce(
  function (event) {
    const mask = event.target.querySelector(".maskContent");
    gsap.to(mask, {
      duration: 0.3,
      opacity: 0,
      scale: 1,
    });
  },
  100,
  { leading: true, trailing: false }
);
</script>

<template>
  <div
    class="mainCard pb-1 rounded-lg transition-all duration-100 relative pointer-events-auto overflow-hidden dark:hover:bg-[#ffffff20]"
  >
    <div class="maskContent w-full h-32 dark:w-0"></div>
    <div
      class="w-full h-32 p-2.5 grid grid-rows-[40px_1fr_15px] gap-1.5 z-0 pointer-events-none"
    >
      <div class="text-2xl text-black dark:text-white font-['dindin'] overflow-hidden">
        {{ data.title }}
      </div>
      <div class="text-sm text-gray-500 h-10 overflow-hidden line-clamp-2">
        {{ data.partialContent }}
      </div>
      <div class="text-xs text-gray-500 flex place-items-center">
        <span
          v-for="(item, index) in list"
          :key="index"
          class="inline-block mr-2.5 h-5 leading-6"
        >
          <span v-if="index == 1">#{{ selectHandle(index) }}</span>
          <span v-else class="inline-flex items-center">
            <LzyIcon :name="item.name" class="w-4 h-4 align-text-top mr-1.5"></LzyIcon>
            {{ selectHandle(index) }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  box-orient: vertical;
  text-overflow: ellipsis;
}

.maskContent {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
  border-radius: 10px;
  /* 禁止该元素接收鼠标事件 */
  pointer-events: none;
}
.mainCard {
  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
}
</style>
