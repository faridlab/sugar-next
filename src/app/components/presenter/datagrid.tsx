import { FunctionComponent, useEffect, useState } from 'react'
import {
  DataGrid,
  GridApiRef,
  GridEnrichedColDef,
  GridEventListener,
  GridEvents
} from '@mui/x-data-grid'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

interface ToolbarProps {
  apiRef: GridApiRef;
}

function DatagridToolbar(props: ToolbarProps) {
  const [ searcText, setSearcText ] = useState<string>('')
  const { apiRef } = props;
  let debounceTimeout: ReturnType<typeof setTimeout>

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearcText(event.target.value)
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      DatagridToolbar.prototype.onValueChanged(event.target.value)
    }, 1200)
  }

  return (
    <Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            size='small'
            id="search-box"
            value={searcText}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="Search icon"
                  edge="start"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Toolbar>
  )
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
  const [searchText, setSearchText] = useState<string>('')
  let debounceTimeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: pageSize,
      search: searchText
    }
    onPaginationChanged(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize])

  DatagridToolbar.prototype.onValueChanged = (value: string) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      setSearchText(value)
      setCurrentPage(0)
      const params = {
        page: 0,
        limit: pageSize,
        search: value
      }
      onPaginationChanged(params)
    }, 300)
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