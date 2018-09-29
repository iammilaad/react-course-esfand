import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IntlMessages from 'components/utility/intlMessages';
import FiveZeroZeroStyleWrapper from './500.style';

export default class extends Component {
  render() {
    return (
      <FiveZeroZeroStyleWrapper className="ov500Page">
        <div className="ov500Content">
          <h1>
            <IntlMessages id="page500.title" />
          </h1>
          <h3>
            <IntlMessages id="page500.subTitle" />
          </h3>
          <p>
            <IntlMessages id="page500.description" />
          </p>
          <button type="button">
            <Link to="/dashboard">
              <IntlMessages id="page500.backButton" />
            </Link>
          </button>
        </div>

        <div className="ov500Artwork">
          <img alt="#" src="/images/rob.png" />
        </div>
      </FiveZeroZeroStyleWrapper>
    );
  }
}
