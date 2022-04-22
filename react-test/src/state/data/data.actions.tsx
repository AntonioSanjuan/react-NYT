import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';

export enum DataActions {
    setMostPopularViewedArticles = '@action/setMostPopularViewedArticles',
    unsetMostPopularViewedArticles = '@action/unsetMostPopularViewedArticles'
}

export const setMostPopularViewedArticlesAction = (mostPopularViewedArticles: MostPopularViewedArticlesResponseDto, mostPopularViewedArticlesRequestedPage: PeriodOfTimes) => ({
  type: DataActions.setMostPopularViewedArticles,
  payload: { mostPopularViewedArticles, mostPopularViewedArticlesRequestedPage },
});

export const unsetMostPopularViewedArticlesAction = () => ({
  type: DataActions.setMostPopularViewedArticles,
});
