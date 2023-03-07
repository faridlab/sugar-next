import { useDeleteMutation, useQueryMutation } from '@app/services/api/apiRequest'
import { useRouter } from "next/router";
import { RequestDataType } from "@/device/utils/axios";

interface Props {
  collection: string | string[] | undefined;
  openDialog: Function;
  callbackOnDeleted?: Function;
}

const useDestruction = (props: Props) => {
  const {
    collection,
    openDialog,
    callbackOnDeleted
  } = props

  const router = useRouter()
  const [ destroy ] = useDeleteMutation()

  const deleteData = async (id: string) => {
    try {
      const isOkay = await openDialog({
        title: 'Delete',
        content: 'Are you sure want to delete?'
      })
      if(!isOkay) {
        router.push(`/${collection}`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/${id}`,
        data: {}
      }

      const response = await destroy(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}`)
          if(!callbackOnDeleted) return
          callbackOnDeleted()
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  return {
    deleteData
  }
}

export default useDestruction