import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import api, { refreshTokens } from '@/infra/http/api'
import { decodeToken, getValidUser } from '@/infra/auth/authGuard'
import { clearTokens, getLocalAccessToken, getLocalRefreshToken, setTokens } from '@/infra/auth/tokenService'
import { AuthContext, type AuthContextType } from '@/modules/auth/context/AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  // hidrata sincronamente no mount (token válido) => sem flash, sem setState no effect
  const [user, setUser] = useState(getValidUser)
  // só fica "não checado" quando há token presente porém expirado (precisa refresh async)
  const [isAuthChecked, setIsAuthChecked] = useState(
    () => getLocalAccessToken() === null || getValidUser() !== null,
  )

  const clearAuth = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  const login = useCallback<AuthContextType['login']>(
    (token, refreshToken, refreshExpires) => {
      const payload = decodeToken(token)
      if (!payload) {
        clearAuth()
        return
      }
      setTokens(token, refreshToken, refreshExpires)
      setUser(payload)
    },
    [clearAuth],
  )

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout', { refreshToken: getLocalRefreshToken() })
    } catch {
      // ignorar erros de logout
    } finally {
      clearAuth()
      window.location.assign('/')
    }
  }, [user?.sub, clearAuth])

  // Bootstrap: token válido já hidratou no estado inicial. Aqui só tratamos
  // token expirado, delegando o refresh ao fluxo único do api.ts.
  useEffect(() => {
    const token = getLocalAccessToken()
    if (!token || getValidUser()) return

    refreshTokens()
      .then((refreshed) => {
        if (refreshed) setUser(decodeToken(refreshed.token))
        else clearAuth()
      })
      .finally(() => setIsAuthChecked(true))
  }, [clearAuth])

  const value = useMemo<AuthContextType>(
    () => ({ user, isAuthenticated: user !== null, isAuthChecked, login, logout }),
    [user, isAuthChecked, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
