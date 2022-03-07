import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useFetchStoredArticles } from './fetchStoredArticlesHook';

import * as hooks from '../state/appStateHook' 
import * as firebaseStoreServiceMock from '../../services/firebaseStore/firebaseStore.service.mock'
import { Provider } from 'react-redux';
import { setUserStoredArticles } from '../../state/user/user.actions';
import { act } from 'react-dom/test-utils';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

describe('<useFetchStoredArticles />', () => {
    let useFetchStoredArticlesStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>

    beforeEach(() => {
        useFetchStoredArticlesStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useFetchStoredArticlesStore}>{children}</Provider>
        
        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);

    });

    it('should create', async () => {
        const {result} = renderHook(() => useFetchStoredArticles(), { wrapper })

        expect(result).toBeDefined()
    })

    it('initially should request getUserStoredArticles', async() => {
        expect(firebaseStoreServiceMock.getUserStoredArticlesMock).not.toHaveBeenCalled()

        renderHook(() => useFetchStoredArticles(), { wrapper })

        expect(firebaseStoreServiceMock.getUserStoredArticlesMock).toHaveBeenCalled()
    })

    
    it('if response data has been previously fetched should not fetch again', async () => {
        expect(firebaseStoreServiceMock.getUserStoredArticlesMock).not.toHaveBeenCalled()

        await act(async() => {
            useFetchStoredArticlesStore.dispatch(setUserStoredArticles([]))
        });
        
        renderHook(() => useFetchStoredArticles(), { wrapper })
        expect(firebaseStoreServiceMock.getUserStoredArticlesMock).toHaveBeenCalledTimes(0)
    })

    it('initially should request getUserStoredArticles if success...', async() => {
        const article = {uri: 'uritest'} as MostPopularViewedArticlesResponseContentDto;
        
        const sut = {
            userUid: 'userUid',
            articleStringify: JSON.stringify(article)
        }
        
        const response = {
            docs: [
                {
                    id: 'idTest',
                    data: () => {
                        return sut
                    }
                }
            ]
        } as any
        firebaseStoreServiceMock.getUserStoredArticlesMock.mockResolvedValue(response);        
            
        const {result, waitForNextUpdate} = renderHook(() => useFetchStoredArticles(), { wrapper })
        await waitForNextUpdate();

        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(false)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserStoredArticles([{ storedArticle: { uri: 'uritest' }, firebaseDocId: 'idTest' } as any]))

    })

    it('initially should request getUserStoredArticles if error...', async() => {
        firebaseStoreServiceMock.getUserStoredArticlesMock.mockRejectedValue({});        

        const {result, waitForNextUpdate} = renderHook(() => useFetchStoredArticles(), { wrapper })
        await waitForNextUpdate();

        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(true)
    })
})