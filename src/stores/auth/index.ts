import { defineStore } from 'pinia'
import { isAxiosError } from 'axios'
import { API } from '@/services'
import { computed, ref } from 'vue'
import type { Login, User } from '@/models/auth/type'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const authenticated = computed<boolean>(() => user.value !== null)

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
            // 401 Unauthorized
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
