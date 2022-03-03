import { useCallback, useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/user/user.actions'
import { firebaseLogin, firebaseLogout } from "../../services/firebaseAuth/firebaseAuth.service";
import { UserCredential } from "@firebase/auth";

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

            dispatch(actions.setUset(resp))
            return resp;
        }).catch((e) => {
            setLoading(false);
            setError(true)
            throw e;
        })

    }, [dispatch])
    
    const logout = useCallback(() => {
        firebaseLogout()
        dispatch(actions.unsetUset())
    }, [dispatch])

    return {
        login,
        logout,
        loading, 
        error
    }
}