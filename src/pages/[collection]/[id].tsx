import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as dataRepositories from '@data/repositories'
import { useUpdateMutation, useFetchQuery, useDeleteMutation } from '@app/services/api/apiRequest'
import Head from 'next/head'
import DashboardDetailLayout from '@app/layouts/dashboardDetail'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import FormGenerator from '@component/forms'
import { FormLayoutProps } from '@component/forms'
import { Box, Button } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useDialog } from '@app/hooks'
import { RequestDataType } from '@device/utils/axios'

const CollectionDetailPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { collection, id, editable } = router.query
  const url = `/${collection}/${id}`
  const [ forms, setForms ] = useState<FormLayoutProps>([])
  const [ data, setData ] = useState<Record<string, any>>({})
  const [ payload, setPayload ] = useState<RequestDataType>({ url, data: {}})
  const [ readOnly, setReadOnly ] = useState<boolean>(true)
  const [ ready, setReady ] = useState<boolean>(false)
  const [ pageTitle, setPageTitle ] = useState<string>('')
  const response = useFetchQuery({ url })
  const [ updateData ] = useUpdateMutation()
  const [ deleteData ] = useDeleteMutation()
  const { openDialog, DialogScreen} = useDialog()

  useEffect(() => {
    if(!router.isReady) return
    const { resources } = dataRepositories // as default
    const forms = (dataRepositories as any)[collection as string]?.forms || resources.forms
    const data = (dataRepositories as any)[collection as string]?.data || resources.data
    setForms(forms)
    setData(data)
    setPayload({ ...payload, url: `/${collection}/${id}`})
    if(editable) setReadOnly(false)
    setReady(true)
    setPageTitle(collection as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady ])

  useEffect(() => {
    if(!ready) return
    const { data, isError, error } = response
    if(isError) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
    if(!data) return
    setData(data.data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  const onToggleEdit = async () => {
    setReadOnly(!readOnly)
  }

  const onDelete = async () => {
    try {
      const isOkay = await openDialog({
        title: 'Delete',
        content: 'Are you sure want to delete?'
      })
      if(!isOkay) return

      const response = await deleteData(payload).unwrap()
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

  const onSubmit = async () => {
    try {
      const {id, ...payloadData} = data;
      setPayload({
        ...payload,
        data: payloadData
      })
      const response = await updateData({
        url: payload.url,
        data: payloadData
      }).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          onToggleEdit()
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

  if(!data) return <>Loading...</>
  return (
    <>
      <Head>
        <title>New Data</title>
        <meta name="description" content="New Data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardDetailLayout
        title={pageTitle}
      >
        <FormGenerator
          forms={forms}
          data={data}
          onDataChanged={setData}
          readOnly={readOnly}
        />
        <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, left: 280, width: 'calc(100vw - 280px)'}}>
          {(!readOnly)? (<Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button onClick={onToggleEdit}>Cancel</Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="text" color="error" onClick={onDelete} >Delete</Button>
              <Button variant="contained" disableElevation onClick={onSubmit}>Submit</Button>
            </Box>
          </Toolbar>): (<Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button onClick={onToggleEdit}>Edit</Button>
          </Toolbar>)}
        </AppBar>
      </DashboardDetailLayout>
      <DialogScreen />
    </>
  )
}

export default CollectionDetailPage