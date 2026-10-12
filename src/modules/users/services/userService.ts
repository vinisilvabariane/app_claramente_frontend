import { HttpService } from '@/infra/http/httpService'
import type { IResult } from '@/types/IResult'
import type { User, UserInput } from '@/modules/users/types'

export class UserService extends HttpService {

  static list(): Promise<IResult<User[]>> {
    return this.get<User[]>('/user')
  }
  static create(input: UserInput): Promise<IResult<User>> {
    return this.post<User>('/user', input)
  }
  static update(id: string, input: UserInput): Promise<IResult<User>> {
    return this.put<User>(`/user/${id}`, input)
  }
  static remove(id: string): Promise<IResult<void>> {
    return this.delete<void>(`/user/${id}`)
  }
}
