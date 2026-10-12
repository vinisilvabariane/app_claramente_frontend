const KEYS = {
  access: 'token',
  refresh: 'refreshToken',
  refreshExpires: 'refreshExpires',
} as const

function read(key: string): string | null {
  const value = localStorage.getItem(key)
  if (!value || value === 'null' || value === 'undefined') return null
  return value
}

function write(key: string, value: string | null | undefined): void {
  if (value == null) localStorage.removeItem(key)
  else localStorage.setItem(key, value)
}

export function getLocalAccessToken(): string | null {
  return read(KEYS.access)
}

export function getLocalRefreshToken(): string | null {
  return read(KEYS.refresh)
}

export function setTokens(token: string, refreshToken: string, refreshExpires: string): void {
  write(KEYS.access, token)
  write(KEYS.refresh, refreshToken)
  write(KEYS.refreshExpires, refreshExpires)
}

export function clearTokens(): void {
  write(KEYS.access, null)
  write(KEYS.refresh, null)
  write(KEYS.refreshExpires, null)
}
