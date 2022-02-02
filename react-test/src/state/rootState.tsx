import { combineReducers, createStore } from '@reduxjs/toolkit'
import { UserState } from './user/models/appUser.state'
import { userReducer } from './user/user.reducer'

export interface AppRootState {
    user: UserState;
}

const combinedReducers = combineReducers({
  user: userReducer
})
export const store = createStore(
  combinedReducers,
)


// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch