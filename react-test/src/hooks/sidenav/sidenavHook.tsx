import { useCallback } from "react"
import { useAppDispatch } from "../state/appStateHook";
import * as actions from './../../state/layout/layout.actions'

export default function useLayer () {
    const dispatch = useAppDispatch();

    const switchSidenavStatus = useCallback(() => {
        dispatch(actions.switchSidenavStatus())
    }, [])

    return {
        switchSidenavStatus
    }
}