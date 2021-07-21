import { useDispatch } from "react-redux";
import { API, FETCH_STATS, SET_HISTORY, SET_LOADER, SHORT_URL } from "./types";
import DB from "../lib/idb.js";
import { newUrl, setLoader } from "./history.action";
import { getHistory } from "../reducers/history.reducer";


async function handleHistory({shortcode, stats, url}) {

  // open Database
	const db = await DB.openDB('historyDB', 1);
	const historyStore = await DB.transaction(db, ["history"], 'readwrite').getStore("history");
	await DB.addObjectData(historyStore, {
		shortcode: shortcode,
		stats: stats,
		url: url,
		timestamp: Date.now(),
	});
  window.store.dispatch(
		newUrl({
			shortcode: shortcode,
			stats: stats,
			url: url,
			timestamp: Date.now(),
      isNew: true,
		})
	);
	window.store.dispatch(
		setLoader({
			state: false,
		})
	);
  // SEMENTARA
  // window.location.reload();
}

function fetchStats(data) {
	return apiAction({
		url: `${data.shortcode}/stats`,
		method: 'GET',
		data: '',
		onSuccess: (resp) => {
			return handleHistory({
				shortcode: data.shortcode,
				stats: resp,
				url: data.url,
			});
		},
		onFailure: () => console.log('Error occured loading articles'),
		label: FETCH_STATS,
	});
}
export function postUrl(data) {
  return apiAction({
    url: 'shorten',
    method: 'POST',
    data: {
      url: data
    },
    onSuccess: (resp) => {
      return fetchStats({ shortcode: resp.shortcode, url: data });
    },
    onFailure: (err) => {
      console.log("Error occured loading articles", err);
    },
    label: SHORT_URL,
  });
}


function apiAction({
  url = "",
  method = "",
  data = null,
  accessToken = null,
  onSuccess = (res) => {
    console.log("🚀 => resp");
  },
  onFailure = (er) => {
    console.log("🚀 => er");  
  },
  label = "",
  headersOverride = null,
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
    },
  };
}
