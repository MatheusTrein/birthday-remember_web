import { useEffect } from "react";
import ReactModal from "react-modal";

import { StyledReactModal } from "./styles";

interface ModalProps {
  modalStatus: boolean;
  setIsOpen: () => void;
  children: React.ReactNode;
  style?: ReactModal.Styles;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  modalStatus,
  setIsOpen,
  style,
  className,
}) => {
  useEffect(() => {
    if (modalStatus) document.body.style.overflow = "hidden";
    else document.body.removeAttribute("style");
    return () => {
      document.body.removeAttribute("style");
    };
  }, [modalStatus]);

  return (
    <StyledReactModal
      className={className}
      isOpen={modalStatus}
      onRequestClose={setIsOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={{
        content: {
          ...style?.content,
        },
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          ...style?.overlay,
        },
      }}
    >
      {children}
    </StyledReactModal>
  );
};
