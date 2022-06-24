import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@app/store'
import { RequestType, RequestDataType } from '@device/utils/axios'

const baseUrl = process.env.NEXT_PUBLIC_APIURL
export const apiRequest = createApi({
  reducerPath: 'apiRequest',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authorization_token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
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
  usePostMutation,
  useUpdateMutation,
  usePatchMutation,
  useDeleteMutation,
} = apiRequest