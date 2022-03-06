import { DocumentData, DocumentReference, QuerySnapshot } from "firebase/firestore";

const getUserStoredArticlesResponseMock = {} as QuerySnapshot<DocumentData>;
const addUserStoredArticleResponseMock = {} as DocumentReference<DocumentData>;

export const getUserStoredArticlesMock = jest.fn(() => new Promise<QuerySnapshot<DocumentData>>((resolve, rejects) => resolve({} as QuerySnapshot<DocumentData>)).then(
    () => getUserStoredArticlesResponseMock
));

export const addUserStoredArticleMock = jest.fn(() => new Promise<DocumentReference<DocumentData>>((resolve, rejects) => resolve({} as DocumentReference<DocumentData>)).then(
    () => addUserStoredArticleResponseMock
));