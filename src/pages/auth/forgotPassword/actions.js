import * as constants from "./constants";

export const setForgotPasswordRequest = data => ({
    type: constants.FORGOT_PASSWORD_REQUEST,
    payload: {
        data
    }
});
export const setNewPasswordRequest = (data, mobile) => ({
    type: constants.FORGOT_NEW_PASSWORD_REQUEST,
    payload: {
        data,
        mobile
    }
});
export const setViewStatus = viewStatus => ({
    type: constants.FORGOT_PASSWORD_VIEW_STATUS,
    payload: {
        viewStatus
    }
});
