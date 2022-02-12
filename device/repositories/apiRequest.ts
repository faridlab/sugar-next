import api, { RequestType, RequestDataType } from '../utils/axios'

export async function get ({ url, params, headers, config }: RequestType) {
  const token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  return await api.get(url, { params, headers, ...config })
}

export async function create ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  // const _headers = state.headers

  if (token) {
    // headers = { Authorization: `Bearer ${token}`, ..._headers, ...headers }
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }

  if (headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData()
    for (const key in data) {
      if (data[key]) formData.append(key, data[key])
    }
    data = formData
  }

  // const url = `/${collection}`
  return await api.post(url, data, { params, headers, ...config })
}

export async function detail ({ url, params, headers = {}, config = {} }: RequestType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}`
  return await api.get(url, { params, headers, ...config })
}

export async function update ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  // const _headers = state.headers
  data._method = 'PUT'

  if (token) {
    // headers = { Authorization: `Bearer ${token}`, ...headers, ..._headers }
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }

  if (headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData()
    for (const key in data) {
      if (data[key]) formData.append(key, data[key])
    }
    data = formData
  }
  // const url = `/${collection}/${id}`
  return await api.post(url, data, { params, headers, ...config })
}

export async function patch ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}`
  return await api.patch(url, data, { params, headers, ...config })
}

// Destroy Model by ID /collection/{id}
// Destroy Collection by selected Ids /collection/selected --params selected=[1,2,3]
// Destroy all Models in Collection /collection/all
export async function destroy ({ url, type, data, params, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${type}` // Softdelete
  return await api.delete(url, { data, params, headers, ...config })
}

// Delete Model by ID /collection/{id}/delete
// Delete Collection by selected Ids /collection/selected/delete --params ids=[1,2,3]
// Delete all Models in Collection /collection/all/delete
export async function hardDelete ({ url, type, data, params, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${type}/delete` // Permanent delete
  return await api.delete(url, { data, params, headers, ...config })
}

export async function trash ({ url, params, headers = {}, config = {} }: RequestType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/trash` // Trash of collection
  return await api.get(url, { params, headers })
}

export async function trashed ({ url, params, headers = {}, config = {} }: RequestType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${id}/trashed` // Data trashed detail
  return await api.get(url, { params, headers, ...config })
}

// Restore Model by ID /collection/{id}/restore
// Restore Collection by selected Ids /collection/selected/restore --params selected=[1,2,3]
// Restore all Models in Collection /collection/all/restore
export async function restore ({ url, type, data, params, headers = {}, config = {} }: RequestDataType) {
  var token = await localStorage.getItem('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}/${type}/restore` // Restore of collection
  return await api.post(url, data, { params, headers, ...config })
}
