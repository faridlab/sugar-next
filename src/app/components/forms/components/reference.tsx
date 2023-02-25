import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

import { useFetchQuery, useQueryMutation } from '@app/services/api/apiRequest'
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { FormProps, FormContext } from '@component/forms'

type ValueType = Record<string, any> | null

const ReferenceComponent: FunctionComponent<FormProps> = (formProps: FormProps) => {
  const { data, setData } = useContext(FormContext)

  const [options, setOptions] = useState<Record<string, any>[]>([])
  const [params, setParams] = useState<Record<string, any>>({})
  const [value, setValue] = useState<ValueType>(null)
  const [hasFetched, setHasFetched] = useState<boolean>(false)

  const { id, props, reference } = formProps
  const { endpoint } = (reference as any)
  const { label } = props

  const { isLoading, ...queryResponse} = useFetchQuery({ url: `/${endpoint}`, params })
  const [ fetchQuery ] = useQueryMutation()

  const debounceTimeout = useRef<ReturnType<typeof setTimeout>>()

  const onFetchDataById = async (id: string | number) => {
    try {
      if(hasFetched) return
      const payload = {
        url: `/${endpoint}/${id}`
      }
      const response = await fetchQuery(payload).unwrap()
      const { data } = response

      setOptions([data])
      setValue(data)
      setHasFetched(true)
    } catch (error) {}
  }

  const valueReset = (parameters: Record<string, any> = {}) => {
    const { params } = (reference as any)
    if(params !== undefined && Object.keys(params).length) {
      for (const key of params) {
        if(!data[key]) continue
        parameters[key] = data[key]
      }
    }
    setParams(parameters)
  }

  useEffect(() => {
    if(!data[id]) return
    onFetchDataById(data[id])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[id]])

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
    let dataValue = { ...data, [id]: value?.id}
    const { updateValues } = (reference as any)
    if(updateValues && Array.isArray(updateValues)){
      for (const key of updateValues) {
        dataValue = { ...dataValue, [key]: null}
      }
    }
    setData(dataValue)
  }

  const onOpen = () => valueReset()

  const properties = {
    getOptionLabel,
    ...props,
  }

  const isOptionEqualToValue = (option: any, value: any) => {
    return option.id == value.id
  }

  const onInputChange = (event: React.SyntheticEvent, value: any) => {
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      const parameters: Record<string, any> = {}
      if(value !== '') {
        parameters['search'] = value
      }
      valueReset(parameters)
    }, 600)
  }

  return (
    <Autocomplete
      {...properties}
      isOptionEqualToValue={isOptionEqualToValue}
      options={options}
      loading={isLoading}
      value={value}
      onChange={handleChange}
      onOpen={onOpen}
      onInputChange={onInputChange}
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
  )
}

export default ReferenceComponent