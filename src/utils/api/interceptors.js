import React from "react";
import createInterceptor from "superagent-intercept";
import { store } from "src/store";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { formatMessage } from "languageProvider";

export const successInterceptor = createInterceptor((error, response) => {
  // if (!!response && response.status === 200) {
  //
  // }
});

export const badRequestInterceptor = createInterceptor((error, response) => {
  if (!!response && response.status === 401) {
    // store.dispatch(push("/login"));
  }
  if (!!response && response.status === 403) {
    // store.dispatch(push("/login"));
  }
  if (!!response && response.status === 500) {
  }
  if (!!response && response.status === 400) {
  }
  if (!!response && response.status === 404) {
  }
});

badRequestInterceptor.contextTypes = {
  intl: PropTypes.object.isRequired
};
