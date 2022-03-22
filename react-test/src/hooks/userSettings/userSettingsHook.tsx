import { useCallback, useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import * as service from "../../services/firebaseStore/userSettings/userSettings.service";
import { FirebaseUserSettingsDto } from "../../models/dtos/firebaseStore/firebaseUserSettings.model";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { setUserSettingsAction } from "../../state/user/user.actions";

export function useUserSettings () {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const getUserSettings = async (): Promise<DocumentSnapshot<DocumentData>> => {
        setLoading(true);
        return service.getUserSettings()
        .then((userSettings) => {
            userSettings.data()
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

    const setUserSettings = useCallback(async (): Promise<any> => {
        return service.setUserSettings(
            { darkMode: false, 
                lang: "es", 
                userName: 'testName'
            } as FirebaseUserSettingsDto
        )
    }, [])

    const updateUserSettings = useCallback(async (settings: FirebaseUserSettingsDto): Promise<any> => {
        setLoading(true);
        return service.updateUserSettings(settings)
    }, [])

    return {
        getUserSettings,
        setUserSettings,
        update: updateUserSettings,
        loading, 
        error
    }
}