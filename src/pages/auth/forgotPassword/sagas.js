import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import loadingAction from "utils/globalRedux/loading/action";

function* forgotPassword(action) {
    const { data } = action.payload;
    const data1 = { token: Math.random(), setting: "ok" };
    try {
        yield put(loadingAction(constants.FORGOT_PASSWORD, true));
        yield put(actions.setForgotPasswordStatus(constants.SENT));
    } catch (e) {
        yield put(actions.setForgotPasswordStatus(constants.NOT_SEND));
        console.error("i`m here with error");
    }
}

export function* forgotPasswordRequestSaga() {
    yield takeEvery(constants.FORGOT_PASSWORD_REQUEST, forgotPassword);
}
export default [forgotPasswordRequestSaga()];
