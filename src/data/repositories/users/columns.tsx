import { GridEnrichedColDef, GridValueGetterParams } from "@mui/x-data-grid"

const columns: GridEnrichedColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
    width: 260,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name} ${params.row.last_name}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: false,
    width: 200,
  },
  {
    field: 'role',
    headerName: 'Roles',
    editable: false,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      const { roles } = params.row
      if(!roles) return '-'
      const roleNames = []
      for (const item of roles) {
        roleNames.push(item.role.name)
      }
      return roleNames.join(', ')
    }
  },
]

export default columns