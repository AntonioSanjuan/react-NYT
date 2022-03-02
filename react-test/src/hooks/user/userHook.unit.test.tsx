import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useUser } from './userHook';
import * as actions from '../../state/user/user.actions'
import * as hooks from '../state/appStateHook' 

describe('<useUser />', () => {
    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>
    let useAppDispatchMock: any;

    beforeEach(() => {
        useAppDispatchMock = jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(useAppDispatchMockResponse);
    });

    it('should create', () => {
        const { result } = renderHook(() => useUser())

        expect(result.current).toBeDefined()
    })

    it('login should dispatch setUset action', () => {
        const sut_username = 'sut_username'
        const { result } = renderHook(() => useUser())

        expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

        result.current.login({username: sut_username, password: 'sut_password'})
        
        expect(useAppDispatchMockResponse).toHaveBeenCalled()
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(actions.setUset)
    })

    it('logout should dispatch unset action', () => {
        const { result } = renderHook(() => useUser())

        expect(useAppDispatchMockResponse).not.toHaveBeenCalled()

        result.current.logout()
        
        expect(useAppDispatchMockResponse).toHaveBeenCalled()
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(actions.unsetUset())
    })
})