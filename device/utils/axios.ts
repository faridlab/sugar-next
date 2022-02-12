import axios, { AxiosRequestHeaders } from 'axios'

const api = axios.create({
  baseURL: process.env.APIURL,
  timeout: 120 * 1000
})

export type RequestType = {
  url: string
  params?: Object
  headers?: AxiosRequestHeaders
  config?: Object
}

export type RequestDataType = RequestType & {
  type: number | string
  data: any
}

export default api