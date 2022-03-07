import { MostPopularViewedArticlesResponseContentDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";

let mostPopularArticlesMock: MostPopularViewedArticlesResponseContentDto;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useMostPopularArticlesMock = () => { return {
    mostPopularArticles: mostPopularArticlesMock,
    loading: loadingResponseMock, 
    error: errorResponseMock
}}
