import styled, { css } from "styled-components";
import { InputMasked } from "./InputMasked";

const inputBorderWidth = "3px";

interface InputProps {
  validated: boolean;
  isErrored: boolean;
}

export const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled(InputMasked)<InputProps>`
  width: 100%;
  padding: 8px;
  font-family: monospace;

  border-radius: 4px;
  border: double ${inputBorderWidth} black;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, black, black);
  transition: all 0.3s;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  &:hover,
  &:focus {
    border-color: transparent;
    background-image: linear-gradient(white, white),
      linear-gradient(
        to right,
        ${(props) => props.theme.colors.blue},
        ${(props) => props.theme.colors.pink}
      );
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: transparent;
      background-image: linear-gradient(white, white),
        linear-gradient(
          to right,
          ${(props) => props.theme.colors.lightRed},
          ${(props) => props.theme.colors.red}
        );
    `}

  ${(props) =>
    props.validated &&
    css`
      border-color: transparent;
      background-image: linear-gradient(white, white),
        linear-gradient(
          to right,
          ${(props) => props.theme.colors.lightGreen},
          ${(props) => props.theme.colors.green}
        );
    `}
`;

export const Error = styled.p`
  font-family: monospace;
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-left: 5px;
`;
