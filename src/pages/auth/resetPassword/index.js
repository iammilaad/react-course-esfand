import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import IntlMessages from "components/utility/intlMessages";
import ResetPasswordStyleWrapper from "./style";

export default class extends Component {
  render() {
    return (
      <ResetPasswordStyleWrapper className="ovResetPassPage">
        <div className="ovFormContentWrapper">
          <div className="ovFormContent">
            <div className="ovLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.resetPassTitle" />
              </Link>
            </div>

            <div className="ovFormHeadText">
              <h3>
                <IntlMessages id="page.resetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.resetPassDescription" />
              </p>
            </div>

            <div className="ovResetPassForm">
              <div className="ovInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="New Password"
                />
              </div>

              <div className="ovInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="ovInputWrapper">
                <Button type="primary">
                  <IntlMessages id="page.resetPassSave" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
    );
  }
}
