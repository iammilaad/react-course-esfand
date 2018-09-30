import React, { Component } from "react";
import ovTransfer from "../Transfer";
import ovTreeSelect from "../TreeSelect";
import ovUpload from "../Upload";
import ovCheckbox from "../Checkbox";
import ovAutocomplete from "../AutoComplete";
import ovRadiobox from "../Radiobox";
import ovSelectBox from "../Select";
import ovMention from "../Mention";
import ovSlider from "../Slider";
import InputField from "../Input";

export default class extends Component {
  render() {
    return (
      <div>
        <InputField />
        <ovAutocomplete />
        <ovCheckbox />
        <ovUpload />
        <ovSelectBox />
        <br />
        <ovTreeSelect />
        <ovMention />
        <ovRadiobox />
        <br />
        <ovSlider />
        <ovTransfer />
      </div>
    );
  }
}
