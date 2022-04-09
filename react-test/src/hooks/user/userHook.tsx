import { useCallback, useState } from "react"
import { firebaseLogin, firebaseLogout, firebaseSignUp } from "../../services/firebaseAuth/firebaseAuth.service";
import { UserCredential } from "@firebase/auth";
import { useUserSettings } from "../userSettings/userSettingsHook";
import { useAppSelector } from "../state/appStateHook";
import { FirebaseUserSettingsDto } from "../../models/dtos/firebaseStore/firebaseUserSettings.model";
import { selectUserSettings } from "../../state/user/user.selectors";

export function useUser () {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {setUserSettings} = useUserSettings()
    
    const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
   

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
            return setUserSettings(userSettings as FirebaseUserSettingsDto).then(() => {
                setLoading(false);
                setError(false);
                return resp;
            })

        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSettings])

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