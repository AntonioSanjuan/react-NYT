import { act, renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUser } from './userHook';
import * as hooks from '../state/appStateHook' 
import * as services from '../../services/firebaseAuth/firebaseAuth.service'
import { setUsetAction, unsetUsetAction } from '../../state/user/user.actions';
import { UserCredential } from 'firebase/auth';

describe('<useUser />', () => {
    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    let service_firebaseLoginSpy: any;


    beforeEach(() => {
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(useAppDispatchMockResponse);
        service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockResolvedValue({} as UserCredential)
    });

    it('should create', () => {
        const { result } = renderHook(() => useUser())

        expect(result.current).toBeDefined()
    })
 
    it('login should request firebaseLogin', async () => {
        service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockResolvedValue({} as UserCredential)

        const { result } = renderHook(() => useUser())
        await act(async () => {
            await result.current.login({username: 'a@b.com', password: ''})
        })
        
        expect(service_firebaseLoginSpy).toHaveBeenCalled()
    })

    it('login success should dispatch setUset action', async () => {
        const output = {} as UserCredential
        service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockResolvedValue(output)

        const { result } = renderHook(() => useUser())

        expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

        await act(async () => {
            await result.current.login({username: 'a@b.com', password: ''})
        })
        
        expect(useAppDispatchMockResponse).toHaveBeenCalled()
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUsetAction(output))

        expect(result.current.error).toBeFalsy()
        expect(result.current.loading).toBeFalsy()
    })

    it('login failure should set error flag true value', async () => {
        const error = { errorDesc: 'test_errorDEsc'};
        service_firebaseLoginSpy = jest.spyOn(services, 'firebaseLogin').mockRejectedValue(error)

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

    it('logout should dispatch unset action', () => {
        const { result } = renderHook(() => useUser())

        expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

        result.current.logout()
        
        expect(useAppDispatchMockResponse).toHaveBeenCalled()
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(unsetUsetAction())
    })
})