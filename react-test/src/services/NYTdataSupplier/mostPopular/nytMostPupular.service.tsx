import { API_BASE_URL, NYT_API_key } from '../../../environment/environment';
import { MostPopularViewedArticlesResponseDto } from '../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { SearchedrticlesResponseDto } from '../../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';

export function getMostPopularViewedArticles(
  { periodOfTime }:
   {periodOfTime: number},
): Promise<MostPopularViewedArticlesResponseDto> {
  const apiURL = `${API_BASE_URL}svc/mostpopular/v2/viewed/${periodOfTime}.json?api-key=${NYT_API_key}`;

  return fetch(apiURL, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Response NOT VALID');
      return res.json();
    });
}

export function getSearchedArticles(
  { search }:
  { search: string},
): Promise<SearchedrticlesResponseDto> {
  const apiURL = `${API_BASE_URL}svc/search/v2/articlesearch.json?fq=${search}&api-key=${NYT_API_key}`;

  return fetch(apiURL, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Response NOT VALID');
      return res.json();
    });
}
