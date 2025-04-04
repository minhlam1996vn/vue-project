<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import type { Login } from '@/models/auth/type'
import { useAuthStore } from '@/stores/auth'
// import useAuth from '@/composables/useAuth'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref<Login>({
  email: 'test@example.com',
  password: 'password',
})

const loading = ref<boolean>(false)
const validationErrors = ref<Record<string, string[]> | null>(null)

const handleLogin = async () => {
  validationErrors.value = null
  loading.value = true

  try {
    await authStore.dispatchLogin(loginForm.value)

    router.push({ name: 'home' })
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 422) {
      validationErrors.value = error.response.data.errors
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Login Page</h1>
    <p>Welcome to the login page. Please enter your credentials.</p>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="loginForm.email" type="email" id="email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input v-model="loginForm.password" type="password" id="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div>
        <p>Don't have an account? <a href="#register">Register here</a></p>
        <p>Forgot your password? <a href="#reset-password">Reset it here</a></p>
      </div>
    </form>

    <pre>{{ validationErrors }}</pre>
  </main>
</template>
