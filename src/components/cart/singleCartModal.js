import React, { Component } from "react";
import { notification } from "../index";
import TopbarCartWrapper from "./singleCartModal.style";

export default class extends Component {
  onChange = value => {
    if (!isNaN(value)) {
      if (value !== this.props.quantity) {
        this.props.changeQuantity(this.props.objectID, value);
      }
    } else {
      notification("error", "Please give valid number");
    }
  };

  render() {
    const {
      price,
      quantity,
      name,
      image,
      objectID,
      cancelQuantity
    } = this.props;
    return (
      <TopbarCartWrapper className="tavCartItems">
        <div className="tavItemImage">
          <img alt="#" src={image} />
        </div>
        <div className="tavCartDetails">
          <h3>
            <a>{name}</a>
          </h3>
          <p className="tavItemPriceQuantity">
            <span>$</span>
            <span>{price.toFixed(2)}</span>
            <span className="itemMultiplier">X</span>
            <span className="tavItemQuantity">{quantity}</span>
          </p>
        </div>
        <a className="tavItemRemove" onClick={() => cancelQuantity(objectID)}>
          <i className="ion-android-close" />
        </a>
      </TopbarCartWrapper>
    );
  }
}
