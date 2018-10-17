import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import { push } from "react-router-redux";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import { updateLocalStorage } from "utils/localStorage";
import { store } from "src/store";
import { asyncRemoveLocalStorageAction, flush } from "utils/middlewares/redux";
import * as tokenAction from 'utils/globalRedux/token/actions';
import * as verifyCodeActions from 'pages/auth/verifyCode/actions';

function* login(action) {
    const { data } = action.payload;
    try {
        yield put(loadingAction(constants.LOGIN, true));
        yield Object.assign(data, {
            client_id : process.env.REACT_APP_TAVANITO_CLIENT_ID,
            client_secret: process.env.REACT_APP_TAVANITO_CLIENT_SECRET,
            grant_type : 'password'
        });
        const response = yield postRequest(constants.API_URL, data);
        const securityData = {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
            token_type: response.token_type,
        };
        yield put(userAction.setUserData(response.data));
        yield put(tokenAction.setToken(securityData));
        yield call(updateLocalStorage);
        if(response.data.mobile_verified_at === null) {
            yield put(actions.setViewStatus(constants.ACTIVATION_VIEW));
            yield put(verifyCodeActions.setResendActivationCodeRequest(data.mobile))
        }

    } catch (e) {
        yield put(loadingAction(constants.LOGIN, false));
    }
    finally {
        yield put(loadingAction(constants.LOGIN, false));
    }
}

function* logout() {
    try {
        yield put(loadingAction(constants.LOGOUT, true));
        yield put(asyncRemoveLocalStorageAction());
        yield put(flush());
        yield put(push("/signin"));
    } catch (e) {
        console.error("i`m here with error");
    }
}



export function* loginRequestSaga() {
    yield takeEvery(constants.LOGIN_REQUEST, login);
}
export function* logoutRequestSaga() {
    yield takeEvery(constants.LOGOUT_REQUEST, logout);
}
export default [
    loginRequestSaga(),
    logoutRequestSaga()
];
