import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { createReducer } from "redux-immutablejs";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { fromJS } from "immutable";
import localStorage from "store";
import App from "layouts/reducer";
import ThemeSwitcher from "containers/ThemeSwitcher/reducer";
import LanguageSwitcher from "containers/LanguageSwitcher/reducer";
import { FLUSH } from "utils/middlewares/redux";
import { updateLocalStorage } from "utils/localStorage";
import config from "settings";
import signIn from "pages/auth/signin";
import signUp from "pages/auth/signup";
import loading from "utils/globalRedux/loading/reducer";
import userReducers from "utils/globalRedux/user/reducers";

const rootSage = function*() {
  yield all([
      ...signIn.sagas,
      ...signUp.sagas,
  ]);
};
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const logger = createLogger(); // eslint-disable-line

const rootReducer = (state, action) => {
  if (action.type === FLUSH) {
    state = undefined;
  }

  return combineReducers({
    router: routerReducer,
    App,
    ThemeSwitcher,
    LanguageSwitcher,
    loading,
    ...userReducers
  })(state, action);
};

const store = createStore(
  rootReducer,
  fromJS(localStorage.get(config.localStorageName)),
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      routeMiddleware,
      logger // eslint-disable-line
    )
  )
);
store.subscribe(updateLocalStorage);
sagaMiddleware.run(rootSage);
export { store, history };
