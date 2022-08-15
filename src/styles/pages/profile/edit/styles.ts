import styled from "styled-components";
import { shade } from "polished";

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
    align-items: center;
    padding: 2rem;
    font-size: 1.5rem;
    width: 100%;
    max-width: 400px;
    gap: 1rem;
  }
`;

export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 30px auto 30px;
  min-width: 100%;
  align-items: center;
`;

export const UserName = styled.h1`
  margin: 0.5rem;
`;

export const EditAvatarWrapper = styled.div`
  position: relative;
`;

export const SelectPhotoButton = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 70%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.purple};
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.purple)};
  }

  input {
    display: none;
  }
`;

export const FormButton = styled.button`
  width: 100%;
  max-width: 100px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  color: white;
  border-radius: 8px;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => shade(0.2, props.theme.colors.purple)};
  }
`;
