import { FETCH_STATS, SET_HISTORY, SET_LOADER, NEW_URL, SHORT_URL } from '../actions/types';

const initialState = {
	history: [],
	newData: [],
	loading: false,
	fetching: false,
	fetched: false,
	failed: false,
};

export const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_HISTORY:
			return {
				...state,
				history: action.payload,
			};
			break;
		case NEW_URL:
			return {
				...state,
				newData: action.payload,
			}
		case SET_LOADER:
			return {
				...state,
				loading: action.payload,
			}
			break;
		default:
			return state;
	}
}

export const getHistory = (state) => state.history;
