import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { FormLayoutProps, FormProps, FormContext } from '@component/forms'
import { FunctionComponent, useEffect, useState } from 'react'
import * as FormComponents from '@component/forms/components'

export interface FormGeneratorProps {
  forms: FormLayoutProps;
  data: Record<string, any>;
  onDataChanged: Function;
  readOnly?: boolean;
}

type LayoutProps = Pick<FormGeneratorProps, 'forms' | 'readOnly'>

const FormInputGenerator: FunctionComponent<FormProps> = (props: FormProps) => {
  const { type } = props
  // FIXME: don't use type any, if it possible find necessary type
  const FormComponent = (FormComponents as any)[type]
  return <FormComponent {...props} />
}

const FormLayoutGenerator: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
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
  return (<>{layout}</>)
}

const FormGenerator: FunctionComponent<FormGeneratorProps> = ({readOnly = false, ...props}: FormGeneratorProps) => {
  const { forms, onDataChanged } = props
  const [ data, setData ] = useState(props.data)
  useEffect(() => {
    setData(props.data)
  }, [props.data])

  // TODO: find another way to set readonly props to input
  for (const items of forms) {
    for (const form of items) {
      form.props['InputProps'] = {
        readOnly: readOnly,
      }
    }
  }

  useEffect(() => {
    onDataChanged(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (Object.keys(data).length === 0) return <></>
  return (
    <FormContext.Provider value={{data, setData}}>
      <Box
        component="form"
        sx={{ flexGrow: 1, m: 2 }}
      >
        <FormLayoutGenerator
          forms={forms}
          readOnly={readOnly}
        />
      </Box>
    </FormContext.Provider>
  )
}

export default FormGenerator