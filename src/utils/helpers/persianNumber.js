import React, { Component } from "react";
import { toJS } from "utils/higherOrderComponents/toJsHoc";
import { connect } from "react-redux";

class PersianNumber extends Component {
    render() {
        const {
            comma = false,
            moneySign = false,
            language,
            children = "",
        } = this.props;
        if(children !== null) {


            let en_number = children.toString();
            let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
            if (comma === true) {
                en_number = en_number
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            let persianMap = persianDigits.split("");
            let persian_number = en_number.replace(/\d/g, function(m) {
                return persianMap[parseInt(m)];
            });
            return language === "fa" ? (
                <span>
                {persian_number} {moneySign ? "ریال" : null}{" "}
            </span>
            ) : (
                <span>
                {en_number} {moneySign ? "Rial" : null}
            </span>
            );
        }
        else {
            return '';
        }
    }
}

const mapStateToProps = state => ({
    language: state.getIn(["LanguageSwitcher", "language", "locale"])
});

export default connect(mapStateToProps)(toJS(PersianNumber));
