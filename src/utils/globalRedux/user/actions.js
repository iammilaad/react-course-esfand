import * as constants from "./constants";

export const setUser = data => ({
  type: constants.SET,
  payload: {
    data
  }
});
