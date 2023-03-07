import {
  Dispatch,
  SetStateAction} from "react"
import { useQueryMutation } from '@app/services/api/apiRequest'

interface QueryProps {
  collection: string | string[] | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRowCount: Dispatch<SetStateAction<number>>;
  setRows: Dispatch<SetStateAction<any[]>>;
  openDialog: Function;
}

const useQuery = (props: QueryProps) => {
  const {
    collection,
    loading,
    setLoading,
    setRows,
    setRowCount,
    openDialog
  } = props

  const [ fetchQuery ] = useQueryMutation()
  const fetchData = async (params: Record<string, any> = {}) => {
    try {
      if(loading) return
      setLoading(true)
      const url = `/${collection}`
      const payload = { url, params }
      const response = await fetchQuery(payload).unwrap()
      const { data, meta } = response
      setRows(data)
      setRowCount(meta.recordsFiltered)
      setLoading(false)
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  return {
    fetchData
  }
}

export default useQuery