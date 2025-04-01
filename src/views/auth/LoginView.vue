<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAxiosError } from 'axios'
import type { Login } from '@/models/auth/type'
import useAuth from '@/composables/useAuth'
import { useLoadingStore } from '@/stores/loading'

const router = useRouter()
const { login } = useAuth()
const loadingStore = useLoadingStore()

const loginForm = ref<Login>({
  email: 'test@example.com',
  password: 'password',
})

const validationErrors = ref<Record<string, string[]> | null>(null)

const handleLogin = async () => {
  loadingStore.startLoading()
  validationErrors.value = null

  try {
    await login(loginForm.value)

    router.push({ name: 'home' })
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 422) {
      validationErrors.value = error.response.data.errors
    }
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <main class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="font-bold text-2xl my-5">Login Page</h1>
    <p>Welcome to the login page. Please enter your credentials.</p>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <UInput type="email" id="email" v-model="loginForm.email" />
      </div>

      <div>
        <label for="password">Password:</label>
        <UInput type="password" id="password" v-model="loginForm.password" />
      </div>

      <UButton type="submit" label="Login" />

      <div>
        <p>Don't have an account? <a href="#register">Register here</a></p>
        <p>Forgot your password? <a href="#reset-password">Reset it here</a></p>
      </div>
    </form>

    <pre>{{ validationErrors }}</pre>
  </main>
</template>
