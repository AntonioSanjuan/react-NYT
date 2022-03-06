import { UserCredential } from "firebase/auth"
import { FirebaseStoredArticleInternal } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model"

export enum UserActions {
    setUser = '@action/setUSer',
    unsetUser = '@action/unsetUSer',
    setStoredArticles = '@action/setUserStoredArticles'
}

export const setUserStoredArticles = (userStoredArticles: FirebaseStoredArticleInternal[]) => ({
    type: UserActions.setStoredArticles,
    payload: userStoredArticles
})

export const setUsetAction = (userData: UserCredential) => ({
    type: UserActions.setUser,
    payload: userData
})

export const unsetUsetAction = () => ({
    type: UserActions.unsetUser
})