import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import Form from "components/uielements/form";
import IntlMessages from "components/utility/intlMessages";
import SignInStyleWrapper from "./signIn.style";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from "./actions";
import * as constants from "./constants";
import * as userConstants from "utils/globalRedux/user/constants";

const FormItem = Form.Item;
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectIfLoggedIn: false,
            ...props,
        }
    }
    static getDerivedStateFromProps = nextProps => {
        if (nextProps.isLoggedIn === true) {
            return {
                redirectIfLoggedIn: true
            };
        }
        return {
          redirectIfLoggedIn: false
        };
    }

handleSubmit = e => {
    const { loginRequest } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
            loginRequest(values);
        }
    });
};
render() {
    const { redirectIfLoggedIn } = this.state;

    if (redirectIfLoggedIn) {
        this.props.history.push('/dashboard')
    }
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
        <SignInStyleWrapper className="ovSignInPage">
            <div className="ovLoginContentWrapper">
                <div className="ovLoginContent">
                    <div className="ovLogoWrapper">
                        <Link to="/">
                            <img src="/images/logo.png" style={{ width: '100px'}}/>
                        </Link>
                    </div>
                    <div className="ovSignInForm">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="ovInputWrapper">
                                <FormItem>
                                    {getFieldDecorator("identity", {
                                        rules: [
                                            {
                                                required: true,
                                                type: "email",
                                                message: this.context.intl.formatMessage({
                                                    id: "signIn.identity"
                                                })
                                            }
                                        ]
                                    })(
                                        <Input
                                            size="large"
                                            placeholder={this.context.intl.formatMessage({
                                                id: "signIn.identity"
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
                                                    id: "signIn.password"
                                                })
                                            }
                                        ]
                                    })(
                                        <Input
                                            size="large"
                                            type="password"
                                            placeholder={this.context.intl.formatMessage({
                                                id: "signIn.password"
                                            })}
                                        />
                                    )}
                                </FormItem>
                            </div>

                            <div className="ovInputWrapper ovLeftRightComponent">
                                <FormItem>

                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        <IntlMessages id="signIn.Button" />
                                    </Button>
                                </FormItem>
                            </div>
                            <div className="ovInputWrapper ovOtherLogin">
                                <Button type="primary btnGooglePlus">
                                    <IntlMessages id="signIn.GooglePlus" />
                                </Button>
                            </div>
                            <div className="ovCenterComponent ovHelperWrapper">
                                <Link to="/forgot-password" className="ovForgotPass">
                                    <IntlMessages id="signIn.ForgotPass" />
                                </Link>
                                <Link to="/signup">
                                    <IntlMessages id="signIn.CreateAccount" />
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </SignInStyleWrapper>
    );
}
}
SignIn.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    loginRequest: actions.setLoginRequest
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.LOGIN, "status"], false),
    isLoggedIn: state.getIn([userConstants.USER,"token"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(SignIn)));
