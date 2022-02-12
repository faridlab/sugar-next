import {
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

import {
  get,
  create,
  update,
  patch,
  destroy,
  hardDelete,
  restore,
} from '../../../device/repositories/apiRequest'

import { RequestType, RequestDataType } from '../../../device/utils/axios'

export const fetch = createAsyncThunk('resource/fetch', async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await get({ url, params, headers, config})
  return response.data
})

export const detail = createAsyncThunk('resource/detail', async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}`
  const response = await get({ url, params, headers, config})
  return response.data
})

export const trash = createAsyncThunk('resource/trash', async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/trash` // Trash of collection
  const response = await get({ url, params, headers, config})
  return response.data
})

export const trashed = createAsyncThunk('resource/trashed', async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}/trashed` // Data trashed detail
  const response = await get({ url, params, headers, config})
  return response.data
})
