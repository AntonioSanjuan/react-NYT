import { LayoutActions } from "./layout.actions";
import { layoutInitialState } from "./models/appLayout.initialState";
import { LayoutState } from "./models/appLayout.state";

const layoutReducer = (state: LayoutState = layoutInitialState, action: any ) => {
  switch(action.type) {
    case LayoutActions.switchSidenavStatus:
      return {
        ...state,
        isSidenavOpened: !state.isSidenavOpened
      }
    default: 
      return state;
  }
}




export {layoutReducer}


