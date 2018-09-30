import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import Form from "components/uielements/form";
import IntlMessages from "components/utility/intlMessages";
import SignUpStyleWrapper from "./signUp.style";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from './actions';
import * as constants from './constants';

const FormItem = Form.Item;
class SignUp extends Component {

    handleSubmit = e => {
        const { registerRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                registerRequest(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        return (
            <SignUpStyleWrapper className="ovSignUpPage">
                <div className="ovSignUpContentWrapper">
                    <div className="ovSignUpContent">
                        <div className="ovLogoWrapper">
                            <Link to="/">
                                <IntlMessages id="signUp.title" />
                            </Link>
                        </div>

                        <div className="ovSignUpForm">
                            <Form onSubmit={this.handleSubmit} className="register-form">
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator("name", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: this.context.intl.formatMessage({
                                                        id: "signUp.name"
                                                    })
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "signUp.name"
                                                })}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator("email", {
                                            rules: [
                                                {
                                                    required: true,
                                                    type: "email",
                                                    message: this.context.intl.formatMessage({
                                                        id: "signUp.email"
                                                    })
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "signUp.email"
                                                })}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator("ssn", {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: this.context.intl.formatMessage({
                                                        id: "signUp.ssn"
                                                    })
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "signUp.ssn"
                                                })}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator("phoneNumber", {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: this.context.intl.formatMessage({
                                                        id: "signUp.phoneNumber"
                                                    })
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "signUp.phoneNumber"
                                                })}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: this.context.intl.formatMessage({
                                                        id: "signUp.password"
                                                    })
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                type="password"
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "signUp.password"
                                                })}
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            <IntlMessages id="signUp.button" />
                                        </Button>
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper ovOtherLogin">
                                    <Button type="primary btnGooglePlus">
                                        <IntlMessages id="signUp.GooglePlus" />
                                    </Button>
                                </div>
                                <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                    <Link to="/signin">
                                        <IntlMessages id="signUp.AlreadyAccount" />
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </SignUpStyleWrapper>
        );
    }
}
SignUp.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    registerRequest: actions.setRegisterRequest
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.REGISTER, "status"], false)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(SignUp)));
