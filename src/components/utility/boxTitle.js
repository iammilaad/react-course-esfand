import React from 'react';
import { BoxTitle, BoxSubTitle } from './boxTitle.style';

export default props => {
  return (
    <div>
      {props.title
        ? <BoxTitle className="ovBoxTitle">
            {' '}{props.title}{' '}
          </BoxTitle>
        : ''}
      {props.subtitle
        ? <BoxSubTitle className="ovBoxSubTitle">
            {' '}{props.subtitle}{' '}
          </BoxSubTitle>
        : ''}
    </div>
  );
};
