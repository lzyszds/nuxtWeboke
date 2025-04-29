<script setup lang="ts">
type Props = {
  totalLength: number; // 总页数
  onCurrentChange: (index: number) => void; // 切换页码
  newPage: number; // 当前页码
};
const { totalLength, onCurrentChange, newPage } = defineProps<Props>();

const previousPage = () => {
  if (newPage === 1) return;
  onCurrentChange(newPage - 1);
};
const nextPage = () => {
  if (newPage === totalLength) return;
  onCurrentChange(newPage + 1);
};
</script>

<template>
  <div class="flex mt-10">
    <button
      class="w-7 h-7 text-sm transition-all flex justify-center items-center rounded-sm mr-2 hover:bg-themeColor-hover hover:text-white"
      @click="previousPage"
    >
      <LzyIcon name="iconoir:nav-arrow-left" />
    </button>
    <button
      v-for="(item, index) in totalLength"
      :key="index"
      class="pageinationBtn w-7 h-7 text-sm flex transition-all justify-center items-center rounded-md mr-1 hover:bg-themeColor hover:text-white"
      :class="{ 'bg-themeColor text-white': index === newPage - 1 }"
      @click="onCurrentChange(index + 1)"
    >
      {{ item }}
    </button>
    <button
      class="w-7 h-7 text-sm transition-all flex justify-center items-center rounded-sm ml-1 hover:bg-themeColor-hover hover:text-white"
      @click="nextPage"
    >
      <LzyIcon name="iconoir:nav-arrow-right" />
    </button>
  </div>
</template>

<style scoped>
.pageinationBtn {
  box-shadow: 2px 2px 0 0px rgba(0, 0, 0, 1);
  border: .5px solid #111;
  transition: all .22s;
  &:hover{
     transform: translateY(1px);
     box-shadow: 0px 0px 0 0px rgba(0, 0, 0, 1);
  }
}
</style>
