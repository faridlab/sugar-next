import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import HomeIcon from '@mui/icons-material/Home'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import Link from '@mui/material/Link'

import Head from 'next/head'
import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'

import {
  Box,
  Breadcrumbs,
  Button,
  Stack,
  Typography
} from '@mui/material'

import {
  GridCellParams,
  GridEnrichedColDef,
  GridEventListener,
  GridEvents,
} from '@mui/x-data-grid'

import { useDeleteMutation, usePostMutation } from '@app/services/api/apiRequest'
import * as dataRepositories from '@data/repositories'
import { useQueryMutation } from '@app/services/api/apiRequest'
import { DatagridPresenter } from '@app/components/presenter'
import { Params } from '@component/presenter/datagrid'
import { useDialog } from '@app/hooks'
import { RequestDataType } from '@device/utils/axios'

const CollectionTrashPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, delete_id } = router.query
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

  const [ params, setParams ] = useState({
    page: 1,
    limit: 10,
  })

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

  const onCellClick: GridEventListener<GridEvents.cellClick> = (params: GridCellParams) => {
    const { isEditable, id, colDef } = params
    const { type } = colDef
    if(type === 'actions') return
    if(isEditable) return
    router.push(`/${collection}/${id}/trashed`)
  }

  useEffect(() => {
    if(!router.isReady) return
    const { collection } = router.query
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || resources.columns
    const parameters = (dataRepositories as any)[collection as string]?.params || resources.params
    // setParams({...params, ...parameters})
    setParams(parameters)
    setColumns(columns)
    setRows([])
    onFetchData(`/${collection}/trash`, parameters)
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady, collection ])

  useEffect(() => {
    if(!delete_id) return
    onDelete(delete_id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delete_id])

  const onDelete = async (id: string) => {
    try {
      const isOkay = await openDialog({
        title: 'Delete',
        content: 'Are you sure want to delete?'
      })
      if(!isOkay) {
        router.push(`/${collection}/trash`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/${id}`,
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

  const onPaginationChanged = (parameters: Params) => {
    setParams({...params, ...parameters})
    if(!ready) return
    onFetchData(url, {...params, ...parameters})
  }

  const linkTo = (path: string): void => {
    router.push(path)
  }

  const onRestore = async () => {
    try {
      const isOkay = await openDialog({
        title: 'Restore All',
        content: 'Are you sure to restore all?'
      })
      if(!isOkay) return

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
      if(!isOkay) return

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

  return (
    <>
      <Head>
        <title>Trash Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ p: 2, mt: 8, display: 'flex', flexDirection: 'column', }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={2}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon />
            </Link>
            {/* <Link
              underline="hover"
              color="inherit"
              href="/getting-started/installation/"
            >
              Core
            </Link> */}
            <Typography color="text.primary">{collection}</Typography>
          </Breadcrumbs>
          <Stack spacing={2} direction="row">
            <Button onClick={onEmpty} variant="text" color="error" startIcon={<DeleteForeverIcon />}>Empty</Button>
            <Button onClick={onRestore} variant="contained" color="success" startIcon={<RestoreFromTrashIcon />}>Restore</Button>
          </Stack>
        </Stack>
        <DatagridPresenter
          columns={columns}
          rows={rows}
          rowCount={rowCount}
          params={params}
          isLoading={loading}
          onPaginationChanged={onPaginationChanged}
          onCellClick={onCellClick}
        />
      </Box>
      <DialogScreen />
    </>
  )
}

CollectionTrashPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default CollectionTrashPage
