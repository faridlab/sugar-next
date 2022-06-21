import {
  data,
  forms,
  validation
} from '@domain/repositories/resources'

import columns from '@data/repositories/provinces/columns'

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