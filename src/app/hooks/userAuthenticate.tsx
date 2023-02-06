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
  checkToken,
  userLogout
} from '@app/stores/auth'

function useUserAuthenticate() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const {
    user,
    authorization_token
  } = useAppSelector(selectResource)

  useEffect(() => {
    if(!authorization_token) return
    setLoggedIn(true)
  }, [authorization_token])

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
    const promise = new Promise((resolve) => {
      dispatch(checkToken())
      if(authorization_token) {
        setLoggedIn(true)
      }
      resolve(true)
    })
    return promise
  }

  const logout = async () => {
    setLoggedIn(false)
    dispatch(userLogout())
  }

  return {
    user,
    authorization_token,
    isLoggedIn,
    userLogin,
    logout,
    checkUserToken
  }
}

export default useUserAuthenticate
