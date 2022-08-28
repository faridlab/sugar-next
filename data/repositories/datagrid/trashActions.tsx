import Router from 'next/router'
import {
  GridActionsCellItem,
  GridEnrichedColDef,
} from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'

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
      onClick={() => Router.push(`/${Router.query.collection}/${params.id}/trashed`)}
    />,
    <GridActionsCellItem
      key={2}
      icon={<RestoreFromTrashIcon />}
      label="Restore"
      showInMenu
      onClick={() => Router.push(`/${Router.query.collection}/trash?restore_id=${params.id}`)}
    />,
    <GridActionsCellItem
      key={4}
      icon={<DeleteForeverIcon />}
      label="Delete"
      showInMenu
      onClick={() => Router.push(`/${Router.query.collection}/trash?delete_id=${params.id}`)}
    />,

  ],
}

export default actions