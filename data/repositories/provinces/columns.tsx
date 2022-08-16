import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { columns as cols } from '@data/repositories/resources'

const columns: GridEnrichedColDef[] = [
  {
    field: 'country',
    headerName: 'Country',
    editable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.country.name || ''}`,
  },
  {
    field: 'name',
    headerName: 'Province',
    editable: false,
    flex: 1
  },
  ...cols
]

export default columns