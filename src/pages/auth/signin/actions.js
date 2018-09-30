import * as constants from "./constants";

export const setLoginRequest = data => ({
  type: constants.LOGIN_REQUEST,
  payload: {
    data
  }
});
