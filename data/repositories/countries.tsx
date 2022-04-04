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
  columns
} from '@data/repositories/resources'

const params = {}
// const columns: GridEnrichedColDef[] = [
//   ...cols
// ]

export {
  data,
  columns,
  forms,
  validation,
  params
}