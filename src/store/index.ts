import { configureStore } from '@reduxjs/toolkit'

import { counterSlice } from './counter'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { jsonPlaceholderApi } from '../services/json'

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
