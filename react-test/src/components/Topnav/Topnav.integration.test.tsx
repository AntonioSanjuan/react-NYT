import { Topnav } from './Topnav'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';

import { act } from 'react-dom/test-utils';

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import * as hooks from '../../hooks/sidenav/sidenavHook' 
import React from 'react';
import { UserCredential } from 'firebase/auth';
import { setUsetAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useSidenavMock } from '../../hooks/sidenav/sidenavHook.mock';
describe('Topnav', () => {
    let topnavStore: any;
    let history: any;

    const setLoginButtonHiddenMock = jest.fn(() => {});

    beforeEach(() => {
        topnavStore = createTestStore();
        history = createMemoryHistory();

        jest.spyOn(React, 'useState')
        .mockImplementation(() => [undefined, setLoginButtonHiddenMock]);

        jest.spyOn(hooks, 'useSidenavLayer')
        .mockImplementation(useSidenavMock)

        expect(setLoginButtonHiddenMock).toHaveBeenCalledTimes(0)

    });

    it('should create', () => {
        const { container } = render(
            <Provider store={topnavStore}>
                <Router location={history.location} navigator={history}>
                    <Topnav displayLoginButton={false}
                        hideSidenavButton={true}
                        hideSearchButton={true}/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });
    
    it('Topnav change properties should trigger setLoginButtonHidden status change', () => {
        const { rerender } = render(
            <Provider store={topnavStore}>
                <Router location={history.location} navigator={history}>
                <Topnav displayLoginButton={false}/>
                </Router>
            </Provider>
        );
        
        rerender(            
            <Provider store={topnavStore}>
                <Router location={history.location} navigator={history}>
                    <Topnav displayLoginButton={true}/>
                </Router>
            </Provider>
        );
        expect(setLoginButtonHiddenMock).toHaveBeenLastCalledWith(
            topnavStore.getState().user.isLogged
        )
    })

    it('Topnav isLoggedIn observable value changes should trigger setLoginButtonHidden status change', async () => {
        render(
            <Provider store={topnavStore}>
                <Router location={history.location} navigator={history}>
                    <Topnav displayLoginButton={true}/>
                </Router>
            </Provider>
        );
        // expect(setLoginButtonHiddenMock).toHaveBeenCalledTimes(1);
        expect(setLoginButtonHiddenMock).toHaveBeenCalledWith(false);

        await act(async () => {
            topnavStore.dispatch(setUsetAction({} as UserCredential));
        })
        
        expect(setLoginButtonHiddenMock).toHaveBeenCalledWith(true);
        // expect(setLoginButtonHiddenMock).toHaveBeenCalledTimes(2);
    });

    it('Topnav `login` button change should trigger', () => {
        render(
            <Provider store={topnavStore}>
                <Router location={history.location} navigator={history}>
                    <Topnav displayLoginButton={true}/>
                </Router>
            </Provider>
        );
        
        expect(useSidenavMock().switchSidenavStatus).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getAllByRole('button', {
                name: /switchSidenavButton/i
            })[0]
        )

        expect(useSidenavMock().switchSidenavStatus).toHaveBeenCalled()

    });
})