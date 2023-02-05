import {
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/provinces/columns'
import forms from '@data/repositories/provinces/forms'
import data from '@data/repositories/provinces/data'

const params = {
  relationship: ['country'],
}

export {
  data,
  columns,
  forms,
  validation,
  params
}