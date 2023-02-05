import {
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

import {
  get,
  post,
  update as updateRequest,
  patch as patchRequest,
  del as deleteRequest,
} from '@device/repositories/apiRequest'

import { RequestType, RequestDataType } from '@device/utils/axios'

export const fetch = createAsyncThunk('resource/fetch', async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await get({ url, params, headers, config})
  return response.data
})

export const create = createAsyncThunk('resource/create', async ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await post({ url, data, params, headers, config })
  return response.data
})

export const update = createAsyncThunk('resource/update', async ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await updateRequest({ url, data, params, headers, config })
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

export const patch = createAsyncThunk('resource/patch', async ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}`
  const response = await patchRequest({ url, data, params, headers, config })
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

// Destroy Model by ID /collection/{id}
// Destroy Collection by selected Ids /collection/selected --params selected=[1,2,3]
// Destroy all Models in Collection /collection/all
export const destroy = createAsyncThunk('resource/destroy', async ({ url, type, data, params, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  const response = await deleteRequest({url, data, params, headers, ...config })
  return response.data
})

// Delete Model by ID /collection/{id}/delete
// Delete Collection by selected Ids /collection/selected/delete --params ids=[1,2,3]
// Delete all Models in Collection /collection/all/delete
export const hardDelete = createAsyncThunk('resource/hardDelete', async ({ url, type, data, params, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${type}/delete` // Permanent delete
  const response = await deleteRequest({url, data, params, headers, ...config })
  return response.data
})

// Restore Model by ID /collection/{id}/restore
// Restore Collection by selected Ids /collection/selected/restore --params selected=[1,2,3]
// Restore all Models in Collection /collection/all/restore
export const restore = createAsyncThunk('resource/restore', async ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${type}/restore` // Restore of collection
  const response = await post({ url, data, params, headers, config })
  return response.data
})