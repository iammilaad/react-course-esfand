import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";

const initialState = fromJS({
    status: constants.NOT_RESETED,
    tokenStatus: constants.TOKEN_NOT_CHECKED
});

export default {
    [constants.RESET_PASSWORD]: createReducer(initialState, {
        [constants.RESET_PASSWORD_TOKEN_CHECK]: (state, action) =>
            state.merge({
                tokenStatus: action.payload.tokenStatus
            }),
        [constants.RESET_PASSWORD_STATUS]: (state, action) =>
            state.merge({
                status: action.payload.status
            }),
    })
};
