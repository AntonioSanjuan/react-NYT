import { useEffect, useState } from "react";
import {getMostPopularViewedArticles} from "../../services/NYTdataSupplier/mostPopular/nytMostPupukar.service";
import { useAppDispatch, useAppSelector } from "../state/appStateHook";
import * as actions from '../../state/data/data.actions'
import { selectData } from "../../state/data/data.selectors";
import { DataState } from "../../state/data/models/appData.state";
import { PeriodOfTimes } from "../../models/internal/types/PeriodOfTimeEnum.model";

export function useMostPopularArticles ({periodOfTime}: {periodOfTime: PeriodOfTimes}) {
    const dispatch = useAppDispatch();
    const storedData = useAppSelector<DataState>(selectData);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        setError(false);
        if(!storedData.mostPopularViewedArticles || storedData.mostPopularViewedArticlesRequestedPage !== periodOfTime) {
            getMostPopularViewedArticles({periodOfTime: periodOfTime})
            .then(mostPopularArticles => {
                setLoading(false)
                dispatch(actions.setMostPopularViewedArticles(mostPopularArticles, periodOfTime))
            }).catch((e) => {
                setError(true);
                setLoading(false)
                dispatch(actions.unsetMostPopularViewedArticles())
            })
        }
    }, [dispatch, periodOfTime, storedData])

    return {loading, error, mostPopularArticles: storedData.mostPopularViewedArticles}
}
