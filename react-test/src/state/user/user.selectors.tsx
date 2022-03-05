import { AppRootState } from "../rootState";

export const selectUser = (state: AppRootState) => state.user;
export const selectUserData = (state: AppRootState) => state.user.userData
export const selectUserIsLogged = (state: AppRootState) => state.user.isLogged
export const selectUserStoredArticles = (state: AppRootState) => state.user.userStoredArticles