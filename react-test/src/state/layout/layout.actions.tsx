export enum LayoutActions {
    switchSidenavStatus = '@action/switchSidenavStatus'
}

export const switchSidenavStatusAction = () => ({
    type: LayoutActions.switchSidenavStatus
})