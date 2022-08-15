import styled, { css } from "styled-components";

interface DividerWrapperProps {
  axis: "x" | "y";
  gradient: boolean;
  stroke: string;
  color: string;
  initialColor?: string;
  finalColor?: string;
}

export const DividerWrapper = styled.div<DividerWrapperProps>`
  margin: 1rem 0;
  background: ${(props) => props.color};

  ${(props) =>
    props.gradient &&
    css`
      background: linear-gradient(
        ${props.axis === "x" ? "to right" : "to bottom"},
        ${props.initialColor},
        ${props.finalColor}
      );
    `}

  width: ${(props) => (props.axis === "x" ? "100%" : props.stroke)};
  height: ${(props) => (props.axis === "x" ? props.stroke : "100%")};
`;
