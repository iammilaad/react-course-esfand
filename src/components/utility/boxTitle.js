import React from "react";
import { BoxTitle, BoxSubTitle } from "./boxTitle.style";

export default props => {
  return (
    <div>
      {props.title ? (
        <BoxTitle className="tavBoxTitle"> {props.title} </BoxTitle>
      ) : (
        ""
      )}
      {props.subtitle ? (
        <BoxSubTitle className="tavBoxSubTitle"> {props.subtitle} </BoxSubTitle>
      ) : (
        ""
      )}
    </div>
  );
};
