// https://router.vuejs.org/guide/advanced/navigation-guards.html
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth ?? false
  const isErrorRoute = to.meta.routeType === 'error'

  if (requiresAuth && !authStore.user && !isErrorRoute) {
    await authStore.fetchUser()
  }

  if (to.meta.routeType === 'auth' && authStore.user) {
    return next({ name: 'home' })
  }

  next()
}
