import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Login, User } from '@/models/auth/type'

export default function useAuth() {
  const authStore = useAuthStore()

  const user = computed<User | null>(() => authStore.user)
  const isAuthenticated = computed<boolean>(() => authStore.authenticated)

  const login = async (payload: Login): Promise<void> => {
    try {
      await authStore.dispatchLogin(payload)
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authStore.dispatchLogout()
    } catch (error) {
      throw error
    }
  }

  const fetchUser = async (): Promise<void> => {
    try {
      await authStore.fetchUser()
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
}
