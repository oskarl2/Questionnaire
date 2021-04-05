import React from 'react';
import styled from 'styled-components';

import { IRadioButton } from '../interfaces/interfaces';

const RadioButton: React.FC<IRadioButton> = ({
  value,
  label,
  name,
  isSelected,
  handleChange,
}) => (
  <RadioButtonWrapper>
    <input
      type="radio"
      id={name}
      value={value}
      checked={isSelected}
      onChange={handleChange}
    />

    <div className="radio-button-label-wrapper">
      <label htmlFor={name} className="radio-button-label">
        { label }
      </label>
    </div>

  </RadioButtonWrapper>
);

const RadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  
  input[type=radio] {
    display: none;
  }
  
  .radio-button-label-wrapper {
    width: 100%; 

    label {
      display: inline-block;
      width: 100%;  
      cursor: pointer;
      padding: 0px 15px;
      line-height: 34px;
      border-radius: 6px;
      user-select: none;
    }
  }
 
  /* Checked */
  input[type=radio]:checked + .radio-button-label-wrapper label {
    background: #ffb01b;
  }
`;

export default RadioButton;
