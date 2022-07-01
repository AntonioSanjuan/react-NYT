import { useEffect, useState } from 'react';
import { getSearchedArticles } from '../../services/NYTdataSupplier/mostPopular/nytMostPupular.service';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectSearchedArticles } from '../../state/data/data.selectors';
import { SearchArticlesState } from '../../state/data/models/appData.state';
import {
  setSearchedArticlesAction,
  unsetSearchedArticlesAction,
} from '../../state/data/data.actions';
import { SearchedrticlesResponseDto } from '../../models/dtos/searchedArticles/searchedArticlesResponseDto.model';

export function useSearchedArticles({ search }: {search: string}) {
  const dispatch = useAppDispatch();
  const searchedArticlesState = useAppSelector<SearchArticlesState>(selectSearchedArticles);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState<SearchedrticlesResponseDto|undefined>(
    searchedArticlesState.articles,
  );

  useEffect(() => {
    if (!searchedArticlesState.articles
      || searchedArticlesState.search !== search) {
      setLoading(true);
      setError(false);
      // console.log('searchedArticlesResp', search);
      console.log('search', search);

      getSearchedArticles({ search })
        .then((searchedArticlesResp) => {
          console.log('searchedArticlesResp', search);
          setLoading(false);
          setSearchedArticles(searchedArticlesResp);
          dispatch(setSearchedArticlesAction(searchedArticlesResp, search));
        }).catch(() => {
          setError(true);
          setLoading(false);
          setSearchedArticles(undefined);
          dispatch(unsetSearchedArticlesAction());
        });
    }
  }, [dispatch, search]);

  return { loading, error, searchedArticles };
}
