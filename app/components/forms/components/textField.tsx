import * as React from 'react'
import { FunctionComponent, useContext } from 'react'
import TextField from '@mui/material/TextField'
import { FormProps, FormContext } from '@component/forms'

const FormTextField: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext)
  const { id, props } = formProps
  const properties = {
    fullWidth: true,
    type: 'text',
    ...props,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [id]: event.target.value})
  }

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      {...properties}
      name={id}
      value={data[id]}
      onChange={handleChange}
    />
  )
}

export default FormTextField