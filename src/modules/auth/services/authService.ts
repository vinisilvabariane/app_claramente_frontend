import { NotAuthenticatedService } from '@/infra/http/notAuthenticatedService'
import type { IResult } from '@/types/IResult'
import type { IAuthResponse } from '@/types/IAuthResponse'

export class AuthService extends NotAuthenticatedService {
  static async login(email: string, password: string): Promise<IResult<IAuthResponse>> {
    return this.post<IAuthResponse>('/auth/login', { email, password })
  }

  static async register(name: string, email: string, password: string): Promise<IResult<IAuthResponse>> {
    return this.post<IAuthResponse>('/auth/register', { name, email, password })
  }
}
