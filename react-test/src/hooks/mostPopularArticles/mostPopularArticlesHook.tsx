import { useEffect, useState } from "react";
import {getMostPopularViewedArticles} from "../../services/NYTdataSupplier/mostPopular/nytMostPupukar.service";
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/data/data.actions'
import { MostPopularViewedArticlesResponseDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";

export function useMostPopularArticles ({periodOfTime}: {periodOfTime: number}) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [mostPopularArticles, setMostPopularArticles] = useState<MostPopularViewedArticlesResponseDto|undefined>(undefined)
    
    useEffect(() => {
        setLoading(true)
        setError(false);

        getMostPopularViewedArticles({periodOfTime: periodOfTime})
        .then(mostPopularArticles => {
            setMostPopularArticles(mostPopularArticles)
            setLoading(false)
            dispatch(actions.setMostPopularViewedArticles(mostPopularArticles))
        }).catch((e) => {
            setMostPopularArticles(undefined)
            setError(true);
            setLoading(false)
            dispatch(actions.unsetMostPopularViewedArticles())

            
        })
    }, [dispatch, periodOfTime])

    return {loading, error, mostPopularArticles}
}
