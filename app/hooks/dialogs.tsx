import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import {
  FunctionComponent,
  useEffect,
  useState
} from "react";

interface DialogProps {
  isOpen: boolean;
  title: string;
  content: string;
  onOk?: Function;
  onClose?: Function;
}

const DialogComponent: FunctionComponent<DialogProps> = (props: DialogProps) => {
  const [params, setParams] = useState<DialogProps>(props)
  const { title, content } = params

  useEffect(() => {
    setParams({...params, ...props})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = () => {
    const { onClose } = params
    setParams({
      isOpen: false,
      title: 'Title',
      content: 'Content'
    })
    if(!onClose) return
    onClose(true) // TODO: adjust to the correct value, if prompt
  }

  const handleOnOk = () => {
    const isOpen: boolean = false
    setParams({...params, isOpen})
    handleClose()
    const { onOk } = params
    if(!onOk) return
    onOk()
  }

  return (
    <Dialog
      open={params.isOpen}
      onClose={handleClose}
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
        {/* <Button onClick={handleClose}>Disagree</Button> */}
        <Button onClick={handleOnOk} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>)
}

function useDialog() {
  const params: DialogProps = {
    isOpen: false,
    title: 'Title',
    content: 'Content'
  }
  const [props, setProps] = useState<DialogProps>(params)

  const openDialog = async (params: Partial<DialogProps>) => {
    const isOpen: boolean = true
    return new Promise(function(resolve) {
      const onClose = (value?: string | boolean) => {
        resolve(value)
      }
      setProps({ ...props, ...params, isOpen, onClose })
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