// import handleWeatherUrl from '@/assets/icon/weather/import';
// import type { WeatherData } from '@/types/Weather';
// import { useDateFormat } from '@vueuse/core';
// import dayjs from "dayjs";
// import type { MessageOptions, messageType } from 'element-plus';
// import { ElMessage, ElNotification } from 'element-plus';
import gsap from 'gsap';

import dayjs from 'dayjs';

// 此函数获取一个数组并将其拆分为更小的块
export const splitArray = (array: any, size: number) => {
  // 创建一个空数组以容纳较小的块
  let data: any[] = [];
  // 在原始阵列上循环
  for (let i = 0; i < array.length; i += size) {
    // 对于每个迭代，向新数组添加一个新块
    data.push(array.slice(i, i + size));
  }
  // return 一个新数组
  return data;
};

//时间格式化为字符串 比如说前天 几天前，几小时前
export const timeAgo = (time: string | number) => {
  //判断当前time是否为时间戳，如果不是，则转换为时间戳
  if (!Number.isNaN(time)) {
    time = dayjs(time).unix();
  }
  time = parseInt(time as string);
  if (time < 10e8) {
    time = time * 1000;
  }
  const t = dayjs().unix() - time; // Y-m-d H:i:s
  let i = 60;
  let h = i * 60;
  let d = h * 24;
  let m = d * 30;
  let y = m * 12;
  const mp: any = new Map([
    //n是时间戳（key），t是当前时间戳 ,>>0 是向下取整
    [(n: any) => n < i, () => '一分钟'],
    [(n: any) => n < h, (n: any) => ((n / i) >> 0) + '分钟'],
    [(n: any) => n < d, (n: any) => ((n / h) >> 0) + '小时'],
    [(n: any) => n < m, (n: any) => ((n / d) >> 0) + '天'],
    [(n: any) => n < y, (n: any) => ((n / m) >> 0) + '个月'],
    [() => true, (n) => ((n / y) >> 0) + '年'],
  ]);
  return [...mp].find(([n]) => n(t)).pop()(t) + '前';
};

//浏览量转换成 k m b
export const numFormat = (num: number) => {
  if (num >= 1e3 && num < 1e6) {
    return (num / 1e3).toFixed(1) + 'k';
  } else if (num >= 1e6 && num < 1e9) {
    return (num / 1e6).toFixed(1) + 'm';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'b';
  } else {
    return num;
  }
};

export function base64toBlob(dataurl: string) {
  // base64 转 二进制流(blob)
  let arr = dataurl.split(','),
    mime = arr[0]!.match(/:(.*?);/)![1],
    bstr = atob(arr[1]!),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

// 二进制流转换为base64 格式。
export function getBase64(data: BlobPart, type: string) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([data], { type: type }); // 必须指定type类型
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// //上传图片，图片太大，如何在前端实现图片压缩后上传
export function compressPic(file: Blob, quality: number = 0.5) {
  return new Promise((resolve, reject) => {
    getBase64(file, file.type).then((res) => {
      // 这里quality的范围是（0-1）
      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      const ctx: any = canvas.getContext('2d');
      const img: any = new Image();
      img.src = res;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 转换成base64格式 quality为图片压缩质量 0-1之间  值越小压缩的越大 图片质量越差
        const base64 = canvas.toDataURL(file.type, quality);
        const fileCompress = base64toBlob(base64);
        resolve({ base64, fileCompress });
        reject('压缩失败');
      };
    });
  });
}

// //提示弹窗
// export const LNotification = (val: string, time: number = 2000, postion: any = 'bottom-right') => {
//   ElNotification.closeAll()
//   ElNotification({
//     dangerouslyUseHTMLString: true,
//     message: val,
//     position: postion,
//     duration: time,
//     customClass: 'copy-success',
//   })
// }

// //提示通知
// export const setMessage = (type: messageType, message: string, options?: MessageOptions) => {
//   ElMessage({
//     message,
//     grouping: true,
//     type,
//     ...options
//   })
// }

// // 复制内容提示版权信息
// import { getWeatherApi } from '@/api/home/toolkit';
// import { useEventListener } from "@vueuse/core";

// export const copyTip = () => {
//   useEventListener(window, 'keydown', e => {
//     if (e.ctrlKey && e.key === 'c') {
//       LNotification(`<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`)
//     }
//   })
// }

//获取cookie
export const getCookie = (name: any) => {
  let cookie = document.cookie.split('; ').map((item) => {
    return item.split('=');
  });
  cookie = Object.fromEntries(cookie);
  return cookie[name];
};

//设置cookie
export const setCookie = (name: string, value: string, time: number) => {
  let date = dayjs();
  date = date.add(time, 'day');
  document.cookie = `${name}=${value};expires=${date}`;
};

/* 数组去重 arr: 要处理数组, key: 去重的key值 单一数组不需要key */
export const unique = (arr: any[], key?: string) => {
  const res = new Map();
  return arr.filter((a) => {
    const arrKey = key ? a[key] : a;
    // has判断当前值是否在map对象中存在 ,如果不存在则将当前值添加进map对象中
    return !res.has(arrKey) && res.set(arrKey, 1);
  });
};

/* 页面滚动到指定位置XY轴 */
export const scrollTo = (x: number, y: number) => {
  window.scrollTo({ left: x, top: y, behavior: 'smooth' });
};

/* 同步延时函数 */
export const awaitTime = (fn: Function, time: number | string = 1000) => {
  const tense = typeof time === 'string' ? parseInt(time) : time;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn();
      resolve('成功');
    }, tense);
  });
};

// 数字跳动
export const numberJump = (
  record: any,
  duration = 2 // 动画持续时间（秒）
): { counts: Record<string, Ref<number>>; stop: () => void } => {
  const counts: Record<string, Ref<number>> = {}
  const tweens: any[] = []

  for (const key in record) {
    counts[key] = ref(0) // 创建响应式 ref
    const target = record[key].count
    if (!gsap) continue
    // 使用 GSAP 动画
    const tween = gsap.to(counts[key], {
      value: target, // 目标值
      duration, // 动画时长
      ease: 'power2.inOut', // 缓动效果
      onUpdate: () => {
        counts[key]!.value = Math.round(counts[key]!.value) // 确保整数
      },
    })

    tweens.push(tween)
  }

  // 返回响应式 counts 和清理函数
  return {
    counts,
    stop: () => {
      tweens.forEach((tween) => tween.kill()) // 停止所有动画
    },
  }
}

// export const numberJump = (num: any, sum: any, duration = 2000) => {
//   for (const key in num) {
//     num[key]!.value = 0
//     const target = sum[key]
//     const startTime = performance.now()

//     const { pause } = useRafFn(({ time }: any) => {
//       const progress = Math.min((time - startTime) / duration, 1)
//       num[key]!.value = Math.round(progress * target!)
//       if (progress >= 1) pause() // 动画结束  
//     })

//     // 可选：返回 pause 函数用于手动停止
//   }
// }


// 在 Vue 组件中监听某个元素的 class 名变化
export function observeClassChange(element: Element, callback: Function) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        //@ts-ignore
        callback(mutation.target);
      }
    });
  });

  observer.observe(element, {
    attributes: true, // 监听属性变化
    attributeFilter: ['class'], // 只监听 class 属性
  });
}

export const allFunction = {
  splitArray, //把一个数组拆分成几个数组
  timeAgo, //时间转换
  base64toBlob, //base64转二进制流
  getBase64, //二进制流转换为base64 格式。
  compressPic, //上传图片，图片太大，如何在前端实现图片压缩后上传
  // copyTip,//复制内容提示版权信息
  // LNotification,//提示弹窗
  getCookie, //获取cookie
  setCookie, //设置cookie
  unique, //数组对象去重（区别单数组以及数组中嵌套一层对象）
  scrollTo, //页面滚动到指定位置XY轴
  awaitTime, //延迟函数
  numberJump, //数字跳动
  observeClassChange, //在 Vue 组件中监听某个元素的 class 名变化
};
