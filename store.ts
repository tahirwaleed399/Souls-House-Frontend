import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './apis/authApi';
import loaderReducer from './Slices/loader';
import authReducer from './Slices/auth';
export const store = configureStore({
  reducer: {
    auth : authReducer,
    loader : loaderReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch