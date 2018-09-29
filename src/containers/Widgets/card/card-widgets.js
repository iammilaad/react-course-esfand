import React, { Component } from 'react';
import CardWidgetWrapper from './style';

export default class extends Component {
  render() {
    const { icon, iconcolor, number, text } = this.props;
    const iconStyle = {
      color: iconcolor
    };

    return (
      <CardWidgetWrapper className="ovCardWidget">
        <div className="ovIconWrapper">
          <i className={icon} style={iconStyle} />
        </div>

        <div className="ovContentWrapper">
          <h3 className="ovStatNumber">{number}</h3>
          <span className="ovLabel">{text}</span>
        </div>
      </CardWidgetWrapper>
    );
  }
}
