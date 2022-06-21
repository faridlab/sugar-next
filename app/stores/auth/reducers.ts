import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InitState = {
  user: Record<string, any>,
  authorization_token: string | null // NOTE: should null option type will be removed in the future?
}

const initialState: InitState = {
  user: {},
  authorization_token: null
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.authorization_token = action.payload
    },
    setUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken } = authSlice.actions

export default authSlice.reducer
