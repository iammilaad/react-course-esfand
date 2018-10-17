import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import Form from "components/uielements/form";
import {autoDirection} from "utils/helpers/inputAutoDirection";
import IntlMessages from "components/utility/intlMessages";
import SignUpStyleWrapper from "./signUp.style";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from './actions';
import * as constants from './constants';
import * as userConstants from "utils/globalRedux/user/constants";
import * as tokenConstants from "utils/globalRedux/token/constants";
import VerifyCode from '../verifyCode/verifyCode'

const FormItem = Form.Item;
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData : {},
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

    componentWillUnmount = () => {
        const {setViewStatus} = this.props;
        setViewStatus(constants.REGISTRATION_VIEW);
    }

    registrationHandleSubmit = e => {
        const { registerRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                registerRequest(values);
                this.setState({formData : values}); // for resendVerify
            }
        });
    };

    registrationView = () => {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        return (
            <Form onSubmit={this.registrationHandleSubmit} className="register-form">
                <div className="tavInputWrapper">
                    <FormItem>
                        {getFieldDecorator("mobile", {
                            rules: [
                                {
                                    required: true,
                                    message: this.context.intl.formatMessage({
                                        id: "signUp.mobile"
                                    })
                                }
                            ]
                        })(
                            <Input
                                onChange={(event) => autoDirection(event, "mobile")}
                                size="large"
                                placeholder={this.context.intl.formatMessage({
                                    id: "signUp.mobile"
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
                                        id: "signUp.password"
                                    })
                                },
                                {
                                    min: 6,
                                    message: this.context.intl.formatMessage({
                                        id: "signUp.minCharPassword"
                                    })
                                }
                            ]
                        })(
                            <Input
                                onChange={(event) => autoDirection(event, "password")}
                                size="large"
                                type="password"
                                placeholder={this.context.intl.formatMessage({
                                    id: "signUp.password"
                                })}
                            />
                        )}
                    </FormItem>
                </div>
                <div className="tavInputWrapper">
                    <FormItem>
                        <Button type="primary" size="large" htmlType="submit" loading={loading}>
                            <IntlMessages id="signUp.button" />
                        </Button>
                    </FormItem>
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
        if(viewStatus === constants.REGISTRATION_VIEW) {
            return (
                <Fragment>
                    {this.registrationView()}
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
            <SignUpStyleWrapper className="tavSignUpPage">
                <div className="tavSignUpContentWrapper">
                    <div className="tavSignUpContent">
                        <div className="tavLogoWrapper">
                            <Link to="/">
                                <img src="/images/logo.png" style={{ width: '100px'}}/>
                            </Link>
                        </div>

                        <div className="tavSignUpForm">
                            {this.renderFarm()}
                        </div>
                        <div className="tavCenterComponent tavHelperWrapper">
                            <Link to="/signin">
                                <IntlMessages id="signUp.AlreadyAccount" />
                            </Link>
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
    registerRequest: actions.setRegisterRequest,
    setViewStatus: actions.setViewStatus,

};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.REGISTER, "status"], false),
    viewStatus: state.getIn([constants.REGISTER, "viewStatus"]),
    isLoggedIn:
    state.getIn([tokenConstants.TOKEN,"access_token"], null) &&
    state.getIn([userConstants.USER, "mobile_verified_at"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(SignUp)));
