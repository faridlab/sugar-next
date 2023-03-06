import { FunctionComponent, useState } from 'react'
import {
  DataGrid,
  GridEnrichedColDef
} from '@mui/x-data-grid'

export type Params = {
  page: number;
  limit: number;
  [key: string]: Object | number | string | Record<string, any> | Record<string, any>[] | Function;
}

type PropsType = {
  params: Params;
  setParams: Function;
  rowCount: number;
  // rows: Record<string, any>[] | Record<string, any>;
  rows: any[];
  columns: GridEnrichedColDef[];
  isLoading: boolean;
  props?: Record<string, any>, // used for dynamic props component
}

const DatagridPresenter: FunctionComponent<PropsType> = (props: PropsType) => {
  const {
    params,
    setParams,
    isLoading,
    rows,
    columns,
    rowCount
  } = props
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(25)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setParams({...params, page: (page + 1), limit: pageSize})
  }

  const properties = () => {
    return props.props || {}
  }

  return(
    <div style={{ width: '100%' }}>
      <DataGrid
        loading={isLoading}
        autoHeight={true}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        paginationMode="server"
        pageSize={pageSize}
        rowCount={rowCount}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pagination
        onPageChange={onPageChange}
        { ...properties() }
      />
    </div>
  )
}

export default DatagridPresenter