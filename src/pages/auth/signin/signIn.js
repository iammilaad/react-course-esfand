import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Input from 'components/uielements/input';
import Checkbox from 'components/uielements/checkbox';
import Button from 'components/uielements/button';
import Form from 'components/uielements/form';
import IntlMessages from 'components/utility/intlMessages';
import SignInStyleWrapper from './signIn.style';
import {toJS} from 'utils/higherOrderComponents/toJsHoc';
import * as actions from './actions';
import * as constants from './constants';

const FormItem = Form.Item;
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        }
    };
    handleSubmit = e => {
        const {loginRequest} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                loginRequest(values);
            }
        });

    };
    render() {
        const from = { pathname: '/dashboard' };
        const { getFieldDecorator } = this.props.form;
        const { redirectToReferrer } = this.state;
        const {loading} = this.props;
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <SignInStyleWrapper className="ovSignInPage">
                <div className="ovLoginContentWrapper">
                    <div className="ovLoginContent">
                        <div className="ovLogoWrapper">
                            <Link to="/">
                                <IntlMessages id="signin.title" />
                            </Link>
                        </div>
                        <div className="ovSignInForm">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('identity', {
                                            rules: [{ required: true,
                                                type: 'email',
                                                message: this.context.intl.formatMessage({id: 'signin.identity'}) }],
                                        })(
                                            <Input size="large" placeholder={this.context.intl.formatMessage({id: 'signin.identity'})} />
                                        )}
                                    </FormItem>
                                </div>

                                <div className="ovInputWrapper">
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true,
                                                message: this.context.intl.formatMessage({id: 'signin.password'}) }],
                                        })(
                                            <Input size="large"
                                                   type="password"
                                                   placeholder={this.context.intl.formatMessage({id: 'signin.password'})}
                                            />
                                        )}
                                    </FormItem>
                                </div>

                                <div className="ovInputWrapper ovLeftRightComponent">
                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>
                                                <IntlMessages id="signin.RememberMe" />
                                            </Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            <IntlMessages id="signin.Button" />
                                        </Button>
                                    </FormItem>

                                </div>
                                <div className="ovInputWrapper ovOtherLogin">
                                    <Button type="primary btnGooglePlus">
                                        <IntlMessages id="signin.GooglePlus" />
                                    </Button>
                                </div>
                                <div className="ovCenterComponent ovHelperWrapper">
                                    <Link to="/forgotpassword" className="ovForgotPass">
                                        <IntlMessages id="signin.ForgotPass" />
                                    </Link>
                                    <Link to="/signup">
                                        <IntlMessages id="signin.CreateAccount" />
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
const mapDispatchToProps = ({
    loginRequest: actions.setLoginRequest,
});
const mapStateToProps = state => ({
    loading: state.getIn([constants.LOGIN, 'loading'], false)
});
export default connect(mapStateToProps, mapDispatchToProps)(toJS(Form.create()(SignIn)));
