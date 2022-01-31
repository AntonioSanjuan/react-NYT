import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserResponseDto } from "../../models/dtos/user/user.model"
import { userInitialState } from "./models/appUser.initialState"
import { UserState } from "./models/appUser.state"

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState as UserState,
  reducers: {
    unsetUser: (state: UserState) => {
      state.userData = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state: UserState, action: PayloadAction<UserResponseDto>) => {
      state.userData = action.payload;
    },
  },
})

export default userSlice.reducer


