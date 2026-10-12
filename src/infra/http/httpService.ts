import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import api from '@/infra/http/api'
import type { IResult } from '@/types/IResult'
import type { IErrorResponse } from '@/types/IErrorResponse'

export abstract class HttpService {
  protected static client: AxiosInstance = api

  private static handleError<T>(error: unknown): IResult<T> {
    if (axios.isAxiosError<IErrorResponse>(error)) {
      const data = error.response?.data
      return {
        success: false,
        error: data?.error ?? 'Erro na requisição.',
        description: data?.description,
      }
    }
    return {
      success: false,
      error: 'Erro inesperado.',
      description: 'Não foi possível processar a solicitação.',
    }
  }

  private static async request<T>(exec: () => Promise<AxiosResponse<T>>): Promise<IResult<T>> {
    try {
      const { data } = await exec()
      return { success: true, data }
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  protected static get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>(() => this.client.get<T>(url, config))
  }

  protected static post<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>(() => this.client.post<T>(url, body, config))
  }

  protected static put<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>(() => this.client.put<T>(url, body, config))
  }

  protected static patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>(() => this.client.patch<T>(url, body, config))
  }

  protected static delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>(() => this.client.delete<T>(url, config))
  }
}
