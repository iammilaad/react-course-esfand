import * as constants from "./constants";

export const getCheckTokenRequest = token => ({
    type: constants.RESET_PASSWORD_CHECK_TOKEN_REQUEST,
    payload: {
        token
    }
});
export const setResetPasswordRequest = data => ({
  type: constants.RESET_PASSWORD_REQUEST,
  payload: {
    data
  }
});
export const setResetPasswordTokenCheck = tokenStatus => ({
    type: constants.RESET_PASSWORD_TOKEN_CHECK,
    payload: {
        tokenStatus
    }
});
export const setResetPasswordStatus = status => ({
    type: constants.RESET_PASSWORD_STATUS,
    payload: {
        status
    }
});
