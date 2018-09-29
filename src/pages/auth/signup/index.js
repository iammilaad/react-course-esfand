import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from 'components/uielements/input';
import Button from 'components/uielements/button';
import Form from 'components/uielements/form';
import IntlMessages from 'components/utility/intlMessages';
import SignUpStyleWrapper from './style';
import {toJS} from 'utils/higherOrderComponents/toJsHoc';


const FormItem = Form.Item;
class SignUp extends Component {
    state = {
        redirectToReferrer: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <SignUpStyleWrapper className="ovSignUpPage">
                <div className="ovSignUpContentWrapper">
                    <div className="ovSignUpContent">
                        <div className="ovLogoWrapper">
                            <Link to="/">
                                <IntlMessages id="signup.title" />
                            </Link>
                        </div>

                        <div className="ovSignUpForm">
                            <Form onSubmit={this.handleSubmit} className="register-form">
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true,
                                                message: this.context.intl.formatMessage({id: 'signup.name'}) }],
                                        })(
                                            <Input size="large" placeholder={this.context.intl.formatMessage({id: 'signup.name'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true,
                                                type: 'email',
                                                message: this.context.intl.formatMessage({id: 'signup.email'}) }],
                                        })(
                                            <Input size="large" placeholder={this.context.intl.formatMessage({id: 'signup.email'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('ssn', {
                                            rules: [{ required: false,
                                                message: this.context.intl.formatMessage({id: 'signup.ssn'}) }],
                                        })(
                                            <Input size="large" placeholder={this.context.intl.formatMessage({id: 'signup.ssn'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('phoneNumber', {
                                            rules: [{ required: false,
                                                message: this.context.intl.formatMessage({id: 'signup.phoneNumber'}) }],
                                        })(
                                            <Input size="large" placeholder={this.context.intl.formatMessage({id: 'signup.phoneNumber'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true,
                                                message: this.context.intl.formatMessage({id: 'signup.password'}) }],
                                        })(
                                            <Input size="large" type="password" placeholder={this.context.intl.formatMessage({id: 'signup.password'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            <IntlMessages id="signup.button" />
                                        </Button>
                                    </FormItem>
                                </div>
                                <div className="ovInputWrapper ovOtherLogin">
                                    <Button type="primary btnGooglePlus">
                                        <IntlMessages id="signup.GooglePlus" />
                                    </Button>
                                </div>
                                <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                    <Link to="/signin">
                                        <IntlMessages id="signup.AlreadyAccount" />
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
const mapDispatchToProps = ({
});
const mapStateToProps = state => ({
});
export default connect(null, null)(toJS(Form.create()(SignUp)));
