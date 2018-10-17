import React, { Component } from "react";
import InputNumber from "../uielements/InputNumber";
import { notification } from "../index";

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
      image,
      name,
      description,
      objectID,
      cancelQuantity
    } = this.props;
    const totalPrice = (price * quantity).toFixed(2);
    return (
      <tr>
        <td
          className="tavItemRemove"
          onClick={() => {
            cancelQuantity(objectID);
          }}
        >
          <a>
            <i className="ion-android-close" />
          </a>
        </td>
        <td className="tavItemImage">
          <img alt="#" src={image} />
        </td>
        <td className="tavItemName">
          <h3>{name}</h3>
          <p>{description}</p>
        </td>
        <td className="tavItemPrice">
          <span className="itemPricePrefix">$</span>
          {price.toFixed(2)}
        </td>
        <td className="tavItemQuantity">
          <InputNumber
            min={1}
            max={1000}
            value={quantity}
            step={1}
            onChange={this.onChange}
          />
        </td>
        <td className="tavItemPriceTotal">${totalPrice}</td>
      </tr>
    );
  }
}
