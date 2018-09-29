import React, { Component } from 'react';
import { ReportWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { label, details, children } = this.props;
    return (
      <ReportWidgetWrapper className="ovReportsWidget">
        <h3 className="ovWidgetLabel">{label}</h3>

        <div className="ovReportsWidgetBar">{children}</div>

        <p className="ovDescription">{details}</p>
      </ReportWidgetWrapper>
    );
  }
}
