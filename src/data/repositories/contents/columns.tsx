import { GridEnrichedColDef } from "@mui/x-data-grid"

const columns: GridEnrichedColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    editable: false
  },
  {
    field: 'excerpt',
    headerName: 'Content',
    editable: false,
    flex: 1
  },
]

export default columns