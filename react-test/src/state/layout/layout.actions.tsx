export enum LayoutActions {
    switchSidenavStatus = '@action/switchSidenavStatus'
}

export const switchSidenavStatus = () => ({
    type: LayoutActions.switchSidenavStatus
})