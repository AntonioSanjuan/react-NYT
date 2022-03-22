import { useCallback, useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import { firebaseLogin, firebaseLogout, firebaseSignUp } from "../../services/firebaseAuth/firebaseAuth.service";
import { UserCredential } from "@firebase/auth";
import { setUserAction, unsetUserAction } from "../../state/user/user.actions";
import { auth } from "../../utils/firebase.util";
import { useUserSettings } from "../userSettings/userSettingsHook";

export function useUser () {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {getUserSettings, setUserSettings} = useUserSettings()

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
            return setUserSettings().then(() => {
                setLoading(false);
                setError(false);
                return resp;
            })

        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        });
    }, [])

    const logout = useCallback(async(): Promise<void> => {
        await firebaseLogout()
    }, [])

    const keepUserStateUpdated = () => {
        auth.onAuthStateChanged(async user => {
            (auth.currentUser) ?
                await updateUser(): 
                dispatch(unsetUserAction())
        });
    }

    const updateUser = async () => {
        dispatch(setUserAction(auth.currentUser))
        await getUserSettings()
    }

    return {
        login,
        logout,
        signUp,
        keepUserStateUpdated,
        loading, 
        error
    }
}