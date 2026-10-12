import { createContext } from 'react'
import type { IJwtPayload } from '@/types/IJwtPayload'

export interface AuthContextType {
  user: IJwtPayload | null
  isAuthenticated: boolean
  isAuthChecked: boolean
  login: (token: string, refreshToken: string, refreshExpires: string) => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
