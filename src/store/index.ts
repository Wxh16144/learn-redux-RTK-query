import { configureStore } from '@reduxjs/toolkit'

import { counterSlice } from './counter'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
