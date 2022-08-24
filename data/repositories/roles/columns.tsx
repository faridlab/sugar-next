import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { columns as cols } from '@data/repositories/resources'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
    width: 160
  },
  {
    field: 'guard_name',
    headerName: 'Guard',
    editable: false,
    width: 200,
    flex: 1,
  },
  ...cols
]

export default columns