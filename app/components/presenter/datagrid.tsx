import { FunctionComponent, useEffect, useState } from 'react'
import {
  DataGrid,
  GridApiRef,
  GridEnrichedColDef,
  GridPinnedColumns,
  GridToolbarContainer
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'

interface ToolbarProps {
  apiRef: GridApiRef;
}

function DatagridToolbar(props: ToolbarProps) {
  const { apiRef } = props;

  const handleClick = () => {
    // const id = randomId()
    // apiRef.current.updateRows([{ id, isNew: true }])
    // apiRef.current.setRowMode(id, 'edit')
    // // Wait for the grid to render with the new row
    // setTimeout(() => {
    //   apiRef.current.scrollToIndexes({
    //     rowIndex: apiRef.current.getRowsCount() - 1,
    //   })
    //   apiRef.current.setCellFocus(id, 'name')
    // })
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Quick Add
      </Button>
    </GridToolbarContainer>
  )
}


const pinnedColumns: GridPinnedColumns = {
  right: ['actions']
}

export type Params = {
  page: number;
  limit: number;
  [key: string]: Object | number | string | Record<string, any> | Record<string, any>[] | Function;
}

type PropsType = {
  params: Params;
  onPaginationChanged: Function;
  onRowClick: Function;
  rows: Record<string, any>[] | Record<string, any>;
  columns: GridEnrichedColDef[];
  isLoading: boolean;
}

const DatagridPresenter: FunctionComponent<PropsType> = (props: PropsType) => {
  const { params, isLoading, onPaginationChanged, onRowClick, rows, columns} = props
  const { page, limit } = params
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [pageSize, setPageSize] = useState<number>(limit)

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: pageSize
    }
    onPaginationChanged(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize])

  return(
    <div style={{ width: '100%' }}>
      <DataGrid
        loading={isLoading}
        autoHeight={true}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick

        pageSize={pageSize}
        rowCount={200}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onRowClick={onRowClick}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pagination
        onPageChange={(page) => setCurrentPage(page)}
        components={{
          Toolbar: DatagridToolbar,
        }}
      />
    </div>
  )
}

export default DatagridPresenter