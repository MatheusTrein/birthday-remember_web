import styled from "styled-components";
import ReactAvatar from "react-avatar";

const avatarBorder = "6px";

export const AvatarImage = styled(ReactAvatar)`
  width: 100% !important;
  height: 100% !important;
  border-radius: 50%;
  object-fit: cover;

  div {
    span {
      width: 100%;
      height: 100%;
      span {
        font-size: 70px !important;
      }
    }
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  border: double ${avatarBorder} transparent;
  border-radius: 50%;
  background-image: linear-gradient(white, white),
    radial-gradient(
      circle at top left,
      ${(props) => props.theme.colors.blue},
      ${(props) => props.theme.colors.pink}
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
`;
