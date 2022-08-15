import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1240px;
  margin: 0 auto;

  margin-top: 2rem;
`;

export const MenuProfile = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  gap: 1rem;

  font-size: 1.5rem;
`;

export const UserName = styled.h1`
  margin: 0.5rem;
`;

export const ButtonSingOut = styled.button`
  font-size: 1.5rem;
`;
