import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from '@mui/material/Link'

import Head from 'next/head'
import Layout from '../../app/layouts/layout'
import { NextPageWithLayout } from '../../app/utils/pageTypes'

import FormGenerator from '@component/forms'

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks'

import {
  detail,
} from '../../app/stores/resources'

import {
  selectResource
} from '../../app/stores/resources'
import { Box, Breadcrumbs, Button, IconButton, Stack, Typography } from '@mui/material'

const CollectionDetailPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, id } = router.query
  const url = `/${collection}`

  const parameter = {
    page: 1,
    limit: 10,
    relationship: ['country', 'province']
  }

  const [ params, setParams ] = useState(parameter)

  const dispatch = useAppDispatch()
  const {
    data,
    // response,
    // pending,
    // error,
  } = useAppSelector(selectResource)

  const onPagerequest = async ({ page = 1, limit = 25 } = {}) => {
    if(!router.isReady) return
    const url = `/${collection}/${id}`
    dispatch(detail({url, params}))
    return false
  }

  useEffect(() => {
    if(!router.isReady) return
    onPagerequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady ])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
            <Typography color="text.primary">Countries</Typography>
          </Breadcrumbs>
          <Stack spacing={2} direction="row">
            <Button variant="text" startIcon={<AddIcon />}>New</Button>
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
      </Box>
      <FormGenerator/>
    </>
  )
}

export default CollectionDetailPage

CollectionDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}