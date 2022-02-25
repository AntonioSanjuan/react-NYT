import { API_BASE_URL, NYT_API_key } from "../../../environment/environment"
import { MostPopularViewedArticlesResponseDto } from "../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model"

export function getMostPopularViewedArticles({ periodOfTime }: {periodOfTime: number}): Promise<MostPopularViewedArticlesResponseDto> {
    const apiURL = `${API_BASE_URL}svc/mostpopular/v2/viewed/${periodOfTime}.json?api-key=${NYT_API_key}`
  
    console.log("fetch", fetch)
    return fetch(apiURL, {
        method: "GET"
    })
        .then((res) => {
            console.log("res", res)
            if (!res.ok) throw new Error('Response NOT VALID')
            return res.json()
        })
  }