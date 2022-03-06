import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useFetchStoredArticles } from './fetchStoredArticlesHook';

import * as hooks from '../state/appStateHook' 
import * as services from '../../services/firebaseStore/firebaseStore.service'
import { Provider } from 'react-redux';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { setUserStoredArticles } from '../../state/user/user.actions';
import { act } from 'react-dom/test-utils';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { setMostPopularViewedArticlesAction } from '../../state/data/data.actions';
import { MostPopularViewedArticlesResponseContentDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

describe('<useFetchStoredArticles />', () => {
    let useFetchStoredArticlesStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>
    let service_getUserStoredArticlesSpy: any;

    beforeEach(() => {
        useFetchStoredArticlesStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useFetchStoredArticlesStore}>{children}</Provider>
        
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(useAppDispatchMockResponse);

        service_getUserStoredArticlesSpy = jest.spyOn(services, 'getUserStoredArticles').mockResolvedValue({} as QuerySnapshot<DocumentData>)
    });

    // it('should create', async() => {
    //     const {result, waitForNextUpdate} = renderHook(() => useFetchStoredArticles(), { wrapper })

    //     await waitForNextUpdate();
    //     expect(result.current).toBeDefined()
    // })

    // it('initially should request getUserStoredArticles', async() => {
    //     expect(service_getUserStoredArticlesSpy).not.toHaveBeenCalled()

    //     const { waitForNextUpdate } = renderHook(() => useFetchStoredArticles(), { wrapper })
    //     await waitForNextUpdate();

    //     expect(service_getUserStoredArticlesSpy).toHaveBeenCalled()
    // })

    
    it('if response data has been previously fetched should not fetch again', async () => {
        expect(service_getUserStoredArticlesSpy).not.toHaveBeenCalled()

        await act(async() => {
            useFetchStoredArticlesStore.dispatch(setUserStoredArticles([]))
        });
        
        renderHook(() => useFetchStoredArticles(), { wrapper })
        expect(service_getUserStoredArticlesSpy).toHaveBeenCalledTimes(0)
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
        service_getUserStoredArticlesSpy = jest.spyOn(services, 'getUserStoredArticles').mockResolvedValue(response);        
            
        const {result, waitForNextUpdate} = renderHook(() => useFetchStoredArticles(), { wrapper })
        await waitForNextUpdate();

        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(false)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setUserStoredArticles([{ storedArticle: { uri: 'uritest' }, firebaseDocId: 'idTest' } as any]))

    })

    it('initially should request getUserStoredArticles if error...', async() => {
        service_getUserStoredArticlesSpy = jest.spyOn(services, 'getUserStoredArticles').mockRejectedValue({});        

        const {result, waitForNextUpdate} = renderHook(() => useFetchStoredArticles(), { wrapper })
        await waitForNextUpdate();

        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(true)
    })
})