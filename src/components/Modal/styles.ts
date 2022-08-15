import ReactModal from "react-modal";
import styled from "styled-components";
import { lighten } from "polished";

interface StyledReactModalProps {
  className?: string;
  isOpen: boolean;
}

export const StyledReactModal = styled(ReactModal)<StyledReactModalProps>`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border-radius: 8px;
  width: 85vw;
  height: 85vh;
  max-width: 800px;
  overflow-y: auto;
  border: none;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => lighten(0.4, props.theme.colors.lightGreen)};
    border-radius: 8px;
  }
`;
