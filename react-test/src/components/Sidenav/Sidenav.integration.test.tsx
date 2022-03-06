import { Sidenav } from './Sidenav'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from '../../state/rootState';

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import * as sidenavHooks from '../../hooks/sidenav/sidenavHook' 
import * as userHooks from '../../hooks/user/userHook' 

describe('Sidenav', () => {
    let sidenavStore: any;
    let history: any;

    const switchSidenavStatusMock = jest.fn(() => {})
    const logoutMock = jest.fn(() => {})

    beforeEach(() => {
        sidenavStore = {...store};
        history = createMemoryHistory();

        const useLayerMock = jest.spyOn(sidenavHooks, 'useSidenavLayer');
        useLayerMock.mockImplementation(() => { return {switchSidenavStatus: switchSidenavStatusMock}})

        const useUserMock = jest.spyOn(userHooks, 'useUser');
        useUserMock.mockImplementation(() => { return {logout: logoutMock} as any})
    });

    it('should create', () => {
        const { container } = render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });

    it('Sidenav `navigateToHomeAction` secction should trigger navigation to home', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(switchSidenavStatusMock).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Popular Articles')
        )

        expect(history.location.pathname).toEqual('/')
        expect(switchSidenavStatusMock).toHaveBeenCalled()
    });

    it('Sidenav `navigateToStoredArticlesAction` secction should trigger navigation to storedArticles', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(switchSidenavStatusMock).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Stored Articles')
        )

        expect(history.location.pathname).toEqual('/storedArticles')
        expect(switchSidenavStatusMock).toHaveBeenCalled()
    });

    it('Sidenav `navigateToContactAction` secction should trigger navigation to contact', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(switchSidenavStatusMock).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Contact')
        )

        expect(history.location.pathname).toEqual('/contact')
        expect(switchSidenavStatusMock).toHaveBeenCalledWith()
    });

    it('Sidenav `exit` secction should trigger logout from useUser', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(logoutMock).not.toHaveBeenCalled()


        fireEvent.click(
            screen.getByText('Exit')
        )

        expect(logoutMock).toHaveBeenCalled()

    });
})