import { MostPopularViewedArticlesResponseDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";
import { PeriodOfTimes } from "../../models/internal/types/PeriodOfTimeEnum.model";

let mostPopularArticlesMock: MostPopularViewedArticlesResponseDto | undefined;
let loadingResponseMock: boolean;
let errorResponseMock: boolean;

export const useMostPopularArticlesMock = ({periodOfTime}: {periodOfTime: PeriodOfTimes}) => { return {
    mostPopularArticles: mostPopularArticlesMock,
    loading: loadingResponseMock, 
    error: errorResponseMock
}}
