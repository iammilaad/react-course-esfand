import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "components/uielements/form";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import IntlMessages from "components/utility/intlMessages";
import ForgotPasswordStyleWrapper from "./style";
import { connect } from "react-redux";
import { toJS } from "utils/higherOrderComponents/toJsHoc";

const FormItem = Form.Item;
class ForgotPassword extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ForgotPasswordStyleWrapper className="ovForgotPassPage">
        <div className="ovFormContentWrapper">
          <div className="ovFormContent">
            <div className="ovLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="forgot.title" />
              </Link>
            </div>

            <div className="ovFormHeadText">
              <h3>
                <IntlMessages id="forgot.title" />
              </h3>
              <p>
                <IntlMessages id="forgot.description" />
              </p>
            </div>

            <div className="ovForgotPassForm">
              <Form onSubmit={this.handleSubmit} className="forgot-form">
                <div className="ovInputWrapper">
                  <FormItem>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: this.context.intl.formatMessage({
                            id: "forgot.email"
                          })
                        },
                        {
                          required: true,
                          message: this.context.intl.formatMessage({
                            id: "forgot.email"
                          })
                        }
                      ]
                    })(
                      <Input
                        size="large"
                        placeholder={this.context.intl.formatMessage({
                          id: "forgot.email"
                        })}
                      />
                    )}
                  </FormItem>
                </div>

                <div className="ovInputWrapper">
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      <IntlMessages id="forgot.button" />
                    </Button>
                  </FormItem>
                </div>
                <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                  <Link to="/signin">
                    <IntlMessages id="forgot.login" />
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    );
  }
}
ForgotPassword.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {};
const mapStateToProps = state => ({});
export default connect(
  null,
  null
)(toJS(Form.create()(ForgotPassword)));
