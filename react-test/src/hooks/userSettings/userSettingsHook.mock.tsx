import { DocumentData, DocumentSnapshot } from "firebase/firestore";

let getUserSettingsResponseObj = {} as DocumentSnapshot<DocumentData>;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUserSettings_GetUserSettings = jest.fn(() => new Promise<DocumentSnapshot<DocumentData>>((resolve, rejects) => resolve({} as DocumentSnapshot<DocumentData>)).then(
    () => getUserSettingsResponseObj
));
const useUserSettings_SetUserSettings = jest.fn(() => new Promise<any>((resolve, rejects) => resolve({})).then(
    () => getUserSettingsResponseObj
));
const useUserSettings_UpdateUserSettings = jest.fn(() => new Promise<any>((resolve, rejects) => resolve({})).then(
    () => getUserSettingsResponseObj
));
const useUserSettings_SetAnonymousSettings = jest.fn(() => {})

export const useUserSettingsMock = () => { return {
    getUserSettings: useUserSettings_GetUserSettings,
    setUserSettings: useUserSettings_SetUserSettings,
    updateUserSettings: useUserSettings_UpdateUserSettings,
    setAnonymousSettings: useUserSettings_SetAnonymousSettings,
    loading: loadingResponseMock, 
    error: errorResponseMock,
}}
