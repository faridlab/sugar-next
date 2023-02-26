import { GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid"
import Link from 'next/link'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'City',
    editable: false,
    width: 260,
    renderCell: (params: GridRenderCellParams) => <Link href={`/cities/${params.id}`}>{params.value || ''}</Link>,
  },
  {
    field: 'province',
    headerName: 'Province',
    editable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => <Link href={`/provinces/${params.value.id}`}>{params.value.name || ''}</Link>,
  },
  {
    field: 'country',
    headerName: 'Country',
    editable: false,
    width: 160,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => <Link href={`/countries/${params.value.id}`}>{params.value.name || ''}</Link>,
  },
]

export default columns