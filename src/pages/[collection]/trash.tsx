import { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import DashboardLayout from '@app/layouts/dashboard'
import Head from 'next/head'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import gridActions from '@data/repositories/datagrid/trashActions'
import useFilterParams from '@app/hooks/useFilterParams'
import {
  Box,
  Button,
  Stack} from '@mui/material'

import {
  GridEnrichedColDef,
} from '@mui/x-data-grid'

import { useDeleteMutation, usePostMutation } from '@app/services/api/apiRequest'
import * as dataRepositories from '@data/repositories'
import { useQueryMutation } from '@app/services/api/apiRequest'
import { DatagridPresenter } from '@app/components/presenter'
import { Params } from '@component/presenter/datagrid'
import { useDialog } from '@app/hooks'
import { RequestDataType } from '@device/utils/axios'
import { params } from '@/data/repositories/resources'

const CollectionTrashPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, delete_id, restore_id } = router.query
  const url = `/${collection}/trash`
  const [ columns, setColumns ] = useState<GridEnrichedColDef[]>([])
  const [ rows, setRows ] = useState([])
  const [ loading, setLoading ] = useState<boolean>(false)
  // NOTE: i don't like this approach use ready state, please find ahother cool way
  const [ ready, setReady ] = useState<boolean>(false)
  const [ rowCount, setRowCount ] = useState(0)
  const [ deleteData ] = useDeleteMutation()
  const [ restoreData ] = usePostMutation()
  const { openDialog, DialogScreen} = useDialog()

  const filterParams = useFilterParams()
  const {
    parameters,
    setParameters
  } = filterParams

  const [ fetchQuery ] = useQueryMutation()
  const onFetchData = async (url: string, params: Record<string, any> = {}) => {
    try {
      if(loading) return
      setLoading(true)
      const payload = {
        url,
        params
      }
      const response = await fetchQuery(payload).unwrap()
      const { data, meta } = response
      setRows(data)
      setRowCount(meta.recordsFiltered)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    if(!router.isReady) return
    const { collection } = router.query
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || []
    const parameters = (dataRepositories as any)[collection as string]?.params || resources.params
    // setParams({...params, ...parameters})
    columns.push(gridActions)

    setParameters({...parameters, ...params})
    setColumns(columns)
    setRows([])
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady, collection ])

  useEffect(() => {
    if(!delete_id) return
    onDelete(delete_id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delete_id])

  useEffect(() => {
    if(!restore_id) return
    onRestoreData(restore_id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restore_id])

  const onDelete = async (id: string) => {
    try {
      const isOkay = await openDialog({
        title: 'Delete',
        content: 'Are you sure want to delete forever?'
      })
      if(!isOkay) {
        router.push(`/${collection}/trash`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/${id}/delete`,
        data: {}
      }

      const response = await deleteData(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}`)
          onFetchData(url, params)
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const onRestoreData = async (id: string) => {
    try {
      const isOkay = await openDialog({
        title: 'Restore',
        content: 'Are you sure to restore?'
      })
      if(!isOkay) {
        router.push(`/${collection}/trash`)
        onFetchData(url, params)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/${id}/restore`,
        data: {}
      }

      const response = await restoreData(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}/trash`)
          onFetchData(url, params)
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const onRestore = async () => {
    try {
      const isOkay = await openDialog({
        title: 'Restore All',
        content: 'Are you sure to restore all?'
      })
      if(!isOkay) {
        router.push(`/${collection}/trash`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/all/restore`,
        data: {}
      }

      const response = await restoreData(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}/trash`)
          onFetchData(url, params)
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const onEmpty = async () => {
    try {
      const isOkay = await openDialog({
        title: 'Empty Trash',
        content: 'Are you sure to empty trash?'
      })
      if(!isOkay) {
        router.push(`/${collection}/trash`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/all/delete`,
        data: {}
      }

      const response = await deleteData(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}/trash`)
          onFetchData(url, params)
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const ToolbarActions: FunctionComponent = () => {
    return <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      p={2}
    >
      <Box></Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={1}
      >
        <Button
          startIcon={<DeleteForeverIcon />}
          color="error"
          onClick={onEmpty}
        >
          Empty
        </Button>
        <Button
          startIcon={<RestoreFromTrashIcon />}
          color="success"
          onClick={onRestore}
        >
          Restore
        </Button>
      </Stack>
    </Box>
  }

  return (
    <>
      <Head>
        <title>Trash {`${collection||''}`}</title>
        <meta name="description" content="{`${collection||''}`}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout
        filterParams={filterParams}
        title={`${collection||''}`}
        ToolbarActions={ToolbarActions}
      >
        <DatagridPresenter
          columns={columns}
          rows={rows}
          rowCount={rowCount}
          params={parameters}
          setParams={setParameters}
          isLoading={loading}
        />
      </DashboardLayout>
      <DialogScreen />
    </>
  )
}

export default CollectionTrashPage
