<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref<boolean>(false)

const handleLogout = async () => {
  loading.value = true

  try {
    await authStore.dispatchLogout()
    router.push({ name: 'login' })
  } catch (error) {
    console.log('Login failed. Please check your credentials.')
    console.error('Error login:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <p>Welcome to the home page. This is where you can find the latest updates.</p>
    <button @click="handleLogout">Logout</button>
    <pre>{{ authStore.user }}</pre>
  </main>
</template>
