import Login from './Login'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import * as userHooks from '../../hooks/user/userHook';
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

describe('Login', () => {
    let loginStore: any;
    let history: any;

    const loginMock = jest.fn(() => {})

    beforeEach(() => {
        loginStore = createTestStore();
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

    it('Login on submit should request to useUser login and navigate to /', async () => {
        const username = 'myUser@myUser.com'
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
    
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fireEvent.click(loginButton);
        })
        expect(loginMock).toHaveBeenCalledWith({username, password})
        expect(history.location.pathname).toEqual('/')
    });

    it('Login on submit should not be possible if password is not defined', async () => {
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

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fireEvent.change(usernameInput, {target: {value: username}})
        })

        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeDisabled();
    });

    it('Login on submit should not be possible if username is not in email format', async () => {
        const username = 'myUser'
        const password = 'password'
        render(
            <Provider store={loginStore}>
                <Router location={history.location} navigator={history}>
                    <Login/>
                </Router>
            </Provider>
        );

        expect(loginMock).not.toHaveBeenCalled()
        const usernameInput = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInput = screen.getByPlaceholderText('****');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fireEvent.change(usernameInput, {target: {value: username}})
            fireEvent.change(passwordInput, {target: {value: password}})
        })

        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeDisabled();
    });
});