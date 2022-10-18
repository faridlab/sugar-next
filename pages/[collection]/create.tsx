import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import HomeIcon from '@mui/icons-material/Home'
import Link from '@mui/material/Link'

import * as dataRepositories from '@data/repositories'
import {
  usePostMutation,
  useQueryMutation
} from '@app/services/api/apiRequest'

import Head from 'next/head'
import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'

import FormGenerator from '@component/forms'
import { FormLayoutProps } from '@component/forms'

import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { RequestDataType } from '@device/utils/axios'
import { useDialog } from '@app/hooks'

const CollectionCreatePage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, duplicate_from_id } = router.query
  const url = `/${collection}`
  const [ forms, setForms ] = useState<FormLayoutProps>([])
  const [ data, setData ] = useState<Record<string, any>>({})
  const [ createPost, response ] = usePostMutation()
  const [ fetchQuery ] = useQueryMutation()
  const [ payload, setPayload ] = useState<RequestDataType>({ url, data: {}})

  const { openDialog, DialogScreen} = useDialog()

  useEffect(() => {
    if(!router.isReady) return
    const { resources } = dataRepositories // as default
    const forms = (dataRepositories as any)[collection as string]?.forms || resources.forms
    const formData = (dataRepositories as any)[collection as string]?.data || resources.data
    setForms(forms)
    setData(formData)
    setPayload({ ...payload, url: `/${collection}`})
    if(duplicate_from_id) {
      fetchDataById((duplicate_from_id as string))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady ])

  const fetchDataById = async (id: string | number) => {
    try {
      const { resources } = dataRepositories // as default
      const payload = {
        url: `/${collection}/${id}`
      }
      const response = await fetchQuery(payload).unwrap()
      const formData = (dataRepositories as any)[collection as string]?.data || resources.data
      const [ _, ...keys] = Object.keys(formData)
      const newData: Record<string, any> = {}
      for (const key of keys) {
        newData[key] = response.data[key]
      }
      setData({ ...newData })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
        event.preventDefault()
        const data = new FormData(event.target)
        const response = await createPost({
            url: payload.url,
            data
        }).unwrap()
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

  const onBack = () => {
    router.push(`/${collection}`)
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
            <Typography color="text.primary">{collection}</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>
      <FormGenerator
        forms={forms}
        data={data}
        onDataChanged={setData}
        onSubmit={onSubmit}
      />
      <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, left: 280, width: 'calc(100vw - 280px)'}}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button onClick={onBack}>Back</Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button form='form-generator' type="submit">Submit</Button>
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
