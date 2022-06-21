import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { columns as cols } from '@data/repositories/resources'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Province',
    editable: false
  },
  {
    field: 'country',
    headerName: 'Country',
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.country.name || ''}`,
  },
  ...cols
]

export default columns