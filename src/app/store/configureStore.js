import { applyMiddleware, createStore } from "redux";
import {
  composeWithDevTools,
  devToolsEnhancer,
} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { verifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.dispatch(verifyAuth());

  return store;
}
