import * as constants from "./constants";

export const setActivationCodeRequest = (verification_code, data) => ({
    type: constants.ACTIVATION_CODE_REQUEST,
    payload: {
        verification_code,
        data
    }
});
export const setResendActivationCodeRequest = mobile => ({
    type: constants.RESEND_ACTIVATION_CODE_REQUEST,
    payload: {
        mobile
    }
});
