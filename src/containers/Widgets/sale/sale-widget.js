import React, { Component } from "react";
import { SaleWidgetWrapper } from "./style";

export default class extends Component {
  render() {
    const { fontColor, label, price, details } = this.props;

    const textColor = {
      color: fontColor
    };

    return (
      <SaleWidgetWrapper className="tavSaleWidget">
        <h3 className="tavSaleLabel">{label}</h3>
        <span className="tavSalePrice" style={textColor}>
          {price}
        </span>
        <p className="tavSaleDetails">{details}</p>
      </SaleWidgetWrapper>
    );
  }
}
