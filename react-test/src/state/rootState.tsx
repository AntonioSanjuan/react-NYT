import { configureStore } from '@reduxjs/toolkit'
import { UserState } from './user/models/appUser.state'
import UserReducer from './user/user.reducer'

export interface AppRootState {
    user: UserState;
}

export const store = configureStore({
  reducer: {
      user: UserReducer
  },
})


// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch