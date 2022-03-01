import { useCallback } from "react"
import { UserResponseDto } from "../../models/dtos/user/user.model";
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/user/user.actions'
import { firebaseLogin } from "../../services/firebaseAuth/firebaseAuth.service";

export function useUser () {
    const dispatch = useAppDispatch();

    const login = useCallback(({username, password}) => {
        firebaseLogin(username, password).then((resp) => {
            console.log("resp", resp)
        }).catch((e) => {
            console.log("e", e)
        })
        const userData = { userName: username } as UserResponseDto
        dispatch(actions.setUset(userData))
    }, [dispatch])
    
    const logout = useCallback(() => {
        dispatch(actions.unsetUset())
    }, [dispatch])

    return {
        login,
        logout
    }
}