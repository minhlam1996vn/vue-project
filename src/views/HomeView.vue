<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()
const loading = ref<boolean>(false)

const handleLogout = async () => {
  loading.value = true

  try {
    await logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Logout failed. Please check your credentials.', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <p>Welcome to the home page. This is where you can find the latest updates.</p>
    <button @click="handleLogout" :disabled="loading">Logout</button>
    <pre>{{ user }}</pre>
  </main>
</template>
