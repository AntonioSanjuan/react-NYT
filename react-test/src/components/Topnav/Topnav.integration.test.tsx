import { Topnav } from './Topnav'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from '../../state/rootState';

import * as actions from '../../state/user/user.actions';
import { act } from 'react-dom/test-utils';

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import * as hooks from '../../hooks/sidenav/sidenavHook' 
import React from 'react';
describe('Topnav', () => {
    let topnavStore: any;
    let history: any;

    const setLoginButtonHiddenMock = jest.fn(() => {});
    const switchSidenavStatusMock = jest.fn(() => {})

    beforeEach(() => {
        topnavStore = {...store};
        history = createMemoryHistory();

        const useState_loginButtonHidden_Mock = jest.spyOn(React, 'useState');
        const useLayerMock = jest.spyOn(hooks, 'useSidenavLayer');

        useState_loginButtonHidden_Mock.mockImplementation(() => [undefined, setLoginButtonHiddenMock]);
        useLayerMock.mockImplementation(() => { return {switchSidenavStatus: switchSidenavStatusMock}})
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
            topnavStore.dispatch(actions.setUset({ userName: 'testing_username'}));
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
        
        expect(switchSidenavStatusMock).not.toHaveBeenCalled()

        fireEvent.click(
            screen.getAllByRole('button', {
                name: /switchSidenavButton/i
            })[0]
        )

        expect(switchSidenavStatusMock).toHaveBeenCalled()

    });
})