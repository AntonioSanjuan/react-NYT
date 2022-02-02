import { userInitialState } from "./models/appUser.initialState"
import { UserState } from "./models/appUser.state"
import { UserActions } from "./user.actions"

const userReducer = (state: UserState = userInitialState, action: any ) => {
  switch(action.type) {
    case UserActions.setUser:
      return {
        ...state,
        isLogged: true,
        userData: action.payload
      }
    case UserActions.unsetUser:
      return {
        ...state,
        isLogged: false,
        userData: undefined
      }
    default: 
      return state;
  }
}




export {userReducer}


