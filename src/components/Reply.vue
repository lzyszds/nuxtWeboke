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
const oldReplicate = computed(() => props.oldReplicate);
//评论的id
const replyId = props.replyId;
const emit = defineEmits(["replying", "remReply"]);
const nowReplyId = ref(0);

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
</script>

<template>
  <div class="reply">
    <section v-for="(item, index) in replydata" :key="index">
      <div
        :class="item.replyId == 0 ? 'mainReply item' : 'secondaryReply item'"
        v-if="index < (item.replyId == 0 ? showNumber.level1 : showNumber.level2)"
      >
        <section class="item-left">
          <img :src="'/hono/static' + item.headImg" alt="" />
        </section>
        <section class="item-right">
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
            </span>
            <LzyEnterVisible
              animate-class="zyAnimate__fadeInUp"
              target="section"
              delay="0"
              v-if="item.children.length == 0 && nowReplyId == item.commentId"
            >
              <img :src="'/hono/static' + findComment(item.replyId)?.headImg" alt="" />
              <b>{{ findComment(item.replyId)!.userName }}:</b>
              <b>{{ findComment(item.replyId)!.content }}</b>
            </LzyEnterVisible>
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
        </section>
      </div>
      <button
        class="text-center w-full rounded-xl mb-4 text-sm font-dindin bg-borderColor block border-[3px] border-black"
        v-if="index == (item.replyId == 0 ? showNumber.level1 : showNumber.level2)"
        @click="() => (showNumber[item.replyId == 0 ? 'level1' : 'level2'] += 3)"
      >
        显示更多评论...
      </button>
    </section>
  </div>
</template>

<style scoped>
.reply {
  .item {
    margin: 20px 0;
    display: grid;
    grid-template-columns: 60px 2fr;
    grid-template-rows: auto auto;
    &.mainReply {
      border-bottom: 1px solid #eee;
    }
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
        padding: 2px 0;
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
        }
        section {
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          max-height: 130px;
          background-color: #fff;
          border: 3px solid var(--themeColor);
          border-radius: 10px;
          z-index: 10;
          transition: 0.14s;
          padding: 5px;
          display: flex;
          gap: 10px;
          box-shadow: 14px 19px 25px rgba(0, 0, 0, 0.1), inset 0 1px 4px rgb(0, 0, 0),
            inset 1px 1px 4px rgb(0, 0, 0), inset 1px 0px 4px rgb(0, 0, 0),
            inset -1px 0px 4px rgb(0, 0, 0), inset 0 -1px 4px rgb(0, 0, 0);
          img {
            margin-right: 0;
          }
          b {
            color: #333;
            max-width: calc(100% - 100px);
            font-weight: 500;
          }
          b:nth-child(3) {
            overflow-y: auto;
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
    border-radius: 10px;
    padding: 5px 0;
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

.dark .reply {
  .mainReply {
    border-bottom: 1px solid #888;
  }
  .item-right-info {
    span {
      color: #fff;
    }
  }
  .item-right-bottom {
    span {
      color: #afccff !important;
    }
    color: #fff;
  }

  .reply {
    .item-right-info {
      span {
        color: #fff;
      }
    }
  }
}
.zyAnimate__fadeInUp {
  animation: zyAnimate__fadeInUp 0.3s;
}
</style>
