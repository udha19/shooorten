import { FETCH_STATS, SHORT_URL } from "../actions/types";

export const shorten = (data) => ({
  type: SHORT_URL,
  payload: {data},
});

export const fetchStats = (data) => ({
  type: FETCH_STATS,
  payload: {data}
});
