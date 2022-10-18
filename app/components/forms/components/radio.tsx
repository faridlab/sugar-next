import * as React from 'react'
import { FunctionComponent, useContext } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { FormProps, FormContext } from '@component/forms'

const FormRadio: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext)
  const { id, label, props } = formProps
  const properties = {
    label: props.label,
    row: true,
    options: [],
    ...props,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [id]: event.target.value})
  }

  const renderOptions = () => {
    const { options } = properties
    return options.map((option: Record<string, any>, index) => {
      return <FormControlLabel
        key={ index }
        label={option.label}
        value={option.value}
        control={<Radio />}
        labelPlacement="end"
      />
    })
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row={properties.row}
        name={id}
        value={data[id]}
        onChange={handleChange}
      >
        {renderOptions()}
      </RadioGroup>
    </FormControl>
  );

}

export default FormRadio