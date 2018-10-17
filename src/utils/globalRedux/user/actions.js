import * as constants from "./constants";

export const setUserData = data => ({
  type: constants.SET,
  payload: {
    data
  }
});
