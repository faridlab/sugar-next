import {
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/cities/columns'
import forms from '@data/repositories/cities/forms'
import data from '@data/repositories/cities/data'

const params = {
  relationship: ['country', 'province'],
}

export {
  data,
  columns,
  forms,
  validation,
  params
}