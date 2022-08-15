import styled, { css } from "styled-components";

interface BoxVerificationStatusProps {
  success: boolean;
}

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const BoxVerificationStatus = styled.div<BoxVerificationStatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.lightGreen};
  ${(props) =>
    !props.success &&
    css`
      border-color: ${(props) => props.theme.colors.lightRed};
    `}
  margin-top: 9rem;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  text-align: left;
`;
