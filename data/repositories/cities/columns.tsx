import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { columns as cols } from '@data/repositories/resources'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'City',
    editable: false
  },
  {
    field: 'province_id',
    headerName: 'Province',
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.province.name || ''}`,
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