import { useCallback } from "react"
import { FirebaseStoredArticleDto } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model";
import { MostPopularViewedArticlesResponseContentDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";
import * as firebaseStoreService from "../../services/firebaseStore/storedArticles/storedArticles.service"
import { auth } from "../../utils/firebase.util";

export function useStoredArticle () {

    const addStoredArticle = useCallback(async(article: MostPopularViewedArticlesResponseContentDto): Promise<void> => {
        const request: FirebaseStoredArticleDto = {
            userUid: auth.currentUser?.uid as string,
            articleId: article.id.toString(),
            articleStringify: JSON.stringify(article)
        }
        await firebaseStoreService.addUserStoredArticle(request);
    }, [])

    const deleteStoredArticle = useCallback(async(): Promise<void> => {

    }, [])

    return {
        addStoredArticle,
        deleteStoredArticle
    }
}