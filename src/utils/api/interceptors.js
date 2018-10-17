import React from "react";
import message from 'antd/lib/message';
import createInterceptor from "superagent-intercept";
import { store } from "src/store";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { formatMessage } from "languageProvider";
import {errorHandling} from '../helpers/errorHandeling';

export const successInterceptor = createInterceptor((error, response) => {
    if (!!response && response.status === 200) {
        if(response.body.message)
        return message.success(response.body.message)
    }
});

export const badRequestInterceptor = createInterceptor((error, response) => {
    if (!!response && response.status === 401) {
        // store.dispatch(push("/login"));
    }
    if (!!response && response.status === 403) {
        // store.dispatch(push("/login"));
    }
    if (!!response && response.status === 422) {
        return errorHandling(response.body.errors)
    }
    if (!!response && response.status === 500) {
    }
    if (!!response && response.status === 400) {
        if(response.body.message)
            return message.error(response.body.message)
    }
    if (!!response && response.status === 404) {
    }
});

badRequestInterceptor.contextTypes = {
    intl: PropTypes.object.isRequired
};
