// rootReducer.js

import { combineReducers } from 'redux';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  app: appReducer
  // more reducers here
});

export default rootReducer;