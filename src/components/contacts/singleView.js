import React, { Component } from "react";
import { ContactCardWrapper } from "./contactCard.style";

export default class extends Component {
  render() {
    const { contact, otherAttributes } = this.props;
    const name = contact.name ? contact.name : "No Name";
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = contact[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="ovContactCardInfos" key={attribute.value}>
            <p className="ovInfoLabel">{`${attribute.title}`}</p>
            <p className="ovInfoDetails">{value}</p>
          </div>
        );
      }
    });
    return (
      <ContactCardWrapper className="ovContactCard">
        <div className="ovContactCardHead">
          <div className="ovPersonImage">
            {contact.avatar ? <img alt="#" src={contact.avatar} /> : ""}
          </div>
          <h1 className="ovPersonName">{name}</h1>
        </div>
        <div className="ovContactInfoWrapper">{extraInfos}</div>
      </ContactCardWrapper>
    );
  }
}
