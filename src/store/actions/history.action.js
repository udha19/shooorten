import { SET_LOADER, SET_HISTORY, NEW_URL } from "./types";


export const setLoader = (state) => ({
	type: SET_LOADER,
	payload: state,
});

export const setHistory = (data) => ({
	type: SET_HISTORY,
	payload: data,
});

export const newUrl = (data) => ({
  type: NEW_URL,
  payload: data,
})