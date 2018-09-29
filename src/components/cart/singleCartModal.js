import React, { Component } from 'react';
import { notification } from '../index';
import TopbarCartWrapper from './singleCartModal.style';

export default class extends Component {
  onChange = value => {
    if (!isNaN(value)) {
      if (value !== this.props.quantity) {
        this.props.changeQuantity(this.props.objectID, value);
      }
    } else {
      notification('error', 'Please give valid number');
    }
  };

  render() {
    const {
      price,
      quantity,
      name,
      image,
      objectID,
      cancelQuantity,
    } = this.props;
    return (
      <TopbarCartWrapper className="ovCartItems">
        <div className="ovItemImage">
          <img alt="#" src={image} />
        </div>
        <div className="ovCartDetails">
          <h3>
            <a >
              {name}
            </a>
          </h3>
          <p className="ovItemPriceQuantity">
            <span>$</span>
            <span>
              {price.toFixed(2)}
            </span>
            <span className="itemMultiplier">X</span>
            <span className="ovItemQuantity">
              {quantity}
            </span>
          </p>
        </div>
        <a className="ovItemRemove" onClick={() => cancelQuantity(objectID)}>
          <i className="ion-android-close" />
        </a>
      </TopbarCartWrapper>
    );
  }
}
