import styled, { css } from "styled-components";

interface PageProps {
  isCurrent?: boolean;
}

export const Page = styled.button<PageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 4px;

  ${(props) =>
    props.isCurrent &&
    css`
      background-color: ${(props) => props.theme.colors.pink};
      cursor: default;
    `}
`;
