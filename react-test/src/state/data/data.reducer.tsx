import { DataActions } from "./data.actions";
import { dataInitialState } from "./models/appData.initialState";
import { DataState } from "./models/appData.state";

const dataReducer = (state: DataState = dataInitialState, action: any ) => {
  switch(action.type) {
    case DataActions.setMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: action.payload
      }
    case DataActions.unsetMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: undefined
      }
    default: 
      return state;
  }
}




export {dataReducer}


