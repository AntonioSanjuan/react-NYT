import React from "react";
import ProfileSettings from "../../components/common/profileSettings/profileSettings";
import { DynamicModalTypes } from "../../models/internal/types/DynamicModalEnum.model";
import { closeAlertAction, openAlertAction } from "../../state/layout/layout.actions";
import { selectLayoutAlertContent } from "../../state/layout/layout.selectors";
import { useAppDispatch, useAppSelector } from "../state/appStateHook";

export function useAlert () {
    const dispatch = useAppDispatch();
    const alertContent = useAppSelector<DynamicModalTypes|undefined>(selectLayoutAlertContent);

    const getAlertContent = () => {
        let MyComponent: any = undefined;

        switch(alertContent) {
            case DynamicModalTypes.ProfileSettings:
                MyComponent = ProfileSettings;
                break;
            default: 
                break;
        }

        return React.createElement(MyComponent, {})
    }

    const openAlert = (alert: DynamicModalTypes) => {
        dispatch(openAlertAction(alert));
    }

    const closeAlert = () => {
        dispatch(closeAlertAction())
    }

    return {
        getAlertContent,
        openAlert,
        closeAlert,
    }
}