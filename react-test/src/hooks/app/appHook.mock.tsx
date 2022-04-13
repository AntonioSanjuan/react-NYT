import { Language } from "../../models/internal/types/LanguageEnum.model";
import { Theme } from "../../models/internal/types/ThemeEnum.model";

let themeResponseMock: Theme;
let languageResponseMock: Language;
let loadingResponseMock: boolean;

export const usAlertMock = () => { return {
    theme: themeResponseMock,
    language: languageResponseMock,
    loading: loadingResponseMock, 
}}
