import { UserCredential } from "firebase/auth";

const firebaseLoginResponseMock = {
    user: { uid: 'test_uid'}
} as UserCredential;


export const firebaseLoginMock = new Promise<UserCredential>((resolve, rejects) => resolve(firebaseLoginResponseMock))
export const firebaseLogoutMock = new Promise<void>((resolve, rejects) => resolve()).then(() => {});