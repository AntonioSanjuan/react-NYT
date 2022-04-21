import { useEffect, useState } from 'react';
import { getMostPopularViewedArticles } from '../../services/NYTdataSupplier/mostPopular/nytMostPupular.service';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { selectData } from '../../state/data/data.selectors';
import { DataState } from '../../state/data/models/appData.state';
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';
import { setMostPopularViewedArticlesAction, unsetMostPopularViewedArticlesAction } from '../../state/data/data.actions';
import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

export function useMostPopularArticles({ periodOfTime }: {periodOfTime: PeriodOfTimes}) {
  const dispatch = useAppDispatch();
  const storedData = useAppSelector<DataState>(selectData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mostPopularArticles, setMostPopularArticles] = useState<MostPopularViewedArticlesResponseDto|undefined>(storedData.mostPopularViewedArticles);

  useEffect(() => {
    if (!storedData.mostPopularViewedArticles || storedData.mostPopularViewedArticlesRequestedPage !== periodOfTime) {
      setLoading(true);
      setError(false);

      getMostPopularViewedArticles({ periodOfTime })
        .then((mostPopularArticles) => {
          setLoading(false);
          setMostPopularArticles(mostPopularArticles);
          dispatch(setMostPopularViewedArticlesAction(mostPopularArticles, periodOfTime));
        }).catch((e) => {
          setError(true);
          setLoading(false);
          setMostPopularArticles(undefined);
          dispatch(unsetMostPopularViewedArticlesAction());
        });
    }
  }, [dispatch, periodOfTime, storedData]);

  return { loading, error, mostPopularArticles };
}
