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

const props = defineProps<Props>();

//评论数据
const replydata = computed(() => props.replydata);
//评论数据复制
const oldReplicate = [...props.oldReplicate];
//评论的id
const replyId = props.replyId;
const emit = defineEmits(["replying", "remReply"]);

const nowReplyId = ref(0);

//回复评论方法
const replyComment = (item: Replydata) => {
  //判断是否是回复评论
  if (item.replyId == 0) {
    emit("replying", item, item.commentId);
  } else {
    emit("replying", item, item.groundId);
  }
};
//取消回复评论方法
const remReplyComment = (item: any, index: any) => {
  //判断是否是回复评论
  emit("remReply", item, index);
};

//根据评论回复id查询评论
const findComment = (id: number) => {
  return oldReplicate.find((item) => item.commentId == id);
};
</script>

<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in replydata" :key="index">
      <div class="item-left">
        <img :src="'/hono/static' + item.headImg" alt="" />
      </div>
      <div class="item-right">
        <div class="item-right-top">
          <span class="item-right-top-name dark:text-white text-black">{{
            item.userName
          }}</span>
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
            <span>
              <LzyIcon
                name="iconoir:map-pin"
                style="vertical-align: middle; margin-right: 2px"
                size="15px"
              />{{ item.userIp }}
            </span>
            <span>
              <LzyIcon
                name="iconoir:brain-warning"
                style="vertical-align: middle; margin-right: 2px"
                size="15px"
              />{{ item.deviceSystem }}
            </span>
            <span>
              <LzyIcon
                name="iconoir:window-check"
                style="vertical-align: middle; margin-right: 2px"
                size="15px"
              />{{ item.browserSystem }}
            </span>
          </span>
        </div>
        <div
          class="item-right-bottom"
          @click="nowReplyId = item.commentId"
          @mouseleave="nowReplyId = 0"
        >
          <span>
            {{ item.replyPeople ? "@" + item.replyPeople : "" }}
            <section v-if="item.children.length == 0 && nowReplyId == item.commentId">
              <img :src="'/hono/static' + findComment(item.replyId)?.headImg" alt="" />
              <span>{{ findComment(item.replyId)!.userName }}:</span>
              <span>{{ findComment(item.replyId)!.content }}</span>
            </section>
          </span>
          {{ item.content }}
        </div>
        <Reply
          v-if="item.children"
          :oldReplicate="oldReplicate"
          :replydata="item.children"
          :replyId="replyId"
          @replying="replyComment"
          @remReply="remReplyComment"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reply {
  .item {
    margin: 20px 0;
    display: grid;
    grid-template-columns: 60px 2fr;
    grid-template-rows: auto auto;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }

  .reply {
    grid-column: 2/4;

    .item {
      margin: 10px 0 0;
      grid-template-columns: 30px 2fr;
      gap: 10px;
      img {
        width: 30px;
        height: 30px;
      }
      .item-right-top {
        margin-bottom: 4px;
        letter-spacing: 2px;
      }

      .item-right-top-name {
        font-size: 16px;
      }

      .item-right-bottom {
        padding: 2px 5px;
        font-size: 14px;
        position: relative;

        & > span {
          font-size: 14px;
          color: #002f9e;
          font-family: "dindin";
          letter-spacing: 0px;
          user-select: none;

          &:hover {
            color: #004cff80;
          }

          section {
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            background-color: #fff;
            border: 3px solid #000;
            border-radius: 10px;
            z-index: 10;
            transition: 0.14s;
            padding: 5px;
            display: flex;
            gap: 10px;
            img {
              margin-right: 0;
            }
            span {
              color: #333;
              max-width: calc(100% - 100px);
              overflow-x: scroll;
            }
          }
        }
      }

      .item-right-info {
        span {
          line-height: 16px;
          font-size: 12px;
          color: #000;
          font-family: "dindin";
          letter-spacing: 0px;
          user-select: none;
          border-radius: 10px;
          padding: 0 5px;
          gap: 5px;

          svg {
            vertical-align: middle;
            margin: -2px 2px 0 0;
          }
        }
      }
    }
  }

  .item-right-top {
    margin-bottom: 7px;
    letter-spacing: 3px;
  }

  .item-right-top-name {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0px;
    font-family: none;
  }

  .item-right-top-time {
    font-size: 12px;
    color: #999;
    margin: 0 10px;
    font-family: "dindin";
    letter-spacing: 0px;
  }

  .item-right-top-reply {
    font-size: 12px;
    color: #ffff;
    height: 20px;
    line-height: 10px;
    font-family: "dindin";
    letter-spacing: 0px;
    background-color: var(--themeColor);
    border-radius: 7px;
    padding: 4px;
    user-select: none;
  }

  .item-right-bottom {
    background: #717b8820;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 15px;
  }

  .item-right-info {
    span {
      line-height: 16px;
      font-size: 12px;
      color: #000;
      font-family: "dindin";
      letter-spacing: 0px;
      user-select: none;
      border-radius: 10px;
      padding: 0 5px;
      gap: 5px;

      svg {
        vertical-align: middle;
        margin: -2px 2px 0 0;
      }
    }
  }
}
</style>
