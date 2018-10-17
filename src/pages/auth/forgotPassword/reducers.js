import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";

const initialState = fromJS({
    viewStatus: constants.FORGOT_PASSWORD_VIEW
});

export default {
  [constants.FORGOT_PASSWORD]: createReducer(initialState, {
    [constants.FORGOT_PASSWORD_VIEW_STATUS]: (state, action) =>
      state.merge({
          viewStatus: action.payload.viewStatus
      })
  })
};
