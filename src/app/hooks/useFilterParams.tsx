import { SelectChangeEvent } from "@mui/material"
import {
  ChangeEvent,
  useEffect,
  useState
} from "react"

interface DateValue {
  startDate: string;
  endDate: string;
}

export interface FilterParams {
  search: string;
  dateOption: string;
  dateValue: DateValue;
}

enum DateOption {
  Today = "TODAY",
  Last30Days = "LAST_30_DAYS",
  ThisMonth = "THIS_MONTH",
  LastMonth = "LAST_MONTH",
  Last90Days = "LAST_90_DAYS",
  Last6Months = "LAST_6_MONTHS",
  LastYear = "LAST_YEAR",
  Custom = "CUSTOM",
}

interface DateOptionValue {
  value: DateOption;
  label: string;
}

const useFilterParams = () => {

  const filterParams: FilterParams = {
    search: '',
    dateOption: '',
    dateValue: {
      startDate: '',
      endDate: ''
    }
  }
  const [params, setParams] = useState<FilterParams>(filterParams)

  const dateOptions: DateOptionValue[] = [
    { value: DateOption.Today, label: 'Today'},
    { value: DateOption.Last30Days, label: 'Last 30 days'},
    { value: DateOption.ThisMonth, label: 'This month'},
    { value: DateOption.LastMonth, label: 'Last month'},
    { value: DateOption.Last90Days, label: 'Last 90 days'},
    { value: DateOption.Last6Months, label: 'Last 6 months'},
    { value: DateOption.LastYear, label: 'Last year'},
    { value: DateOption.Custom, label: 'Custom range'},
  ]

  const handleDateOptionChanged = (event: SelectChangeEvent) => {
    setParams({...params, dateOption: event.target.value})
    // setDateRange(event.target.value)
  }

  const handleSearchChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setParams({...params, search: event.target.value})
  }

  return {
    params,
    setParams,
    dateOptions,
    handleDateOptionChanged,
    handleSearchChanged
  }
}

export default useFilterParams