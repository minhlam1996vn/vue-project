<script setup lang="ts">
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import { useLoadingStore } from '@/stores/loading'

const router = useRouter()
const { user, logout } = useAuth()
const loadingStore = useLoadingStore()

const handleLogout = async () => {
  loadingStore.startLoading()

  try {
    await logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Logout failed. Please check your credentials.', error)
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <p>Welcome to the home page. This is where you can find the latest updates.</p>
    <button @click.prevent="handleLogout">Logout</button>
    <pre>{{ user }}</pre>
  </main>
</template>
