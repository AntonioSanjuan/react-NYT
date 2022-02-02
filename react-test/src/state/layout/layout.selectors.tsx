import { AppRootState } from "../rootState";

export const selectLayout = (state: AppRootState) => state.layout;
export const selectLayoutIsSidenavOpened = (state: AppRootState) => state.layout.isSidenavOpened;
