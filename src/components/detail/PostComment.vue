<script setup lang="ts">
import type { CommentsType, Replydata } from "~/types/Comment";
import { useNotification } from "@/hooks/notification";
const useOpenai = useOpenaiStore();
const { notify, closeAll } = useNotification();

const route = useRoute();
const aid = route.params.id;
const selcetRound = templateRef("selcetRound");
const getDefaultValue = () => {
  const defaultval = selcetRound.value.parentNode?.querySelectorAll("img")[
    information.rangeIndex
  ];
  return defaultval;
};

//主题card class
const cardClass =
  "bg-white dark:bg-dark-background p-2 px-6 pb-7 text-lg rounded-2xl text-[15px]";
const comImg = ref([]);

const replyArr = reactive({
  replyId: new Map(), //回复评论的id
  replyName: "发表评论", //回复评论初始变量
});

const remarkList = ref<Replydata[]>([]);
const oldRemarkList = ref<Replydata[]>([]);

// 获取评论列表
const getRemarkList = () => {
  const replyId = replyArr.replyId;
  return new Promise((resolve) => {
    //初始的评论列表
    fetch("/nuxtApi/comment/getArticleComment?aid=" + aid)
      .then((res) => res.json())
      .then(({ data }) => {
        oldRemarkList.value = data;
        remarkList.value = [];
        //初始化回复评论的id
        data.forEach((remark: any) => {
          remark.children = [];
          replyId.set(remark.commentId, {
            isReply: false,
            groundId: remark.commentId,
          });
        });
        // 遍历评论列表，为每个评论添加回复列表
        for (let item of data) {
          if (item.replyId == 0) {
            remarkList.value.push(item);
          } else {
            for (let remark of data) {
              if (remark.commentId == item.groundId) {
                remark.children.push(item);
              }
            }
          }
        }
        resolve(remarkList.value);
      });
  });
};

//评论上方的诗句请求
// const textbefore = ref<String>("寻找中...");
// setTimeout(async () => {
//   const { data: content } = await useFetch("/api/toolkit/getVerse", {
//     transform: (data: any) => {
//       return data.data.content;
//     },
//   });
//   textbefore.value = content.value;
// }, 50);

//评论人个人信息
const { information } = useInformationStore();
//评论人个人信息验证
const comInfo = () => {
  if (information.comContent.length == 0) {
    return console.log("评论内容不能为空");
  } else if (information.name == "") {
    information.nameError = true;
    setTimeout(() => {
      information.nameError = false;
    }, 820);
    return console.log("昵称不能为空");
  } else if (information.email == "") {
    information.emailError = true;
    setTimeout(() => {
      information.emailError = false;
    }, 820);
    return console.log("邮箱不能为空");
  }
  return true;
};

//处理回复评论的id 判断其否为二级评论，-1为一级评论，否则为二级评论
const replyIdval = () => {
  for (let [key, item] of replyArr.replyId) {
    if (item.isReply) return key;
  }
  return 0;
};
//评论提交
const comSubmit = async () => {
  const replyId = replyArr.replyId;
  //验证信息
  if (!comInfo()) return;
  //处理一级评论的id
  const groundVal = () => {
    for (let [_key, item] of replyId) {
      if (item.isReply) return item.groundId;
    }
    return 0;
  };

  const remarkData: CommentsType = {
    aid: Number(aid), //文章id
    replyId: replyIdval(), //回复评论的id
    groundId: groundVal(), //一级评论的id
    name: information.name, //评论人昵称
    email: information.email, //评论人邮箱
    webSite: information.webSite, //评论人网站
    content:
      typeof information.comContent !== "string"
        ? JSON.stringify(information.comContent)
        : information.comContent, //评论内容
    imgIndex: information.rangeIndex, //评论人头像
    userIp: "", //用户ip
    replyPeople: replyArr.replyName.replace("@", ""),
  };
  //发送请求,提交评论
  fetch("/nuxtApi/comment/addComment", {
    method: "POST",
    body: JSON.stringify(remarkData),
    headers: {
      "user-agent": navigator.userAgent,
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      closeAll();
      if (res.code == 200) {
        console.log(`评论成功,感谢你的评论！`);
        getRemarkList().then(() => {
          //清空评论内容
          information.comContent = "";
          remReplyComment();
          notify({
            message: `评论成功,感谢你的评论！`,
            position: "bottom-center",
            duration: 2000,
            dangerouslyUseHTMLString: true,
          });
        });
      } else {
        notify({
          message: `评论失败,请稍后再试！`,
          position: "bottom-center",
          duration: 2000,
          dangerouslyUseHTMLString: true,
        });
      }
    });
};

//回复一级评论
const replyComment = (item: any, index: any) => {
  const replyId = replyArr.replyId;
  //每次选择回复都要将其他的回复id置为0
  handleReplyData();
  //将当前回复的id置为当前评论的id
  replyId.set(item.commentId, {
    isReply: true,
    groundId: index,
  });
  replyArr.replyName = "@" + item.userName;
  //给textarea获取焦点
  const textarea = document.querySelector("#textarea") as any;
  textarea?.focus();
};

//取消回复
const remReplyComment = () => {
  handleReplyData();
  replyArr.replyName = "发表评论";
};

function handleReplyData() {
  const replyId = replyArr.replyId;
  //每次选择回复都要将其他的回复id置为-1
  for (let [key, item] of replyId) {
    replyId.set(key, {
      isReply: false,
      groundId: item.groundId,
    });
  }
}

//选择头像时候的移动哐哐的事件
const moveTo = () => {
  const defaultval = getDefaultValue()?.offsetLeft;
  selcetRound.value.style.transform = `translateX(${defaultval! - 8}px)`;
};
onMounted(async () => {
  // 获取评论头像
  const data = await fetch("/nuxtApi/comment/getCommentAvatar").then((res) => res.json());
  comImg.value = data;

  //获取评论列表
  await getRemarkList();
  /* 默认选中头像 并且 滚动条移动到默认位置 */
  moveTo();
  const defaultval = getDefaultValue()?.offsetLeft;
  wheel.value!.scrollTo({
    left: defaultval!,
    top: 0,
    behavior: "smooth",
  });
});

//评论头像更换事件
function setRange(clickIndex: number) {
  information.rangeIndex = clickIndex;
  const index = information.rangeIndex;
  if (index >= 0 && index <= 11) {
    moveTo();
  } else {
    if (index <= 0) information.rangeIndex = 0;
    if (index >= 11) information.rangeIndex = 11;
  }
}

//滚轮事件 用于选择头像
const wheel = templateRef("wheel");
let scrollx = 0;
const onWheelfn = (e: any) => {
  const defaultval = getDefaultValue()?.width;
  window.screen.width > 768 && e.preventDefault();
  if (e.deltaY < 0 && scrollx > 0) scrollx -= defaultval! + 16;
  if (e.deltaY > 0 && scrollx < 360) scrollx += defaultval! + 16;
  wheel.value!.scrollTo({
    left: scrollx,
    top: 0,
    behavior: "smooth",
  });
};

//生成Ai评论
const createAiComment = async () => {
  //获取评论内容
  useOpenai.getAiComment(Number(aid), replyIdval());
  //给textarea获取焦点
  const textarea = document.querySelector("#textarea") as any;
  textarea?.focus();
};

// 监听ai生成的评论内容，这样才能实现流式显示
watch(
  () => useOpenai.commentContent,
  (newVal) => {
    if (newVal) {
      information.comContent = newVal;
    }
  }
);
</script>

<template>
  <!-- 发送评论组件 -->
  <div v-transition="'animate__fadeInUp'" class="grid sm:flex w-full gap-2">
    <!-- 发布评论 -->
    <section
      class="transition-all flex-1 p-3 text-lg rounded-2xl border-[1px] shadow-sm hover:shadow-lg text-color"
    >
      <div
        :class="cardClass"
        class="py-[4px] rounded-full flex content-center justify-between w-full relative text-black dark:border-white mb-2 font-dindin"
      >
        <span>
          <LzyIcon style="vertical-align: sub;" name="iconoir:chat-plus-in" size="20"></LzyIcon>
          <span class="px-2 dark:text-[#eee]"> {{ replyArr.replyName }} </span>
        </span>
        <LzyIcon
          class="hover:text-themeColor cursor-pointer mt-1"
          name="iconoir:plug-type-a"
          size="20"
          title="生成Ai评论"
          @click="createAiComment"
        ></LzyIcon>
      </div>
      <div :class="cardClass" class="relative font-dindin h-[200px]">
        <textarea
          class="w-full h-[88%] transition-all text-base border-b-[1px] focus:border-b-[#2c3e50] resize-none outline-none dark:bg-dark-background"
          id="textarea"
          v-model="information.comContent"
        ></textarea>
        <div class="w-[90%] text-base select-none absolute bottom-0 text-right">
          <LzyIcon
            class="absolute top-1/2 left-2 -translate-y-1/2 z-50 hover:text-themeColor"
            name="iconoir:emoji-satisfied"
            size="20"
          ></LzyIcon>

          <span class="pointer-events-none"> “恶语伤人六月寒, 良言一句暖三冬”</span>
        </div>
      </div>
    </section>

    <!-- 头像选择 -->
    <section
      class="flex-1 p-2 text-lg rounded-2xl flex border-[1px] shadow-sm hover:shadow-lg text-color"
    >
      <div :class="cardClass" class="w-full">
        <div class="overflow-hidden flex gap-1">
          <button>
            <LzyIcon name="iconoir:nav-arrow-left" animation="animate__heartBeat" />
          </button>
          <div @wheel="onWheelfn" ref="wheel" class="overflow-x-scroll">
            <p class="flex gap-4 relative px-2">
              <span
                class="absolute w-12 h-12 cursor-pointer rounded-full"
                ref="selcetRound"
                id="selcetRound"
              ></span>
              <img
                class="w-12 h-12 cursor-pointer rounded-full"
                v-for="(item, index) in comImg"
                :key="index"
                :src="item"
                @click="setRange(index)"
                :class="{ animate__headShake: information.rangeIndex == index }"
                alt=""
              />
            </p>
          </div>
          <button>
            <lzy-icon
              name="iconoir:nav-arrow-right"
              animation="animate__heartBeat"
            ></lzy-icon>
          </button>
        </div>
        <p class="my-2 text-sm text-center font-dindin font-semibold dark:text-white">
          昵称：
          <input
            type="text"
            :class="{ 'apply-shake': information.nameError }"
            v-model="information.name"
            placeholder="昵称或者QQ号"
          />
        </p>
        <p class="mb-2 text-sm text-center font-dindin font-semibold dark:text-white">
          邮箱：
          <input
            type="text"
            :class="{ 'apply-shake': information.emailError }"
            v-model="information.email"
            placeholder="xxx@xxx.xxx"
          />
        </p>
        <p class="mb-2 text-sm text-center font-dindin font-semibold dark:text-white">
          网站：
          <input type="text" v-model="information.webSite" placeholder="你的网站(选填)" />
        </p>
        <p
          class="bg-borderColor mt-5 font-semibold cursor-pointer py-1 w-8/12 text-sm rounded-full text-center mx-auto"
          @click="comSubmit"
        >
          <button>发布评论</button>
        </p>
        <!-- <p class="btn del"><button> 取消评论 </button></p> -->
      </div>
    </section>
  </div>

  <!-- 评论列表 -->
  <div
    v-transition="'animate__fadeInUp'"
    class="overflow-hidden relative flex-1 p-3 text-lg rounded-2xl border-[1px] text-color shadow-lg"
  >
    <header class="block px-6 font-dindin">
      <LzyIcon name="iconoir:message-text" style="vertical-align: middle"></LzyIcon>
      评论区
    </header>
    <div :class="cardClass" class="rounded-3xl">
      <div class="comContent">
        <h3
          class="text-black text-center font-semibold py-4"
          v-if="remarkList.length == 0"
        >
          <LzyIcon size="150px" class="text-black" name="iconoir:send-mail"></LzyIcon>
          <br />
          暂无评论，快来试试评论吧！
        </h3>
        <DetailReply
          v-show="remarkList.length != 0"
          :oldReplicate="oldRemarkList"
          :replydata="remarkList"
          :replyId="replyArr.replyId"
          @replying="replyComment"
          @remReply="remReplyComment"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .before {
  user-select: none;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #000;
  z-index: 2;
  background-color: #ffe14d;
  box-shadow: -1px 3px 1px 0 #fff, -1px 3px 3px 5px #000;
  color: #000;
  text-align: center;
  line-height: 100px;
  font-size: 15px;
  font-family: "dindin";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */

#selcetRound {
  box-shadow: inset 0 0 10px 1px var(--themeColor);
  transition: 0.14s;
}

input {
  width: 75%;
  height: auto;
  font-size: 13px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 4px 10px;
  font-family: "dindin";
  font-weight: 100;
  color: var(--color);
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: var(--themeColor);
  }
}

.dark input {
  background-color: #eee;
}
</style>
