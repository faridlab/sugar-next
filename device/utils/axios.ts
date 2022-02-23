import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  timeout: 120 * 1000
})

export type RequestType = {
  url: string
  params?: Object
  headers?: AxiosRequestHeaders
  config?: AxiosRequestConfig
}

export type RequestDataType = RequestType & {
  type?: number | string
  data: any
}

export default api