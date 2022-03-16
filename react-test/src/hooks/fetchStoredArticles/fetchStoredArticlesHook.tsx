import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/appStateHook";
import { getUserStoredArticles } from "../../services/firebaseStore/firebaseStore.service";
import { selectUser } from "../../state/user/user.selectors";
import { FirebaseStoredArticleDto, FirebaseStoredArticleInternal } from "../../models/dtos/firebaseStore/firebaseStoredArticle.model";
import { UserState } from "../../state/user/models/appUser.state";
import { setUserStoredArticles } from "../../state/user/user.actions";

export function useFetchStoredArticles () {
    const dispatch = useAppDispatch();
    const user = useAppSelector<UserState>(selectUser)

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    useEffect(() => {
        setLoading(true);

        getUserStoredArticles()
        .then((resp) => {
            console.log("resp", resp)
            const userStoredArticles = resp.docs.map<FirebaseStoredArticleInternal>((doc) => {
                const response = ({ ...doc.data()} as FirebaseStoredArticleDto)
                return ({
                        storedArticle: JSON.parse(response.articleStringify),
                        firebaseDocId: doc.id,
                    } as FirebaseStoredArticleInternal)
            })
            dispatch(setUserStoredArticles(userStoredArticles))
            setLoading(false);
            setError(false);

        }).catch((e) => {
            setLoading(false);
            setError(true)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user.userData])

    return {
        storedArticles: user.userStoredArticles,
        loading, 
        error
    }
}