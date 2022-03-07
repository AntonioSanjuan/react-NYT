import { Sidenav } from './Sidenav'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import * as sidenavHooks from '../../hooks/sidenav/sidenavHook' 
import * as userHooks from '../../hooks/user/userHook' 
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import {useUserMock} from "../../hooks/user/userHook.mock"
import { useSidenavMock } from '../../hooks/sidenav/sidenavHook.mock';

describe('Sidenav', () => {
    let sidenavStore: any;
    let history: any;

    beforeEach(() => {
        sidenavStore = createTestStore();
        history = createMemoryHistory();

        jest.spyOn(sidenavHooks, 'useSidenavLayer')
        .mockImplementation(useSidenavMock)

        jest.spyOn(userHooks, 'useUser')
        .mockImplementation(useUserMock)
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
        
        expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Popular Articles')
        )

        expect(history.location.pathname).toEqual('/')
        expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalled()
    });

    it('Sidenav `navigateToStoredArticlesAction` secction should trigger navigation to storedArticles', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Stored Articles')
        )

        expect(history.location.pathname).toEqual('/storedArticles')
        expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalled()
    });

    it('Sidenav `navigateToContactAction` secction should trigger navigation to contact', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getByText('Contact')
        )

        expect(history.location.pathname).toEqual('/contact')
        expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalledWith()
    });

    it('Sidenav `exit` secction should trigger logout from useUser', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Sidenav/>
                </Router>
            </Provider>
        );
        
        expect(useUserMock().logout).not.toHaveBeenCalled()


        fireEvent.click(
            screen.getByText('Exit')
        )

        expect(useUserMock().logout).toHaveBeenCalled()

    });
})