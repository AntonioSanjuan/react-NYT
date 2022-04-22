const useSidenavSwitchSidenavStatusMock = jest.fn(() => {});

export const useSidenavMock = () => ({
  switchSidenavStatus: useSidenavSwitchSidenavStatusMock,
});
