import { combineReducers, createStore } from '@reduxjs/toolkit'
import { layoutReducer } from './layout/layout.reducer'
import { LayoutState } from './layout/models/appLayout.state'
import { UserState } from './user/models/appUser.state'
import { userReducer } from './user/user.reducer'

export interface AppRootState {
    user: UserState;
    layout: LayoutState;
}

const combinedReducers = combineReducers({
  user: userReducer,
  layout: layoutReducer
})
export const store = createStore(
  combinedReducers
)


// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch