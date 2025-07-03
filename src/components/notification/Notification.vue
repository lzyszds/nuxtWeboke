<template>
  <div
    :class="[
      'animate__animated animate__diybounce fixed z-50 max-w-xs w-full bg-[#ffffff90] backdrop-blur-md border-2 overflow-hidden transform transition-all duration-300 ease-in-out rounded-lg shadow-lg',
      positionClass,
      typeClasses.container,
    ]"
  >
    <div class="p-3 flex items-center">
      <!-- 图标区域 -->
      <div class="flex-shrink-0 mr-2">
        <div
          :class="[
            'w-5 h-5 rounded-full flex items-center justify-center',
            typeClasses.iconBg,
          ]"
        >
          <svg
            v-if="type === 'success'"
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
        <div v-if="title" :class="['text-xs font-medium mb-0.5', typeClasses.title]">
          {{ title }}
        </div>
        <p
          v-if="dangerouslyUseHTMLString"
          :class="['text-sm leading-4 font-dindin', typeClasses.message]"
          v-html="message"
        ></p>
        <p v-else :class="['text-xs leading-4', typeClasses.message]">
          {{ message }}
        </p>
      </div>

      <!-- 关闭按钮 -->
      <button
        @click="close"
        :class="[
          'p-1 rounded-md transition-colors duration-200',
          typeClasses.closeButton,
        ]"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- 进度条 -->
    <div
      v-if="showProgress && duration > 0"
      class="h-1 bg-opacity-20 bg-gray-800 w-[99%] m-auto overflow-hidden"
    >
      <div
        :class="['h-full transition-all ease-linear', typeClasses.progress]"
        :style="{ width: progressWidth + '%', transitionDuration: duration + 'ms' }"
      ></div>
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
        container: "bg-green-50 border-green-200",
        iconBg: "bg-green-100",
        icon: "text-green-500",
        title: "text-green-700",
        message: "text-green-700",
        closeButton: "text-green-400 hover:text-green-500 hover:bg-green-100",
        progress: "bg-green-500",
      };
    case "error":
      return {
        container: "bg-red-50 border-red-200",
        iconBg: "bg-red-100",
        icon: "text-red-500",
        title: "text-red-700",
        message: "text-red-600",
        closeButton: "text-red-400 hover:text-red-500 hover:bg-red-100",
        progress: "bg-red-500",
      };
    case "warning":
      return {
        container: "bg-yellow-50 border-yellow-200",
        iconBg: "bg-yellow-100",
        icon: "text-yellow-500",
        title: "text-yellow-700",
        message: "text-yellow-600",
        closeButton: "text-yellow-400 hover:text-yellow-500 hover:bg-yellow-100",
        progress: "bg-yellow-500",
      };
    case "info":
    default:
      return {
        container: "bg-blue-50 border-blue-200",
        iconBg: "bg-blue-100",
        icon: "text-blue-500",
        title: "text-blue-700",
        message: "text-blue-600",
        closeButton: "text-blue-400 hover:text-blue-500 hover:bg-blue-100",
        progress: "bg-blue-500",
      };
  }
});

const close = () => {
  props.onClose();
};

onMounted(() => {
  if (props.duration > 0) {
    if (props.showProgress) {
      setTimeout(() => {
        progressWidth.value = 0;
      }, 100);
    }
    setTimeout(close, props.duration);
  }
});
</script>

<style scoped>
.animate__diybounce {
  animation: bounce 1s;
}
@keyframes bounce {
  0%,
  20%,
  53%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0) translateX(-50%);
  }
  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1) translateX(-50%);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05) translateX(-50%);
  }
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0) scaleY(0.95) translateX(-50%);
  }
  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02) translateX(-50%);
  }
}
</style>
