import { renderHook} from '@testing-library/react-hooks'
import { Dispatch } from '@reduxjs/toolkit';

import { useMostPopularArticles } from './mostPopularArticlesHook';
import { MostPopularViewedArticlesResponseDto } from '../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';

import * as actions from '../../state/data/data.actions'
import * as hooks from '../../hooks/state/appStateHook' 
import * as services from '../../services/NYTdataSupplier/mostPopular/nytMostPupukar.service'

describe('<useMostPopularArticles />', () => {
    const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>
    let service_getMostPopularViewedArticlesSpy: any;

    beforeEach(() => {
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(useAppDispatchMockResponse);

        service_getMostPopularViewedArticlesSpy = jest.spyOn(services, 'getMostPopularViewedArticles').mockResolvedValue({} as MostPopularViewedArticlesResponseDto)
    });

    it('should create', async() => {
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: 1}))

        await waitForNextUpdate();
        expect(result.current).toBeDefined()
    })

    it('initially should request getMostPopularViewedArticles', async() => {
        const input = 7
        expect(service_getMostPopularViewedArticlesSpy).not.toHaveBeenCalled()

        const { waitForNextUpdate } = renderHook(() => useMostPopularArticles({ periodOfTime: input}))
        await waitForNextUpdate();

        expect(service_getMostPopularViewedArticlesSpy).toHaveBeenCalledWith({periodOfTime: input})
    })

    it('initially should request getMostPopularViewedArticles if success...', async() => {
        const response = { results: [ {}]} as MostPopularViewedArticlesResponseDto
        service_getMostPopularViewedArticlesSpy = jest.spyOn(services, 'getMostPopularViewedArticles').mockResolvedValue(response);        
            
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: 8}))
        await waitForNextUpdate();

        expect(result.current.mostPopularArticles).toEqual(response)
        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(false)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(actions.setMostPopularViewedArticles(response))

    })

    it('initially should request getMostPopularViewedArticles if error...', async() => {
        service_getMostPopularViewedArticlesSpy = jest.spyOn(services, 'getMostPopularViewedArticles').mockRejectedValue({});        
            
        const {result, waitForNextUpdate} = renderHook(() => useMostPopularArticles({ periodOfTime: 8}))
        await waitForNextUpdate();

        expect(result.current.mostPopularArticles).toEqual(undefined)
        expect(result.current.loading).toEqual(false)
        expect(result.current.error).toEqual(true)
        expect(useAppDispatchMockResponse).toHaveBeenCalledWith(actions.unsetMostPopularViewedArticles())
    })
})