import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IntlMessages from "components/utility/intlMessages";
import Form from "components/uielements/form";
import Countdown from 'react-countdown-now';
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import * as actions from './actions';
import * as constants from './constants';
import {mstoSecond} from 'utils/helpers/msToSecond';
import PersianNumber from "utils/helpers/persianNumber";

const FormItem = Form.Item;
class ResendVerify extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate = nextProps => {
        if(this.props === nextProps)
            return false;
        return true

    }
    resendVerify = e => {
        e.preventDefault();
        const {setForgotPasswordRequest , formData} = this.props;
        setForgotPasswordRequest(formData.mobile);
    }

    completedTimer = () => {
        return (
            <FormItem>
                <div className="tavCenterComponent">
                    <a onClick={this.resendVerify}><IntlMessages id="verifyCode.resendVerify" /></a>
                </div>
            </FormItem>
        );
    }
    renderTimer = ({ completed, total }) => {
        if (completed) {
            return this.completedTimer();
        } else {
            return (
                <FormItem>
                    <div className="tavCenterComponent">
                        <PersianNumber>{mstoSecond(total)}</PersianNumber> &nbsp;  <IntlMessages id="verifyCode.secondRemaining" />
                    </div>
                </FormItem>
            )
        }
    };


    render() {
        return (
            <Countdown
                key={Date.now().toString()}
                date={Date.now() + parseInt(process.env.REACT_APP_TAVANITO_RESEND_CODE_TIME)}
                renderer={this.renderTimer}
            />
        );
    }
}
ResendVerify.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    setForgotPasswordRequest: actions.setForgotPasswordRequest,

};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.FORGOT_PASSWORD, "status"], false),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS((ResendVerify)));
