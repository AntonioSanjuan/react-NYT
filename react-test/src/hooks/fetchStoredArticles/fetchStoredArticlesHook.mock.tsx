import { MostPopularViewedArticlesResponseContentDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";

let storedArticlesMock: MostPopularViewedArticlesResponseContentDto;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useFetchStoredArticlesMock = () => { return {
    storedArticles: storedArticlesMock,
    loading: loadingResponseMock, 
    error: errorResponseMock
}}
