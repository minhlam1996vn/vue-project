import { defineStore } from 'pinia'
import { isAxiosError } from 'axios'
import { API } from '@/services'
import { computed, ref } from 'vue'
import type { Login, User } from '@/models/auth/type'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const authenticated = computed<boolean>(() => user.value !== null)
  const router = useRouter()

  const setUser = (userData: User | null): void => {
    user.value = userData
  }

  const getToken = async (): Promise<void> => {
    await API.auth.getToken()
  }

  const fetchUser = async (): Promise<void> => {
    try {
      const { data } = await API.auth.getUser()
      setUser(data)
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            // 400 Bad Request
            break
          case 401:
            router.push({ name: 'login' })
            break
          case 404:
            router.push({ name: 'notFound' })
            break
          case 500:
            router.push({ name: 'serverError' })
            break
          default:
            router.push({ name: 'serviceUnavailable' })
            break
        }
      }

      setUser(null)
    }
  }

  const dispatchLogin = async (payload: Login): Promise<void> => {
    try {
      await getToken()
      await API.auth.login(payload)
      await fetchUser()
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            // 400 Bad Request
            break
          case 404:
            // 404 Not Found
            break
          case 500:
            // 500 Internal Server Error
            break
          case 503:
            // 503 Service Unavailable
            break
          default:
            // Other error
            break
        }
      }

      throw error
    }
  }

  const dispatchLogout = async (): Promise<void> => {
    try {
      await API.auth.logout()
      setUser(null)
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            // 400 Bad Request
            break
          case 404:
            // 404 Not Found
            break
          case 500:
            // 500 Internal Server Error
            break
          default:
            // Other error
            break
        }
      }

      throw error
    }
  }

  return {
    user,
    authenticated,
    setUser,
    fetchUser,
    dispatchLogin,
    dispatchLogout,
  }
})
