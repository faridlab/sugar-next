import * as React from 'react'
import { FunctionComponent, useContext } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import { FormProps, FormContext } from '@component/forms'

const FormCheckbox: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext)
  const { id, label, props } = formProps
  const properties = {
    label: props.label,
    row: true,
    options: [],
    ...props,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = data[id] || []
    if(event.target.checked === true) {
      value.push(event.target.name)
    }

    if(event.target.checked === false) {
      value = value.filter((e: string) => e !== event.target.name)
    }

    setData({ ...data, [id]: value})
  }

  const isChecked = (name: string) => {
    const value = data[id] || []
    return value.indexOf(name) >= 0
  }

  const renderOptions = () => {
    const { options } = properties
    return options.map((option: Record<string, any>, index) => {
      return <FormControlLabel
        key={ index }
        label={option.label}
        control={<Checkbox checked={isChecked(option.value)} onChange={handleChange} name={option.value} />}
        labelPlacement="end"
      />
    })
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row={properties.row} >
        {renderOptions()}
      </FormGroup>
    </FormControl>
  )
}

export default FormCheckbox