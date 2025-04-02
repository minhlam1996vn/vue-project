import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { authGuard } from '@/router/guards'
import { permissionGuard } from '@/permissions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)
router.beforeEach(permissionGuard)

export default router
