import { GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid"
import Link from 'next/link'

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Country',
    editable: true,
    renderCell: (params: GridRenderCellParams) => <Link href={`/countries/${params.id}`}>
        <strong>{params.value || ''}</strong>
      </Link>,
    // renderEditCell
  },
  {
    field: 'isocode',
    headerName: 'ISO Code',
    editable: true,
  },
  {
    field: 'phonecode',
    headerName: 'Phone Code',
    editable: true,
    flex: 1
  },
]

export default columns