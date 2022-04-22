import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useUserSettings } from './userSettingsHook';
import * as hooks from '../state/appStateHook';
import * as userSettingsServiceMock from '../../services/firebaseStore/userSettings/userSettings.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { setUserAction, setUserSettingsAction } from '../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';

describe('<useUserSettings />', () => {
  let useStoredArticleStore: any;
  let wrapper: any;

  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useStoredArticleStore = createTestStore();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useStoredArticleStore}>{children}</Provider>;
    };

    jest.spyOn(hooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    userSettingsServiceMock.initializeMock();
  });

  afterEach(() => {
    userSettingsServiceMock.reset();
  });

  it('should create', () => {
    const { result } = renderHook(() => useUserSettings(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it('getUserSettings should request getUserSettings', async () => {
    expect(userSettingsServiceMock.getUserSettingsSpy).not.toHaveBeenCalled();

    const getUserSettingsOutput: FirebaseUserSettingsDto = { darkMode: true, lang: Language.French };
    userSettingsServiceMock.getUserSettingsSpy.mockResolvedValue(
            {
              data: () => getUserSettingsOutput as DocumentData,
            } as DocumentSnapshot,
    );
    const { result } = renderHook(() => useUserSettings(), { wrapper });

    await act(async () => {
      await result.current.getUserSettings();
    });

    expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserSettingsAction(getUserSettingsOutput));
    expect(userSettingsServiceMock.getUserSettingsSpy).toHaveBeenCalled();
  });

  it('setUserSettings should request setUserSettings', async () => {
    expect(userSettingsServiceMock.setUserSettingsSpy).not.toHaveBeenCalled();
    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUserSettings(), { wrapper });

    await act(async () => {
      await result.current.setUserSettings(inputSettings);
    });

    expect(userSettingsServiceMock.setUserSettingsSpy).toHaveBeenCalled();
  });

  it('updateUserSettings should not request updateUserSettings if user is not logged', async () => {
    expect(userSettingsServiceMock.setUserSettingsSpy).not.toHaveBeenCalled();
    const inputSettings = {
      darkMode: true,
      lang: Language.English,
    } as FirebaseUserSettingsDto;

    const { result } = renderHook(() => useUserSettings(), { wrapper });

    await act(async () => {
      await result.current.updateUserSettings(inputSettings);
    });

    expect(userSettingsServiceMock.updateUserSettingsSpy).not.toHaveBeenCalled();
  });
});
