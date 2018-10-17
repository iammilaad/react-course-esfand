import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as loginConstants from "../signin/constants";
import * as actions from "./actions";
import { push } from "react-router-redux";
import loadingAction from "utils/globalRedux/loading/action";
import * as userAction from "utils/globalRedux/user/actions";
import * as tokenAction from "utils/globalRedux/token/actions";
import { updateLocalStorage } from "utils/localStorage";

function* register(action) {
    const { data } = action.payload;
    try {
        yield put(loadingAction(constants.REGISTER, true));
        yield postRequest(constants.API_URL, data);
        yield Object.assign(data, {
            client_id : process.env.REACT_APP_TAVANITO_CLIENT_ID,
            client_secret: process.env.REACT_APP_TAVANITO_CLIENT_SECRET,
            grant_type : 'password'
        });
        const response = yield postRequest(loginConstants.API_URL, data);
        const securityData = {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
            token_type: response.token_type,
        };
        yield put(userAction.setUserData(response.data));
        yield put(tokenAction.setToken(securityData));
        yield call(updateLocalStorage);
        yield put(actions.setViewStatus(constants.ACTIVATION_VIEW));
    } catch (e) {
        yield put(loadingAction(constants.REGISTER, false));
    }
    finally {
        yield put(loadingAction(constants.REGISTER, false));
    }
}


export function* registerRequestSaga() {
    yield takeEvery(constants.REGISTER_REQUEST, register);
}

export default [
    registerRequestSaga()
];
