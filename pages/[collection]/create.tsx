import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import HomeIcon from '@mui/icons-material/Home'
import Link from '@mui/material/Link'

import * as dataRepositories from '@data/repositories'
import { usePostMutation } from '@app/services/api/apiRequest'

import Head from 'next/head'
import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'

import FormGenerator from '@component/forms'
import { FormLayoutProps } from '@component/forms'

import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { RequestDataType } from '@device/utils/axios'
import { useDialog } from '@app/hooks'

const CollectionCreatePage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection } = router.query
  const url = `/${collection}`
  const [ forms, setForms ] = useState<FormLayoutProps>([])
  const [ data, setData ] = useState<Record<string, any>>({})
  const [ createPost, response ] = usePostMutation()
  const [ payload, setPayload ] = useState<RequestDataType>({ url, data: {}})

  const { openDialog, DialogScreen} = useDialog()

  useEffect(() => {
    if(!router.isReady) return
    const { resources } = dataRepositories // as default
    const forms = (dataRepositories as any)[collection as string]?.forms || resources.forms
    const data = (dataRepositories as any)[collection as string]?.data || resources.data
    setForms(forms)
    setData(data)
    setPayload({ ...payload, url: `/${collection}`})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady ])

  const onSubmit = async () => {
    try {
      const {id, ...payloadData} = data;
      setPayload({
        ...payload,
        data: payloadData
      })
      const response = await createPost(payload).unwrap()
      console.log(response)
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}`)
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

  if(!router.isReady) return <>Loading...</>
  return (
    <>
      <Head>
        <title>New Data</title>
        <meta name="description" content="New Data" />
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
            <Typography color="text.primary">Countries</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>
      <FormGenerator
        forms={forms}
        data={data}
        onDataChanged={setData}
      />
      <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, left: 240, width: 'calc(100vw - 240px)'}}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button href={`/${collection}`}>Cancel</Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={onSubmit}
            >Submit</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogScreen />
    </>
  )
}

CollectionCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default CollectionCreatePage