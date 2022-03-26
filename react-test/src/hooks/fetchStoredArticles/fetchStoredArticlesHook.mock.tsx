import { FirebaseStoredArticleInternal } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model";

let storedArticlesMock: FirebaseStoredArticleInternal[] | undefined;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useFetchStoredArticlesMock = () => { return {
    storedArticles: storedArticlesMock,
    loading: loadingResponseMock, 
    error: errorResponseMock
}}
