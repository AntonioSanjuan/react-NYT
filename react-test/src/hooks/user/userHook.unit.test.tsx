import { act, renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUser } from './userHook';
import * as hooks from '../state/appStateHook' 
import * as firebaseAuthService from '../../services/firebaseAuth/firebaseAuth.service'
import { firebaseLoginMock } from '../../services/firebaseAuth/firebaseAuth.service.mock';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { Provider } from 'react-redux';
import { unsetUserAction } from '../../state/user/user.actions';

describe('<useUser />', () => {
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
        const { result } = renderHook(() => useUser(), {wrapper})

        expect(result.current).toBeDefined()
    })
 
    it('login should request firebaseLogin', async () => {
        const { result } = renderHook(() => useUser(), {wrapper})
        
        await act(async () => {
            await result.current.login({username: 'a@b.com', password: ''})
        })
        
        expect(firebaseLoginSpy).toHaveBeenCalled()
    })

    // it('login success should dispatch setUset action', async () => {
    //     const output = {} as UserCredential
    //     service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockResolvedValue(output)
    //     const { result } = renderHook(() => useUser())

    //     expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

    //     await act(async () => {
    //         await result.current.login({username: 'a@b.com', password: ''})
    //     })
        
    //     expect(useAppDispatchMockResponse).toHaveBeenCalled()
    //     expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUsetAction(output))

    //     expect(result.current.error).toBeFalsy()
    //     expect(result.current.loading).toBeFalsy()
    // })

    // it('login failure should set error flag true value', async () => {
    //     const error = { errorDesc: 'test_errorDEsc'};
    //     service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockRejectedValue(error)

    //     const { result } = renderHook(() => useUser())

    //     await act(async () => {
    //         await result.current.login({username: 'a@b.com', password: ''}).catch((e) =>{
    //             // eslint-disable-next-line jest/no-conditional-expect
    //             expect(e).toEqual(error)
    //         })
    //     })
    //     expect(result.current.error).toBeTruthy()
    //     expect(result.current.loading).toBeFalsy()

    // })

    it('logout should dispatch unset action', async () => {
        const { result } = renderHook(() => useUser())

        expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

        await act(async () => {
            await result.current.logout()
        })
        
        expect(useAppDispatchMockResponse).toHaveBeenCalled()
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(unsetUserAction())
    })
})