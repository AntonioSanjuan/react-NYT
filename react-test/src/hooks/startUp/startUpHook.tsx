import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/appStateHook";
import { selectUserSettings } from "../../state/user/user.selectors";
import { Theme } from "../../models/internal/types/ThemeEnum.model";
import { FirebaseUserSettingsDto } from "../../models/dtos/firebaseStore/firebaseUserSettings.model";
import { auth } from "../../utils/firebase.util";
import { setUserAction, unsetUserAction } from "../../state/user/user.actions";
import { useUserSettings } from "../userSettings/userSettingsHook";

const getBrowserTheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
}


export function useStartUp () {
    const dispatch = useAppDispatch();
    const {getUserSettings} = useUserSettings();

    
    const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings)

    const [loading, setLoading] = useState<boolean>(true);
    const [theme, setTheme] = useState<Theme>(getBrowserTheme());


    const userStartUp = async () => {
        dispatch(setUserAction(auth.currentUser))
        await getUserSettings()
    }

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            (auth.currentUser) ?
                await userStartUp()
                : 
                dispatch(unsetUserAction())
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(userSettings) {
            console.log("setting", userSettings.darkMode)
            setTheme(userSettings.darkMode? Theme.Dark : Theme.Light)
        }
    }, [userSettings])

    return {
        theme,
        loading, 
    }
}