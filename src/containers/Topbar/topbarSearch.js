import React, { Component } from "react";
import { connect } from "react-redux";
import Searchbar from "components/topbar/searchBox";
import TopbarSearchModal from "./topbarSearchModal.style";
import {toJS} from 'utils/higherOrderComponents/toJsHoc';

class TopbarSearch extends Component {
  state = {
    visiblity: false
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 200);
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    const { customizedTheme } = this.props;
    const { visible } = this.state;
    return (
      <div onClick={this.showModal}>
        <i
          className="ion-ios-search-strong"
          style={{ color: customizedTheme.textColor }}
        />
        <TopbarSearchModal
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          wrapclassName="tavSearchModal"
          width="60%"
          footer={null}
        >
          <div className="tavSearchContainer">
            {visible ? <Searchbar onBlur={this.handleBlur} /> : ""}
          </div>
        </TopbarSearchModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    customizedTheme: state.getIn(["ThemeSwitcher","topbarTheme"]),
    App: state.getIn(["App"])
});
export default connect(mapStateToProps)(toJS(TopbarSearch));
