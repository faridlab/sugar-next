import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FormLayoutProps, FormProps, TextField } from '@component/forms'
import { FunctionComponent } from 'react'

const forms: FormLayoutProps = [
  [
    {
      id: 'name',
      type: 'TextField',
      col: 4,
      label: '',
      required: false,
      props: {} // used for dynamic props component
    }
  ]
]

const FormInputGenerator: FunctionComponent<FormProps> = (props: FormProps) => {
  return <TextField {...props}  />
}

export default function FormGenerator() {
  const layout = []
  for (const index in forms) {
    const items = forms[index]
    const fields = []
    for (const prop of items) {
      fields.push(<Grid key={`field-${prop.id}`} item xs={4}>
        <FormInputGenerator {...prop} />
      </Grid>)
    }
    layout.push(<Grid key={index} container spacing={2}>{fields}</Grid>)
  }

  return (
    <>
      <Box
        component="form"
        sx={{ flexGrow: 1, m: 2 }}
      >{layout}</Box>
    </>
  )
}
