import { MostPopularViewedArticlesResponseDto } from '../../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model';
import { getMostPopularViewedArticles } from './nytMostPupular.service';

describe('nytMostPupular', () => {
  let fetchSpy: any;
  const jsonMock = jest.fn();

  beforeEach(() => {
    jsonMock.mockResolvedValue({});
    fetchSpy = jest.spyOn(global, 'fetch');

    fetchSpy.mockResolvedValue({
      json: jsonMock,
      ok: true,
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getMostPopularViewedArticles should request fetch', async () => {
    await getMostPopularViewedArticles({ periodOfTime: 3 });
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('getMostPopularViewedArticles success should return json response', async () => {
    const input = {
      results: [{ id: 0 }],
    } as MostPopularViewedArticlesResponseDto;

    jsonMock.mockResolvedValue(input);

    const res = await getMostPopularViewedArticles({ periodOfTime: 3 });
    expect(res).toEqual(input);
  });

  it('getMostPopularViewedArticles rejected should throw Error "Response NOT VALID"', async () => {
    let sut: any;
    fetchSpy.mockResolvedValue({
      json: jsonMock,
      ok: false,
    } as any);

    await getMostPopularViewedArticles({ periodOfTime: 3 }).catch((e: Error) => {
      sut = e;
    });
    expect(sut.message).toEqual('Response NOT VALID');
  });
});
