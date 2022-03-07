import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useStoredArticle } from './storedArticleHook';

import * as hooks from '../state/appStateHook' 
import * as firebaseStoreServiceMock from '../../services/firebaseStore/firebaseStore.service.mock'
import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

describe('<useFetchStoredArticles />', () => {
    let useStoredArticleStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    beforeEach(() => {
        useStoredArticleStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useStoredArticleStore}>{children}</Provider>
        
        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);

    });

    it('should create',() => {
        const {result} = renderHook(() => useStoredArticle(), { wrapper })

        expect(result).toBeDefined()
    })

    it('addStoredArticle() must request to addUserStoredArticle service function', async() => {
        expect(firebaseStoreServiceMock.addUserStoredArticleMock).not.toHaveBeenCalled()

        const {result} = renderHook(() => useStoredArticle(), { wrapper })

        result.current.addStoredArticle({} as MostPopularViewedArticlesResponseContentDto)
        expect(firebaseStoreServiceMock.addUserStoredArticleMock).toHaveBeenCalled()
    })
})