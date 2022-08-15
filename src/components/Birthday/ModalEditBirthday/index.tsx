import Image from "next/image";
import { useCallback, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import birthdayCakeSVG from "../../../assets/birthdayCake.svg";
import { Birthday } from "../../../hooks/useBirthdays";
import { useForm } from "../../../hooks/useForm";
import { appColors } from "../../../styles/appColors";
import { parseDateToString } from "../../../utils/parseDateToString";
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

interface ModalEditBirthdayProps {
  isOpen: boolean;
  handleToggleModal: () => void;
  birthday: Birthday;
  handleUpdateBirthday: (updatedBirthday: Birthday) => Promise<void>;
}

const ModalEditBirthday: React.FC<ModalEditBirthdayProps> = ({
  isOpen,
  handleToggleModal,
  birthday,
  handleUpdateBirthday,
}) => {
  const [loading, setLoading] = useState(false);

  const name = useForm({
    inputTypes: ["required"],
    defaultValue: birthday.name,
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const birthDate = useForm({
    inputTypes: ["date"],
    defaultValue: birthday.birthDate
      ? parseDateToString(new Date(birthday.birthDate))
      : "",
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const alarmTime = useForm({
    inputTypes: ["time"],
    defaultValue: birthday.alarmTime,
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

      const updatedBirthday: Birthday = {
        ...birthday,
        alarmTime: alarmTime.value,
        birthDate: birthDate.value,
        name: name.value,
      };

      setLoading(true);

      await handleUpdateBirthday(updatedBirthday);

      setLoading(false);
    },
    [alarmTime, birthDate, birthday, handleUpdateBirthday, name]
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
        <Title>Edite o aniversariante!</Title>
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            type="text"
            label="Nome do Aniversariante:"
            validated={!name.error && !!name.value}
            {...name}
          />
          <Input
            id="birth-date"
            type="text"
            label="Data de Nascimento:"
            validated={!birthDate.error && !!birthDate.value}
            {...birthDate}
          />
          <Input
            id="alarm-time"
            type="time"
            label="Hora do Lembrete:"
            validated={!alarmTime.error && !!alarmTime.value}
            {...alarmTime}
          />

          <Button type="submit" disabled={loading}>
            {loading ? <SpinnerLoad /> : "Atualizar"}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { ModalEditBirthday };
