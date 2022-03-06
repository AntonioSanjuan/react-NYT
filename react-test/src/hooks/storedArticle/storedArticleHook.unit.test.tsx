import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useStoredArticle } from './storedArticleHook';

import * as hooks from '../state/appStateHook' 
import * as firebaseStoreService from '../../services/firebaseStore/firebaseStore.service'
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { addUserStoredArticleMock } from '../../services/firebaseStore/firebaseStore.service.mock';

describe('<useFetchStoredArticles />', () => {
    let useStoredArticleStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>
    let service_addUserStoredArticleSpy: any;

    beforeEach(() => {
        useStoredArticleStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useStoredArticleStore}>{children}</Provider>
        
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(useAppDispatchMockResponse);

        service_addUserStoredArticleSpy = jest.spyOn(firebaseStoreService, 'addUserStoredArticle').mockImplementation(addUserStoredArticleMock)
    });

    it('should create',() => {
        const {result} = renderHook(() => useStoredArticle(), { wrapper })

        expect(result.current).toBeDefined()
    })

    it('addStoredArticle() must request to addUserStoredArticle service function', async() => {
        expect(service_addUserStoredArticleSpy).not.toHaveBeenCalled()

        const {result} = renderHook(() => useStoredArticle(), { wrapper })

        result.current.addStoredArticle({} as MostPopularViewedArticlesResponseContentDto)
        expect(service_addUserStoredArticleSpy).toHaveBeenCalled()
    })
})