import React, { Component, Fragment } from "react";
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
import * as tokenConstants from "utils/globalRedux/token/constants";
import VerifyCode from '../verifyCode/verifyCode'
import {autoDirection} from '../../../utils/helpers/inputAutoDirection';


const FormItem = Form.Item;
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData : {},
            redirectIfLoggedIn: false,
            ...props,
        }
    }
    componentWillUnmount = () => {
        const {setViewStatus} = this.props;
        setViewStatus(constants.LOGIN_VIEW);
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
            this.setState({formData : values}); // for resendVerify
        }
    });
};
    loginView = () => {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="tavInputWrapper">
                    <FormItem>
                        {getFieldDecorator("mobile", {
                            rules: [
                                {
                                    required: true,
                                    message: this.context.intl.formatMessage({
                                        id: "signIn.mobile"
                                    })
                                }
                            ]
                        })(
                            <Input
                                onChange={(event) => autoDirection(event, "mobile")}
                                size="large"
                                placeholder={this.context.intl.formatMessage({
                                    id: "signIn.mobile"
                                })}
                            />
                        )}
                    </FormItem>
                </div>

                <div className="tavInputWrapper">
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
                                onChange={(event) => autoDirection(event, "password")}
                                size="large"
                                type="password"
                                placeholder={this.context.intl.formatMessage({
                                    id: "signIn.password"
                                })}
                            />
                        )}
                    </FormItem>
                </div>

                <div className="tavInputWrapper">
                    <FormItem>
                        <Button type="primary" size="large" block htmlType="submit" loading={loading}>
                            <IntlMessages id="signIn.Button" />
                        </Button>
                    </FormItem>
                </div>
                <div className="tavCenterComponent tavHelperWrapper">
                    <Link to="/forgot-password" className="tavForgotPass">
                        <IntlMessages id="signIn.ForgotPass" />
                    </Link>
                    <Link to="/signup">
                        <IntlMessages id="signIn.CreateAccount" />
                    </Link>
                </div>
            </Form>
        )
    }

    activationView = () => {
        return (
            <VerifyCode formData={this.state.formData} history={this.props.history}/>
        )
    };
    renderFarm = () => {
        const {viewStatus} = this.props;
        if(viewStatus === constants.LOGIN_VIEW) {
            return (
                <Fragment>
                    {this.loginView()}
                </Fragment>
            )
        } else if (viewStatus === constants.ACTIVATION_VIEW) {
            return (
                <Fragment>
                    {this.activationView()}
                </Fragment>
            )
        }
    }


render() {
    const { redirectIfLoggedIn } = this.state;

    if (redirectIfLoggedIn) {
        this.props.history.push('/dashboard')
    }
    return (
        <SignInStyleWrapper className="tavSignInPage">
            <div className="tavLoginContentWrapper">
                <div className="tavLoginContent">
                    <div className="tavLogoWrapper">
                        <Link to="/">
                            <img src="/images/logo.png" style={{ width: '100px'}}/>
                        </Link>
                    </div>
                    <div className="tavSignInForm">
                        {this.renderFarm()}
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
    loginRequest: actions.setLoginRequest,
    setViewStatus: actions.setViewStatus,
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.LOGIN, "status"], false),
    viewStatus: state.getIn([constants.LOGIN, "viewStatus"]),
    isLoggedIn:
    state.getIn([tokenConstants.TOKEN,"access_token"], null) &&
    state.getIn([userConstants.USER, "mobile_verified_at"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(SignIn)));
