import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import resourceReducer from './stores/resources'
import authReducer from './stores/auth'

// SERVICES
import { apiRequest } from '@service/api/apiRequest'

export const store = configureStore({
  reducer: {
    resource: resourceReducer,
    auth: authReducer,

    [apiRequest.reducerPath]: apiRequest.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiRequest.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
