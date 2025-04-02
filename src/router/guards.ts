// https://router.vuejs.org/guide/advanced/navigation-guards.html
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useAuth from '@/composables/useAuth'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { isAuthenticated, fetchUser } = useAuth()

  // If not authenticated, update user information
  if (!isAuthenticated.value) {
    await fetchUser()
  }

  // If not on the login page and the user is not logged in, redirect to the login page
  if (to.name !== 'login' && !isAuthenticated.value) {
    return next({ name: 'login' })
  }

  // If on the login page but the user is already logged in, redirect to the home page
  if (to.name === 'login' && isAuthenticated.value) {
    return next({ name: 'home' })
  }

  next()
}
