import {
  useState
} from "react"

import {
  usePostMutation} from '@app/services/api/apiRequest'

interface CreationProps {
  collection: string;
  openDialog?: Function;
}

const useCreation = (props: CreationProps) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ response, setResponse ] = useState<any>()
  const [ createPost ] = usePostMutation()
  const {
    collection,
    openDialog
  } = props

  const createData = async (data: FormData | any) => {
    try {
      if(loading) return
      setLoading(true)
      const response = await createPost({
        url: collection,
        data
      }).unwrap()
      setResponse(response)
    } catch (error) {
      if(!openDialog) return;
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    createData,
    loading,
    response
  }
}

export default useCreation