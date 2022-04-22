import { AppRootState } from '../rootState';

export const selectData = (state: AppRootState) => state.data;
export const selectMostPopularViewedArticles = (state: AppRootState) => state.data.mostPopularViewedArticles;
