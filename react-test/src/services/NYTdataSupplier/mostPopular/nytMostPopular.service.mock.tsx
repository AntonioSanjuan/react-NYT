import { MostPopularViewedArticlesResponseDto } from '../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import * as ntyMostPopularService from './nytMostPupular.service';

export const getMostPopularViewedArticlesResponseObjMock = {} as MostPopularViewedArticlesResponseDto;

const getMostPopularViewedArticlesMock = () => new Promise<MostPopularViewedArticlesResponseDto>((resolve, rejects) => resolve(getMostPopularViewedArticlesResponseObjMock));

export const getMostPopularViewedArticlesSpy = jest.spyOn(ntyMostPopularService, 'getMostPopularViewedArticles');

export const initializeMock = () => {
  getMostPopularViewedArticlesSpy
    .mockImplementation(getMostPopularViewedArticlesMock);
};

export const reset = () => {
  getMostPopularViewedArticlesSpy.mockClear();
};
