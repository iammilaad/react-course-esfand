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
          <div className="tavContactCardInfos" key={attribute.value}>
            <p className="tavInfoLabel">{`${attribute.title}`}</p>
            <p className="tavInfoDetails">{value}</p>
          </div>
        );
      }
    });
    return (
      <ContactCardWrapper className="tavContactCard">
        <div className="tavContactCardHead">
          <div className="tavPersonImage">
            {contact.avatar ? <img alt="#" src={contact.avatar} /> : ""}
          </div>
          <h1 className="tavPersonName">{name}</h1>
        </div>
        <div className="tavContactInfoWrapper">{extraInfos}</div>
      </ContactCardWrapper>
    );
  }
}
