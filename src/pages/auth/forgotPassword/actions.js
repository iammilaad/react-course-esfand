import * as constants from "./constants";

export const setForgotPasswordRequest = data => ({
  type: constants.FORGOT_PASSWORD_REQUEST,
  payload: {
    data
  }
});
export const setForgotPasswordStatus = status => ({
    type: constants.FORGOT_PASSWORD_SEND_STATUS,
    payload: {
        status
    }
});
