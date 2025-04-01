import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  const loadingCount = ref<number>(0)
  const isLoading = ref<boolean>(false)

  const startLoading = (): void => {
    loadingCount.value++
    isLoading.value = true
  }

  const stopLoading = (): void => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
})
