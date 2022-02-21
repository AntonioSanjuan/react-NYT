import Login from './Login'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from '../../state/rootState';
import * as userHooks from '../../hooks/login/userHook' 

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';

describe('Login', () => {
    let loginStore: any;
    let history: any;

    const loginMock = jest.fn(() => {})

    beforeEach(() => {
        loginStore = {...store};
        history = createMemoryHistory();

        const useUserMock = jest.spyOn(userHooks, 'useUser');
        useUserMock.mockImplementation(() => { return {login: loginMock} as any})
    })

    it('should create', () => {
        const { container } = render(
            <Provider store={loginStore}>
                <Router location={history.location} navigator={history}>
                    <Login/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });

    it('Login on submit should request to useUser login and navigate to /', () => {
        const username = 'myUser'
        const password = 'pass1234'
        render(
            <Provider store={loginStore}>
                <Router location={history.location} navigator={history}>
                    <Login/>
                </Router>
            </Provider>
        );

        expect(loginMock).not.toHaveBeenCalled()
        const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
        fireEvent.change(usernameInput, {target: {value: username}})
        const passwordInput = screen.getByPlaceholderText('****');
        fireEvent.change(passwordInput, {target: {value: password}});
        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).not.toBeDisabled();
    
        fireEvent.click(loginButton);
        expect(loginMock).toHaveBeenCalledWith({username, password})
        expect(history.location.pathname).toEqual('/')
    });

    it('Login on submit should not request to useUser login if password is not defined', () => {
        const username = 'myUser'
        render(
            <Provider store={loginStore}>
                <Router location={history.location} navigator={history}>
                    <Login/>
                </Router>
            </Provider>
        );

        expect(loginMock).not.toHaveBeenCalled()
        const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
        fireEvent.change(usernameInput, {target: {value: username}})
        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeDisabled();
    });
});