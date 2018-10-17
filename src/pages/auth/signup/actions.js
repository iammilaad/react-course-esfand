import * as constants from "./constants";

export const setRegisterRequest = data => ({
  type: constants.REGISTER_REQUEST,
  payload: {
    data
  }
});
