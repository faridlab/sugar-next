import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FormLayoutProps, FormProps } from '@component/forms'
import { FunctionComponent } from 'react'
import * as FormComponents from '@component/forms/components'

export interface FormGeneratorProps {
  forms: FormLayoutProps;
}

const FormInputGenerator: FunctionComponent<FormProps> = (props: FormProps) => {
  const { type } = props
  // FIXME: don't use type any, if it possible find necessary type
  const FormComponent = (FormComponents as any)[type]
  return <FormComponent {...props} />
}

const FormGenerator: FunctionComponent<FormGeneratorProps> = (props: FormGeneratorProps) => {
  const { forms } = props
  const layout = []
  for (const index in forms) {
    const items = forms[index]
    const fields = []
    for (const props of items) {
      const { col } = props
      fields.push(<Grid key={`field-${props.id}`} item xs={col} sx={{mb: 4}}>
        <FormInputGenerator {...props} />
      </Grid>)
    }
    layout.push(<Grid key={index} container spacing={2}>{fields}</Grid>)
  }

  return (
    <Box
      component="form"
      sx={{ flexGrow: 1, m: 2 }}
    >
      {layout}
    </Box>
  )
}

export default FormGenerator