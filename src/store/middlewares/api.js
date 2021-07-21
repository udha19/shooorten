// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { AxiosProxyConfig } from "axios";
import { API, SHORT_URL } from "../actions/types";
import { shorten, fetchStats } from '../actions/api';
import { baseUrl } from "../../constants/endpoint";

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label,
    headers,
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  // axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '/';
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  axios
    .request({ 
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch((error) => {
      // dispatch(apiError(error));
      dispatch(onFailure(error));
      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        // dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
