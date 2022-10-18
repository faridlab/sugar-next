import * as React from 'react'
import { FunctionComponent, useContext } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { FormProps, FormContext } from '@component/forms'

const FormSelect: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext)
  const { id, label, props } = formProps
  const properties = {
    options: [],
    ...props,
  }

  const handleChange = (event: SelectChangeEvent) => {
    setData({ ...data, [id]: event.target.value})
  }

  const renderOptions = () => {
    const { options } = properties
    return options.map((option: Record<string, any>, index) => {
      return (
          <MenuItem
            key={ index }
            value={option.value}>
              {option.value}
          </MenuItem>
      )
    })
  }

  return (
    <FormControl component="fieldset" >
      <InputLabel shrink={true}>{label}</InputLabel>
      <Select
        name={id}
        label={label}
        value={data[id]}
        onChange={handleChange}
      >
        {renderOptions()}
      </Select>
    </FormControl>
  )
}

export default FormSelect