import { call, put, takeEvery, select } from "redux-saga/effects";
import { postRequest, getRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from 'utils/globalRedux/user/actions';
import {updateLocalStorage} from 'utils/localStorage';

function* activationCode(action) {
    const { verification_code, data } = action.payload;
    try {
        yield put(loadingAction(constants.VERIFY_CODE, true));
        yield postRequest(constants.API_VERIFY_CODE_URL, verification_code);
        yield Object.assign(data, {
            client_id : process.env.REACT_APP_TAVANITO_CLIENT_ID,
            client_secret: process.env.REACT_APP_TAVANITO_CLIENT_SECRET,
            grant_type : 'password'
        });
        const response = yield getRequest(constants.API_USER_URL, data);
        yield put(userAction.setUserData(response.data));
        yield call(updateLocalStorage);
    } catch (e) {
        yield put(loadingAction(constants.VERIFY_CODE, false));
    }
    finally {
        yield put(loadingAction(constants.VERIFY_CODE, false));
    }
}
function* resendActivationCode(action) {
    const { verification_code } = action.payload;
    try {
        yield put(loadingAction(constants.VERIFY_CODE, true));
        const response = yield postRequest(constants.API_RESEND_VERIFY_CODE_URL, verification_code);
    } catch (e) {
        yield put(loadingAction(constants.VERIFY_CODE, false));
    }
    finally {
        yield put(loadingAction(constants.VERIFY_CODE, false));
    }
}

export function* activationCodeRequestSaga() {
    yield takeEvery(constants.ACTIVATION_CODE_REQUEST, activationCode);
}
export function* resendActivationCodeRequestSaga() {
    yield takeEvery(constants.RESEND_ACTIVATION_CODE_REQUEST, resendActivationCode);
}
export default [
    activationCodeRequestSaga(),
    resendActivationCodeRequestSaga(),
];