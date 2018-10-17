import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import loadingAction from "utils/globalRedux/loading/action";
import { push } from "react-router-redux";

function* forgotPassword(action) {
    const { data } = action.payload;
    try {
        yield put(loadingAction(constants.FORGOT_PASSWORD, true));
        yield postRequest(constants.API_URL, data);
        yield put(actions.setViewStatus(constants.NEW_PASSWORD_VIEW));
    } catch (e) {
        yield put(loadingAction(constants.FORGOT_PASSWORD, false));
    }
    finally {
        yield put(loadingAction(constants.FORGOT_PASSWORD, false));
    }
}
function* newPassword(action) {
    const { data, mobile } = action.payload;
    try {
        yield put(loadingAction(constants.FORGOT_PASSWORD, true));
        Object.assign(data, {mobile: mobile});
        yield postRequest(constants.API_CHANGE_PASSWORD_URL, data);
        yield put(push('/signin'))
    } catch (e) {
        yield put(loadingAction(constants.FORGOT_PASSWORD, false));
    }
    finally {
        yield put(loadingAction(constants.FORGOT_PASSWORD, false));
    }
}

export function* forgotPasswordRequestSaga() {
    yield takeEvery(constants.FORGOT_PASSWORD_REQUEST, forgotPassword);
}
export function* newPasswordRequestSaga() {
    yield takeEvery(constants.FORGOT_NEW_PASSWORD_REQUEST, newPassword);
}
export default [
    forgotPasswordRequestSaga(),
    newPasswordRequestSaga(),
];
