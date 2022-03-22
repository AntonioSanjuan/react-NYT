import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import * as userSettingsService from './userSettings.service';

const getUserSettingsResponseObjMock = {} as DocumentSnapshot<DocumentData>;
const setUserSettingsResponseObjMock = {} as any;
const updateUserSettingsResponseObjMock = {} as any;

export const getUserStoredArticlesResponseMock = new Promise<DocumentSnapshot<DocumentData>>((resolve, rejects) => resolve(getUserSettingsResponseObjMock));
export const addUserStoredArticleResponseMock = new Promise<any>((resolve, rejects) => resolve(setUserSettingsResponseObjMock))
export const deleteUserStoredArticleResponseMock = new Promise<any>((resolve, rejects) => resolve(updateUserSettingsResponseObjMock));

export const getUserSettingsMock = jest.spyOn(userSettingsService, 'getUserSettings')
.mockReturnValue(addUserStoredArticleResponseMock)
export const setUserSettingsMock = jest.spyOn(userSettingsService, 'setUserSettings')
.mockReturnValue(getUserStoredArticlesResponseMock)
export const updateUserSettingsMock = jest.spyOn(userSettingsService, 'updateUserSettings')
.mockReturnValue(updateUserSettingsResponseObjMock)