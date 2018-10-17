import React from 'react';
import message from 'antd/lib/message';
import _ from 'lodash';

export function errorHandling(errors) {
    _.forEach(errors, value => {
        message.error(value);
    });
}