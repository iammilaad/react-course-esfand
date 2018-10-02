import React, { Component } from "react";
import { connect } from "react-redux";
import Popover from "components/uielements/popover";
import IntlMessages from "components/utility/intlMessages";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import {toJS} from 'utils/higherOrderComponents/toJsHoc';
import * as actions from 'pages/auth/signin/actions';


class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  hide = () => {
    this.setState({ visible: false });
  }
  handleVisibleChange = () => {
    this.setState({ visible: !this.state.visible });
  }
    logout = () => {
        const {logoutRequest} = this.props;
        logoutRequest()
    };

  render() {
    const content = (
      <TopbarDropdownWrapper className="ovUserDropdown">
        <a className="ovDropdownLink">
          <IntlMessages id="themeSwitcher.settings" />
        </a>
        <a className="ovDropdownLink">
          <IntlMessages id="sidebar.feedback" />
        </a>
        <a className="ovDropdownLink">
          <IntlMessages id="topbar.help" />
        </a>
        <a className="ovDropdownLink" onClick={this.logout}>
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="ovImgWrapper">
          <img alt="user" src="/images/user.png" />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

const mapDispatchToProps = {
    logoutRequest: actions.setLogoutRequest
};

export default connect(
    null,
    mapDispatchToProps
)(toJS(TopbarUser));
