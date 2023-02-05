import {
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/profile/columns'
import forms from '@data/repositories/profile/forms'
import data from '@data/repositories/profile/data'

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