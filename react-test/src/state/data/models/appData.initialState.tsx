import { PeriodOfTimes } from "../../../models/internal/types/PeriodOfTimeEnum.model";
import { DataState } from "./appData.state";

export const dataInitialState: DataState = {
  mostPopularViewedArticles: undefined,
  mostPopularViewedArticlesRequestedPage: PeriodOfTimes.Daily
};
