import { defineStore } from 'pinia'
import { API } from '@/services'
import type { Login } from '@/models/auth/type'
import { isAxiosError } from 'axios'

export const useAuthStore = defineStore('authStore', () => {
  const getToken = async (): Promise<void> => {
    await API.auth.getToken()
  }

  const dispatchLogin = async (payload: Login): Promise<void> => {
    try {
      await getToken()
      const res = await API.auth.login(payload)

      console.log('Login response:', res)
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
    dispatchLogin,
  }
})
