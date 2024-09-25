import { awaitTime } from "~/uitls/common";

const animation: any = {}
let nowKey = ""
let isAnimating = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('transition', domOrderedAnimateDirective);
});

export const domOrderedAnimateDirective = {
  mounted(el: Element, binding: any) {
    const observer = new IntersectionObserver((entries: any) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        const isString = typeof binding.value === 'string'
        const animateClass = isString ? binding.value : binding.value[0];
        if (isString) {
          // 将元素添加到待处理Map中
          el.classList.add('animate__animated');
          el.classList.add(animateClass);
        } else {
          const [animateClass, key, index] = binding.value;
          nowKey = key
          animation[nowKey] = {
            list: [],
            nowExecuteingIndex: 0
          }
          animation[nowKey].list.push({ el, animateClass, index });
          // 开始执行
          // animate();
        }

        observer.unobserve(el);
      }
    });
    observer.observe(el);
  }
};


// function animate() {
//   const nowKeyList = animation[nowKey]
//   if (nowKeyList.length === 0) {
//     isAnimating = false;
//     return;
//   }
//   for (let index in nowKeyList.list) {
//     const item = nowKeyList.list[index];
//     if (item.index === nowKeyList.nowExecuteingIndex) {
//       nowKeyList.nowExecuteingIndex++
//       item.el.classList.add('animate__animated');
//       item.el.classList.add(item.animateClass);
//       nowKeyList.list.splice(parseInt(index), 1);
//       animate();
//       return;
//     }
//   }
// }
