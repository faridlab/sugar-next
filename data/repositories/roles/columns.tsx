import { GridEnrichedColDef } from "@mui/x-data-grid"

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
]

export default columns