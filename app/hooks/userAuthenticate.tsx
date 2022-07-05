import {
  useEffect,
  useState
} from "react"

import {
  API_USER_LOGIN
} from '@data/constants'
import { RequestDataType } from '@device/utils/axios'
import { usePostMutation } from '@app/services/api/apiRequest'

import {
  useAppDispatch,
  useAppSelector,
} from '@app/hooks'

import {
  selectResource
} from '@app/stores/auth'

import {
  setUser,
  setToken,
  checkToken
} from '@app/stores/auth'

function useUserAuthenticate() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const {
    user,
    authorization_token
  } = useAppSelector(selectResource)

  const [ submitUserLogin, response ] = usePostMutation()

  const userLogin = async (data: Record<string, any>) => {
    const payload: RequestDataType = {
      url: API_USER_LOGIN,
      data
    }
    const response = await submitUserLogin(payload).unwrap()

    // FIXME: please fix this how about app get user object and token
    const { user, token } = (response.data as any)
    const { access_token } = (token as any)

    dispatch(setUser(user))
    dispatch(setToken(access_token))
    setLoggedIn(true)

    return response
  }

  const checkUserToken = async () => {
    dispatch(checkToken())
    if(authorization_token === '') return
    setLoggedIn(true)
  }

  return {
    user,
    authorization_token,
    isLoggedIn,
    userLogin,
    checkUserToken
  }
}

export default useUserAuthenticate