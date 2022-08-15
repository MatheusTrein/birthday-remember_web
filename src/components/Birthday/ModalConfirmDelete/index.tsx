import { useCallback, useState } from "react";
import { Birthday } from "../../../hooks/useBirthdays";
import { appColors } from "../../../styles/appColors";

import { Modal } from "../../Modal";
import { SpinnerLoad } from "../../SpinnerLaod";
import {
  ModalContent,
  Title,
  Button,
  ConfirmOptions,
  BirthdayName,
} from "./styles";

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  handleToggleModal: () => void;
  onConfirm: (birthdayId: string) => Promise<void>;
  birthday: Birthday;
}

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  isOpen,
  handleToggleModal,
  onConfirm,
  birthday,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    await onConfirm(birthday.id);
    setLoading(false);
  }, [birthday.id, onConfirm]);

  return (
    <Modal
      modalStatus={isOpen}
      setIsOpen={handleToggleModal}
      style={{
        content: {
          width: "90vw",
          height: "40vh",
        },
      }}
    >
      <ModalContent>
        <Title>
          Removendo o aniversariante você não vai mais receber nenhum lembrete
          de aniversário de <BirthdayName>{birthday.name}</BirthdayName>!
        </Title>
        <ConfirmOptions>
          <Button onClick={handleToggleModal} color={appColors.purple}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            color={appColors.red}
            disabled={loading}
          >
            {loading ? <SpinnerLoad /> : "Remover"}
          </Button>
        </ConfirmOptions>
      </ModalContent>
    </Modal>
  );
};

export { ModalConfirmDelete };
