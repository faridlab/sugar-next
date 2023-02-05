import Router from 'next/router'
import {
  GridActionsCellItem,
  GridEnrichedColDef,
} from '@mui/x-data-grid'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'

const actions: GridEnrichedColDef = {
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
      onClick={() => Router.push(`/${Router.query.collection}?delete_id=${params.id}`)}
    />,

  ],
}

export default actions