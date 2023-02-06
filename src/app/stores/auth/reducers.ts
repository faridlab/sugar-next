import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  setCookies,
  getCookie,
  hasCookie,
  removeCookies
} from 'cookies-next'

export type InitState = {
  user: Record<string, any> | null,
  authorization_token: string | null // NOTE: should null option type will be removed in the future?
}

const initialState: InitState = {
  user: null,
  authorization_token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.authorization_token = action.payload
      setCookies('authorization_token', action.payload)
    },
    setUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.user = action.payload
      setCookies('user', action.payload)
    },
    removeUser: (state) => {
      state.user = null
      removeCookies('user')
    },
    removeToken: (state) => {
      state.authorization_token = null
      removeCookies('authorization_token')
    },
    userLogout: (state) => {
      // TODO: this should call dispatch removeUser and removeToken
      state.user = null
      state.authorization_token = null
      removeCookies('user')
      removeCookies('authorization_token')
    },
    checkToken: (state) => {
      if(!hasCookie('authorization_token')) return
      const token = getCookie('authorization_token')
      const user = getCookie('user')
      state.authorization_token = (token as string)
      state.user = JSON.parse((user as string))
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  setToken,
  checkToken,
  removeUser,
  removeToken,
  userLogout
} = authSlice.actions

export default authSlice.reducer
