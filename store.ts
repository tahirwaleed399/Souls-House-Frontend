import { configureStore } from '@reduxjs/toolkit'
import { otpApi } from './apis/otpApi';
import loaderReducer from './Slices/loader';
export const store = configureStore({
  reducer: {
    loader : loaderReducer,
    [otpApi.reducerPath]: otpApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(otpApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch