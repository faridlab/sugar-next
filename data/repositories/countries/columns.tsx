import { GridEnrichedColDef } from "@mui/x-data-grid"

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Country',
    editable: false
  },
  {
    field: 'isocode',
    headerName: 'ISO Code',
    editable: false,
  },
  {
    field: 'phonecode',
    headerName: 'Phone Code',
    editable: false,
    flex: 1
  },
]

export default columns