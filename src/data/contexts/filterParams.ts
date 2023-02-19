import { createContext } from "react"

interface DateValue {
  startDate: string;
  endDate: string;
}

export interface FilterParams {
  search: string;
  dateOption: string;
  dateValue: DateValue;
}

const params: FilterParams = {
  search: '',
  dateOption: '',
  dateValue: {
    startDate: '',
    endDate: ''
  }
}

const FilterParamsContext = createContext<FilterParams>(params)

export default FilterParamsContext