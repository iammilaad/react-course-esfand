import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "components/uielements/form";
import Input from "components/uielements/input";
import Button from "components/uielements/button";
import IntlMessages from "components/utility/intlMessages";
import ForgotPasswordStyleWrapper from "./forgotPassword.style";
import { connect } from "react-redux";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from './actions';
import * as constants from './constants';
import * as userConstants from "utils/globalRedux/user/constants";
import * as tokenConstants from 'utils/globalRedux/token/constants';
import {autoDirection} from 'utils/helpers/inputAutoDirection';
import NewPassword from './NewPassword';

const FormItem = Form.Item;
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
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

    resetView = () => {
        const {setViewStatus} = this.props;
        setViewStatus(constants.FORGOT_PASSWORD_VIEW);
    }

    componentWillUnmount = () => {
        this.resetView();
    };

    handleSubmit = e => {
        const { forgotPasswordRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                forgotPasswordRequest(values);
                this.setState({formData: values});
            }
        });
    };

    renderFarm = () => {
        const {viewStatus} = this.props;
        if(viewStatus === constants.FORGOT_PASSWORD_VIEW) {
            return this.forgotPasswordView();
        } else if (viewStatus === constants.NEW_PASSWORD_VIEW) {
            return <NewPassword formData={this.state.formData}/>
        }
    };

    forgotPasswordView = () => {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        return (
            <Fragment>
                <div className="tavFormHeadText">
                    <h3>
                        <IntlMessages id="forgotPassword.title"/>
                    </h3>
                    <p>
                        <IntlMessages id="forgotPassword.description"/>
                    </p>
                </div>
                <div className="tavForgotPassForm">
                    <Form onSubmit={this.handleSubmit} className="forgot-form">
                        <div className="tavInputWrapper">
                            <FormItem>
                                {getFieldDecorator("mobile", {
                                    rules: [
                                        {
                                            message: this.context.intl.formatMessage({
                                                id: "forgotPassword.mobile"
                                            })
                                        },
                                        {
                                            required: true,
                                            message: this.context.intl.formatMessage({
                                                id: "forgotPassword.mobile"
                                            })
                                        }
                                    ]
                                })(
                                    <Input
                                        onChange={(event) => autoDirection(event, "mobile")}
                                        size="large"
                                        placeholder={this.context.intl.formatMessage({
                                            id: "forgotPassword.mobile"
                                        })}
                                    />
                                )}
                            </FormItem>
                        </div>

                        <div className="tavInputWrapper">
                            <FormItem>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    <IntlMessages id="forgotPassword.button"/>
                                </Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </Fragment>
        )
    }

    render() {
        const { redirectIfLoggedIn } = this.state;

        if (redirectIfLoggedIn) {
            this.props.history.push('/dashboard')
        }
        return (
            <ForgotPasswordStyleWrapper className="tavForgotPassPage">
                <div className="tavFormContentWrapper">
                    <div className="tavFormContent">
                        <div className="tavLogoWrapper">
                            <Link to="/">
                                <img src="/images/logo.png" style={{ width: '100px'}}/>
                            </Link>
                        </div>
                        {this.renderFarm()}
                        <div className="tavInputWrapper tavCenterComponent tavHelperWrapper">
                            <Link to="/signin">
                                <IntlMessages id="forgotPassword.login"/>
                            </Link>
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
const mapDispatchToProps = {
    forgotPasswordRequest: actions.setForgotPasswordRequest,
    setViewStatus: actions.setViewStatus
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.FORGOT_PASSWORD_REQUEST, "status"], false),
    viewStatus:state.getIn([constants.FORGOT_PASSWORD,"viewStatus"]),
    isLoggedIn:
    state.getIn([tokenConstants.TOKEN,"access_token"], null) &&
    state.getIn([userConstants.USER, "mobile_verified_at"], null) !== null,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(ForgotPassword)));
