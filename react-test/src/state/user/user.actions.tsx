import { UserCredential } from "firebase/auth"

export enum UserActions {
    setUser = '@action/setUSer',
    unsetUser = '@action/unsetUSer'
}

export const setUset = (userData: UserCredential) => ({
    type: UserActions.setUser,
    payload: userData
})

export const unsetUset = () => ({
    type: UserActions.unsetUser
})