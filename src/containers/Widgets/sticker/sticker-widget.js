import React, { Component } from "react";
import { StickerWidgetWrapper } from "./style";

export default class extends Component {
  render() {
    const { fontColor, bgColor, width, icon, number, text } = this.props;

    const textColor = {
      color: fontColor
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: width
    };
    const iconStyle = {
      color: fontColor
    };

    return (
      <StickerWidgetWrapper className="tavStickerWidget" style={widgetStyle}>
        <div className="tavIconWrapper">
          <i className={icon} style={iconStyle} />
        </div>

        <div className="tavContentWrapper">
          <h3 className="tavStatNumber" style={textColor}>
            {number}
          </h3>
          <span className="tavLabel" style={textColor}>
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}
