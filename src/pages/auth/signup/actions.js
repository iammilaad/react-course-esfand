import * as constants from "./constants";

export const setRegisterRequest = data => ({
    type: constants.REGISTER_REQUEST,
    payload: {
        data
    }
});
export const setViewStatus = viewStatus => ({
    type: constants.VIEW_STATUS,
    payload: {
        viewStatus
    }
});
