import { useCallback, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

import { Birthday } from "../../../hooks/useBirthdays";
import { appColors } from "../../../styles/appColors";

import {
  BirthdayConfig,
  BirthdayContent,
  BirthdayInfo,
  BirthdayWrapper,
  BrithdayCreatedAt,
  Button,
  EditAndDelete,
  Label,
  Slider,
  Swich,
} from "./styles";

interface BirthdayProps {
  birthday: Birthday;
  handleEditingBirthday: (birthday: Birthday) => void;
  handleDeletingBirthday: (birthday: Birthday) => void;
  handleEnableReminderBirthday: (data: Birthday) => Promise<void>;
  handleDisableBirthdayReminder: (data: Birthday) => Promise<void>;
}

const BirthdayItem: React.FC<BirthdayProps> = ({
  birthday,
  handleEditingBirthday,
  handleDeletingBirthday,
  handleEnableReminderBirthday,
  handleDisableBirthdayReminder,
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnableReminder = useCallback(async () => {
    setLoading(true);
    await handleEnableReminderBirthday(birthday);
    setLoading(false);
  }, [birthday, handleEnableReminderBirthday]);

  const handleDisabledReminder = useCallback(async () => {
    setLoading(true);
    await handleDisableBirthdayReminder(birthday);
    setLoading(false);
  }, [birthday, handleDisableBirthdayReminder]);

  const handleEditBirthday = useCallback(() => {
    handleEditingBirthday(birthday);
  }, [birthday, handleEditingBirthday]);

  const handleDeleteBirthday = useCallback(() => {
    handleDeletingBirthday(birthday);
  }, [birthday, handleDeletingBirthday]);

  return (
    <BirthdayWrapper isAvailable={birthday.reminderIsActive}>
      <BirthdayContent>
        <BirthdayInfo>
          <Label>
            Aniversário: <span>{birthday.birthDateFormatted}</span>
          </Label>
          <Label>
            Nome: <span>{birthday.name}</span>
          </Label>
          <Label>
            Alarme: <span>{birthday.alarmTime}H</span>
          </Label>
        </BirthdayInfo>
        <BirthdayConfig>
          <Swich htmlFor={`enable-switch-birthdayId=${birthday.id}`}>
            <input
              id={`enable-switch-birthdayId=${birthday.id}`}
              disabled={loading}
              type="checkbox"
              onChange={
                birthday.reminderIsActive
                  ? handleDisabledReminder
                  : handleEnableReminder
              }
            />
            <Slider checked={birthday.reminderIsActive} className="slider" />
          </Swich>
          <EditAndDelete>
            <Button color={appColors.purple} onClick={handleEditBirthday}>
              <AiOutlineEdit size={20} color="white" />
            </Button>
            <Button color={appColors.red} onClick={handleDeleteBirthday}>
              <AiOutlineClose size={20} color="white" />
            </Button>
          </EditAndDelete>
        </BirthdayConfig>
      </BirthdayContent>
      <BrithdayCreatedAt>{birthday.createdAtFormatted}</BrithdayCreatedAt>
    </BirthdayWrapper>
  );
};

export { BirthdayItem };
