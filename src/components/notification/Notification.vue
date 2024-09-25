<template>
  <Transition name="fade">
    <div v-if="isVisible" :class="['fixed z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden', positionClass]">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-1">
            <p v-if="dangerouslyUseHTMLString" class="text-sm font-medium text-gray-900" v-html="message"></p>
            <p v-else class="text-sm font-medium text-gray-900">{{ message }}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
  message: string;
  position?: NotificationPosition;
  duration?: number;
  dangerouslyUseHTMLString?: boolean;
  onClose: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top-right',
  duration: 4500,
  dangerouslyUseHTMLString: false,
});

const isVisible = ref(true);

const positionClass = computed(() => {
  switch (props.position) {
    case 'top-left': return 'top-4 left-4';
    case 'top-right': return 'top-4 right-4';
    case 'bottom-left': return 'bottom-4 left-4';
    case 'bottom-right': return 'bottom-4 right-4';
    default: return 'top-4 right-4';
  }
});

const close = () => {
  isVisible.value = false;
  props.onClose();
};

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(close, props.duration);
  }
});

onUnmounted(() => {
  // Clean up any side effects if needed
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
