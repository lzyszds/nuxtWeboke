<script setup lang="ts">
import { timeAgo } from "@/utils/common";
import type { Replydata } from "~/types/Comment";

interface Props {
  oldReplicate: Replydata[];
  replydata: Replydata[];
  replyId: Map<
    number,
    {
      isReply: boolean;
      ground_id: number;
    }
  >;
}
const reply = templateRef("reply");

const props = defineProps<Props>();

//评论数据
const replydata = computed(() => props.replydata);
//评论数据复制
const oldReplicate = computed(() => props.oldReplicate);
//评论的id
const replyId = props.replyId;
const emit = defineEmits(["replying", "remReply"]);
const nowReplyId = ref(0);

const infoStates = [
  {
    name: "IP",
    icon: "iconoir:map-pin",
    key: "userIp",
  },
  {
    name: "设备系统",
    icon: "iconoir:brain-warning",
    key: "deviceSystem",
  },
  {
    name: "浏览器系统",
    icon: "iconoir:window-check",
    key: "browserSystem",
  },
];

//显示评论的数量，分别显示一级和二级评论
const showNumber = ref({
  level1: 5,
  level2: 3,
});

//回复评论方法
const replyComment = (item: Replydata) => {
  //判断是否是回复评论
  if (item.replyId == 0) {
    emit("replying", item, item.commentId);
  } else {
    emit("replying", item, item.groundId);
  }
  /* 让滚动条滚动到textarea底部 */
  const textarea = document.querySelector("#textarea");
  setTimeout(() => {
    textarea?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
};
//取消回复评论方法
const remReplyComment = (item: any, index: any) => {
  //判断是否是回复评论
  emit("remReply", item, index);
};

//根据评论回复id查询评论
const findComment = (id: number) => {
  return oldReplicate.value.find((item) => item.commentId == id);
};

const baseUrl = useRuntimeConfig().public.BASE_URL;

defineExpose({ reply });
</script>

<template>
  <div class="reply" ref="reply">
    <section
      v-for="(item, index) in replydata"
      :key="index"
      :id="'reply-' + item.commentId"
    >
      <div
        :class="item.replyId == 0 ? 'mainReply item' : 'secondaryReply item'"
        v-if="index < (item.replyId == 0 ? showNumber.level1 : showNumber.level2)"
      >
        <section class="item-left">
          <img :src="baseUrl + item.headImg" alt="" />
        </section>
        <section class="item-right">
          <div class="item-right-top">
            <span class="item-right-top-name dark:text-white text-black">
              {{ item.userName }}
            </span>
            <span class="item-right-top-time">{{ timeAgo(item.createDate) }}</span>
            <button
              v-if="!replyId.get(item.commentId)!.isReply"
              class="item-right-top-reply"
              @click="replyComment(item)"
            >
              回复
            </button>
            <button
              v-else
              class="item-right-top-reply"
              @click="remReplyComment(item, index)"
            >
              取消回复
            </button>
            <span class="item-right-info">
              <span v-for="info in infoStates" :key="info.name">
                <LzyIcon :name="info.icon" preset="sm" />
                {{ item[info.key] || "未知" }}
              </span>
            </span>
          </div>
          <div class="item-right-bottom" @mouseleave="nowReplyId = 0">
            <span @click="nowReplyId = item.commentId">
              {{ item.replyPeople ? "@" + item.replyPeople : "" }}
            </span>

            <LzyEnterVisible
              animate-class="zyAnimate__fadeInUp"
              target="section"
              delay="0"
              v-if="item.children.length == 0 && nowReplyId == item.commentId"
            >
              <img :src="baseUrl + findComment(item.replyId)?.headImg" alt="" />
              <b>{{ findComment(item.replyId)!.userName }}:</b>
              <b>{{ findComment(item.replyId)!.content }}</b>
            </LzyEnterVisible>
            {{ item.content }}
          </div>
          <DetailReply
            v-if="item.children"
            :oldReplicate="oldReplicate"
            :replydata="item.children"
            :replyId="replyId"
            @replying="replyComment"
            @remReply="remReplyComment"
          />
        </section>
      </div>
      <button
        class="text-center w-1/2 leading-7 rounded-xl m-auto mb-2 text-sm font-dindin bg-borderColor block border-[1px] border-black"
        v-if="index == (item.replyId == 0 ? showNumber.level1 : showNumber.level2)"
        @click="() => (showNumber[item.replyId == 0 ? 'level1' : 'level2'] += 3)"
      >
        显示更多评论...
      </button>
    </section>
  </div>
</template>

<style scoped>
@import url("~/styles/reply.css");
</style>
