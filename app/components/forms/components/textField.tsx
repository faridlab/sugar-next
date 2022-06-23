import * as React from 'react'
import { FunctionComponent } from 'react'
import TextField from '@mui/material/TextField'
import { FormProps } from '@component/forms'

const FormTextField: FunctionComponent<FormProps> = ({ props }: FormProps) => {
  const properties = {
    fullWidth: true,
    type: 'text',
    ...props,
  }

  return (
    <TextField
      {...properties}
    />
  )
}

export default FormTextField