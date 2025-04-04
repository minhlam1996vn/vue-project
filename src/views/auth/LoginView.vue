<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import type { Login } from '@/models/auth/type'
import useHandleError from '@/composables/useHandleError'

const router = useRouter()
const { login } = useAuth()
const { error, clearError } = useHandleError()

const loginForm = ref<Login>({
  email: 'test@example.com',
  password: 'password',
})

const loading = ref<boolean>(false)

onMounted(() => {
  clearError()
})

const handleLogin = async () => {
  loading.value = true

  try {
    await login(loginForm.value)
    router.push({ name: 'home' })
  } catch (error) {
    console.log('loi')
    throw error
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
      <button type="submit" :disabled="loading">Login</button>
      <p>Don't have an account? <a href="#register">Register here</a></p>
    </form>
    <p>Forgot your password? <a href="#reset-password">Reset it here</a></p>

    <div v-if="error.message" style="color: red">
      <p>Error Code: {{ error.code }}</p>
      <pre>{{ error.message }}</pre>
    </div>
  </main>
</template>
