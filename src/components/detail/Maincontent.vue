<!-- 详情页主要内容 -->

<script setup lang="ts">
import { useNotification } from "@/hooks/notification";
//@ts-ignore
import { Fancybox } from "@fancyapps/ui"; //图片放大

const { notify, closeAll } = useNotification();
const useDirectory = useDirectoryStore();
const useOpenai = useOpenaiStore();
const props = defineProps({
  main: String,
  aid: Number,
});

const emit = defineEmits(["update"]);
const articleMain = templateRef("articleMain");
// const aiContentHtml = computed(() => {
//   return xss.process(
//     VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(useOpenai.content)
//   );
// });
const doneFlag = ref(false);

onMounted(() => {
  setTimeout(async () => {
    // 给当前所有pre标签添加复制按钮
    const pres = document.querySelectorAll("pre") as any;
    pres.forEach((element: any) => {
      const btn = document.createElement("button");
      btn.className = "copy";
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"></path></svg>\n';
      element.appendChild(btn);

      // 给当前pre添加一个data-title属性 用于识别当前代码的语言
      const code = element.querySelector("code");
      if (code) {
        const lang = code.className;
        element.setAttribute("data-lang", lang.replace("language-", ""));
      }
      // 添加点击事件 复制代码
      useEventListener(btn, "click", (e: any) => {
        const text = e.target.parentElement.firstChild.innerText;
        if (!text) return;
        // 将text复制到剪切板
        navigator.clipboard.writeText(text).then(
          () => {
            closeAll();
            notify({
              message: `${btn.innerHTML} 复制成功,转载请声明来源！`,
              position: "bottom-center",
              duration: 2000,
              dangerouslyUseHTMLString: true,
            });
          },
          function (res) {
            console.log("lzy ~ res", res);
          }
        );
      });
    });

    // 初始化目录
    useDirectory.initDirectory(articleMain.value);
    useOpenai.getAbstract(props.aid!).then(() => {
      doneFlag.value = true;
    });

    // @ts-ignore 给所有图片添加
    Fancybox.bind(articleMain.value, {
      Carousel: {
        Panzoom: {
          zoomLevels: 5,
        },
      },
    });
  }, 50);
});

defineExpose({ articleMain });
</script>

<template>
  <article
    id="markdownMain"
    class="mt-10 px-2.5 text-lg rounded-2xl text-color dark:text-white dark:bg-dark-background"
  >
    <div
      class="pb-2 pl-4 text-lg rounded-lg overflow-hidden text-[15px] border border-[#000] shadow-[0_0_4px_#999]"
    >
      <p class="pt-4 font-dindin flex items-center" id="abstract">
        <LzyIcon name="mdi:robot-excited-outline" size="18" class="mr-1.5"></LzyIcon>
        文章摘要
      </p>
      <div
        class="min-h-10 flex justify-center items-center font-medium tracking-wider rounded-xl text-sm py-2 px-4 break-all"
      >
        <p class="indent-8 aiText">
          <span class="vuepress-markdown-body" v-html="useOpenai.content"></span>
          <LzyIcon
            class="align-text-top"
            v-if="!doneFlag"
            name="ph:fan-duotone"
            size="20"
          ></LzyIcon>
        </p>
      </div>
      <p
        class="affirm text-xs font-dindin indent-1.5 mt-2 font-medium text-center"
        style="color: #999"
      >
        此内容根据文章生成，未经过人工审核，仅用于文章内容的解释与总结，不承担任何法律责任！
      </p>
    </div>
    <div class="mainHtml rounded-3xl text-sm sm:text-base py-5">
      <section
        ref="articleMain"
        id="articleMain"
        class="preview-pane"
        v-html="props.main"
      ></section>
    </div>
  </article>
</template>

<style>
@import "@/styles/markPreview.css";

.aiText p {
  display: inline;
  text-indent: 2em;
}

.aiText .lzyIcon {
  animation: blinking-cursor 1s infinite;
}
</style>
