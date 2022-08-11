import Router from 'next/router'
import {
  GridActionsCellItem,
  GridEnrichedColDef,
} from '@mui/x-data-grid'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  data,
  // columns, NOTE: because columns needs type from react-data-grid, it's not possible to use import from domain context
  forms,
  validation
} from '@domain/repositories/resources'

const params = {}
const columns: GridEnrichedColDef[] = [
  // ...
  // NOTE: actions will be always columns to be added
  {
    field: 'actions',
    type: 'actions',
    width: 50,
    getActions: (params) => [
      <GridActionsCellItem
        key={1}
        icon={<VisibilityIcon />}
        label="Show"
        showInMenu
        onClick={() => Router.push(`/${Router.query.collection}/${params.id}`)}
      />,
      <GridActionsCellItem
        key={2}
        icon={<EditIcon />}
        label="Edit"
        showInMenu
        onClick={() => Router.push(`/${Router.query.collection}/${params.id}?editable=true`)}
      />,
      <GridActionsCellItem
        key={3}
        icon={<ContentCopyIcon />}
        label="Duplicate"
        showInMenu
        onClick={() => Router.push(`/${Router.query.collection}/create?duplicate_from_id=${params.id}`)}
      />,
      <GridActionsCellItem
        key={4}
        icon={<DeleteIcon />}
        label="Delete"
        showInMenu
        onClick={() => alert(`Delete data ${params.id} not implemented yet.`)}
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