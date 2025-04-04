import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Type cho meta fields
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    routeType?: 'public' | 'error' | 'auth'
    roles?: string[]
  }
}

// Nhóm error routes
const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'unauthorized',
    component: () => import('@/views/error/UnauthorizedView.vue'),
    meta: {
      routeType: 'error',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: {
      routeType: 'error',
      requiresAuth: false,
    },
  },
  {
    path: '/500',
    name: 'serverError',
    component: () => import('@/views/error/ServerErrorView.vue'),
    meta: {
      routeType: 'error',
      requiresAuth: false,
    },
  },
  {
    path: '/503',
    name: 'serviceUnavailable',
    component: () => import('@/views/error/ServiceUnavailableView.vue'),
    meta: {
      routeType: 'error',
      requiresAuth: false,
    },
  },
]

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      routeType: 'public',
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      routeType: 'public',
      requiresAuth: false,
    },
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('@/views/post/PostsView.vue'),
    meta: {
      routeType: 'public',
      requiresAuth: false,
    },
  },
]

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      routeType: 'auth',
      requiresAuth: false,
    },
  },
]

export const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  ...errorRoutes,
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'notFound' },
    meta: {
      routeType: 'error',
    },
  },
]
