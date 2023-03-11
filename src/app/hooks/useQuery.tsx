import {
  Dispatch,
  SetStateAction,
  useState} from "react"
import { useQueryMutation } from '@app/services/api/apiRequest'

interface QueryProps {
  collection: string | string[] | undefined;
  openDialog: Function;
}

const useQuery = (props: QueryProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any>()
  const {
    collection,
    openDialog
  } = props

  const [ fetchQuery ] = useQueryMutation()
  const fetchData = async (params: Record<string, any> = {}) => {
    try {
      if(loading) return
      setLoading(true)
      const url = `/${collection}`
      const payload = { url, params }
      const resp = await fetchQuery(payload).unwrap()
      setResponse(resp)
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
    fetchData,
    loading,
    response
  }
}

export default useQuery