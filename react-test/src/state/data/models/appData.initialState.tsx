import { PeriodOfTimes } from "../../../models/internal/types/PeriodOfTimeEnum.model";
import { DataState } from "./appData.state";

export const dataInitialState = {
  mostPopularViewedArticles: undefined,
  mostPopularViewedArticlesRequestedPage: PeriodOfTimes.Daily
} as DataState;
