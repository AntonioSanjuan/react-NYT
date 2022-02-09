import { MostPopularViewedArticlesResponseDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";

export enum DataActions {
    setMostPopularViewedArticles = '@action/setMostPopularViewedArticles',
    unsetMostPopularViewedArticles = '@action/unsetMostPopularViewedArticles'
}

export const setMostPopularViewedArticles = (mostPopularViewedArticles: MostPopularViewedArticlesResponseDto) => ({
    type: DataActions.setMostPopularViewedArticles,
    payload: mostPopularViewedArticles
})


export const unsetMostPopularViewedArticles = () => ({
    type: DataActions.setMostPopularViewedArticles,
})