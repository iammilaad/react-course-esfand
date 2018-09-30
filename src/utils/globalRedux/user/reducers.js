import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";

const initialState = fromJS({
  data: {}
});

export default {
  [constants.USER]: createReducer(initialState, {
    [constants.SET]: (state, action) =>
      state.merge({
        data: action.payload.data
      })
  })
};
