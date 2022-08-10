import { FunctionComponent, useEffect, useState } from 'react'
import {
  DataGrid,
  GridApiRef,
  GridCellParams,
  GridEnrichedColDef,
  GridEventListener,
  GridEvents,
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
  rowCount: number;
  onRowClick?: GridEventListener<GridEvents.rowClick>;
  onCellClick?: GridEventListener<GridEvents.cellClick>;
  rows: Record<string, any>[] | Record<string, any>;
  columns: GridEnrichedColDef[];
  isLoading: boolean;
}

const DatagridPresenter: FunctionComponent<PropsType> = (props: PropsType) => {
  const {
    isLoading,
    onPaginationChanged,
    onRowClick,
    onCellClick,
    rows,
    columns,
    rowCount
  } = props
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

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
        paginationMode="server"
        pageSize={pageSize}
        rowCount={rowCount}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onCellClick={onCellClick}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        pagination
        onPageChange={(page) => setCurrentPage(page)}
        components={{
          Toolbar: DatagridToolbar,
        }}
        sx={{
          '& .MuiDataGrid-cell:hover': {
            cursor: 'pointer',
          },
        }}
      />
    </div>
  )
}

export default DatagridPresenter