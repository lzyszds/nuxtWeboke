<script setup lang="ts" name="LzyIcon">
import { computed, type CSSProperties } from 'vue'

interface Props {
  /** 图标名称 */
  name: string
  /** 图标大小，支持数字、字符串和预设值 */
  size?: string | number
  /** 自定义样式 */
  style?: string | CSSProperties
  /** 动画类型 */
  animation?: 'pulse' | 'rubberBand' | 'heartBeat' | 'bounce' | 'shake' | 'rotate' | 'none'
  /** 图标标题，用于无障碍访问 */
  title?: string
  /** 图标颜色 */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示为按钮样式 */
  button?: boolean
  /** 点击事件是否启用 */
  clickable?: boolean
  /** 预设大小 */
  preset?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'none',
  disabled: false,
  button: false,
  clickable: false,
  preset: 'md'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

// 预设尺寸
const PRESET_SIZES = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px'
} as const

// 计算图标大小
const computedSize = computed(() => {
  if (props.preset && !props.size) {
    return PRESET_SIZES[props.preset]
  }

  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    return /\d+(px|rem|em|%)$/.test(size) ? size : `${size}px`
  }

  return '16px'
})

// 计算样式 - 关键修改在这里
const computedStyle = computed<CSSProperties>(() => {
  const baseStyle: CSSProperties = {
    fontSize: computedSize.value,
    width: computedSize.value,
    height: computedSize.value,
    // 关键修改：使用 inline-flex 而不是 inline-flex，并添加垂直对齐
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'text-bottom', // 关键：与文字基线对齐
    flexShrink: 0
  }

  // 如果是按钮模式，不需要 verticalAlign
  if (props.button) {
    delete baseStyle.verticalAlign
  }

  if (props.color) {
    baseStyle.color = props.color
  }

  if (typeof props.style === 'string') {
    return baseStyle
  }

  return { ...baseStyle, ...props.style }
})

// 计算CSS类
const computedClass = computed(() => {
  const classes = ['lzy-icon']

  if (props.animation && props.animation !== 'none') {
    classes.push(`animate__${props.animation}`)
  }

  if (props.disabled) {
    classes.push('lzy-icon--disabled')
  }

  if (props.button) {
    classes.push('lzy-icon--button')
  }

  if (props.clickable || props.button) {
    classes.push('lzy-icon--clickable')
  }

  return classes
})

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}

const handleMouseEnter = (event: MouseEvent) => {
  if (props.disabled) return
  emit('mouseenter', event)
}

const handleMouseLeave = (event: MouseEvent) => {
  if (props.disabled) return
  emit('mouseleave', event)
}

// 计算是否应该有点击行为
const shouldHandleClick = computed(() => {
  return (props.clickable || props.button) && !props.disabled
})
</script>

<template>
  <Icon
    :class="computedClass"
    :name="props.name"
    :style="computedStyle"
    :title="props.title"
    :tabindex="shouldHandleClick ? 0 : undefined"
    :role="shouldHandleClick ? 'button' : undefined"
    :aria-label="props.title"
    :aria-disabled="props.disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  />
</template>

<style scoped>
.lzy-icon {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  /* 确保图标与文字对齐的关键样式 */
  line-height: 1;
}

/* 当图标不是按钮时，确保与文字对齐 */
.lzy-icon:not(.lzy-icon--button) {
  vertical-align: text-bottom;

  /* vertical-align: -0.125em;  微调对齐 */
  /* vertical-align: middle;    居中对齐 */
  /* vertical-align: baseline;  基线对齐 */
}

.lzy-icon--clickable {
  cursor: pointer;
}

.lzy-icon--clickable:hover:not(.lzy-icon--disabled) {
  opacity: 0.8;
  transform: scale(1.05);
}

.lzy-icon--clickable:active:not(.lzy-icon--disabled) {
  transform: scale(0.95);
}

.lzy-icon--button {
  padding: 8px;
  border-radius: 6px;
  /* 按钮模式下重置垂直对齐 */
  vertical-align: baseline;
}

.lzy-icon--button:hover:not(.lzy-icon--disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

.lzy-icon--button:focus-visible {
  outline: 2px solid #1890ff;
  outline-offset: 2px;
}

.lzy-icon--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 动画定义 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes rubberBand {
  from {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate__pulse {
  animation: pulse 2s infinite;
}
.animate__rubberBand {
  animation: rubberBand 1s;
}
.animate__heartBeat {
  animation: heartBeat 1.3s ease-in-out infinite;
}
.animate__bounce {
  animation: bounce 1s infinite;
}
.animate__shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
.animate__rotate {
  animation: rotate 2s linear infinite;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .lzy-icon--button:hover:not(.lzy-icon--disabled) {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

/* 响应式适配 */
@media (prefers-reduced-motion: reduce) {
  .lzy-icon,
  .lzy-icon * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
