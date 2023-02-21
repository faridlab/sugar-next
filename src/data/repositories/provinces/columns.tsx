import { GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid"
import Link from 'next/link'

const columns: GridEnrichedColDef[] = [
  {
    field: 'country',
    headerName: 'Country',
    editable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams) => <Link href={`/countries/${params.value.id}`}>{params.value.name || ''}</Link>,
  },
  {
    field: 'name',
    headerName: 'Province',
    editable: false,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => <Link href={`/provinces/${params.id}`}>{params.value || ''}</Link>,
  },
]

export default columns