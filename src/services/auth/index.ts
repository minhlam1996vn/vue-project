import { api } from '@/services/api'
import type { Login } from '@/models/auth/type'

const getToken = async () => {
  return await api.get('/sanctum/csrf-cookie')
}

const login = async (payload: Login) => {
  return await api.post('/login', payload)
}

export const authService = {
  getToken,
  login,
}
