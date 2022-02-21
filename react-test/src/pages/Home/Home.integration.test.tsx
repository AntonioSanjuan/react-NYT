import { render } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'

import HomePage from './Home'
import { store } from '../../state/rootState';

import * as mostPopularArticlesHooks from "../../hooks/mostPopularArticles/mostPopularArticlesHook"

describe('HomePage', () => {
    let homeStore: any;
    let history: any;

    let useMostPopularArticlesMock: any;

    beforeEach(() => {
        homeStore = {...store};
        history = createMemoryHistory();

        useMostPopularArticlesMock = jest.spyOn(mostPopularArticlesHooks, 'useMostPopularArticles').mockReturnValue({mostPopularArticles: undefined} as any);
    });

    it('should create', () => {
        const { container } = render(
            <Provider store={homeStore}>
                <Router location={history.location} navigator={history}>
                    <HomePage/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });

    it('initially should use useMostPopularArticles hook', () => {
      render(
          <Provider store={homeStore}>
              <Router location={history.location} navigator={history}>
                  <HomePage/>
              </Router>
          </Provider>
      );

      expect(useMostPopularArticlesMock).toHaveBeenCalled()
  });
})