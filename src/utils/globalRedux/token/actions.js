import * as constants from "./constants";

export const setToken = data => ({
  type: constants.SET,
  payload: {
    data
  }
});

