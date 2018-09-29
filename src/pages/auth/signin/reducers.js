import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from './constants';

const initialState = fromJS({
    loading: false,
    userData: {}
});

export default {
    [constants.LOGIN]: createReducer(initialState, {
        [constants.SET_USER]: (state, action) =>
            state.merge({
                userData: action.payload.data
            }),
        [constants.LOADING]: (state, action) =>
            state.merge({
                loading: action.payload.loading
            })
    })
};
