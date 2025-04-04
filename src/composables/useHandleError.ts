import { isAxiosError } from 'axios'
import router from '@/router'

export default function useHandleError() {
  const handleError = (error: unknown): void => {
    if (!isAxiosError(error)) {
      console.error('Non-API error:', error)
      router.push({ name: 'serverError' })
      return
    }

    switch (error.response?.status) {
      case 422:
        alert('Validation error occurred. Please check your input.')
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
    handleError,
  }
}
