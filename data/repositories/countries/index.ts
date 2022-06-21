import {
  data,
  forms,
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/countries/columns'
columns.unshift({
  field: 'name',
  headerName: 'Country',
  editable: false
})

const params = {}

export {
  data,
  columns,
  forms,
  validation,
  params
}