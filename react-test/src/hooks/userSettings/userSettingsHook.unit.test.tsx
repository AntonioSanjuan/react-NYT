import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUserSettings } from './userSettingsHook';
import * as hooks from '../state/appStateHook' 
import * as firebaseAuthService from '../../services/firebaseAuth/firebaseAuth.service'
import { firebaseLoginMock } from '../../services/firebaseAuth/firebaseAuth.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { Provider } from 'react-redux';

describe('<useUserSettings />', () => {
    let useStoredArticleStore: any;
    let wrapper: any;

    let firebaseLoginSpy: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    beforeEach(() => {
        useStoredArticleStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useStoredArticleStore}>{children}</Provider>

        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);
        
        firebaseLoginSpy = jest.spyOn(firebaseAuthService, 'firebaseLogin')
        .mockReturnValue(firebaseLoginMock)
    });

    it('should create', () => {
        const { result } = renderHook(() => useUserSettings(), {wrapper})

        expect(result.current).toBeDefined()
    })
})