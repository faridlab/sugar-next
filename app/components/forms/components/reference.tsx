import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useFetchQuery } from '@app/services/api/apiRequest'
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { FormProps, FormContext } from '@component/forms'

const ReferenceComponent: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext);
  const { id, props } = formProps
  const { label } = props

  const [options, setOptions] = useState<Record<string, any>[]>([])
  const { isLoading, ...queryResponse} = useFetchQuery({ url: '/countries' })

  const getOptionLabel = (option: Record<string, any>) => {
    return option.label
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [id]: event.target.value})
  }

  const properties = {
    getOptionLabel,
    ...props,
  }
  useEffect(() => {
    if(!queryResponse.data) return
    const { data } = queryResponse.data
    setOptions(data)
  }, [queryResponse])

  return (
    <Autocomplete
      {...properties}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
            <>
              {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
            ),
          }}
        />
      )}
    />
  );
}

export default ReferenceComponent