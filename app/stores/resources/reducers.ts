import { createReducer } from '@reduxjs/toolkit'
import {
  fetch,
  create,
  update,
  detail,
  patch,
  trash,
  trashed,
  destroy,
  hardDelete,
  restore,
} from './actions'

export type InitState = {
  data: Object | Array<any>
  response: Object | any
  pending: boolean
  error: boolean
}

const initialState: InitState = {
  data: [],
  response: {},
  pending: false,
  error: false,
}

export const resourceReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetch.fulfilled, (state, { type, payload, meta}) => {
      state.data = (payload as any).data // FIXME: be aware of "any"
      state.response = payload
      state.pending = false
    })
    .addCase(create.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(update.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(detail.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(patch.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(trash.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(trashed.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(destroy.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(hardDelete.fulfilled, (state, action) => {
      state.pending = false
    })
    .addCase(restore.fulfilled, (state, action) => {
      state.pending = false
    })
})

export default resourceReducer