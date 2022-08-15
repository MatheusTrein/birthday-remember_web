import styled from "styled-components";

const width = "20px";
const height = "20px";

export const Spinner = styled.div`
  position: relative;
  width: ${width};
  height: ${height};

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  &:before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: #1c87c9;
    border-radius: 50%;
    content: "";
    width: ${width};
    height: ${height};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
  }
`;
