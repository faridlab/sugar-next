import { GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid"
import Link from 'next/link'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Country',
    editable: false,
    renderCell: (params: GridRenderCellParams) => <Link href={`/countries/${params.id}`}>{params.value || ''}</Link>,
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