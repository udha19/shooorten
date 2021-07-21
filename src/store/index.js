import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index.js";
import apiMiddleware from "./middlewares/api";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
window.store = store;
export default store;
