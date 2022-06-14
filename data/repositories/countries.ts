import {
  data,
  forms,
  validation
} from '@domain/repositories/resources'

export {
  fetch,
  create,
  update,
  detail,
  patch,
  trash,
  trashed,
  destroy,
  hardDelete,
  restore,
} from '@data/repositories/resources'

import {
  columns as clmns
} from '@data/repositories/resources'

const params = {}
const columns = [...clmns]
columns.unshift({
  field: 'name',
  headerName: 'Country',
  editable: false
})

export {
  data,
  columns,
  forms,
  validation,
  params
}