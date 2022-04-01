import { useCallback, useState } from "react"
import { firebaseLogin, firebaseLogout, firebaseSignUp } from "../../services/firebaseAuth/firebaseAuth.service";
import { UserCredential } from "@firebase/auth";
import { useUserSettings } from "../userSettings/userSettingsHook";

export function useUser () {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {setUserSettings} = useUserSettings()

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
        .then(async (resp) => {
            return setUserSettings().then(() => {
                setLoading(false);
                setError(false);
                return resp;
            })

        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })
        
    }, [])

    const logout = useCallback(async(): Promise<void> => {
        await firebaseLogout()
    }, [])

    return {
        login,
        logout,
        signUp,
        loading, 
        error
    }
}