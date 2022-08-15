import { shade } from "polished";
import styled from "styled-components";

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1rem;

  form {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6rem;
    gap: 2rem;
  }
`;

export const Header = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 2rem auto 0 auto;
  display: grid;
  grid-template-columns: 30px auto 30px;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.purple};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.purple)};
  }

  font-size: 1.25rem;
`;
