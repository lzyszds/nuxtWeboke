import { defineStore } from "pinia";
import type { RequestResult } from "~/types/Result";

type RequestData = {
    [key: string]: any
}


// 定义一个store，用于存储所有的请求数据
export const useRequestDataStore = defineStore("requestData", () => {

    //需要请求的接口路径
    const urls = [
        {
            url: `/api/article/getArticleList?pages=1&limit=99999`,
            name: 'homeArticleList',
            notes: '首页文章列表'
        },
        {
            url: `/api/comment/getNewComment`,
            name: "homeCommentList",
            notes: '首页最新评论列表'
        },
    ]
    const requestData = ref<RequestData>({})

    const initData = async () => {
        const result: any[] = await Promise.all(urls.map(async (item) => {
            const { data } = await useFetch<RequestResult<Ref<any[]>>>(item.url)
            return data.value?.data
        }))

        for (let index in urls) {
            const item = urls[index]!
            requestData.value[item.name] = result[index]
        }

    }


    return { requestData, initData }
})
