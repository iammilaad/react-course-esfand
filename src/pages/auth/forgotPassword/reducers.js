import { fromJS } from "immutable";
import { createReducer } from "redux-immutablejs";
import * as constants from "./constants";

const initialState = fromJS({
    sendStatus: constants.NOT_SEND
});

export default {
  [constants.FORGOT_PASSWORD]: createReducer(initialState, {
    [constants.FORGOT_PASSWORD_SEND_STATUS]: (state, action) =>
      state.merge({
          sendStatus: action.payload.status
      })
  })
};
