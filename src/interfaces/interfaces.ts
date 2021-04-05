import React, { ButtonHTMLAttributes } from 'react';

export interface IPage {
  title: string;
  route: string;
}

export interface ILabel {
  name: string;
}

type ButtonTypes = 'submit' | 'reset' | 'button';
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: ButtonTypes;
  theme: {};
  handleClick: () => void;
}

export interface ICheckbox {
  isChecked?: boolean;
  name: string;
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IRadioButton {
  isSelected?: boolean;
  name: string;
  label: string;
  value: number | string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
