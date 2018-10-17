import React, { Component } from "react";
import CardWidgetWrapper from "./style";

export default class extends Component {
  render() {
    const { icon, iconcolor, number, text } = this.props;
    const iconStyle = {
      color: iconcolor
    };

    return (
      <CardWidgetWrapper className="tavCardWidget">
        <div className="tavIconWrapper">
          <i className={icon} style={iconStyle} />
        </div>

        <div className="tavContentWrapper">
          <h3 className="tavStatNumber">{number}</h3>
          <span className="tavLabel">{text}</span>
        </div>
      </CardWidgetWrapper>
    );
  }
}
