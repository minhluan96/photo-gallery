import { combineReducers } from '@reduxjs/toolkit';
import gallery from 'services/reducers/gallery';

const rootReducer = combineReducers({
  gallery,
});

export default rootReducer;
