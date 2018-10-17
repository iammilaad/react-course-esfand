import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "components/uielements/form";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import IntlMessages from "components/utility/intlMessages";
import { connect } from "react-redux";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from './actions';
import * as constants from './constants';
import * as signupActions from 'pages/auth/signup/actions';
import * as signupConstants from 'pages/auth/signup/constants';
import {autoDirection} from 'utils/helpers/inputAutoDirection';
import ResendVerify from '../forgotPassword/resendVerify';
import PersianNumber from 'utils/helpers/persianNumber';
import * as userConstants from 'utils/globalRedux/user/constants';
import * as tokenConstants from 'utils/globalRedux/token/constants';

const FormItem = Form.Item;
class VerifyCode extends Component {
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

    activationHandleSubmit = e => {
        const { activationCodeRequest, formData } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                activationCodeRequest(values, formData);
            }
        });
    };
    changeNumber = e => {
        const {setViewStatus} = this.props;
        e.preventDefault();
        this.props.form.resetFields();
        setViewStatus(signupConstants.REGISTRATION_VIEW);
    };

    render() {
        const { redirectIfLoggedIn } = this.state;

        if (redirectIfLoggedIn) {
            this.props.history.push('/dashboard')
        }
        const { getFieldDecorator } = this.props.form;
        const {formData} = this.props;
        const {loading} = this.props;
        return (
            <Fragment>
                <FormItem>
                    <div className="tavFormHeadText">
                        <span>
                            <IntlMessages id="verifyCode.description1" /> &nbsp;
                            <span><PersianNumber>{formData.mobile}</PersianNumber></span>
                            &nbsp;
                            <IntlMessages id="verifyCode.description2" />
                        </span>
                        <span>
                            <a onClick={this.changeNumber}><IntlMessages id="verifyCode.changeNumber" /></a>
                        </span>
                    </div>
                </FormItem>
                <Form onSubmit={this.activationHandleSubmit} className="activation-code-form">
                    <div className="tavInputWrapper">
                        <FormItem>
                            {getFieldDecorator("verification_code", {
                                rules: [
                                    {
                                        required: true,
                                        message: this.context.intl.formatMessage({
                                            id: "verifyCode.verificationCode"
                                        })
                                    }
                                ]
                            })(
                                <Input
                                    autoFocus
                                    onChange={(event) => autoDirection(event, "verification_code")}
                                    size="large"
                                    placeholder={this.context.intl.formatMessage({
                                        id: "verifyCode.verificationCode"
                                    })}
                                />
                            )}
                        </FormItem>
                    </div>
                    <ResendVerify formData={formData}/>
                    <div className="tavInputWrapper">
                        <FormItem>
                            <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                <IntlMessages id="verifyCode.verifyMobileButton" />
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </Fragment>
        );
    }
}
VerifyCode.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    activationCodeRequest: actions.setActivationCodeRequest,
    setViewStatus: signupActions.setViewStatus,
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.VERIFY_CODE, "status"], false),
    isLoggedIn:
    state.getIn([tokenConstants.TOKEN,"access_token"], null) &&
    state.getIn([userConstants.USER, "mobile_verified_at"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(VerifyCode)));
