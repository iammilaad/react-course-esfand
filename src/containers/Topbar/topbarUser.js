import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';


class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

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
        <a className="ovDropdownLink" onClick={this.props.logout}>
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
          <img alt="user" src="/images/user1.png" />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(null, null)(TopbarUser);
