import { call, put, takeEvery } from "redux-saga/effects";
import { postRequest } from "utils/api/agent";
import * as constants from "./constants";
import * as actions from "./actions";
import { push } from "react-router-redux";

function* login(action) {
    const { data, loading} = action.payload;
    try {
        yield put(loading(true));
        console.log("i`m here")
        // yield put(push("/"));
    } catch (e) {
        console.error("i`m here with error")
    }
}

export function* loginRequestSaga() {
    yield takeEvery(constants.SET_LOGIN_REQUEST, login);
}
export default [loginRequestSaga()];