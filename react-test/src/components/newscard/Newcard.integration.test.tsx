import { Newscard } from './Newcard'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';

import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import * as storedArticlesHook from '../../hooks/storedArticle/storedArticleHook' 
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { UserCredential } from 'firebase/auth';
import { setUsetAction } from '../../state/user/user.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useStoredArticleMock } from '../../hooks/storedArticle/storedArticleHook.mock';

describe('Newcard', () => {
    let sidenavStore: any;
    let history: any;

    const inputArticle = {
        media: [{'media-metadata': [{url: 'http://testingUrl'}]}],
    } as MostPopularViewedArticlesResponseContentDto;
    
    beforeEach(() => {
        sidenavStore = createTestStore();
        history = createMemoryHistory();

        const useUserMock = jest.spyOn(storedArticlesHook, 'useStoredArticle');
        useUserMock.mockImplementation(useStoredArticleMock)
    });

    it('should create', () => {
        const { container } = render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Newscard article={inputArticle} />
                </Router>
            </Provider>
        );
        expect(container).toBeDefined()
    });

    it('By default remove from stored articles button should be hidden', () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Newscard article={inputArticle} />
                </Router>
            </Provider>
        );
        expect(screen.getByLabelText('remove from stored articles')).not.toBeVisible()
    });

    it('if isLogged add from stored articles button should appears', async () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Newscard article={inputArticle} />
                </Router>
            </Provider>
        );
        expect(screen.getByLabelText("add from stored articles")).not.toBeVisible()

        await act(async () => {
            sidenavStore.dispatch(setUsetAction({} as UserCredential));
        })

        expect(screen.getByLabelText("add from stored articles")).toBeVisible()
    });

    it('if add from stored articles button its clicked addStoredArticle hook func should be called', async () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Newscard article={inputArticle} />
                </Router>
            </Provider>
        );

        await act(async () => {
            sidenavStore.dispatch(setUsetAction({} as UserCredential));
        })

        expect(useStoredArticleMock().addStoredArticle).not.toHaveBeenCalled()
        fireEvent.click(screen.getByLabelText("add from stored articles"))
        expect(useStoredArticleMock().addStoredArticle).toHaveBeenCalledWith(inputArticle)
    });

    it('if remove from stored articles button its clicked removeStoredArticle hook func should be called', async () => {
        render(
            <Provider store={sidenavStore}>
                <Router location={history.location} navigator={history}>
                    <Newscard article={inputArticle} showDeleteStoredArticle={true}/>
                </Router>
            </Provider>
        );

        expect(useStoredArticleMock().deleteStoredArticle).not.toHaveBeenCalled()
        fireEvent.click(screen.getByLabelText("remove from stored articles"))
        expect(useStoredArticleMock().deleteStoredArticle).toHaveBeenCalledWith()
    });
});