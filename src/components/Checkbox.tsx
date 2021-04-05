import React from 'react'
import { ICheckbox } from '../interfaces/interfaces';

export const Checkbox: React.FC<ICheckbox> = ({
  name,
  isChecked,
  value,
  onChange,
}) => (
  <input
    type="checkbox"
    id={name}
    value={value}
    name={name}
    checked={isChecked}
    onChange={onChange}
  />
);

export default Checkbox;
