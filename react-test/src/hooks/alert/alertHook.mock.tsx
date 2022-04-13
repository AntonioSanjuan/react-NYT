let getAlertContentResponseObj = {} as any;

const useAlert_GetAlertContent = jest.fn(() => { return getAlertContentResponseObj});
const useAlert_OpenAlert = jest.fn(() => {});
const useAlert_CloseAlert = jest.fn(() => {});

export const useAlertMock = () => { return {
    getAlertContent: useAlert_GetAlertContent,
    openAlert: useAlert_OpenAlert,
    closeAlert: useAlert_CloseAlert,
}}