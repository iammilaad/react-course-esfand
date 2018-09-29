import React from "react";
import { LayoutContentWrapper } from "./layoutWrapper.style";

export default props => (
  <LayoutContentWrapper
    className={
      props.className != null
        ? `${props.className} ovLayoutContentWrapper`
        : "ovLayoutContentWrapper"
    }
    {...props}
  >
    {props.children}
  </LayoutContentWrapper>
);
