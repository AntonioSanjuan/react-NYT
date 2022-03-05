import { useCallback } from "react"
import { FirebaseStoredArticleDto } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model";
import { MostPopularViewedArticlesResponseContentDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";
import * as firebaseStoreService from "../../services/firebaseStore/firebaseStore.service";
import { auth } from "../../utils/firebase.util";

export function useStoredArticle () {

    const addStoredArticle = useCallback(async(article: MostPopularViewedArticlesResponseContentDto) => {
        const request: FirebaseStoredArticleDto = {
            userUid: auth.currentUser?.uid as string,
            articleStringify: JSON.stringify(article)
        }
        await firebaseStoreService.addUserStoredArticle(request);
    }, [])

    const deleteStoredArticle = useCallback(async() => {

    }, [])

    return {
        addStoredArticle,
        deleteStoredArticle
    }
}