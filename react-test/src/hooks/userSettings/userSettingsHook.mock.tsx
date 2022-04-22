import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

const getUserSettingsResponseObj = { data: () => {} } as DocumentSnapshot<DocumentData>;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUserSettings_GetUserSettings = jest.fn(() => new Promise<DocumentSnapshot<DocumentData>>((resolve, rejects) => resolve({} as DocumentSnapshot<DocumentData>)).then(
  () => getUserSettingsResponseObj,
));
const useUserSettings_SetUserSettings = jest.fn(() => new Promise<any>((resolve, rejects) => resolve(getUserSettingsResponseObj)));
const useUserSettings_UpdateUserSettings = jest.fn(() => new Promise<any>((resolve, rejects) => resolve({})).then(
  () => getUserSettingsResponseObj,
));
const useUserSettings_SetAnonymousUserSettings = jest.fn(() => {});

export const useUserSettingsMock = () => ({
  getUserSettings: useUserSettings_GetUserSettings,
  setUserSettings: useUserSettings_SetUserSettings,
  updateUserSettings: useUserSettings_UpdateUserSettings,
  setAnonymousUserSettings: useUserSettings_SetAnonymousUserSettings,
  loading: loadingResponseMock,
  error: errorResponseMock,
});
