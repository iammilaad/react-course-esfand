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
      const {ForgotPasswordStatus} = this.props;
      ForgotPasswordStatus(constants.NOT_SEND);
  }

    componentWillUnmount = () => {
       this.toggleToNotSend();
    };
    resendAgain = () => {
        this.toggleToNotSend();
    };

    handleSubmit = e => {
        const { ForgotPasswordRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ForgotPasswordRequest(values);
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
                                <IntlMessages id="forgot.title" />
                            </Link>
                        </div>

                        {sendStatus === constants.NOT_SEND ? <Fragment>
                                <div className="ovFormHeadText">
                                    <h3>
                                        <IntlMessages id="forgot.title"/>
                                    </h3>
                                    <p>
                                        <IntlMessages id="forgot.description"/>
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
                                                                id: "forgot.email"
                                                            })
                                                        },
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id: "forgot.email"
                                                            })
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        size="large"
                                                        placeholder={this.context.intl.formatMessage({
                                                            id: "forgot.email"
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                        </div>

                                        <div className="ovInputWrapper">
                                            <FormItem>
                                                <Button type="primary" htmlType="submit" loading={loading}>
                                                    <IntlMessages id="forgot.button"/>
                                                </Button>
                                            </FormItem>
                                        </div>
                                        <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                            <Link to="/signin">
                                                <IntlMessages id="forgot.login"/>
                                            </Link>
                                        </div>
                                    </Form>
                                </div>
                            </Fragment> :
                            <Fragment>
                                <div className="ovFormHeadText">
                                    <h3>
                                        <IntlMessages id="forgot.sentTitle"/>
                                    </h3>
                                    <p>
                                        <IntlMessages id="forgot.sentDescription"/>
                                    </p>
                                </div>
                                <div className="ovInputWrapper ovCenterComponent ovHelperWrapper">
                                    <Button type="primary" onClick={this.resendAgain}>
                                        <IntlMessages id="forgot.resendAgain"/>
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
    ForgotPasswordRequest: actions.setForgotPasswordRequest,
    ForgotPasswordStatus: actions.setForgotPasswordStatus
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.FORGOT_PASSWORD_REQUEST, "status"], false),
    sendStatus:state.getIn([constants.FORGOT_PASSWORD,"status"]),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(ForgotPassword)));
