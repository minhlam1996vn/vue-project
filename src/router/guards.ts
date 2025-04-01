// https://router.vuejs.org/guide/advanced/navigation-guards.html
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  const loadingStore = useLoadingStore()

  const requiresAuth = to.meta.requiresAuth ?? false
  const isErrorRoute = to.meta.routeType === 'error'

  if (requiresAuth && !authStore.user && !isErrorRoute) {
    loadingStore.startLoading()

    try {
      await authStore.fetchUser()
    } catch (error) {
      throw error
    } finally {
      loadingStore.stopLoading()
    }
  }

  if (to.meta.routeType === 'auth' && authStore.user) {
    return next({ name: 'home' })
  }

  next()
}
