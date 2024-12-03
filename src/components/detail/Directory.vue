<script setup lang="ts">
import type { Directory } from '~/types/Directory';

const headingRefs: any = ref([]);
const activeHeading = ref('abstract');
const isMutaScroll = ref(false);

const emit = defineEmits<{
  (e: 'scrollToElement', item: Directory): void;
}>();

const useDirectory = useDirectoryStore();
const scrollToElement = (item: Directory) => {
  if (isMutaScroll.value) return;
  isMutaScroll.value = true;
  activeHeading.value = item.id;
  emit('scrollToElement', item);
  setTimeout(() => {
    isMutaScroll.value = false;
  }, 1000);
};
let eventListener: any;
//当前内容的滚动距离，用于判断目录的高亮
watchEffect(() => {
  const directory = useDirectory.getDirectory;
  if (directory && directory.length) {
    //如果已经有监听器，先清除
    if (eventListener) eventListener();
    //监听滚动事件
    eventListener = useEventListener(
      useDirectory.scrollEl,
      'scroll',
      useThrottleFn((event) => {
        if (isMutaScroll.value) return;
        const arr: Directory[] = [];

        //@ts-ignore
        let scrollTop = event.target.scrollTop;
        if (scrollTop < 250) {
          activeHeading.value = 'abstract';
        }
        directory.forEach((element: any, index) => {
          if (scrollTop >= element.top - 350) {
            arr.push(element);
          }
        });
        activeHeading.value =
          arr.length > 0 ? arr[arr.length - 1]!.id : 'abstract';
      }, 50),
    );
  }
});

onUnmounted(() => {
  // 清理所有 observers
  headingRefs.value.forEach(({ stop }: any) => stop());
});
</script>

<template>
  <section id="directory" class="hidden lg:block">
    <div
      class="mt-10 bg-themeColor sticky top-16 p-2.5 text-lg rounded-2xl border-4 border-black text-[#2c3e50]"
    >
      <div
        class="bg-white dark:bg-dark-background p-1 px-3 text-lg rounded-2xl border-4 border-black text-[15px]"
      >
        <h2
          class="bg-[#ffe14d] px-3 my-2 font-semibold rounded-xl flex items-center select-none"
        >
          <LzyIcon size="20"  name="iconoir:book-stack"></LzyIcon>
          <span class="align-text-top mt-[-2px]">目录</span>
        </h2>
        <ul class="px-2 relative">
          <li
            v-for="item in useDirectory.directory"
            @click.prevent="scrollToElement(item)"
            class="text-[13px] transition-all font-dindin hover:text-themeColor"
            :class="[item.nodeName, activeHeading == item.id ? 'active' : '']"
          >
            <a
              class="transition-all text-[#999]"
              :class="{ 'cursor-progress': isMutaScroll }"
            >
              {{ item.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
ul li {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 20px;
  transition: 0.1s;
  cursor: pointer !important;
}

li.active a {
  color: var(--themeColor);
}

li:before {
  background-color: transparent;
  content: ' ';
  display: block;
  float: left;
  margin-top: 2px;
  border-radius: 30px;
  width: 3px;
  height: 15px;
  transition: 0.1s;
  opacity: 1;
}

li.active:before {
  background-color: var(--themeColor);
  opacity: 1;
  margin-right: 10px;
}

li.H2 a {
  font-weight: 500;
}

li.H3 a {
  margin-left: 10px;
}

li.H4 a {
  margin-left: 20px;
}
</style>
