import React, { Component } from "react";
import Progress from "../../../components/uielements/progress";
import { ProgressWidgetWrapper } from "./style";

export default class ProgressWidget extends Component {
  render() {
    const {
      label,
      icon,
      iconcolor,
      details,
      percent,
      barHeight,
      status
    } = this.props;
    const iconStyle = {
      color: iconcolor
    };

    return (
      <ProgressWidgetWrapper className="ovProgressWidget">
        <div className="ovProgressWidgetTopbar">
          <h3>{label}</h3>
          <i className={icon} style={iconStyle} />
        </div>

        <div className="ovProgressWidgetBody">
          <p className="ovDescription">{details}</p>
          <Progress
            percent={percent}
            strokeWidth={barHeight}
            status={status}
            showInfo={false}
          />
        </div>
      </ProgressWidgetWrapper>
    );
  }
}
