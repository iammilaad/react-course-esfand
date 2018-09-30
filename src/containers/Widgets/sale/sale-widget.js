import React, { Component } from "react";
import { SaleWidgetWrapper } from "./style";

export default class extends Component {
  render() {
    const { fontColor, label, price, details } = this.props;

    const textColor = {
      color: fontColor
    };

    return (
      <SaleWidgetWrapper className="ovSaleWidget">
        <h3 className="ovSaleLabel">{label}</h3>
        <span className="ovSalePrice" style={textColor}>
          {price}
        </span>
        <p className="ovSaleDetails">{details}</p>
      </SaleWidgetWrapper>
    );
  }
}
