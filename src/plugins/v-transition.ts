import { awaitTime } from "~/uitls/common";

const animation: any = {}
let nowKey = ""

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('transition', domOrderedAnimateDirective);
});

export const domOrderedAnimateDirective = {
  mounted(el: Element, binding: any) {
    const observer = new IntersectionObserver((entries: any) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        console.log("🚀 ~ observer ~ binding.value:", binding.value)

        const isString = typeof binding.value === 'string'
        const animateClass = isString ? binding.value : binding.value[0];
        if (isString) {
          // 将元素添加到待处理Map中
          el.classList.add('animate__animated');
          el.classList.add(animateClass);
        } else {
          const [animateClass, key, index, timer] = binding.value;
          nowKey = key
          if (animation[nowKey] === undefined) {
            animation[nowKey] = {
              list: [],
              nowExecuteingIndex: 0
            }
          }
          animation[nowKey].list.push({ el, animateClass, index, timer });
          // 开始执行
          animate();
        }

        observer.unobserve(el);
      }
    });
    observer.observe(el);
  }
};


function animate() {
  const nowKeyList = animation[nowKey]
  const item = nowKeyList.list.filter((item: any) => {
    return item.index === nowKeyList.nowExecuteingIndex
  })
  if (nowKeyList.list.length === 0) return
  if (item.length === 0) return
  console.log("🚀 ~ item ~ item:", item)

  nowKeyList.nowExecuteingIndex++
  item[0].el.classList.add('animate__animated');

  item[0].el.classList.add(item[0].animateClass);
  nowKeyList.list.splice(nowKeyList.list.indexOf(item[0]), 1);
  awaitTime(animate, 200);


  // for (let index in nowKeyList.list) {
  //   const item = nowKeyList.list[index];
  //   if (item.index === nowKeyList.nowExecuteingIndex) {
  //     nowKeyList.nowExecuteingIndex++
  //     item.el.classList.add('animate__animated');
  //     item.el.classList.add(item.animateClass);
  //     nowKeyList.list.splice(parseInt(index), 1);
  //     awaitTime(animate, item.timer);
  //     return;
  //   }
  // }
}
