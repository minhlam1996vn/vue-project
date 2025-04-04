import { ref } from 'vue'
import { isAxiosError } from 'axios'
import router from '@/router'

const globalError = ref<{
  message: string | null
  code: number | null
}>({
  message: null,
  code: null,
})

export default function useHandleError() {
  const clearError = (): void => {
    globalError.value = {
      message: null,
      code: null,
    }
  }

  const handleError = (error: unknown): void => {
    if (!isAxiosError(error)) {
      console.error('Non-API error:', error)
      router.push({ name: 'serverError' })
      return
    }

    const status = error.response?.status
    const message = error.response?.data || error.message

    globalError.value = {
      message,
      code: status || 500,
    }

    switch (status) {
      case 422:
        // Validation error
        break
      case 401:
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath,
            sessionExpired: '1',
          },
        })
        break
      case 404:
        console.error('Not Found:', error.response)
        router.push({ name: 'notFound' })
        break
      case 500:
        router.push({ name: 'serverError' })
        break
      case 503:
        router.push({ name: 'serviceUnavailable' })
        break
      default:
        router.push({ name: 'serverError' })
        break
    }
  }

  return {
    error: globalError,
    handleError,
    clearError,
  }
}
