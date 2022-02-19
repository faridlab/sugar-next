import { FunctionComponent, useState } from "react"
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridValueOptionsParams,
  GridColDef,
  GridActionsColDef,
  GridEnrichedColDef,
  GridValueGetterParams,
  GridPinnedColumns,
  GridRowParams
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import FileCopyIcon from '@mui/icons-material/FileCopy'

const columns: GridEnrichedColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    // width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    // width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    // width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    // width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        key={1}
        icon={<DeleteIcon />}
        label="Delete"
        showInMenu
      />,
      <GridActionsCellItem
        key={2}
        icon={<SecurityIcon />}
        label="Toggle Admin"
        showInMenu
      />,
      <GridActionsCellItem
        key={3}
        icon={<FileCopyIcon />}
        label="Duplicate User"
        showInMenu
      />,
    ],
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

const pinnedColumns: GridPinnedColumns = {
  right: ['actions']
}

const DatagridPresenter: FunctionComponent = () => {
  const [pageSize, setPageSize] = useState<number>(10)

  return(
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick

        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pagination
      />
    </div>
  )
}

export default DatagridPresenter