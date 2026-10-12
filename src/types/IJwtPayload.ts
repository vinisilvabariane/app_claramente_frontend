export interface IJwtPayload {
  sub: string
  email: string
  name: string
  roles: string | string[]
  department: string
  exp: number
  nbf: number
  iat: number
  jti: string
  registration: string
  [key: string]: unknown
}
