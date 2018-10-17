import React, { Component } from "react";
import { Link } from "react-router-dom";

import IntlMessages from "components/utility/intlMessages";
import FourZeroFourStyleWrapper from "./404.style";

export default class extends Component {
  render() {
    return (
      <FourZeroFourStyleWrapper className="tav404Page">
        <div className="tav404Content">
          <h1>
            <IntlMessages id="page404.title" />
          </h1>
          <h3>
            <IntlMessages id="page404.subTitle" />
          </h3>
          <p>
            <IntlMessages id="page404.description" />
          </p>
          <button type="button">
            <Link to="/dashboard">
              <IntlMessages id="page404.backButton" />
            </Link>
          </button>
        </div>

        <div className="tav404Artwork">
          <img alt="#" src="/images/rob.png" />
        </div>
      </FourZeroFourStyleWrapper>
    );
  }
}
