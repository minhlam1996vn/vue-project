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
    name: 'notFound',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: {
      routeType: 'error',
    },
  },
  {
    path: '/500',
    name: 'serverError',
    component: () => import('@/views/error/ServerErrorView.vue'),
    meta: {
      routeType: 'error',
    },
  },
  {
    path: '/503',
    name: 'serviceUnavailable',
    component: () => import('@/views/error/ServiceUnavailableView.vue'),
    meta: {
      routeType: 'error',
    },
  },
  {
    path: '/401',
    name: 'unauthorized',
    component: () => import('@/views/error/UnauthorizedView.vue'),
    meta: {
      routeType: 'error',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'notFound' },
    meta: {
      routeType: 'error',
    },
  },
]
