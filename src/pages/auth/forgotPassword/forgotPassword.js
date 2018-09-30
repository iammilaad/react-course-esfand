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

const FormItem = Form.Item;
class ForgotPassword extends Component {

  toggleToNotSend = () => {
      const {forgotPasswordStatus} = this.props;
      forgotPasswordStatus(constants.NOT_SEND);
  }

    componentWillUnmount = () => {
       this.toggleToNotSend();
    };
    resendAgain = () => {
        this.toggleToNotSend();
    };

    handleSubmit = e => {
        const { forgotPasswordRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                forgotPasswordRequest(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading, sendStatus} = this.props;
        console.log("milad",sendStatus)
        return (
            <ForgotPasswordStyleWrapper className="ovForgotPassPage">
                <div className="ovFormContentWrapper">
                    <div className="ovFormContent">
                        <div className="ovLogoWrapper">
                            <Link to="/dashboard">
                                <IntlMessages id="forgotPassword.title" />
                            </Link>
                        </div>

                        {sendStatus === constants.NOT_SEND ? <Fragment>
                                <div className="ovFormHeadText">
                                    <h3>
                                        <IntlMessages id="forgotPassword.title"/>
                                    </h3>
                                    <p>
                                        <IntlMessages id="forgotPassword.description"/>
                                    </p>
                                </div>
                                <div className="ovForgotPassForm">
                                    <Form onSubmit={this.handleSubmit} className="forgot-form">
                                        <div className="ovInputWrapper">
                                            <FormItem>
                                                {getFieldDecorator("email", {
                                                    rules: [
                                                        {
                                                            type: "email",
                                                            message: this.context.intl.formatMessage({
                                                                id: "forgotPassword.email"
                                                            })
                                                        },
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id: "forgotPassword.email"
                                                            })
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        size="large"
                                                        placeholder={this.context.intl.formatMessage({
                                                            id: "forgotPassword.email"
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                        </div>

                                        <div className="ovInputWrapper">
                                            <FormItem>
                                                <Button type="primary" htmlType="submit" loading={loading}>
                                                    <IntlMessages id="forgotPassword.button"/>
                                                </Button>
                                            </FormItem>
                                        </div>
                                        <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                            <Link to="/signin">
                                                <IntlMessages id="forgotPassword.login"/>
                                            </Link>
                                        </div>
                                    </Form>
                                </div>
                            </Fragment> :
                            <Fragment>
                                <div className="ovFormHeadText">
                                    <h3>
                                        <IntlMessages id="forgotPassword.sentTitle"/>
                                    </h3>
                                    <p>
                                        <IntlMessages id="forgotPassword.sentDescription"/>
                                    </p>
                                </div>
                                <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                    <Button type="primary" onClick={this.resendAgain}>
                                        <IntlMessages id="forgotPassword.resendAgain"/>
                                    </Button>
                                </div>
                            </Fragment>
                        }
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
    forgotPasswordStatus: actions.setForgotPasswordStatus
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.FORGOT_PASSWORD_REQUEST, "status"], false),
    sendStatus:state.getIn([constants.FORGOT_PASSWORD,"sendStatus"]),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(ForgotPassword)));
