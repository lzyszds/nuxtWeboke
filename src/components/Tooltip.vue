<script lang="ts" setup>
const props = defineProps<{
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  disabledTooltipText?: string;
}>();

const tooltipText = props.tooltipText || "默认工具提示文本";
const tooltipPosition = props.tooltipPosition || "top";
</script>

<template>
  <button class="tooltip-container" :class="{ disabled: disabled }" :disabled="disabled">
    <span :class="['tooltip', tooltipPosition]" role="tooltip" :aria-label="tooltipText">
      {{ disabled ? disabledTooltipText : tooltipText }}
      <span class="tooltip-arrow" :class="tooltipPosition"></span>
    </span>
    <span class="button-content">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  outline: none;
  z-index: 99;
}

.tooltip-container:active {
  transform: translateY(0);
}

.tooltip-container.disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
}

.tooltip-container.disabled:hover {
  background: #6c757d;
  transform: none;
  box-shadow: none;
}

.tooltip {
  position: absolute;
  background: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  line-height: initial;
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}

/* Top positioning */
.tooltip.top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
}

.tooltip-arrow.top {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}

/* Bottom positioning */
.tooltip.bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
}

.tooltip-arrow.bottom {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #333;
}

/* Left positioning */
.tooltip.left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(4px);
}

.tooltip-arrow.left {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #333;
}

/* Right positioning */
.tooltip.right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
}

.tooltip-arrow.right {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #333;
}

/* Hover states */
.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip-container:hover .tooltip.top {
  transform: translateX(-50%) translateY(0);
}

.tooltip-container:hover .tooltip.bottom {
  transform: translateX(-50%) translateY(0);
}

.tooltip-container:hover .tooltip.left {
  transform: translateY(-50%) translateX(0);
}

.tooltip-container:hover .tooltip.right {
  transform: translateY(-50%) translateX(0);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Focus states for accessibility */
.tooltip-container:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.tooltip-container:focus-visible .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip-container:focus-visible .tooltip.top {
  transform: translateX(-50%) translateY(0);
}

.tooltip-container:focus-visible .tooltip.bottom {
  transform: translateX(-50%) translateY(0);
}

.tooltip-container:focus-visible .tooltip.left {
  transform: translateY(-50%) translateX(0);
}

.tooltip-container:focus-visible .tooltip.right {
  transform: translateY(-50%) translateX(0);
}
</style>
