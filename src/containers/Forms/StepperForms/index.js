import React, { Component } from 'react';
import ovmorphicTransfer from '../Transfer';
import AntdUpload from '../Upload';
import AntdCheckbox from '../Checkbox';
import AntdAutocomplete from '../AutoComplete';
import AntdRadiobox from '../Radiobox';
import AntdSelectBox from '../Select';
import AntdMention from '../Mention';
import AntdRater from '../Rating';
import AntdSlider from '../Slider';
import AntdInputNumber from '../InputNumber';
import Button from '../../../components/uielements/button';
import Steps from '../../../components/uielements/steps';
import message from '../../../components/uielements/message';
import Input from '../../../components/uielements/input';
import PageHeader from '../../../components/utility/pageHeader';
import ContentHolder from '../../../components/utility/contentHolder';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { FormFieldTitle } from './formFieldTitle.style';
const Step = Steps.Step;

const steps = [
  {
    title: 'First',
    content: (
      <div className="ovExampleWrapper">
        <div style={{ padding: '10px 20px' }}>
          <FormFieldTitle className="ovFormFieldTitle">Input</FormFieldTitle>
          <Input className="ovmorphicInputBox" />
        </div>

        <div style={{ padding: '20px' }}>
          <ovmorphicTransfer />
        </div>

        <div style={{ padding: '20px' }}>
          <AntdUpload className="ovmorphicUpload" />
        </div>

        <div style={{ padding: '20px' }}>
          <AntdCheckbox className="ovmorphicCheckbox" />
        </div>
      </div>
    )
  },
  {
    title: 'Second',
    content: (
      <div className="ovExampleWrapper">
        <AntdAutocomplete />
        <AntdRadiobox />
        <AntdSelectBox />
        <AntdMention />
      </div>
    )
  },
  {
    title: 'Last',
    content: (
      <div className="ovExampleWrapper">
        <AntdRater />
        <AntdSlider />
        <AntdInputNumber />
      </div>
    )
  }
];

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <LayoutWrapper>
        <PageHeader>Stepper Form</PageHeader>
        <ContentHolder>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>

          <div s="steps-content">{steps[this.state.current].content}</div>
          <div className="steps-action">
            {this.state.current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {this.state.current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {this.state.current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </ContentHolder>
      </LayoutWrapper>
    );
  }
}
