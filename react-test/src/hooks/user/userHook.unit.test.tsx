import { act, renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUser } from './userHook';
import * as hooks from '../state/appStateHook' 
import * as firebaseAuthServiceMock from '../../services/firebaseAuth/firebaseAuth.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { Provider } from 'react-redux';
import { unsetUserAction, setUserAction } from '../../state/user/user.actions';

describe('<useUser />', () => {
    let useStoredArticleStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    beforeEach(() => {
        useStoredArticleStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useStoredArticleStore}>{children}</Provider>

        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);

        firebaseAuthServiceMock.initializeMock();
    });

    afterAll(() => {
        firebaseAuthServiceMock.reset();
    });

    it('should create', () => {
        const { result } = renderHook(() => useUser(), {wrapper})

        expect(result.current).toBeDefined()
    })
 
    it('login should request firebaseLogin', async () => {
        expect(firebaseAuthServiceMock.firebaseLoginSpy).not.toHaveBeenCalled();
        const { result } = renderHook(() => useUser(), {wrapper})
        
        await act(async () => {
            await result.current.login({username: 'a@b.com', password: ''})
        });
       
        expect(firebaseAuthServiceMock.firebaseLoginSpy).toHaveBeenCalled();
    })

    // it('login success should dispatch setUset action', async () => {
    //     const { result } = renderHook(() => useUser())
    //     result.current.keepUserStateUpdated();

    //     expect(firebaseAuthServiceMock.firebaseLoginSpy).not.toHaveBeenCalled();
    //     expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

    //     await act(async () => {
    //         await result.current.login({username: 'a@b.com', password: ''})
    //     })
        
    //     expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserAction(firebaseAuthServiceMock.firebaseResponseObjMock.user))

    //     expect(result.current.error).toBeFalsy()
    //     expect(result.current.loading).toBeFalsy()
    // })

    it('login failure should set error flag true value', async () => {
        const error = { errorDesc: 'test_errorDEsc'};
        firebaseAuthServiceMock.firebaseLoginSpy.mockRejectedValue(error)

        const { result } = renderHook(() => useUser())

        await act(async () => {
            await result.current.login({username: 'a@b.com', password: ''}).catch((e) =>{
                // eslint-disable-next-line jest/no-conditional-expect
                expect(e).toEqual(error)
            })
        })
        expect(result.current.error).toBeTruthy()
        expect(result.current.loading).toBeFalsy()

    })

    // it('logout should dispatch unset action', async () => {
    //     const { result } = renderHook(() => useUser())
    //     result.current.keepUserStateUpdated();

    //     expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

    //     await act(async () => {
    //         await result.current.logout()
    //     })
        
    //     expect(useAppDispatchMockResponse).toHaveBeenCalled()
    //     expect(useAppDispatchMockResponse).toHaveBeenCalledWith(unsetUserAction())
    // })
})