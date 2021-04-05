import React from 'react';
import styled from 'styled-components';

import { ILabel } from '../interfaces/interfaces';

const Label: React.FC<ILabel> = ({ name, children }) => (
  <LabelHolder htmlFor={name}>
    { children }
    <div className="name-wrapper">
      { name }
    </div>
  </LabelHolder>
);

const LabelHolder = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
 
  .name-wrapper {
    margin-left: 10px;
  }
`

export default Label;
