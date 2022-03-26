import { act, renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUserSettings } from './userSettingsHook';
import * as hooks from '../state/appStateHook' 
import * as userSettingsServiceMock from './../../services/firebaseStore/userSettings/userSettings.service.mock'
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { Provider } from 'react-redux';

describe('<useUserSettings />', () => {
    let useStoredArticleStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    beforeEach(() => {
        useStoredArticleStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useStoredArticleStore}>{children}</Provider>

        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);
    
        userSettingsServiceMock.initializeMock();
    });

    afterEach(() => {
        userSettingsServiceMock.reset();
    })

    it('should create', () => {
        const { result } = renderHook(() => useUserSettings(), {wrapper})

        expect(result.current).toBeDefined()
    })

    it('getUserSettings should request getUserSettings', async () => {
        expect(userSettingsServiceMock.getUserSettingsSpy).not.toHaveBeenCalled();
        const { result } = renderHook(() => useUserSettings(), {wrapper})
        
        await act(async () => {
            await result.current.getUserSettings()
        });
       
        expect(userSettingsServiceMock.getUserSettingsSpy).toHaveBeenCalled();
    })
})