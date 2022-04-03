import {
  data,
  // columns, NOTE: because columns needs type from react-data-grid, it's not possible to use import from domain context
  forms,
  validation
} from '@domain/repositories/resources'
import { GridActionsCellItem, GridEnrichedColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import PageviewIcon from '@mui/icons-material/Pageview'

import { getCookie } from 'cookies-next'

import {
  get,
  post,
  update as updateRequest,
  patch as patchRequest,
  del as deleteRequest,
} from '@device/repositories/apiRequest'

import { RequestType, RequestDataType } from '@device/utils/axios'

export const fetch = async ({ url, params, headers = {}, config = {} }: RequestType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await get({ url, params, headers, config})
  return response
}

export const create = async ({ url, data, params = {}, headers = {}, config = {} }: RequestDataType) => {
  const token = getCookie('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  // const url = `/${collection}`
  const response = await post({ url, data, params, headers, config })
  return response
}


const params = {}
const columns: GridEnrichedColDef[] = [
  // ...
  // NOTE: actions will be always columns to be added
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        key={0}
        icon={<PageviewIcon sx={{ fontSize: 26 }} />}
        label="View"
      />,
      <GridActionsCellItem
        key={1}
        icon={<DeleteIcon />}
        label="Delete"
        showInMenu
      />,
      <GridActionsCellItem
        key={2}
        icon={<SecurityIcon />}
        label="Toggle Admin"
        showInMenu
      />,
      <GridActionsCellItem
        key={3}
        icon={<FileCopyIcon />}
        label="Duplicate User"
        showInMenu
      />,
    ],
  },
]

export {
  data,
  columns,
  forms,
  validation,
  params
}