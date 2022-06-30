import { MostPopularViewedArticlesResponseDto } from '../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { PeriodOfTimes } from '../../../models/internal/types/PeriodOfTimeEnum.model';

export interface MostPopularViewedArticlesState {
  requestedPeriod: PeriodOfTimes;
  articles: MostPopularViewedArticlesResponseDto | undefined;
}

export interface SearchArticlesState {
  search: string;
  articles: MostPopularViewedArticlesResponseDto | undefined;
}

export interface DataState {
  mostPopularViewedArticles: MostPopularViewedArticlesState;
  searchArticles: SearchArticlesState;
}
