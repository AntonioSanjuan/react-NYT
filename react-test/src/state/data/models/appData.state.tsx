import { MostPopularViewedArticlesResponseDto } from "../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";
import { PeriodOfTimes } from "../../../models/internal/types/PeriodOfTimeEnum.model";

export interface DataState {
  mostPopularViewedArticles: MostPopularViewedArticlesResponseDto | undefined;
  mostPopularViewedArticlesRequestedPage: PeriodOfTimes;
}
