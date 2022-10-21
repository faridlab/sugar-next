import {
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/banners/columns'
import forms from '@data/repositories/banners/forms'
import data from '@data/repositories/banners/data'

const params = {
  relationship: ['banner', 'video'],
}

export {
  data,
  columns,
  forms,
  validation,
  params
}