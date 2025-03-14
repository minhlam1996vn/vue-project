import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VUE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
