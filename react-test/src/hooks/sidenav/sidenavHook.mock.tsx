const useSidenavSwitchSidenavStatusMock = jest.fn(() => {})

export const useSidenavMock = () => { return {
    switchSidenavStatus: useSidenavSwitchSidenavStatusMock,
}}
