const getAlertContentResponseObj = {} as any;

const useAlert_GetAlertContent = jest.fn(() => getAlertContentResponseObj);
const useAlert_OpenAlert = jest.fn(() => {});
const useAlert_CloseAlert = jest.fn(() => {});

export const useAlertMock = () => ({
  getAlertContent: useAlert_GetAlertContent,
  openAlert: useAlert_OpenAlert,
  closeAlert: useAlert_CloseAlert,
});
