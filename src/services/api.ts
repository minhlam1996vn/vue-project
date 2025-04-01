import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VUE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const xsrfToken = Cookies.get('XSRF-TOKEN')
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken
  }
  return config
})
