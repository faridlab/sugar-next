import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import DashboardLayout from '@app/layouts/dashboard'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import gridActions from '@data/repositories/datagrid/actions'

import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import {
  GridEnrichedColDef,
} from '@mui/x-data-grid'

import * as dataRepositories from '@data/repositories'
import { DatagridPresenter } from '@app/components/presenter'
import { useDialog } from '@app/hooks'
import useFilterParams from '@app/hooks/useFilterParams'
import { Box, Stack, Button, IconButton } from '@mui/material'
import useQuery from '@app/hooks/useQuery'
import useDestruction from '@/app/hooks/useDestruction'

const CollectionPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, delete_id } = router.query
  const [ columns, setColumns ] = useState<GridEnrichedColDef[]>([])
  // NOTE: i don't like this approach use ready state, please find ahother cool way
  const [ ready, setReady ] = useState<boolean>(false)
  const [ pageTitle, setPageTitle ] = useState<string>('')
  const { openDialog, DialogScreen} = useDialog()

  const filterParams = useFilterParams()
  const {
    parameters,
    setParameters
  } = filterParams

  const {
    fetchData,
    loading,
    response
  } = useQuery({collection, openDialog})

  const callbackOnDeleted = () => fetchData(parameters)
  const {
    deleteData
  } = useDestruction({collection, openDialog, callbackOnDeleted})

  useEffect(() => {
    if(!router.isReady) return
    const { collection } = router.query
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || []
    const params = (dataRepositories as any)[collection as string]?.params || resources.params
    // setParams({...params, ...parameters})
    columns.push(gridActions)

    setParameters({...parameters, ...params})
    setColumns(columns)
    setReady(true)
    setPageTitle(collection as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady, collection ])

  useEffect(() => {
    if(!delete_id) return
    deleteData(delete_id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delete_id])

  const rows = useMemo(() => response?.data || [], [response])
  const rowCount = useMemo(() => response?.meta?.recordsFiltered || 0, [response])

  useEffect(() => {
    if(!ready) return
    fetchData(parameters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, collection, parameters])

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
          startIcon={<AddIcon />}
          color="success"
          onClick={() => router.push(`/${collection}/create`)}
        >
          New
        </Button>
        <IconButton
          aria-label="trash"
          color="error"
          onClick={() => router.push(`/${collection}/trash`)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  }

  return (
    <>
      <Head>
        <title>{`${collection||''}`}</title>
        <meta name="description" content="{`${collection||''}`}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout
        filterParams={filterParams}
        title={pageTitle}
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

export default CollectionPage