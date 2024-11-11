import { defineStore } from 'pinia'

export const useInformationStore = defineStore('informationStore', () => {
  const information = ref<any>({
    name: '',
    email: '',
    webSite: '',
    comContent: '',
    nameError: false,
    emailError: false,
    rangeIndex: 0,//头像的索引
  })

  return { information }
}, {
  persist: true,
})
