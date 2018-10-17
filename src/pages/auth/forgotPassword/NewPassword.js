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
import {autoDirection} from 'utils/helpers/inputAutoDirection';
import ResendVerify from './resendVerify';
import PersianNumber from 'utils/helpers/persianNumber';

const FormItem = Form.Item;
class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
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
            form.validateFields(['password_confirmation'], { force: true });
        }
        callback();
    };
    handleSubmit = e => {
        const { setNewPasswordRequest, formData } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                setNewPasswordRequest(values, formData.mobile);
            }
        });
    };
    changeNumber = e => {
        const {setViewStatus} = this.props;
        e.preventDefault();
        this.props.form.resetFields();
        setViewStatus(constants.FORGOT_PASSWORD_VIEW);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {formData, loading} = this.props;
        return (
            <Fragment>
                <FormItem>
                        <span>
                            <IntlMessages id="verifyCode.description1" /> &nbsp;
                            <span><PersianNumber>{formData.mobile}</PersianNumber></span>
                            &nbsp;
                            <IntlMessages id="verifyCode.description2" />
                        </span>
                        <span>
                            <a onClick={this.changeNumber}><IntlMessages id="verifyCode.changeNumber" /></a>
                        </span>
                </FormItem>
                <Form onSubmit={this.handleSubmit} className="activation-code-form">
                    <div className="tavInputWrapper">
                        <FormItem>
                            {getFieldDecorator("reset_password_code", {
                                rules: [
                                    {
                                        required: true,
                                        message: this.context.intl.formatMessage({
                                            id: "forgotPassword.verificationCode"
                                        })
                                    }
                                ]
                            })(
                                <Input
                                    autoFocus
                                    onChange={(event) => autoDirection(event, "reset_password_code")}
                                    size="large"
                                    placeholder={this.context.intl.formatMessage({
                                        id: "forgotPassword.verificationCode"
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
                                            id: "forgotPassword.password"
                                        })
                                    },
                                    {
                                        min: 6,
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
                                    onChange={(event) => autoDirection(event, "password")}
                                    size="large"
                                    type="password"
                                    placeholder={this.context.intl.formatMessage({
                                        id: "forgotPassword.password"
                                    })}
                                />
                            )}
                        </FormItem>
                    </div>
                    <div className="tavInputWrapper">
                        <FormItem>
                            {getFieldDecorator("password_confirmation", {
                                rules: [
                                    {
                                        required: true,
                                        message: this.context.intl.formatMessage({
                                            id: "forgotPassword.confirmPassword"
                                        })
                                    },
                                    {
                                        min: 6,
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
                                    type="password"
                                    onChange={(event) => autoDirection(event, "password_confirmation")}
                                    size="large"
                                    placeholder={this.context.intl.formatMessage({
                                        id: "forgotPassword.confirmPassword"
                                    })}
                                />
                            )}
                        </FormItem>
                    </div>
                    <ResendVerify formData={formData}/>
                    <div className="tavInputWrapper">
                        <FormItem>
                            <Button type="primary" block size="large" htmlType="submit" loading={loading}>
                                <IntlMessages id="forgotPassword.newPasswordButton" />
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </Fragment>
        );
    }
}
NewPassword.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    setNewPasswordRequest: actions.setNewPasswordRequest,
    setViewStatus: actions.setViewStatus,
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.FORGOT_PASSWORD, "status"], false),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(NewPassword)));
