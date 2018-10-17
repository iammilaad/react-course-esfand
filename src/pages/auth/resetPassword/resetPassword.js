import React, {Component, Fragment} from "react";
import {toJS} from 'utils/higherOrderComponents/toJsHoc';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import query from "query-string";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import Form from 'components/uielements/form';
import Spin from 'components/uielements/spin';
import IntlMessages from "components/utility/intlMessages";
import ResetPasswordStyleWrapper from "./resetPassword.style";
import * as constants from './constants';
import * as actions from './actions';
import * as userConstants from "utils/globalRedux/user/constants";
import * as tokenConstants from 'utils/globalRedux/token/constants';

const FormItem = Form.Item;



class resetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
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

    componentDidMount = () => {
        const {getCheckTokenRequest} = this.props;
        const queryString = query.parse(window.location.search);
        const {token} = queryString;
        if(token !== undefined) {
            getCheckTokenRequest(token);
        } else {
            this.props.history.push('/forgot-password');
        }
    }

    componentWillUnmount = () => {
        const {resetPasswordStatus, resetPasswordTokenCheck} = this.props;
        resetPasswordStatus(constants.NOT_RESETED);
        resetPasswordTokenCheck(constants.TOKEN_NOT_CHECKED);
    };
    handleSubmit = e => {
        const { resetPasswordRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                resetPasswordRequest(values);
            }
        });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback( <IntlMessages id="resetPassword.inconsistentPasswords" />);
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['passwordConfirm'], { force: true });
        }
        callback();
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    HandleCheckToken = () => {
        const {tokenStatus} = this.props;
        if (tokenStatus === constants.TOKEN_NOT_CHECKED) {
            return (
                <Spin size="large" tip={<IntlMessages id="loading"/>}/>
            )
        } else if(tokenStatus === constants.TOKEN_CHECKED) {
            return (
                <Fragment>
                    {this.handleReseted()}
                </Fragment>
            )
        } else if(tokenStatus === constants.TOKEN_EXPIRED) {
            return (
                <Fragment>
                    <div className="tavFormHeadText tavCenterComponent">
                        <p>
                            <IntlMessages id="resetPassword.tokenExpired" />
                        </p>
                    </div>
                    <div className="tavInputWrapper tavCenterComponent tavHelperWrapper">
                        <Link to="/forgot-password">
                            <IntlMessages id="forgot.title"/>
                        </Link>
                    </div>
                </Fragment>
            )
        }
    }

    handleReseted = () => {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        const {resetStatus} = this.props;
        if(resetStatus === constants.NOT_RESETED) {
            return (
                <Fragment>
                    <div className="tavFormHeadText">
                        <p>
                            <IntlMessages id="resetPassword.description" />
                        </p>
                    </div>

                    <div className="tavResetPassForm">
                        <Form onSubmit={this.handleSubmit} className="forgot-form">
                            <div className="tavInputWrapper">
                                <FormItem>
                                    {getFieldDecorator("password", {
                                        rules: [
                                            {
                                                required: true,
                                                message: this.context.intl.formatMessage({
                                                    id: "resetPassword.password"
                                                })
                                            },
                                            {
                                                min: 8,
                                                message: this.context.intl.formatMessage({
                                                    id: "resetPassword.minLimitChar"
                                                })
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            }
                                        ]
                                    })(
                                        <Input
                                            size="large"
                                            type="password"
                                            placeholder={this.context.intl.formatMessage({
                                                id: "resetPassword.password"
                                            })}
                                        />
                                    )}
                                </FormItem>
                            </div>

                            <div className="tavInputWrapper">
                                <FormItem>
                                    {getFieldDecorator("confirmPassword", {
                                        rules: [
                                            {
                                                required: true,
                                                message: this.context.intl.formatMessage({
                                                    id: "resetPassword.confirmPassword"
                                                })
                                            },
                                            {
                                                min: 8,
                                                message: this.context.intl.formatMessage({
                                                    id: "resetPassword.minLimitChar"
                                                })
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            }
                                        ]
                                    })(
                                        <Input
                                            size="large"
                                            type="password"
                                            onBlur={this.handleConfirmBlur}
                                            placeholder={this.context.intl.formatMessage({
                                                id: "resetPassword.confirmPassword"
                                            })}
                                        />
                                    )}
                                </FormItem>
                            </div>

                            <div className="tavInputWrapper">
                                <FormItem>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        <IntlMessages id="resetPassword.button" />
                                    </Button>
                                </FormItem>
                            </div>
                        </Form>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="tavFormHeadText">
                        <p>
                            <IntlMessages id="resetPassword.resetedDone" />
                        </p>
                    </div>
                    <div className="tavInputWrapper ovCenterComponent tavHelperWrapper">
                        <Link to="/signin">
                            <IntlMessages id="signin.title"/>
                        </Link>
                    </div>
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
            <ResetPasswordStyleWrapper className="tavResetPassPage">
                <div className="tavFormContentWrapper">
                    <div className="tavFormContent">
                        <div className="tavLogoWrapper">
                            <Link to="/">
                                <img src="/images/logo.png" style={{ width: '100px'}}/>
                            </Link>
                        </div>
                        {this.HandleCheckToken()}
                    </div>
                </div>
            </ResetPasswordStyleWrapper>
        );
    }
}
resetPassword.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    getCheckTokenRequest: actions.getCheckTokenRequest,
    resetPasswordRequest: actions.setResetPasswordRequest,
    resetPasswordStatus: actions.setResetPasswordStatus,
    resetPasswordTokenCheck: actions.setResetPasswordTokenCheck,
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.RESET_PASSWORD, "status"], false),
    tokenStatus:state.getIn([constants.RESET_PASSWORD,"tokenStatus"]),
    resetStatus:state.getIn([constants.RESET_PASSWORD,"status"]),
    isLoggedIn:
    state.getIn([tokenConstants.TOKEN,"access_token"], null) &&
    state.getIn([userConstants.USER, "mobile_verified_at"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(resetPassword)));
