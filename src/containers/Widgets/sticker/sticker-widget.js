import React, { Component } from 'react';
import { StickerWidgetWrapper } from './style';

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
      <StickerWidgetWrapper className="ovStickerWidget" style={widgetStyle}>
        <div className="ovIconWrapper">
          <i className={icon} style={iconStyle} />
        </div>

        <div className="ovContentWrapper">
          <h3 className="ovStatNumber" style={textColor}>
            {number}
          </h3>
          <span className="ovLabel" style={textColor}>
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}
