import { DataActions } from './data.actions';
import { dataInitialState } from './models/appData.initialState';
import { DataState } from './models/appData.state';

// eslint-disable-next-line default-param-last
const dataReducer = (state: DataState = dataInitialState, action: any): DataState => {
  switch (action.type) {
    case DataActions.setMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: {
          articles: action.payload.mostPopularViewedArticles,
          requestedPeriod: action.payload.requestedPeriod,
        },
        // mostPopularViewedArticlesRequestedPage: action.payload.mostPopularViewedArticlesRequestedPage,
      };
    case DataActions.unsetMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: {
          ...dataInitialState.mostPopularViewedArticles,
        },
      };
    default:
      return state;
  }
};

export { dataReducer };
