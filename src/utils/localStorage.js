import localStorage from "store";
import whiteListObject from "whitelist-object";
import { fromJS } from "immutable";
import { store } from "src/store";
import _ from "lodash";
import config from "settings";

const whiteList = [
  "ThemeSwitcher",
  "LanguageSwitcher",
  "ThemeEditor",
  "App",
  "USER"
];

let previousState = fromJS(localStorage.get(config.localStorageName, {}));
export const updateLocalStorage = () => {
  const currentState = store.getState();
  let dirtyList = [];
  for (const stateName of whiteList) {
    const prev = previousState.get(stateName);
    const cur = currentState.get(stateName);

    if (!prev && !!cur) {
      dirtyList.push(stateName);
      break;
    }

    if (!_.isEqual(prev, cur)) {
      dirtyList.push(stateName);
      break;
    }
  }

  if (!_.isEmpty(dirtyList)) {
    console.warn("sync local storage. list: " + dirtyList);
    localStorage.set(
      config.localStorageName,
      whiteListObject(currentState.toJS(), whiteList, true)
    );
  }

  previousState = currentState;
};
