import { UserCredential } from "firebase/auth"

let loginResponseMock = {} as UserCredential;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

const useUser_LoginMock = jest.fn(() => new Promise<UserCredential>((resolve, rejects) => resolve(loginResponseMock as UserCredential)).then(
    () => loginResponseMock
));
const useUser_SignUpMock = jest.fn(() => new Promise<UserCredential>((resolve, rejects) => resolve(loginResponseMock as UserCredential)).then(
    () => loginResponseMock
));
const useUser_LogoutMock = jest.fn(() => new Promise<void>((resolve, rejects) => resolve() ))
const useUser_KeepUserLoggedMock = jest.fn(() => new Promise<void>((resolve, rejects) => resolve() ))

export const useUserMock = () => { return {
    login: useUser_LoginMock,
    logout: useUser_LogoutMock,
    signUp: useUser_SignUpMock,
    keepUserStateUpdated: useUser_KeepUserLoggedMock,
    loading: loadingResponseMock,
    error: errorResponseMock
}}
