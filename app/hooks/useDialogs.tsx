import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"
import { DialogProps } from '@mui/material/Dialog'
import {
  FunctionComponent,
  useEffect,
  useState
} from "react";

interface DialogComponentProps {
  isOpen: boolean;
  title: string;
  content: string;
  onOk?: Function;
  onClose?: Function;
  onBackdropClose?(): void;
}

const DialogComponent: FunctionComponent<DialogComponentProps> = (props: DialogComponentProps) => {
  const { onBackdropClose } = props
  const [params, setParams] = useState<DialogComponentProps>(props)
  const [fullWidth, setFullWidth] = useState(true)
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xs')
  const { title, content } = params

  useEffect(() => {
    setParams({...params, ...props})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = (): void => {
    setParams({ ...params, isOpen: false })
    if(onBackdropClose) {
      onBackdropClose()
    }
  }

  const handleCancel = () => {
    const { onClose } = params
    setParams({ ...params, isOpen: false })
    if(!onClose) return
    onClose(false)
  }

  const handleOnOk = () => {
    const { onClose } = params
    const isOpen: boolean = false
    setParams({...params, isOpen})
    if(onClose) {
      onClose(true)
    }
    const { onOk } = params
    if(!onOk) return
    onOk()
  }

  return (
    <Dialog
      open={params.isOpen}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOnOk} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>)
}

function useDialog() {
  const params: DialogComponentProps = {
    isOpen: false,
    title: 'Title',
    content: 'Content'
  }
  const [props, setProps] = useState<DialogComponentProps>(params)

  const openDialog = async (params: Partial<DialogComponentProps>) => {
    const isOpen: boolean = true
    return new Promise(function(resolve) {
      const onClose = (value?: string | boolean) => {
        setProps({ ...props, isOpen: false})
        resolve(value)
      }
      const onBackdropClose = () => {
        setProps({ ...props, isOpen: false})
      }
      setProps({ ...props, ...params, isOpen, onClose, onBackdropClose })
    });
  }

  const DialogScreen: FunctionComponent = () => {
    return (<DialogComponent {...props} />)
  }

  return {
    openDialog,
    DialogScreen
  }
}

export default useDialog