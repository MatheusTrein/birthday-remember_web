import { shade } from "polished";
import styled from "styled-components";

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;

    a {
      text-align: center;
    }
  }
`;

export const Welcome = styled.h1`
  margin-top: 3rem;
  text-align: center;
`;

export const Title = styled.h2`
  margin-top: 2rem;
  text-align: center;
`;

export const SingOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonSingIn = styled.button`
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
