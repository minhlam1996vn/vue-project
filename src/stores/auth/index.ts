import { defineStore } from 'pinia'
import { API } from '@/services'
import { ref } from 'vue'
import type { Login, User } from '@/models/auth/type'
import useHandleError from '@/composables/useHandleError'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const { handleError } = useHandleError()

  const setUser = (userData: User | null): void => {
    user.value = userData
  }

  const getToken = async (): Promise<void> => {
    try {
      await API.auth.getToken()
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  const fetchUser = async (): Promise<void> => {
    try {
      const { data } = await API.auth.getUser()
      setUser(data)
    } catch (error) {
      setUser(null)
      handleError(error)
      throw error
    }
  }

  const dispatchLogin = async (payload: Login): Promise<void> => {
    try {
      await getToken()
      await API.auth.login(payload)
      await fetchUser()
    } catch (error) {
      handleError(error, [422])
      throw error
    }
  }

  const dispatchLogout = async (): Promise<void> => {
    try {
      await API.auth.logout()
      setUser(null)
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  return {
    user,
    fetchUser,
    dispatchLogin,
    dispatchLogout,
  }
})
