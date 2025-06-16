<script setup lang="ts">
import _ from "lodash";

const { requestData } = useRequestDataStore();

const { data: posts, error } = await useFetch("/api/article/getArticleList", {
  lazy: true, // 立即获取数据，而不是等待组件挂载
  headers: {
    // 自定义请求头
  },
  key: `postsabout`, // 使用路由作为缓存键
  cache: "no-cache", // 或根据需要设置缓存时间
  server: true, // 确保在服务器端也执行此请求
  transform: (response: any) => {
    // 可以在这里对响应数据进行转换
    return response.data;
  },
});

// github贡献总数
const totalCount = ref(0);

//svg中的格子大小以及间距配置
const svgConfig = ref({
  width: 20, //格子宽度
  height: 20, //格子高度
  margin: 5, //格子间距
  color: "#fff", //格子颜色
  backgroundColor: "#ebedf0", //格子背景颜色
  fontSize: 12, //格子文字大小
  fontColor: "#000", //格子文字颜色
  totalHeight: 0, //svg总高度
  waveWidth: 0, //总宽度
});

//技能图标
const skills = {
  front: [
    "logos:typescript-icon",
    "logos:vue",
    "logos:vueuse",
    "logos:vitejs",
    "logos:webpack",
    "logos:react",
    "logos:electron",
    "logos:tauri",
    "logos:jquery",
    "fa-brands:weixin",
    "logos:leaflet",
    "logos:greensock-icon",
    "logos:element",
    "logos:pinia",
    "logos:bootstrap",
    "logos:bun",
    "logos:css-3",
  ],
  rear: [
    "logos:nodejs-icon",
    "logos:spring-icon",
    "logos:java",
    "logos:mysql",
    "logos:postman-icon",
    "logos:apache",
  ],
  other: [
    "logos:git-icon",
    "logos:github-icon",
    "logos:github-copilot",
    "logos:visual-studio-code",
    "logos:webstorm",
    "logos:intellij-idea",
    "logos:adobe-photoshop",
    "logos:linux-tux",
    "logos:markdown",
    "logos:openai-icon",
    "logos:wordpress-icon",
    "logos:typeform-icon",
  ],
};

//github贡献图 获取逻辑、数据处理，具体实现svg绘制在template中循环绘制
const data = ref<any>([]);
const month = ref<any>([]);

onMounted(() => {
  if (requestData.githubInfo && requestData.githubInfo.weeks.length > 0) {
    const obj = requestData.githubInfo;
    data.value = obj.weeks;
    month.value = obj.month;
    totalCount.value = obj.totalCount;
    getWidth(true);
    nextTick(() => {
      const rect = document.querySelectorAll(".rectangle") as NodeListOf<SVGRectElement>;
      // const svgTipDom = document.querySelector("#svgTip") as HTMLDivElement;
      rect.forEach((item) => {
        //鼠标移入事件 显示tip
        useEventListener(item, "mouseenter", (event: any) => {
          // svgTipDom.style.opacity = "1";
          const { x, y } = event.target.getBoundingClientRect();
          // svgTip.x = x - 70
          // svgTip.y = y - 40
          // svgTip.date = event.target.getAttribute('data-date')
          // svgTip.count = event.target.getAttribute('data-count')
        });
        useEventListener(item, "mouseleave", () => {
          // svgTipDom.style.opacity = "0";
        });
        item.style.setProperty("--delay", `${_.random(0.1, 0.5) * 10}s`);
      });
    });
  }
});

//判断当前日期标题是否显示
const isShow = (value: any, index: number) => {
  const value2 = month.value[index - 1] ? month.value[index - 1].text : null;
  if (value2 != null) {
    if (value == value2) return false;
  } else if (index == 0) {
    return false;
  }
  return true;
};

const identifyreatColor = (color: string) => {
  if (color == "#ebedf0") {
    return "#fff";
  }
  return color;
};

//根据父元素的大小计算svg中g的宽度
function getWidth(flag = false) {
  const svgWidth = document.querySelector("#calendar")?.parentNode
    ?.parentNode as HTMLElement;
  svgConfig.value.waveWidth = Math.max(svgWidth.offsetWidth - 60, 1041);
  const waveWidth = svgConfig.value.waveWidth;
  if (waveWidth < 1041 && !flag) return "";

  const length = data.value.length + 1;
  const g_rows_width = Math.ceil((waveWidth - length * 3) / length);

  svgConfig.value.width = Math.max(g_rows_width - 5, 13);
  svgConfig.value.height = Math.max(g_rows_width - 5, 13);
  svgConfig.value.margin = g_rows_width + 2;
  svgConfig.value.totalHeight =
    svgConfig.value.margin * data.value[0].contributionDays.length + 55;
}
useEventListener("resize", () => {
  getWidth();
});
</script>

<template>
  <!-- <LzyEnterVisible animateClass="animate__backInUp" v-observer-load> -->
  <!-- <div
      id="svgTip"
      class="svg-tip svg-tip-one-line"
      :style="{ top: svgTip.y + 'px', left: svgTip.x + 'px' }"
    >
      {{ svgTip.date }}
      <strong>{{ svgTip.count != 0 ? svgTip.count + "条贡献" : "没有贡献" }} </strong>
    </div> -->

  <main>
    <HomeTxtDeformation />
    <div class="waveMain" v-observer-load>
      <!-- <ColorRoulette /> -->
      <div class="wave" :style="{ height: svgConfig.totalHeight + 'px' }">
        <text class="text">{{ totalCount }} contributions in the last year</text>
        <div class="h-full">
          <svg
            id="calendar"
            :width="svgConfig.waveWidth"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <text
                v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']"
                :key="index"
                fill="#000"
                font-size="12"
                x="8"
                :y="index * svgConfig.margin + 45"
                overflow="scroll"
              >
                {{ item }}
              </text>
            </g>
            <g>
              <text
                v-for="(item, index) in month"
                :key="index"
                fill="#000"
                font-size="12"
                :x="item.index"
                y="20"
                v-show="isShow(item.text, index)"
                overflow="scroll"
              >
                {{ item.text }}
              </text>
            </g>
            <g v-for="(item, indexG) in data" :key="indexG">
              <rect
                class="rectangle"
                v-for="(res, indexR) in item.contributionDays"
                :key="indexR"
                :x="indexG * svgConfig.margin + 30"
                :y="indexR * svgConfig.margin + 30"
                rx="3"
                ry="3"
                stroke="#000"
                :fill="identifyreatColor(res.color)"
                :width="svgConfig.width"
                :height="svgConfig.height"
                :data-date="res.date"
                :data-count="res.contributionCount"
                overflow="scroll"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </main>

  <!-- </LzyEnterVisible> -->
</template>

<style scoped></style>
