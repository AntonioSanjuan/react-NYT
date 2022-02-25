import { render } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'

import { store } from '../../state/rootState';
import ContactPage from './Contact';


describe('Contact', () => {
    let contactStore: any;
    let history: any;

    beforeEach(() => {
        contactStore = {...store};
        history = createMemoryHistory();
    });

    it('should create', () => {
        const { container } = render(
            <Provider store={contactStore}>
                <Router location={history.location} navigator={history}>
                    <ContactPage/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });
})