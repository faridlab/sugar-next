import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RequestType, RequestDataType } from '@device/utils/axios'
import { getCookie } from 'cookies-next'

const baseUrl = process.env.NEXT_PUBLIC_APIURL
export const apiRequest = createApi({
  reducerPath: 'apiRequest',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie('authorization_token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
    paramsSerializer: (params: Record<string, any>) => {
      const searchParams = new URLSearchParams()
      for (const key in params) {
        const param = params[key]
        if(Array.isArray(param)) {
          for (const value of param) {
            searchParams.append(`${key}[]`, value)
          }
          continue
        }
        searchParams.append(key, param)
      }
      return searchParams.toString()
    },
  }),
  endpoints: (builder) => ({
    fetch: builder.query({
      query: ({ url, params = {}, headers = {}, config = {} }: RequestType) => {
        return {
          url,
          method: 'GET',
          params,
          headers
        }
      },
    }),
    query: builder.mutation({
      query: ({ url, params = {}, headers = {}, config = {} }: RequestType) => {
        return {
          url,
          method: 'GET',
          params,
          headers
        }
      },
    }),
    post: builder.mutation({
      query: ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
        return {
          url,
          method: 'POST',
          body: data,
          params,
          headers
        }
      },
    }),
    update: builder.mutation({
      query: ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
        return {
          url,
          method: 'PUT',
          body: data,
          params,
          headers
        }
      },
    }),
    patch: builder.mutation({
      query: ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
        return {
          url,
          method: 'PATCH',
          body: data,
          params,
          headers
        }
      },
    }),
    delete: builder.mutation({
      query: ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
        return {
          url,
          method: 'DELETE',
          body: data,
          params,
          headers
        }
      },
    }),
  }),
})

export const {
  useFetchQuery,
  useQueryMutation,
  usePostMutation,
  useUpdateMutation,
  usePatchMutation,
  useDeleteMutation,
} = apiRequest