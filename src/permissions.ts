// src/permissions.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useAuth from '@/composables/useAuth'

export function permissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // If the route does not require specific roles, proceed
  if (!to.meta.roles) {
    return next()
  }

  // Retrieve user information from useAuth composable
  const { user } = useAuth()

  // If user is not authenticated or has no roles, redirect to unauthorized page
  if (!user.value || !user.value.roles) {
    return next({ name: 'unauthorized' })
  }

  // Get the list of required permissions from meta
  const requiredRoles = to.meta.roles as string[]

  // Check if the user has at least one required role
  const hasPermission = user.value.roles.some((role: string) => requiredRoles.includes(role))

  if (hasPermission) {
    return next()
  } else {
    return next({ name: 'unauthorized' })
  }
}
