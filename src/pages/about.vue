<script setup lang="ts">
import dayjs from "dayjs";

const { requestData } = useRequestDataStore();
const data = requestData.aboutInfo;

const platform = [
  {
    text: "Github",
    icon: "iconoir:github",
  },
  {
    text: "twitter",
    icon: "iconoir:twitter",
  },
  {
    text: "mail",
    icon: "iconoir:mail",
  },
];
const tagList = [
  {
    text: "前端开发",
    icon: "iconoir:code-square",
  },
  {
    text: "Node开发",
    icon: "iconoir:server",
  },
  {
    text: "UI/UX设计",
    icon: "iconoir:pen-tool",
  },
  {
    text: "技术写作",
    icon: "iconoir:book-open",
  },
  {
    text: "分享与热心帮助",
    icon: "iconoir:heart",
  },
];

//技能图标
const skills = {
  front: [
    {
      text: "Typescript",
      icon: "logos:typescript-icon",
    },
    {
      text: "Vue",
      icon: "logos:vue",
    },
    {
      text: "Vueuse",
      icon: "logos:vueuse",
    },
    {
      text: "Vite",
      icon: "logos:vitejs",
    },
    {
      text: "Webpack",
      icon: "logos:webpack",
    },
    {
      text: "React",
      icon: "logos:react",
    },
    {
      text: "Electron",
      icon: "logos:electron",
    },
    {
      text: "Tauri",
      icon: "logos:tauri",
    },
    {
      text: "Leaflet",
      icon: "logos:leaflet",
    },
    {
      text: "Greensock",
      icon: "logos:greensock-icon",
    },
    {
      text: "Element",
      icon: "logos:element",
    },
    {
      text: "Pinia",
      icon: "logos:pinia",
    },
    {
      text: "Bootstrap",
      icon: "logos:bootstrap",
    },
    {
      text: "Bun",
      icon: "logos:bun",
    },
    {
      text: "CSS",
      icon: "logos:css-3",
    },
  ],
  rear: [
    {
      text: "Node",
      icon: "logos:nodejs-icon",
    },
    {
      text: "Java",
      icon: "logos:java",
    },
    {
      text: "MySQL",
      icon: "logos:mysql",
    },
    {
      text: "Postman",
      icon: "logos:postman-icon",
    },
  ],
  other: [
    {
      text: "git",
      icon: "logos:git-icon",
    },
    {
      text: "github",
      icon: "logos:github-icon",
    },
    {
      text: "github-copilot",
      icon: "logos:github-copilot",
    },
    {
      text: "vs-code",
      icon: "logos:visual-studio-code",
    },
    {
      text: "webstorm",
      icon: "logos:webstorm",
    },
    {
      text: "intellij-idea",
      icon: "logos:intellij-idea",
    },
    {
      text: "photoshop",
      icon: "logos:adobe-photoshop",
    },
    {
      text: "linux",
      icon: "logos:linux-tux",
    },
    {
      text: "markdown",
      icon: "logos:markdown",
    },
    {
      text: "wordpress",
      icon: "logos:wordpress-icon",
    },
    {
      text: "typeform",
      icon: "logos:typeform-icon",
    },
  ],
};

/* 评论数 浏览数 标签数 运行天数 */
const record = {
  view: {
    count: data.articleAccess,
    labal: "浏览数",
    icon: "iconoir:reports-solid",
  },
  article: {
    count: data.articleCount,
    labal: "文章数",
    icon: "iconoir:open-book",
  },
  comment: {
    count: data.commentCount,
    labal: "评论数",
    icon: "iconoir:message-text",
  },
  run: {
    count: dayjs().diff(dayjs("2024-11-24"), "day"),
    labal: "运行天数",
    icon: "iconoir:clock",
  },
};

const { counts, stop } = numberJump(record, 1);
</script>

<template>
  <!-- <LzyEnterVisible animateClass="animate__backInUp" v-observer-load> -->

  <section v-observer-load class="container mx-auto px-4 py-8 max-w-6xl">
    <LzyEnterVisible animateClass="animate__bounceInRight">
      <h1 class="text-4xl font-bold text-center mb-12">关于本站</h1>
      <p class="text-center m-auto mb-12 max-w-2xl text-muted-foreground">
        欢迎来到我的个人空间，这里记录我的思考、创作和生活。通过文字和代码，分享我的所见所闻，希望能为你带来一些启发和帮助。
      </p>
    </LzyEnterVisible>

    <LzyEnterVisible animateClass="animate__bounceInLeft">
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="md:col-span-1">
          <div class="flex flex-col items-center">
            <div
              class="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mb-4"
            >
              <img
                alt="头像"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                class="object-cover"
                src="https://www.api.lzyszds.cn/pictureBedImage/OQli-X5pRicN9w9cAhUfgLRSFdNs0Zl76hzKIXdyoxg0gAA"
              />
              <div
                class="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white"
              ></div>
            </div>
            <h2 class="text-2xl font-bold mb-2">Lzy</h2>
            <p class="text-muted-foreground text-center mb-4">开发者 / 设计师 / 博主</p>
            <div class="flex space-x-3">
              <a
                href="#"
                class="w-9 h-9 p-2 rounded-full bg-themeColor/10 hover:text-white hover:bg-themeColor/80 transition-colors"
                v-for="(plat, index) in platform"
              >
                <LzyIcon :name="plat.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div class="md:col-span-2 flex flex-col justify-center">
          <div class="bg-primary/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div class="relative z-10">
              <p class="text-sm text-primary mb-2">你好，很高兴认识你 👋</p>
              <h2 class="text-3xl font-bold mb-4">我是博客作者</h2>
              <p class="text-muted-foreground mb-6">
                热爱设计与技术，专注于用户体验和前端开发。这个博客是我分享知识、记录成长的地方。
                生活，一半家长里短，一半山川湖海...
              </p>
              <div class="flex flex-wrap gap-2">
                <div
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white/10"
                  data-v0-t="badge"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-code w-3 h-3 mr-1"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  前端开发
                </div>

                <div
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white/10"
                  data-v0-t="badge"
                >
                  <LzyIcon name="iconoir:server" class="mr-1"></LzyIcon>
                  Node开发
                </div>

                <div
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white/10"
                  data-v0-t="badge"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-pen-tool w-3 h-3 mr-1"
                  >
                    <path
                      d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"
                    ></path>
                    <path
                      d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"
                    ></path>
                    <path d="m2.3 2.3 7.286 7.286"></path>
                    <circle cx="11" cy="11" r="2"></circle></svg
                  >UI/UX设计
                </div>
                <div
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white/10"
                  data-v0-t="badge"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-book-open w-3 h-3 mr-1"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg
                  >技术写作
                </div>
                <div
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-white/10"
                  data-v0-t="badge"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-heart w-3 h-3 mr-1"
                  >
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    ></path></svg
                  >分享与热心帮助
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LzyEnterVisible>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div
        class="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
        v-for="(item, index) in record"
      >
        <div class="p-6 flex flex-col items-center">
          <p class="text-3xl font-bold mb-1">
            {{ Math.round(counts[index]?.value || 0) }}
          </p>
          <p class="text-sm text-muted-foreground flex items-center">
            <LzyIcon :name="item.icon" class="mr-1" />
            {{ item.labal }}
          </p>
        </div>
      </div>
    </div>
    <h2 class="text-2xl font-bold mb-6">技能与工具</h2>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-12">
      <div class="flex flex-col items-center" v-for="item in skills.front">
        <div class="w-24 h-16 rounded-xl bg-muted flex items-center justify-center mb-2">
          <LzyIcon :name="item.icon" size="23" />
        </div>
        <p class="text-sm">{{ item.text }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-12">
      <div class="flex flex-col items-center" v-for="item in skills.rear">
        <div class="w-24 h-16 rounded-xl bg-muted flex items-center justify-center mb-2">
          <LzyIcon :name="item.icon" size="23" />
        </div>
        <p class="text-sm">{{ item.text }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-12">
      <div class="flex flex-col items-center" v-for="item in skills.other">
        <div class="w-24 h-16 rounded-xl bg-muted flex items-center justify-center mb-2">
          <LzyIcon :name="item.icon" size="23" />
        </div>
        <p class="text-sm">{{ item.text }}</p>
      </div>
    </div>
    <h2 class="text-2xl font-bold mb-6">职业经历</h2>
    <div class="space-y-6 mb-12">
      <div class="flex">
        <div class="flex flex-col items-center mr-4">
          <div class="w-3 h-3 rounded-full bg-primary"></div>
          <div class="w-0.5 h-full bg-border"></div>
        </div>
        <div>
          <div class="bg-card rounded-lg p-4 border">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold">中级前端开发</h3>
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-muted hover:bg-themeColor/80 hover:text-white select-none"
                data-v0-t="badge"
              >
                现在
              </div>
            </div>
            <p class="text-sm text-muted-foreground mb-2">某科技公司</p>
            <p class="text-sm">
              负责公司产品的前端架构设计和开发，优化用户体验，提升产品质量。
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col items-center mr-4">
          <div class="w-3 h-3 rounded-full bg-muted"></div>
          <div class="w-0.5 h-full bg-border"></div>
        </div>
        <div>
          <div class="bg-card rounded-lg p-4 border">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold">UI/UX设计师</h3>
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                data-v0-t="badge"
              >
                2019-2022
              </div>
            </div>
            <p class="text-sm text-muted-foreground mb-2">设计工作室</p>
            <p class="text-sm">负责产品界面设计，用户体验研究，交互设计等工作。</p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col items-center mr-4">
          <div class="w-3 h-3 rounded-full bg-muted"></div>
        </div>
        <div>
          <div class="bg-card rounded-lg p-4 border">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold">初级前端开发</h3>
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                data-v0-t="badge"
              >
                2017-2019
              </div>
            </div>
            <p class="text-sm text-muted-foreground mb-2">网络科技有限公司</p>
            <p class="text-sm">参与公司网站和应用程序的前端开发工作。</p>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-2xl font-bold mb-6">关于最后</h2>
    <div
      class="rounded-lg border bg-card text-card-foreground shadow-sm mb-12"
      data-v0-t="card"
    >
      <div class="p-6">
        <p class="mb-4">
          这个博客创建于2020年，主要记录我在技术学习、设计思考和生活感悟方面的内容。
          希望通过分享我的经验和知识，能够帮助到更多的人。
        </p>
        <p class="mb-4">
          博客使用 Nuxt.js 构建，采用 Tailwind CSS 进行样式设计。
          如果你对本站有任何建议或想法，欢迎通过邮件或社交媒体与我联系。
        </p>
        <div class="flex items-center text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-users w-4 h-4 mr-1"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
          ><span>感谢每一位访问者和支持者！</span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">联系我</h2>
      <p class="text-muted-foreground mb-6">如果你有任何问题或合作意向，欢迎随时联系我</p>
      <div class="flex justify-center space-x-4">
        <a
          href="mailto:lzyszds@qq.com"
          class="px-4 py-2 rounded-md bg-muted text-primary-foreground transition-colors"
        >
          发送邮件
        </a>
        <a
          href="#"
          class="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
        >
          留言板
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
a {
  color: inherit;
}
</style>
