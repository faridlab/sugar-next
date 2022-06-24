import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import useDialog from '@app/hooks/dialogs'

import type {
  AppDispatch,
  RootState,
} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
  useDialog
}