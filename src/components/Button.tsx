import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { IButton } from '../interfaces/interfaces';

const Button: React.FC<IButton> = ({
  type,
  theme,
  handleClick,
  children,
}) => (
  <ThemeProvider theme={theme}>
    <ButtonWrapper type={type} onClick={handleClick}>
      { children }
    </ButtonWrapper>
  </ThemeProvider>
);

const ButtonWrapper = styled.button`
  color: ${props => (
    props.theme.text
  )};
  background-color: ${props => props.theme.background};
  border-radius: ${props => props.theme.borderRadius};
  border: ${props => props.theme.border};
  box-shadow: none;
  cursor: pointer;
`;

export default Button;
