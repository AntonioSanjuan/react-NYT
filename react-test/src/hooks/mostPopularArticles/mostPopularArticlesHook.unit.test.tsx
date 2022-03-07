import { act, renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useMostPopularArticles } from './mostPopularArticlesHook';
import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

import * as hooks from '../../hooks/state/appStateHook' 
import * as nyt_service from '../../services/NYTdataSupplier/mostPopular/nytMostPupular.service'
import { PeriodOfTimes } from '../../models/internal/types/PeriodOfTimeEnum.model';
import { Provider } from 'react-redux';
import { setMostPopularViewedArticlesAction, unsetMostPopularViewedArticlesAction } from '../../state/data/data.actions';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

describe('<useMostPopularArticles />', () => {
    let useMostPopularArticlesStore: any;
    let wrapper: any;

    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>
    let service_getMostPopularViewedArticlesSpy: any;

    beforeEach(() => {
        useMostPopularArticlesStore = createTestStore();
        wrapper = ({ children }: { children: any }) => <Provider store={useMostPopularArticlesStore}>{children}</Provider>
        
        jest.spyOn(hooks, 'useAppDispatch')
        .mockReturnValue(useAppDispatchMockResponse);

        service_getMostPopularViewedArticlesSpy = jest.spyOn(nyt_service, 'getMostPopularViewedArticles').mockResolvedValue({} as MostPopularViewedArticlesResponseDto)
    });

    afterEach(() => {
        
    })

    it('should create', async() => {
        const input =  PeriodOfTimes.Daily;
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: input}), { wrapper })

        await waitForNextUpdate();
        expect(result.current).toBeDefined()
    })

    it('initially should request getMostPopularViewedArticles', async() => {
        const input = PeriodOfTimes.Daily
        expect(service_getMostPopularViewedArticlesSpy).not.toHaveBeenCalled()

        const { waitForNextUpdate } = renderHook(() => useMostPopularArticles({ periodOfTime: input}), { wrapper })
        
        await waitForNextUpdate();
        expect(service_getMostPopularViewedArticlesSpy).toHaveBeenCalledWith({periodOfTime: input})
    })

    
    it('if response data has been previously fetched (same requestedPage) should not fetch again', async() => {
        const input = PeriodOfTimes.Daily
        expect(service_getMostPopularViewedArticlesSpy).not.toHaveBeenCalled()

        await act(async() => {
            useMostPopularArticlesStore.dispatch(setMostPopularViewedArticlesAction({} as MostPopularViewedArticlesResponseDto, input))
        });

        renderHook(() => useMostPopularArticles({ periodOfTime: input}), { wrapper })

        expect(service_getMostPopularViewedArticlesSpy).toHaveBeenCalledTimes(0)
    })

    it('initially should request getMostPopularViewedArticles if success...', async () => {
        const input = PeriodOfTimes.Daily
        const response = { results: [ {}]} as MostPopularViewedArticlesResponseDto
        service_getMostPopularViewedArticlesSpy = jest.spyOn(nyt_service, 'getMostPopularViewedArticles').mockResolvedValue(response);        
            
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: input}), { wrapper })
        await waitForNextUpdate();

        expect(result.current.mostPopularArticles).toEqual(response)
        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(false)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(setMostPopularViewedArticlesAction(response, input))

    })

    it('initially should request getMostPopularViewedArticles if error...', async() => {
        service_getMostPopularViewedArticlesSpy = jest.spyOn(nyt_service, 'getMostPopularViewedArticles').mockRejectedValue({});        
            
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: 8}), { wrapper })
        await waitForNextUpdate();
        expect(result.current.mostPopularArticles).toEqual(undefined)
        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(true)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(unsetMostPopularViewedArticlesAction())
    })
})