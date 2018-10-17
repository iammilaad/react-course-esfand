import React, { Component } from "react";
import { ReportWidgetWrapper } from "./style";

export default class extends Component {
  render() {
    const { label, details, children } = this.props;
    return (
      <ReportWidgetWrapper className="tavReportsWidget">
        <h3 className="tavWidgetLabel">{label}</h3>

        <div className="tavReportsWidgetBar">{children}</div>

        <p className="tavDescription">{details}</p>
      </ReportWidgetWrapper>
    );
  }
}
