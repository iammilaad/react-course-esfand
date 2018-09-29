import React, { Component } from 'react';
import { VCardWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { src, alt, name, title, description, children, style } = this.props;
    return (
      <VCardWidgetWrapper className="ovVCardWidgetWrapper" style={style}>
        <div className="ovVCardImage">
          <img src={src} alt={alt} />
        </div>

        <div className="ovVCardBody">
          <h3 className="ovName">{name}</h3>
          <span className="ovDesgTitle">{title}</span>

          <p className="ovDescription">{description}</p>

          <div className="ovWidgetSocial">{children}</div>
        </div>
      </VCardWidgetWrapper>
    );
  }
}
