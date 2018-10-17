import React, { Component } from "react";
import  Popover from "antd/lib/popover";
import { connect } from "react-redux";
import IntlMessages from "components/utility/intlMessages";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import {toJS} from 'utils/higherOrderComponents/toJsHoc';

const demoNotifications = [
  {
    id: 1,
    name: "David Doe",
    notification:
      "A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner"
  },
  {
    id: 2,
    name: "Navis Doe",
    notification:
      "A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner"
  },
  {
    id: 3,
    name: "Emanual Doe",
    notification:
      "A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner"
  },
  {
    id: 4,
    name: "Dowain Doe",
    notification:
      "A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner"
  }
];

class TopbarNotification extends Component {
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
    const { customizedTheme } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="ovDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.notification" />
          </h3>
        </div>
        <div className="ovDropdownBody">
          {demoNotifications.map(notification => (
            <a className="ovDropdownListItem" key={notification.id}>
              <h5>{notification.name}</h5>
              <p>{notification.notification}</p>
            </a>
          ))}
        </div>
        <a className="ovViewAllBtn">
          <IntlMessages id="topbar.viewAll" />
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="ovIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: customizedTheme.textColor }}
          />
          <span>{demoNotifications.length}</span>
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = state => ({
    customizedTheme: state.getIn(["ThemeSwitcher","topbarTheme"]),
    App: state.getIn(["App"])
});
export default connect(mapStateToProps)(toJS(TopbarNotification));
