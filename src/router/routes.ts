import HomeView from '@/views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: { roles: ['admin'] },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('@/views/post/PostsView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/error/NotFoundView.vue'),
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/views/error/ServerErrorView.vue'),
  },
  {
    path: '/503',
    name: 'service-unavailable',
    component: () => import('@/views/error/ServiceUnavailableView.vue'),
  },
  {
    path: '/401',
    name: 'unauthorized',
    component: () => import('@/views/error/UnauthorizedView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'not-found' },
  },
]
