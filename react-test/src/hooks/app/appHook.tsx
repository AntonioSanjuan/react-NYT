import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/appStateHook";
import { selectUserSettings } from "../../state/user/user.selectors";
import { Theme } from "../../models/internal/types/ThemeEnum.model";
import { FirebaseUserSettingsDto } from "../../models/dtos/firebaseStore/firebaseUserSettings.model";
import { auth } from "../../utils/firebase.util";
import { setUserAction, unsetUserAction } from "../../state/user/user.actions";
import { useUserSettings } from "../userSettings/userSettingsHook";
import { Language } from "../../models/internal/types/LanguageEnum.model";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_EN } from "../../locales/en";
import { TRANSLATIONS_ES } from "../../locales/es";
import { TRANSLATIONS_FR } from "../../locales/fr";

const getBrowserTheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
}

const getBrowserLanguage = (): Language => {
    return Language.Spanish;
}

const changeTheme = (theme: Theme): void => {
    document.body.setAttribute('data-theme', theme);
}

const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
}


export function useApp () {
    const dispatch = useAppDispatch();
    const {getUserSettings} = useUserSettings();

    const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings)

    const [loading, setLoading] = useState<boolean>(true);
    const [theme, setTheme] = useState<Theme>(getBrowserTheme());
    const [language, setLanguage] = useState<Language>(getBrowserLanguage());


    const initializeUser = async () => {
        dispatch(setUserAction(auth.currentUser))
        await getUserSettings()
    }

    const initializeLanguage = () => {
        i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources: {
            en: {
              translation: TRANSLATIONS_EN
            },
            es: {
              translation: TRANSLATIONS_ES
            },
            fr: {
              translation: TRANSLATIONS_FR
            },
          },
          supportedLngs: Object.values(Language)
        });
    }
    
    const initializeTheme = (): void => {
        changeTheme(theme)
    }

    useEffect(() => {
        console.log("app hook initialize")
        initializeLanguage();
        initializeTheme();
        auth.onAuthStateChanged(async user => {
            setLoading(true);
            (auth.currentUser) ?
                await initializeUser()
                : 
                dispatch(unsetUserAction())
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(userSettings) {
            setTheme(userSettings.darkMode? Theme.Dark : Theme.Light)
            setLanguage(userSettings.lang)
        } else {
            setTheme(getBrowserTheme());
            setLanguage(getBrowserLanguage());
        }
    }, [userSettings])

    useEffect(() => {
        changeLanguage(language);
    }, [language])

    useEffect(() => {
        changeTheme(theme);
    }, [theme])

    return {
        theme,
        language,
        loading, 
    }
}