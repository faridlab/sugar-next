import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"
import Image from 'next/image'

const columns: GridEnrichedColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    editable: false,
    width: 160,
    renderCell: (params) =>
      params.row.banner?.fullpath ?
      <Image
        src={params.row.banner.fullpath}
        alt='banner image'
        width={50}
        height={50}
      /> : null,

  },
  {
    field: 'title',
    headerName: 'Name',
    editable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: false,
    flex: 1
  },
]

export default columns