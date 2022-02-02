import { UserResponseDto } from "../../models/dtos/user/user.model"

export enum UserActions {
    setUser = '@action/setUSer',
    unsetUser = '@action/unsetUSer'
}

export const setUset = (userData: UserResponseDto) => ({
    type: UserActions.setUser,
    payload: userData
})

export const unsetUset = () => ({
    type: UserActions.unsetUser
})