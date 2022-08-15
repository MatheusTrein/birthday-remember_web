import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import birthdayCakeSVG from "../../../assets/birthdayCake.svg";
import { CreateBirthday } from "../../../hooks/useBirthdays";
import { useForm } from "../../../hooks/useForm";
import { appColors } from "../../../styles/appColors";
import { parseStringToDate } from "../../../utils/parseStringToDate";
import { Input } from "../../Form/Input";
import { Modal } from "../../Modal";
import { SpinnerLoad } from "../../SpinnerLaod";
import {
  ModalContent,
  Title,
  Button,
  ContentHeader,
  ImageWrapper,
} from "./styles";

interface ModalAddBirthdayProps {
  isOpen: boolean;
  handleToggleModal: () => void;
  handleAddBirthday: (birthday: CreateBirthday) => Promise<void>;
}

const ModalAddBirthday: React.FC<ModalAddBirthdayProps> = ({
  isOpen,
  handleToggleModal,
  handleAddBirthday,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    name.clearInput();
    birthDate.clearInput();
    alarmTime.clearInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const name = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const birthDate = useForm({
    inputTypes: ["date"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const alarmTime = useForm({
    inputTypes: ["time"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const validations = [
        name.validate(),
        birthDate.validate(),
        alarmTime.validate(),
      ];

      const formIsInvalid = validations.some(
        (validation) => validation === false
      );

      if (formIsInvalid) return;

      setLoading(true);

      await handleAddBirthday({
        alarmTime: alarmTime.value,
        name: name.value,
        birthDate: parseStringToDate(birthDate.value),
      });

      setLoading(false);
    },
    [alarmTime, birthDate, handleAddBirthday, name]
  );

  return (
    <Modal modalStatus={isOpen} setIsOpen={handleToggleModal}>
      <ModalContent>
        <ContentHeader>
          <button onClick={handleToggleModal}>
            <MdOutlineKeyboardArrowLeft size={30} color={appColors.gray} />
          </button>
          <ImageWrapper>
            <Image
              src={birthdayCakeSVG}
              width={100}
              height={100}
              alt="birthday-cake"
            />
          </ImageWrapper>
        </ContentHeader>

        <Title>Adicione um aniversariante!</Title>
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            type="text"
            label="Nome do Aniversariante:"
            placeholder="Insira o nome do aniversariante"
            validated={!name.error && !!name.value}
            {...name}
          />
          <Input
            id="birth-date"
            mask="99/99/9999"
            type="text"
            pattern="^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)02\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])(\/)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
            placeholder="dd/mm/aaaa"
            label="Data de Nascimento:"
            validated={!birthDate.error && !!birthDate.value}
            {...birthDate}
          />
          <Input
            id="alarm-time"
            type="time"
            pattern="^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d))$"
            placeholder="HH:MM"
            label="Hora do Lembrete:"
            validated={!alarmTime.error && !!alarmTime.value}
            {...alarmTime}
          />

          <Button type="submit" disabled={loading}>
            {loading ? <SpinnerLoad /> : "Adicionar"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalAddBirthday };
