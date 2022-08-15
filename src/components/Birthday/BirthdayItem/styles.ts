import { shade } from "polished";
import styled, { css } from "styled-components";

interface BirthdayProps {
  isAvailable: boolean;
}

interface SliderProps {
  checked: boolean;
}

interface ButtonProps {
  color: string;
}

export const Label = styled.label`
  span {
    margin-left: 0.5rem;
    color: ${(props) => props.theme.colors.green};
  }
`;

export const BirthdayWrapper = styled.div<BirthdayProps>`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 0 0.5rem rgb(0, 0, 0, 0.2);

  padding: 1rem 1rem 0 1rem;

  font-size: 1.25rem;

  display: flex;
  flex-direction: column;

  ${(props) =>
    !props.isAvailable &&
    css`
      background: rgba(0, 0, 0, 0.62);

      span {
        color: ${props.theme.colors.text};
      }
    `}

  & + div {
    margin-top: 1rem;
  }
`;

export const BirthdayInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const BirthdayConfig = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const EditAndDelete = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  transition: background-color 0, 2s;

  &:hover {
    background-color: ${(props) => shade(0.2, props.color)};
  }
`;

export const Slider = styled.span<SliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.red};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 16px;
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 40px;
    left: 8px;
    bottom: 6px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 10px;
  }

  ${(props) =>
    props.checked &&
    css`
      background-color: ${(props) => props.theme.colors.green};
    `}

  ${(props) =>
    props.checked &&
    css`
      &:before {
        -webkit-transform: translateX(32px);
        -ms-transform: translateX(32px);
        transform: translateX(32px);
      }
    `}
`;

export const Swich = styled.label`
  position: relative;
  display: inline-block;
  width: 88px;
  height: 32px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const BirthdayContent = styled.div`
  display: flex;
  flex: 1;
`;

export const BrithdayCreatedAt = styled.span`
  width: 100%;
  height: 1rem;
  font-family: monospace;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.lightGray};
  text-align: center;
`;
