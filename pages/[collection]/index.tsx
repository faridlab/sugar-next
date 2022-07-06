import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from '@mui/material/Link'

import Head from 'next/head'
import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'

import * as dataRepositories from '@data/repositories'

import { useFetchQuery } from '@app/services/api/apiRequest'

import { Box, Breadcrumbs, Button, IconButton, Stack, Typography } from '@mui/material'

import { DatagridPresenter } from '@app/components/presenter'
import { GridEnrichedColDef, GridRowParams } from '@mui/x-data-grid'

import { Params } from '@component/presenter/datagrid'

const CollectionPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection } = router.query
  const url = `/${collection}`
  const [ columns, setColumns ] = useState<GridEnrichedColDef[]>([])
  const [ rows, setRows ] = useState([])
  const [ rowCount, setRowCount ] = useState(0)

  const [ params, setParams ] = useState({
    page: 1,
    limit: 10,
  })

  const { data, error, isLoading } = useFetchQuery({ url, params })
  useEffect(() => {
    if(!data) return
    const rows = data.data
    setRows(rows)
    const { meta } = data
    setRowCount(meta.recordsTotal)
  }, [data, isLoading])

  const onRowClick = (params: GridRowParams) => {
    const { id } = params
    router.push(`/${collection}/${id}`)
  }

  useEffect(() => {
    if(!router.isReady) return
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || resources.columns
    const parameters = (dataRepositories as any)[collection as string]?.params || resources.params
    setParams({...params, ...parameters})
    setColumns(columns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady, collection ])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onPaginationChanged = (parameters: Params) => {
    setParams({...params, ...parameters})
  }

  return (
    <>
      <Head>
        <title>Collection</title>
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
            <Button href={`/${collection}/create`} variant="text" startIcon={<AddIcon />}>New</Button>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                Quick Add
              </MenuItem>
              <MenuItem>
                <Typography color="error">Trash</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <DatagridPresenter
          columns={columns}
          rows={rows}
          rowCount={rowCount}
          params={params}
          isLoading={isLoading}
          onPaginationChanged={onPaginationChanged}
          onRowClick={onRowClick}
        />
      </Box>
    </>
  )
}

CollectionPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default CollectionPage