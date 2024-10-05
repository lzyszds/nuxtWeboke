import { defineStore } from "pinia";
import type { Directory } from "~/types/Directory";


// 定义一个store，用于存储文章目录数据
export const useDirectoryStore = defineStore("directory", () => {
    // 定义一个响应式变量loading，用于存储当前的加载状态
    const directory = ref<Directory[]>()

    //全局scroll滚动dom
    const scrollEl = ref<HTMLElement>()

    // 初始化目录
    const initDirectory = (articleMain: HTMLElement) => {

        const dirarr: Directory[] = [{
            title: "Ai摘要",
            id: "abstract",
            top: 0,
            nodeName: 'H2'
        }];
        let toc = articleMain.querySelectorAll('h2,h3,h4') as any;
        setTimeout(() => {
            toc.forEach((element: any) => {
                dirarr.push({
                    title: element.innerText,
                    id: element.id,
                    top: element.offsetTop + 100,
                    nodeName: element.nodeName
                })
            })
            directory.value = dirarr
        }, 50)
    }


    const getDirectory = () => {
        return new Promise<Directory[]>(resolve => {
            watchEffect(() => {
                if (directory.value && directory.value.length > 0) {
                    resolve(directory.value)
                }
            })
        });
    };

    return { directory, scrollEl, initDirectory, getDirectory }
})
