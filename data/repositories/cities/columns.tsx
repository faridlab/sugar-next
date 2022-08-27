import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'City',
    editable: false,
    width: 260,
  },
  {
    field: 'province_id',
    headerName: 'Province',
    editable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.province.name || ''}`,
  },
  {
    field: 'country',
    headerName: 'Country',
    editable: false,
    width: 160,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.country.name || ''}`,
  },
]

export default columns