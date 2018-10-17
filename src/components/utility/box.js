import React from "react";
import BoxTitleWrapper from "./boxTitle";
import { BoxWrapper } from "./box.style";

export default props => (
  <BoxWrapper className="tavBoxWrapper">
    <BoxTitleWrapper title={props.title} subtitle={props.subtitle} />
    {props.children}
  </BoxWrapper>
);
