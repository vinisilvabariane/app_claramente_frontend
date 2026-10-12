import { publicApi } from '@/infra/http/api'
import { HttpService } from '@/infra/http/httpService'

export abstract class NotAuthenticatedService extends HttpService {
  protected static client = publicApi
}
