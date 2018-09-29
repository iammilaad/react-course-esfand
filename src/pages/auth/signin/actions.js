import * as constants from "./constants";

export const setUser = userData => ({
    type: constants.SET_USER,
    payload: {
        data: userData
    }
});
export const loading = isLoading => ({
    type: constants.LOADING,
    payload: {
        loading: isLoading
    }
});
export const setLoginRequest = data => ({
    type: constants.SET_LOGIN_REQUEST,
    payload: {
        data: data,
        loading: loading
    }
});

