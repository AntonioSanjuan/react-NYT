import { resolve } from 'path/posix';
import { getMostPopularViewedArticles} from './nytMostPupular.service'


describe('nytMostPupular', () => {
    const mockResponse = {};

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            ok: true
        } as any)
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it('getMostPopularViewedArticles should request fetch', async () => {
        const res = await getMostPopularViewedArticles({ periodOfTime: 3})
    })
});