import { DocumentData, DocumentReference, QuerySnapshot } from 'firebase/firestore';
import * as firebaseStoreArticleService from './storedArticles.service';

export const getUserStoredArticlesResponseObjMock = {} as QuerySnapshot<DocumentData>;
export const addUserStoredArticleResponseObjMock = {} as DocumentReference<DocumentData>;

const getUserStoredArticlesMock = () => new Promise<QuerySnapshot<DocumentData>>((resolve, rejects) => resolve(getUserStoredArticlesResponseObjMock));
const addUserStoredArticleMock = () => new Promise<DocumentReference<DocumentData>>((resolve, rejects) => resolve(addUserStoredArticleResponseObjMock));
const deleteUserStoredArticleMock = () => new Promise<void>((resolve, rejects) => resolve());

export const addUserStoredArticleSpy = jest.spyOn(firebaseStoreArticleService, 'addUserStoredArticle');
export const getUserStoredArticlesSpy = jest.spyOn(firebaseStoreArticleService, 'getUserStoredArticles');
export const deleteUserStoredArticlesSpy = jest.spyOn(firebaseStoreArticleService, 'deleteUserStoredArticle');

export const initializeMock = () => {
  addUserStoredArticleSpy
    .mockImplementation(addUserStoredArticleMock);
  getUserStoredArticlesSpy
    .mockImplementation(getUserStoredArticlesMock);
  deleteUserStoredArticlesSpy
    .mockImplementation(deleteUserStoredArticleMock);
};

export const reset = () => {
  addUserStoredArticleSpy.mockClear();
  getUserStoredArticlesSpy.mockClear();
  deleteUserStoredArticlesSpy.mockClear();
};
