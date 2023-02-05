import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import { Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import { FormEvent, ReactElement, useEffect, useState } from 'react'
import LockIcon from '@mui/icons-material/Lock'
import useUserAuthenticate from '@app/hooks/userAuthenticate'
import {
  useUpdateMutation
} from '@app/services/api/apiRequest'
import { profile as dataRepositories } from '@data/repositories'
import FormGenerator, { FormLayoutProps } from '@app/components/forms'
import { useDialog } from '@app/hooks'

const ProfilePage: NextPageWithLayout = () => {
  const [ updateData ] = useUpdateMutation()
  const { openDialog, DialogScreen} = useDialog()
  const [ forms, setForms ] = useState<FormLayoutProps>([])
  const [ data, setData ] = useState<Record<string, any>>({})
  const [ readOnly, setReadOnly ] = useState<boolean>(true)

  const {
    user,
    isLoggedIn,
    checkUserToken
  } = useUserAuthenticate()

  useEffect(() => {
    checkUserToken()
    if(!user) return
    const forms = dataRepositories.forms
    setForms(forms)
    setData(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const onToggleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReadOnly(!readOnly)
  }

  const onSubmitProfile = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const frmData = new FormData(event.target)
      const formData = Object.fromEntries(frmData)
      const { id, ...userData } = user
      const data = { ...userData, ...formData }
      const response = await updateData({
        url: '/user/profile',
        data
      }).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  if (!user) return <>Loading...</>

  return (
    <>
      <Head>
        <title>Ayooshow</title>
        <meta name="description" content="Ayooshow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ p: 2, mt: 8, display: 'flex', flexDirection: 'column', }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={2}
        >
          <Typography component="h1" variant="h5">Profile</Typography>
          <Stack spacing={2} direction="row">
            <Button variant="text" startIcon={<LockIcon />}>Password</Button>
            {/* <Button variant="text" startIcon={<ManageAccountsIcon />}>Profile</Button> */}
          </Stack>
        </Stack>
      </Box>

      <FormGenerator
        forms={forms}
        data={data}
        onDataChanged={setData}
        readOnly={readOnly}
        onSubmit={onSubmitProfile}
      />

      {(!readOnly)? (<Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button variant="contained" disableElevation form='form-generator' type="submit">Update</Button>
          </Box>
        </Toolbar>): (<Toolbar sx={{ display: 'flex', flexDirection: 'row'}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button onClick={onToggleEdit}>Edit</Button>
          </Box>
        </Toolbar>)}

      <DialogScreen />
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default ProfilePage
