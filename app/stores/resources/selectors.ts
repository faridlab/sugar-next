import { RootState } from "../../store"
import { createSelector } from '@reduxjs/toolkit'

export const selectResource = (state: RootState) => state.resource

export const resourceSelector = createSelector(
  selectResource,
  state => state
)