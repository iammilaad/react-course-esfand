import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "components/utility/intlMessages";
import actions from "./actions";
import config from "./config";
import {bindActionCreators} from 'redux';
import {toJS} from 'utils/higherOrderComponents/toJsHoc';

const { changeLanguage } = actions;

class LanguageSwitcher extends Component {
  render() {
    const { language, changeLanguage } = this.props.LanguageSwitcher;
    return (
      <div className="themeSwitchBlock">
        <h4>
          <IntlMessages id="languageSwitcher.label" />
        </h4>
        <div className="themeSwitchBtnWrapper">
          {config.options.map(option => {
            const { languageId, icon } = option;
            const customClass =
              languageId === language.languageId
                ? "selectedTheme languageSwitch"
                : "languageSwitch";

            return (
              <button
                type="button"
                className={customClass}
                key={languageId}
                onClick={() => {
                  changeLanguage(languageId);
                }}
              >
                <img src={process.env.PUBLIC_URL + icon} alt="flag" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    LanguageSwitcher: state.get("LanguageSwitcher"),
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            changeLanguage,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(LanguageSwitcher));
