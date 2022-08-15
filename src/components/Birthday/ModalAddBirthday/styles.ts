import { shade } from "polished";
import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    input::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`;

export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 30px auto 30px;
  min-width: 100%;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  margin-top: 1rem;
  font-size: 1.8rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 4px;
  transition: background-color 0, 2s;
  align-self: center;
  font-size: 1.2rem;

  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.purple)};
  }
`;
