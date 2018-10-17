import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";

const initialState = fromJS({
    viewStatus: constants.LOGIN_VIEW
});

export default {
  [constants.LOGIN]: createReducer(initialState, {
    [constants.VIEW_STATUS]: (state, action) =>
      state.merge({
          viewStatus: action.payload.viewStatus
      })
  })
};
