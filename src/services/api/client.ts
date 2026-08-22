import axios, { AxiosHeaders } from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config

  const authState = window.localStorage.getItem('dayflow_auth')
  if (!authState) return config

  try {
    const parsed = JSON.parse(authState) as { token?: string }
    if (parsed.token) {
      config.headers = AxiosHeaders.from({
        ...(config.headers ?? {}),
        Authorization: `Bearer ${parsed.token}`,
      })
    }
  } catch {
    window.localStorage.removeItem('dayflow_auth')
  }

  return config
})