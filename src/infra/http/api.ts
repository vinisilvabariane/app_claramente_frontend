import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { IAuthResponse } from '@/types/IAuthResponse'
import { decodeToken } from '@/infra/auth/authGuard'
import {
  clearTokens,
  getLocalAccessToken,
  getLocalRefreshToken,
  setTokens,
} from '@/infra/auth/tokenService'

// Em dev, '/api' é resolvido pelo proxy do Vite (vite.config.ts) pra
// localhost:5090. Em produção não existe esse proxy, então o build precisa
// saber a URL de verdade do backend via VITE_API_URL.
const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 90_000,
  headers: { 'Content-Type': 'application/json' },
})

export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

function setAuthHeader(config: InternalAxiosRequestConfig, token: string): void {
  config.headers.set('Authorization', `Bearer ${token}`)
}

function isExpired(token: string): boolean {
  const payload = decodeToken(token)
  return !payload || payload.exp * 1000 <= Date.now()
}

let refreshPromise: Promise<IAuthResponse | null> | null = null

export function refreshTokens(): Promise<IAuthResponse | null> {
  if (refreshPromise) return refreshPromise

  const refreshToken = getLocalRefreshToken()
  if (!refreshToken) return Promise.resolve(null)

  refreshPromise = publicApi
    .post<IAuthResponse>('/auth/refresh', { refreshToken })
    .then(({ data }) => {
      setTokens(data.token, data.refreshToken, data.refreshExpires)
      return data
    })
    .catch((err: AxiosError) => {
      const status = err.response?.status
      if (status === 401 || status === 403) clearTokens()
      return null
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

api.interceptors.request.use(async (config) => {
  const token = getLocalAccessToken()
  if (!token) return config

  if (!isExpired(token)) {
    setAuthHeader(config, token)
    return config
  }

  const refreshed = await refreshTokens()
  if (refreshed) setAuthHeader(config, refreshed.token)
  return config
})

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const orig = error.config as RetriableConfig | undefined
    const status = error.response?.status

    if (status === 401 && orig && !orig._retry) {
      orig._retry = true
      const refreshed = await refreshTokens()
      if (refreshed) {
        setAuthHeader(orig, refreshed.token)
        return api(orig)
      }
      clearTokens()
      window.location.href = '/'
      return Promise.reject(error)
    }

    if (status === 403) {
      window.location.href = '/access-denied'
    }

    return Promise.reject(error)
  },
)

export default api
