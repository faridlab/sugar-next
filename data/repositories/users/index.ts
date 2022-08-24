import {
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/users/columns'
import forms from '@data/repositories/users/forms'
import data from '@data/repositories/users/data'

const params = {
  relationship: ['roles.role'],
}

export {
  data,
  columns,
  forms,
  validation,
  params
}