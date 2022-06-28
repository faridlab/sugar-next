import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useFetchQuery, useQueryMutation } from '@app/services/api/apiRequest'
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { FormProps, FormContext } from '@component/forms'

type ValueType = Record<string, any> | null
type InputValueType = string

const ReferenceComponent: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext);
  const { id, props, reference } = formProps
  const { label } = props

  const [options, setOptions] = useState<Record<string, any>[]>([])
  const [value, setValue] = useState<ValueType>(null)
  const [inputValue, setInputValue] = useState<InputValueType>('')

  const { isLoading, ...queryResponse} = useFetchQuery({ url: '/countries' })
  const [ fetchQuery ] = useQueryMutation()

  const onFetchDataById = async (id: string | number) => {
    try {
      const { endpoint } = (reference as any)
      const payload = {
        url: `/${endpoint}/${id}`
      }
      const response = await fetchQuery(payload).unwrap()
      const { data } = response
      setOptions([data])
      setValue(data)
    } catch (error) {}
  }

  useEffect(() => {
    if(!data[id]) return
    onFetchDataById(data[id])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id])

  useEffect(() => {
    if(!queryResponse.data) return
    const { data } = queryResponse.data
    setOptions(data)
  }, [queryResponse])

  const getOptionLabel = (option: Record<string, any>) => {
    return option.label
  }

  const handleChange = (event: React.SyntheticEvent, value: any) => {
    setValue(value)
    setData({ ...data, [id]: value.id})
  }

  const properties = {
    getOptionLabel,
    ...props,
  }

  const isOptionEqualToValue = (option: any, value: any) => {
    return option.id == value.id
  }

  return (
    <Autocomplete
      {...properties}
      isOptionEqualToValue={isOptionEqualToValue}
      options={options}
      loading={isLoading}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
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