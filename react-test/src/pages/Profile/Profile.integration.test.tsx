import { render, } from '@testing-library/react'
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

import Profile from "./Profile";

describe('Profile', () => {
    let loginStore: any;
    let history: any;

    beforeEach(() => {
        loginStore = createTestStore();
        history = createMemoryHistory();
    })

    it('should create', () => {
        const { container } = render(
            <Provider store={loginStore}>
                <Router location={history.location} navigator={history}>
                    <Profile/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });
});
