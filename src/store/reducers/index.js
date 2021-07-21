import { combineReducers } from 'redux';
import { historyReducer } from '../reducers/history.reducer';

export const rootReducer = combineReducers({
	history: historyReducer,
});

export default rootReducer;
