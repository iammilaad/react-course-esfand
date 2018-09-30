import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest, getRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import loadingAction from "utils/globalRedux/loading/action";

function* getToken(action) {
    const { token } = action.payload;
    try {
        console.log("yes")
        yield put(actions.setResetPasswordTokenCheck(constants.TOKEN_CHECKED));
    } catch (e) {
        yield put(actions.setResetPasswordStatus(constants.TOKEN_EXPIRED));
        console.error("i`m here with error");
    }
}

function* resetPassword(action) {
    const { data } = action.payload;
    const data1 = { token: Math.random(), setting: "ok" };
    try {
        yield put(loadingAction(constants.RESET_PASSWORD, true));
        yield put(actions.setResetPasswordStatus(constants.RESETED));
    } catch (e) {
        yield put(actions.setResetPasswordStatus(constants.NOT_RESETED));
        console.error("i`m here with error");
    }
}

export function* tokenCheckRequestSaga() {
    yield takeEvery(constants.RESET_PASSWORD_CHECK_TOKEN_REQUEST, getToken);
}
export function* forgotPasswordRequestSaga() {
    yield takeEvery(constants.RESET_PASSWORD_REQUEST, resetPassword);
}
export default [
    forgotPasswordRequestSaga(),
    tokenCheckRequestSaga()
];
