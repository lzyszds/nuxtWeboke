<template>
  <div
    :class="[
      'fadeNotif fixed rounded-md z-50 max-w-xs w-full pointer-events-auto overflow-hidden transform transition-all duration-300 ease-out',
      positionClass,
      typeClasses.container,
      'shadow-xl',
    ]"
  >
    <div class="p-4">
      <div class="flex items-start">
        <!-- 图标区域 -->
        <div class="flex-shrink-0 mr-3">
          <div
            :class="[
              'w-6 h-6 rounded-full flex items-center justify-center',
              typeClasses.iconBg,
            ]"
          >
            <!-- 成功图标 -->
            <svg
              v-if="type === 'success' "
              :class="typeClasses.icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- 警告图标 -->
            <svg
              v-else-if="type === 'warning' || type === 'error'"
              :class="typeClasses.icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- 信息图标 -->
            <svg
              v-else
              :class="typeClasses.icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="flex-1 min-w-0">
          <div v-if="title" :class="['text-sm font-semibold mb-1', typeClasses.title]">
            {{ title }}
          </div>
          <p
            v-if="dangerouslyUseHTMLString"
            :class="['text-sm leading-5', typeClasses.message]"
            v-html="message"
          ></p>
          <p v-else :class="['text-sm leading-5', typeClasses.message]">
            {{ message }}
          </p>
        </div>

        <!-- 关闭按钮 -->
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="close"
            :class="[
              'rounded-md inline-flex p-1.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
              typeClasses.closeButton,
            ]"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 进度条 -->
      <div
        v-if="showProgress && duration > 0"
        class="mt-3 -mb-1 -mx-4 flex justify-center"
      >
        <div
          class="h-1 bg-gray-200 bg-opacity-20 w-[calc(100%_-_32px)] rounded-full overflow-hidden"
        >
          <div
            :class="[
              'h-full  transition-all ease-linear rounded-full ',
              typeClasses.progress,
            ]"
            :style="{ width: progressWidth + '%', transitionDuration: duration + 'ms' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type NotificationType = "success" | "error" | "warning" | "info";

interface Props {
  message: string;
  title?: string;
  type?: NotificationType;
  position?: NotificationPosition;
  duration?: number;
  dangerouslyUseHTMLString?: boolean;
  showProgress?: boolean;
  onClose: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  position: "top-right",
  duration: 4500,
  dangerouslyUseHTMLString: false,
  showProgress: true,
});

const progressWidth = ref(100);

const positionClass = computed(() => {
  switch (props.position) {
    case "top-left":
      return "top-4 left-4";
    case "top-center":
      return "top-4 left-1/2 -translate-x-1/2";
    case "top-right":
      return "top-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    case "bottom-center":
      return "bottom-4 left-1/2 -translate-x-1/2";
    case "bottom-right":
      return "bottom-4 right-4";
    default:
      return "top-4 right-4";
  }
});

const typeClasses = computed(() => {
  switch (props.type) {
    case "success":
      return {
        container: "bg-green-50 border-green-400 ring-1 ring-green-200",
        iconBg: "bg-green-100",
        icon: "text-green-600",
        title: "text-green-800",
        message: "text-green-700",
        closeButton:
          "text-green-400 hover:text-green-600 hover:bg-green-100 focus:ring-green-500",
        progress: "bg-green-400",
      };
    case "error":
      return {
        container: "bg-red-50 border-red-400 ring-1 ring-red-200",
        iconBg: "bg-red-100",
        icon: "text-red-600",
        title: "text-red-800",
        message: "text-red-700",
        closeButton:
          "text-red-400 hover:text-red-600 hover:bg-red-100 focus:ring-red-500",
        progress: "bg-red-400",
      };
    case "warning":
      return {
        container: "bg-yellow-50 border-yellow-400 ring-1 ring-yellow-200",
        iconBg: "bg-yellow-100",
        icon: "text-yellow-600",
        title: "text-yellow-800",
        message: "text-yellow-700",
        closeButton:
          "text-yellow-400 hover:text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-500",
        progress: "bg-yellow-400",
      };
    case "info":
    default:
      return {
        container: "bg-blue-50 border-blue-400 ring-1 ring-blue-200",
        iconBg: "bg-blue-100",
        icon: "text-blue-600",
        title: "text-blue-800",
        message: "text-blue-700",
        closeButton:
          "text-blue-400 hover:text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
        progress: "bg-blue-400",
      };
  }
});

const close = () => {
  props.onClose();
};

onMounted(() => {
  if (props.duration > 0) {
    // 启动进度条动画
    if (props.showProgress) {
      setTimeout(() => {
        progressWidth.value = 0;
      }, 100);
    }

    // 自动关闭
    setTimeout(close, props.duration);
  }
});

onUnmounted(() => {
  // Clean up any side effects if needed
});
</script>

<style scoped>
.fadeNotif {
  animation: slideIn 0.4s ease-out, fadeOut 0.3s ease-in 4.2s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* 针对不同位置的动画调整 */
.top-left .fadeNotif,
.bottom-left .fadeNotif {
  animation: slideInLeft 0.4s ease-out, fadeOut 0.3s ease-in 4.2s;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.top-center .fadeNotif,
.bottom-center .fadeNotif {
  animation: slideInDown 0.4s ease-out, fadeOut 0.3s ease-in 4.2s;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
