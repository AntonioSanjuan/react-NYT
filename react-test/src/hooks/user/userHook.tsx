import { useCallback, useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import { firebaseLogin, firebaseLogout, firebaseSignUp } from "../../services/firebaseAuth/firebaseAuth.service";
import { UserCredential } from "@firebase/auth";
import { setUserAction, unsetUserAction } from "../../state/user/user.actions";
import { auth } from "../../utils/firebase.util";

export function useUser () {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const login = useCallback(async ({username, password}): Promise<UserCredential> => {
        setLoading(true);
        return firebaseLogin(username, password)
        .then((resp) => {
            setLoading(false);
            setError(false);
            return resp;
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })

    }, [])
    
    const signUp = useCallback(async ({username, password}): Promise<UserCredential> => {
        setLoading(true);
        return firebaseSignUp(username, password)
        .then((resp) => {
            setLoading(false);
            setError(false);
            return resp;
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        });
    }, [])
    
    const logout = useCallback(async(): Promise<void> => {
        await firebaseLogout()
    }, [])

    const keepUserStateUpdated = ((): void => {
        auth.onAuthStateChanged(() => {
            (auth.currentUser) ?
                dispatch(setUserAction(auth.currentUser)) : 
                dispatch(unsetUserAction())
        });
    })

    return {
        login,
        logout,
        keepUserLogged: keepUserStateUpdated,
        loading, 
        error
    }
}