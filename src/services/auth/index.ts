import { api } from '@/services/api'
import type { Login, User } from '@/models/auth/type'

const getToken = async () => {
  return await api.get('/sanctum/csrf-cookie')
}

const getUser = async () => {
  return await api.get<User>('/api/user')
}

const login = async (payload: Login) => {
  return await api.post('/login', payload)
}

const logout = async () => {
  return await api.post('/logout')
}

export const authService = {
  getToken,
  getUser,
  login,
  logout,
}
