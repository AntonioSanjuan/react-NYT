import { useCallback } from "react"
import { UserResponseDto } from "../../models/dtos/user/user.model";
import { useAppDispatch } from "../state/appStateHook";
import * as actions from '../../state/user/user.actions'

export default function useUser () {
    const dispatch = useAppDispatch();

    const login = useCallback(({username, password}) => {
        const userData = { userName: username } as UserResponseDto
        dispatch(actions.setUset(userData))
    }, [])
    
    const logout = useCallback(() => {
        dispatch(actions.unsetUset())
    }, [])

    return {
        login,
        logout
    }
}