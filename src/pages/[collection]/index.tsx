import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import DashboardLayout from '@app/layouts/dashboard'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import gridActions from '@data/repositories/datagrid/actions'

import {
  GridEnrichedColDef,
} from '@mui/x-data-grid'

import { useDeleteMutation } from '@app/services/api/apiRequest'
import * as dataRepositories from '@data/repositories'
import { useQueryMutation } from '@app/services/api/apiRequest'
import { DatagridPresenter } from '@app/components/presenter'
import { Params } from '@component/presenter/datagrid'
import { useDialog } from '@app/hooks'
import { RequestDataType } from '@device/utils/axios'

const CollectionPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, delete_id } = router.query
  const url = `/${collection}`
  const [ columns, setColumns ] = useState<GridEnrichedColDef[]>([])
  const [ rows, setRows ] = useState([])
  const [ loading, setLoading ] = useState<boolean>(false)
  // NOTE: i don't like this approach use ready state, please find ahother cool way
  const [ ready, setReady ] = useState<boolean>(false)
  const [ rowCount, setRowCount ] = useState(0)
  const [ deleteData ] = useDeleteMutation()
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

  useEffect(() => {
    if(!router.isReady) return
    const { collection } = router.query
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || []
    const parameters = (dataRepositories as any)[collection as string]?.params || resources.params
    // setParams({...params, ...parameters})
    columns.push(gridActions)

    setParams(parameters)
    setColumns(columns)
    setRows([])
    onFetchData(`/${collection}`, parameters)
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
        router.push(`/${collection}`)
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

  return (
    <>
      <Head>
        <title>Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <DatagridPresenter
          columns={columns}
          rows={rows}
          rowCount={rowCount}
          params={params}
          isLoading={loading}
          onPaginationChanged={onPaginationChanged}
          // onCellClick={onCellClick}
        />
      </DashboardLayout>
      <DialogScreen />
    </>
  )
}

export default CollectionPage