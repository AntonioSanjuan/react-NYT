import { DocumentData, DocumentReference, QuerySnapshot } from "firebase/firestore";
import * as firebaseStoreService from './storedArticles.service';

const getUserStoredArticlesResponseObjMock = {} as QuerySnapshot<DocumentData>;
const addUserStoredArticleResponseObjMock = {} as DocumentReference<DocumentData>;

export const getUserStoredArticlesResponseMock = Promise.resolve(getUserStoredArticlesResponseObjMock)
export const addUserStoredArticleResponseMock = new Promise<DocumentReference<DocumentData>>((resolve, rejects) => resolve(addUserStoredArticleResponseObjMock));
export const deleteUserStoredArticleResponseMock = new Promise<void>((resolve, rejects) => resolve());

export const addUserStoredArticleMock = jest.spyOn(firebaseStoreService, 'addUserStoredArticle')
.mockReturnValue(addUserStoredArticleResponseMock)
export const getUserStoredArticlesMock = jest.spyOn(firebaseStoreService, 'getUserStoredArticles')
.mockReturnValue(getUserStoredArticlesResponseMock)
export const deleteUserStoredArticlesMock = jest.spyOn(firebaseStoreService, 'deleteUserStoredArticle')
.mockReturnValue(deleteUserStoredArticleResponseMock)