import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { types } from './actions/actions';

const appReducerInitState = {};

// TODO move reducers to separate files
function appReducer(state = appReducerInitState, action) {
  switch (action.type) {
    case types.SAY_HI:
      return { ...state, say: 'hi' };
    case types.SAY_BYE:
      return { ...state, say: 'bye' };
    default:
      return state;
  }
}

const reducers = combineReducers({
  app: appReducer,
  router: routerReducer
});

export default reducers;
