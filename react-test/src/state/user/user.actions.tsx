import { User } from "firebase/auth"
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

export const setUserAction = (userData: User|null) => ({
    type: UserActions.setUser,
    payload: userData
})

export const unsetUserAction = () => ({
    type: UserActions.unsetUser
})