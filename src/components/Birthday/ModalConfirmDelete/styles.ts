import { shade } from "polished";
import styled from "styled-components";

interface ButtonProps {
  color: string;
}

export const ModalContent = styled.div`
  height: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  margin-top: 1rem;
  font-size: 1.8rem;
  text-align: center;
`;

export const ConfirmOptions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BirthdayName = styled.span`
  color: ${(props) => props.theme.colors.red};
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 45px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  transition: background-color 0, 2s;
  align-self: center;
  font-size: 1.2rem;

  &:hover {
    background-color: ${(props) => shade(0.2, props.color)};
  }
`;
