import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Login, User } from '@/models/auth/type'

export default function useAuth() {
  const authStore = useAuthStore()

  const user = computed<User | null>(() => authStore.user)
  const isAuthenticated = computed<boolean>(() => user.value !== null)

  const login = async (payload: Login): Promise<void> => {
    await authStore.dispatchLogin(payload)
  }

  const logout = async (): Promise<void> => {
    await authStore.dispatchLogout()
  }

  const fetchUser = async (): Promise<void> => {
    await authStore.fetchUser()
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
}
