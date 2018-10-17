import React, { Component } from "react";
import { VCardWidgetWrapper } from "./style";

export default class extends Component {
  render() {
    const { src, alt, name, title, description, children, style } = this.props;
    return (
      <VCardWidgetWrapper className="tavVCardWidgetWrapper" style={style}>
        <div className="tavVCardImage">
          <img src={src} alt={alt} />
        </div>

        <div className="tavVCardBody">
          <h3 className="tavName">{name}</h3>
          <span className="tavDesgTitle">{title}</span>

          <p className="tavDescription">{description}</p>

          <div className="tavWidgetSocial">{children}</div>
        </div>
      </VCardWidgetWrapper>
    );
  }
}
