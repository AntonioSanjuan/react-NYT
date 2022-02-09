import { useEffect, useState } from "react";
import getMostPopularViewedArticles from "../../services/NYTdataSupplier/mostPopular/nytMostPupukar.service";
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/data/data.actions'

export function useMostPopularArticles ({periodOfTime}: {periodOfTime: number}) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [mostPopularArticles, setMostPopularArticles] = useState(undefined)
    
    useEffect(() => {
        setLoading(true)
        setError(false);

        getMostPopularViewedArticles({periodOfTime: periodOfTime})
        .then(mostPopularArticles => {
            setMostPopularArticles(mostPopularArticles)
            setLoading(false)
            dispatch(actions.setMostPopularViewedArticles(mostPopularArticles))
            console.log("dispatched")
        }).catch((e) => {
            setError(true);
            setLoading(true)
            dispatch(actions.unsetMostPopularViewedArticles())

            
        })
    }, [periodOfTime])

    return {loading, error, mostPopularArticles}
}
