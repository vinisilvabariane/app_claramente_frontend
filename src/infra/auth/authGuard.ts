import { jwtDecode } from 'jwt-decode'
import { getLocalAccessToken } from './tokenService'
import type { IJwtPayload } from '@/types/IJwtPayload'

// Decodifica um JWT. Retorna null se malformado (nunca lança).
export function decodeToken(token: string): IJwtPayload | null {
  try {
    return jwtDecode<IJwtPayload>(token)
  } catch {
    return null
  }
}

// Payload do access token salvo somente se presente e não expirado.
export function getValidUser(): IJwtPayload | null {
  const token = getLocalAccessToken()
  if (!token) return null
  const payload = decodeToken(token)
  return payload && payload.exp * 1000 > Date.now() ? payload : null
}

export function isTokenValid(): boolean {
  return getValidUser() !== null
}

// A claim "roles" do token vem como valor único (string), não array —
// normaliza aqui para o restante do app poder tratar sempre como lista.
export function getUserRoles(): string[] {
  const token = getLocalAccessToken()
  if (!token) return []
  const roles = decodeToken(token)?.roles
  if (!roles) return []
  return Array.isArray(roles) ? roles : [roles]
}

export function hasRole(role: string): boolean {
  return getUserRoles().includes(role)
}
