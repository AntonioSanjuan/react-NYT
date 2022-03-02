import { useCallback, useState } from "react"
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/user/user.actions'
import { firebaseLogin, firebaseLogout } from "../../services/firebaseAuth/firebaseAuth.service";
import { useNavigate } from "react-router-dom";

export function useUser () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    
    const login = useCallback(async ({username, password}): Promise<void> => {
        setLoading(true);

        return firebaseLogin(username, password)
        .then((resp) => {
            setLoading(false);
            setError(false);

            dispatch(actions.setUset(resp))
            navigate('/');
        }).catch((e) => {
            setLoading(false);
            setError(true)
        })
    }, [dispatch, navigate])
    
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