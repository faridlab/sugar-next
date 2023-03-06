import {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from "react"

import {
  GridActionsCellItem,
  GridEnrichedColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  MuiEvent,
} from '@mui/x-data-grid'

import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import CancelIcon from '@mui/icons-material/Close'

interface ActionsProps {
  // rows: GridRowsProp[]
  // setRows: Dispatch<SetStateAction<(readonly GridValidRowModel[])[]>>
  rows: any[]
  setRows: Dispatch<SetStateAction<(any[])>>
  // rowModesModel: GridRowModesModel
  // setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

const useActionsPresenter = (props: ActionsProps) => {
// const useActionsPresenter = () => {
  // const [ rows, setRows ] = useState<GridRowsProp[]>([])
  // const [ rows, setRows ] = useState<any[]>([])
  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({})
  const {
    rows,
    setRows,
    // rowModesModel,
    // setRowModesModel
  } = props

  const rowModels = useRef<GridRowModesModel>({})

  // useEffect(() => {
  //   console.log(rowModesModel)
  // }, [rowModesModel])

  const debounceTimeout = useRef<ReturnType<typeof setTimeout>>()
  const debounce = (callback: Function, timeout: number = 600) => {
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => callback(), timeout)
  }

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id: GridRowId) => () => {
    rowModels.current = { ...rowModels.current, [id]: { mode: GridRowModes.Edit } }
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    setRowModesModel(rowModels.current)
  }

  const handleSaveClick = (id: GridRowId) => () => {
    rowModels.current = { ...rowModels.current, [id]: { mode: GridRowModes.View } }
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // })
    rowModels.current = {
      ...rowModels.current,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }
    setRowModesModel(rowModels.current)

    // const editedRow = rows.find((row) => row.id === id)
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id))
    // }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const actions: GridEnrichedColDef = {
    field: 'actions',
    type: 'actions',
    getActions: ({id}) => {
      // console.log(id, rowModesModel)
      // console.log(rowModels)
      // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
      const isInEditMode = rowModels.current[id]?.mode === GridRowModes.Edit
      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="action-save"
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="action-cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ]
      }

      return [
        <GridActionsCellItem
          key="action-edit"
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="action-delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ]
    }
  }

  const presenterProps = {
    rowModesModel,
    onRowModesModelChange: (newModel: GridRowModesModel) => setRowModesModel(newModel),
    onRowEditStart: handleRowEditStart,
    onRowEditStop: handleRowEditStop,
    processRowUpdate: processRowUpdate,
    componentsProps: { toolbar: { setRows, setRowModesModel } },
    experimentalFeatures: { newEditingApi: true }
  }

  return {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    actions,
    debounce,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    processRowUpdate,
    presenterProps
  }
}

export default useActionsPresenter