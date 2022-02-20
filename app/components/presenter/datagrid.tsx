import { FunctionComponent, useEffect, useState } from "react"
import {
  DataGrid,
  GridEnrichedColDef,
  GridPinnedColumns} from '@mui/x-data-grid'

const pinnedColumns: GridPinnedColumns = {
  right: ['actions']
}

export type Params = {
  page: number
  limit: number
  // [key: string]: Object | number | string | Record<string, any>[] | Function
}

type PropsType = {
  params?: Params
  onRequestData: Function,
  rows: Record<string, any>[],
  columns: GridEnrichedColDef[]
}

const DatagridPresenter: FunctionComponent<PropsType> = ({ params, onRequestData, rows, columns}: PropsType) => {
  const { page, limit } = params
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [pageSize, setPageSize] = useState<number>(limit)

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: pageSize
    }
    onRequestData(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize])

  return(
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick

        pageSize={pageSize}
        rowCount={200}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pagination
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default DatagridPresenter