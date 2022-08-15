import { shade } from "polished";
import styled from "styled-components";

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonAddBirthday = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 4px;
  transition: background-color 0, 2s;
  margin-bottom: 2rem;

  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.purple)};
  }
`;
