import { useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import * as userSettingsService from "../../services/firebaseStore/userSettings/userSettings.service";
import { FirebaseUserSettingsDto } from "../../models/dtos/firebaseStore/firebaseUserSettings.model";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { setUserSettingsAction } from "../../state/user/user.actions";
import { Language } from "../../models/internal/types/LanguageEnum.model";

export function useUserSettings () {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const getUserSettings = async (): Promise<DocumentSnapshot<DocumentData>> => {
        setLoading(true);
        return userSettingsService.getUserSettings()
        .then((userSettings) => {
            dispatch(setUserSettingsAction(userSettings.data() as FirebaseUserSettingsDto))
            setLoading(false);
            setError(false);
            return userSettings;
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })
    }

    const setUserSettings = async (): Promise<any> => {
        setLoading(true);
        const defaultSettings = getDefaultUserSettings()
        return userSettingsService.setUserSettings(defaultSettings).then(() => {
            dispatch(setUserSettingsAction(defaultSettings))
            setLoading(false);
            setError(false);
            return defaultSettings;
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })
    }

    const updateUserSettings = async (settings: FirebaseUserSettingsDto): Promise<any> => {
        setLoading(true);
        return userSettingsService.updateUserSettings(settings)
        .then(() => {
            dispatch(setUserSettingsAction(settings))
            setLoading(false);
            setError(false);
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        });
    }

    const getDefaultUserSettings = (): FirebaseUserSettingsDto => {
        return { 
            darkMode: false, 
            lang: "es", 
        } as FirebaseUserSettingsDto
    }

    const setAnonymousSettings = (lang: Language, darkMode: boolean) => {
        dispatch(setUserSettingsAction({
            darkMode: darkMode, 
            lang: lang, 
        } as FirebaseUserSettingsDto))
    }

    return {
        getUserSettings,
        setUserSettings,
        setAnonymousSettings,
        updateUserSettings,
        loading, 
        error
    }
}